/* main.js */

const width = 960;
const height = 600;

let svg = null;
let path = null;
let speedMultiplier = 1;
let currentChoropleth = 'none';
let choroplethScale = null;

// Global counters
let sessionBirths = 0;
let sessionDeaths = 0;
let totalSimulatedSeconds = 0;
let lastUpdateTime = Date.now();

// Tally object for the simulation counts
const countryTally = {};
window.BIRTH_DATA.forEach(d => {
  countryTally[d.country] = 0;
});

document.addEventListener("DOMContentLoaded", () => {
  // Initialize controls
  const speedSlider = document.getElementById("speedRange");
  const speedValue = document.getElementById("speedValue");
  
  if (speedSlider) {
    speedSlider.addEventListener("input", (e) => {
      speedMultiplier = parseInt(e.target.value, 10);
      speedValue.textContent = speedMultiplier + "x";
    });
  }

  // Choropleth selector
  const choroplethSelect = document.getElementById('choroplethSelect');
  if (choroplethSelect) {
    choroplethSelect.addEventListener('change', (e) => {
      currentChoropleth = e.target.value;
      updateChoropleth(currentChoropleth);
    });
  }

  // Prepare the map
  createMap();
  
  // Start the UI update loop for the table (every 1 second)
  setInterval(updateTallyTable, 1000);
  
  lastUpdateTime = Date.now();
  setInterval(updateGlobalCounters, 100); // Update counters more frequently
});

/************************************************
 * 1. D3: Build the map from GeoJSON            *
 ************************************************/
function createMap() {
  svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    // Make it responsive
    .attr("viewBox", `0 0 ${width} ${height}`)
    .style("max-width", "100%")
    .style("height", "auto");

  // Use a Mercator or other projection
  const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.4]);

  path = d3.geoPath().projection(projection);

  // Load a GeoJSON file that has country name in properties.name
  const geojsonUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
  
  // Create tooltip div
  const tooltip = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  d3.json(geojsonUrl).then(worldData => {
    svg.selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("class", "country-shape")
      .attr("data-name", d => d.properties && d.properties.name)
      .on("mouseover", function(event, d) {
        const countryName = d.properties.name;
        const data = getCountryData(countryName);
        
        d3.select(this).style("stroke", "#fff").style("stroke-width", "1px");
        
        tooltip.transition().duration(200).style("opacity", 1);
        
        let content = `<strong>${countryName}</strong>`;
        if (data) {
          const bpm = (data.birthsPerYear / (365.25 * 24 * 60)).toFixed(2);
          content += `
            <div class="stat-row"><span>Annual Births:</span> <span>${data.birthsPerYear.toLocaleString()}</span></div>
            <div class="stat-row"><span>Births/Min:</span> <span>${bpm}</span></div>
            <hr style="border: 0; border-top: 1px solid #444; margin: 5px 0;">
            <div class="stat-row"><span>Death Rate:</span> <span>${data.cdr} / 1k</span></div>
            <div class="stat-row"><span>Infant Mort.:</span> <span>${data.imr} / 1k</span></div>
          `;

          // Add current choropleth metric value if present
          if (currentChoropleth && currentChoropleth !== 'none') {
            let label = currentChoropleth;
            let val = null;
            if (currentChoropleth === 'cbr') { label = 'CBR'; val = data.cbr; }
            if (currentChoropleth === 'cdr') { label = 'CDR'; val = data.cdr; }
            if (currentChoropleth === 'imr') { label = 'IMR'; val = data.imr; }
            if (currentChoropleth === 'birthsPerYear') { label = 'Annual Births'; val = data.birthsPerYear; }
            if (val != null) {
              content += `<hr style="border: 0; border-top: 1px solid #444; margin: 5px 0;"></hr>`;
              content += `<div class="stat-row"><span>${label}:</span> <span>${formatMetricValue(val, currentChoropleth)}</span></div>`;
            }
          }
        } else {
          content += `<div class="stat-row"><span>No data available</span></div>`;
        }
        
        tooltip.html(content)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mousemove", function(event) {
        tooltip
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY - 28) + "px");
      })
      .on("mouseout", function(d) {
        d3.select(this).style("stroke", null).style("stroke-width", null);
        tooltip.transition().duration(500).style("opacity", 0);
      });

    // Once the map is drawn, start the simulation
    computeDerivedMetrics();
    updateChoropleth(currentChoropleth);
    updateTallyTable();
    scheduleNextFlash(); // Births
    scheduleNextDeath(); // Deaths
  });
}

// Compute derived metrics such as estimated population from births and cbr
const METRIC_MAP = {};
function computeDerivedMetrics() {
  window.BIRTH_DATA.forEach(d => {
    // estimate population = births / (cbr/1000)
    const pop = d.cbr > 0 ? (d.birthsPerYear * 1000 / d.cbr) : null;
    METRIC_MAP[d.country] = {
      cbr: d.cbr,
      cdr: d.cdr,
      imr: d.imr,
      birthsPerYear: d.birthsPerYear,
      population: pop
    };
  });
}

function updateChoropleth(metric) {
  // Remove legend if none
  const legendDiv = document.getElementById('choroplethLegend');
  legendDiv.innerHTML = '';

  if (!metric || metric === 'none') {
    // reset fills
    svg.selectAll('path.country-shape').style('fill', null);
    return;
  }

  // Build value list
  const values = window.BIRTH_DATA.map(d => {
    if (metric === 'cbr') return d.cbr;
    if (metric === 'cdr') return d.cdr;
    if (metric === 'imr') return d.imr;
    if (metric === 'birthsPerYear') return d.birthsPerYear;
    return null;
  }).filter(v => v != null && !isNaN(v));

  if (values.length === 0) return;

  const minV = d3.min(values);
  const maxV = d3.max(values);

  // Use a sequential color scale
  choroplethScale = d3.scaleSequential(d3.interpolateOrRd).domain([minV, maxV]);

  // Apply colors to map
  svg.selectAll('path.country-shape')
    .style('fill', function(d) {
      const geoName = d.properties && d.properties.name;
      if (!geoName) return null;
      const data = getCountryData(geoName);
      if (!data) return null;
      let v = null;
      if (metric === 'cbr') v = data.cbr;
      if (metric === 'cdr') v = data.cdr;
      if (metric === 'imr') v = data.imr;
      if (metric === 'birthsPerYear') v = data.birthsPerYear;
      if (v == null || isNaN(v)) return null;
      return choroplethScale(v);
    });

  // Create a simple 5-stop legend
  const steps = 5;
  const stepVals = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    stepVals.push(minV + t * (maxV - minV));
  }

  stepVals.forEach(v => {
    const sw = document.createElement('div');
    sw.className = 'choropleth-swatch';
    sw.style.background = choroplethScale(v);
    legendDiv.appendChild(sw);
  });

  const label = document.createElement('div');
  label.className = 'choropleth-label';
  label.textContent = `${metric}  `;
  legendDiv.appendChild(label);

  // Add numeric labels (min / max)
  const minLabel = document.createElement('div');
  minLabel.className = 'choropleth-label';
  minLabel.textContent = formatMetricValue(minV, metric);
  legendDiv.appendChild(minLabel);

  const maxLabel = document.createElement('div');
  maxLabel.className = 'choropleth-label';
  maxLabel.textContent = formatMetricValue(maxV, metric);
  legendDiv.appendChild(maxLabel);
}

function formatMetricValue(v, metric) {
  if (metric === 'birthsPerYear') return Math.round(v).toLocaleString();
  return Number(v).toFixed(2);
}

function getCountryData(geoName) {
  // Reverse lookup from GeoJSON name to our data name
  // We need to handle the mismatches in reverse or normalize
  const nameFixes = {
    "United States of America": "USA",
    "United Kingdom": "UK",
    "Democratic Republic of the Congo": "DR Congo",
    "Russian Federation": "Russia"
  };
  
  const lookupName = nameFixes[geoName] || geoName;
  return window.BIRTH_DATA.find(d => d.country.toLowerCase() === lookupName.toLowerCase());
}

/************************************************
 * 2. Poisson-like random birth events          *
 ************************************************/
function scheduleNextFlash() {
  const interval = getNextInterval(window.GLOBAL_TOTAL_BIRTHS);
  setTimeout(() => {
    flashCountry(true); // true = birth
    scheduleNextFlash();
  }, interval);
}

function scheduleNextDeath() {
  const interval = getNextInterval(window.GLOBAL_TOTAL_DEATHS);
  setTimeout(() => {
    flashCountry(false); // false = death
    scheduleNextDeath();
  }, interval);
}

// Exponential distribution for the wait time
// λ = total events / (seconds in a year)
const secondsInYear = 365.25 * 24 * 3600;

function getNextInterval(totalEventsPerYear) {
  const eventsPerSecond = totalEventsPerYear / secondsInYear;
  const u = Math.random();
  // return ms, adjusted by speedMultiplier
  return (-Math.log(1 - u) / eventsPerSecond * 1000) / speedMultiplier;
}

/************************************************
 * 3. On each event, choose a country and flash *
 ************************************************/
function chooseCountry(isBirth) {
  // Weighted random pick based on probability
  let rand = Math.random();
  const prop = isBirth ? 'probability' : 'deathProbability';
  
  for (let i = 0; i < window.BIRTH_DATA.length; i++) {
    rand -= window.BIRTH_DATA[i][prop];
    if (rand <= 0) {
      return window.BIRTH_DATA[i].country;
    }
  }
  // fallback
  return window.BIRTH_DATA[window.BIRTH_DATA.length - 1].country;
}

function flashCountry(isBirth) {
  const chosen = chooseCountry(isBirth);

  if (isBirth) {
    // Tally Births
    countryTally[chosen]++;
    sessionBirths++;
    
    // Flash the text
    const flashDiv = document.getElementById("flash");
    flashDiv.textContent = chosen;
    flashDiv.style.color = "var(--highlight-color)"; // Pink for birth
    flashDiv.style.opacity = 1;
    
    const fadeTime = Math.max(100, 800 / Math.sqrt(speedMultiplier));
    setTimeout(() => {
      flashDiv.style.opacity = 0;
    }, fadeTime);

    // Highlight on the map
    highlightCountry(chosen, "birth");
  } else {
    // Tally Deaths (Global only for now, or we could add a death tally column)
    sessionDeaths++;
    // We don't flash text for deaths to avoid confusion/clutter, 
    // or we could flash in a different color. Let's just highlight map.
    highlightCountry(chosen, "death");
  }
}

/************************************************
 * 4. Highlight the chosen country on the map   *
 ************************************************/
function highlightCountry(countryName, type) {
  // We rely on the "properties.name" from the geojson file.
  const nameFixes = {
    "UK": "United Kingdom",
    "DR Congo": "Democratic Republic of the Congo",
    "Russia": "Russian Federation"
  };

  const lookupName = nameFixes[countryName] || countryName;
  
  const selection = svg.selectAll("path.country-shape")
    .filter(d => d.properties && d.properties.name &&
                 d.properties.name.toLowerCase() === lookupName.toLowerCase());
                 
  // Add specific class based on type
  const className = type === "birth" ? "country-highlight" : "country-death-highlight";
  selection.classed(className, true);

  const highlightDuration = Math.max(200, 1000 / Math.sqrt(speedMultiplier));

  setTimeout(() => {
    selection.classed(className, false);
  }, highlightDuration);
}

function updateGlobalCounters() {
  const now = Date.now();
  // Calculate time delta in seconds
  const dt = (now - lastUpdateTime) / 1000;
  lastUpdateTime = now;

  // Add to total simulated time
  totalSimulatedSeconds += dt * speedMultiplier;
  
  // Format time
  const totalSeconds = Math.floor(totalSimulatedSeconds);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (num) => num.toString().padStart(2, '0');
  let timeString = `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  
  if (days > 0) {
    timeString = `${days}d ${timeString}`;
  }

  document.getElementById("simulatedTime").textContent = timeString;
  document.getElementById("globalBirths").textContent = sessionBirths.toLocaleString();
  document.getElementById("globalDeaths").textContent = sessionDeaths.toLocaleString();
}

/************************************************
 * 5. Maintain a sorted tally table             *
 ************************************************/
function updateTallyTable() {
  const tbody = document.querySelector("#tallyTable tbody");
  
  // Convert tally to array, sort descending
  const sorted = Object.entries(countryTally)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  tbody.innerHTML = "";

  sorted.forEach(rowData => {
    if (rowData.count > 0) {
        const tr = document.createElement("tr");
        const tdCountry = document.createElement("td");
        const tdCount = document.createElement("td");
        tdCountry.textContent = rowData.country;
        tdCount.textContent = rowData.count.toLocaleString();
        tr.appendChild(tdCountry);
        tr.appendChild(tdCount);
        tbody.appendChild(tr);
    }
  });
}
