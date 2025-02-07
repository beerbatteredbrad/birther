/* main.js */

const width = 960;
const height = 600;

let svg = null;
let path = null;

// Tally object for the simulation counts
const countryTally = {};
window.BIRTH_DATA.forEach(d => {
  countryTally[d.country] = 0;
});

document.addEventListener("DOMContentLoaded", () => {
  // Prepare the map
  createMap();
});

/************************************************
 * 1. D3: Build the map from GeoJSON            *
 ************************************************/
function createMap() {
  svg = d3.select("#map")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  // Use a Mercator or other projection
  const projection = d3.geoMercator()
    .scale(140)
    .translate([width / 2, height / 1.4]);

  path = d3.geoPath().projection(projection);

  // Load a GeoJSON file that has country name in properties.name
  // Example: https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson
  // Many world GeoJSON files exist; ensure you pick one that has "name" in the properties.
  const geojsonUrl = "https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson";
  
  d3.json(geojsonUrl).then(worldData => {
    svg.selectAll("path")
      .data(worldData.features)
      .enter()
      .append("path")
      .attr("d", path)
      .attr("fill", "#ccc")
      .attr("stroke", "#333")
      .attr("stroke-width", 0.3)
      .attr("class", "country-shape");

    // Once the map is drawn, start the simulation
    updateTallyTable();
    scheduleNextFlash();
  });
}

/************************************************
 * 2. Poisson-like random birth events          *
 ************************************************/
function scheduleNextFlash() {
  const interval = getNextInterval();
  setTimeout(() => {
    flashCountry();
    scheduleNextFlash();
  }, interval);
}

// Exponential distribution for the wait time
// λ = total births / (seconds in a year)
const secondsInYear = 365.25 * 24 * 3600;
const globalBirthsPerSecond = window.GLOBAL_TOTAL_BIRTHS / secondsInYear;

function getNextInterval() {
  const u = Math.random();
  // return ms
  return -Math.log(1 - u) / globalBirthsPerSecond * 1000;
}

/************************************************
 * 3. On each event, choose a country and flash *
 ************************************************/
function chooseCountry() {
  // Weighted random pick based on probability
  let rand = Math.random();
  for (let i = 0; i < window.BIRTH_DATA.length; i++) {
    rand -= window.BIRTH_DATA[i].probability;
    if (rand <= 0) {
      return window.BIRTH_DATA[i].country;
    }
  }
  // fallback
  return window.BIRTH_DATA[window.BIRTH_DATA.length - 1].country;
}

function flashCountry() {
  const chosen = chooseCountry();

  // Tally
  countryTally[chosen]++;
  updateTallyTable();

  // Flash the text
  const flashDiv = document.getElementById("flash");
  flashDiv.textContent = chosen;
  flashDiv.style.opacity = 1;
  setTimeout(() => {
    flashDiv.style.opacity = 0;
  }, 800);

  // Highlight on the map
  highlightCountry(chosen);
}

/************************************************
 * 4. Highlight the chosen country on the map   *
 ************************************************/
function highlightCountry(countryName) {
  // We rely on the "properties.name" from the geojson file.
  // Some country names differ slightly (e.g., "United States of America" vs "USA").
  // We'll do a small "fix" map or fallback for major known mismatches.
  const nameFixes = {
    "USA": "United States of America",
    "UK": "United Kingdom",
    "DR Congo": "Democratic Republic of the Congo",
    // Add more if needed, e.g. "Russia" => "Russian Federation"
    "Russia": "Russian Federation"
  };

  const lookupName = nameFixes[countryName] || countryName;
  
  // Deselect any previously highlighted shapes
  svg.selectAll("path.country-highlight")
    .classed("country-highlight", false);

  // Attempt to highlight all shapes whose properties.name matches (case-insensitive)
  svg.selectAll("path.country-shape")
    .filter(d => d.properties && d.properties.name &&
                 d.properties.name.toLowerCase() === lookupName.toLowerCase())
    .classed("country-highlight", true);

  // Remove highlight after 1 second
  setTimeout(() => {
    svg.selectAll("path.country-highlight")
      .classed("country-highlight", false);
  }, 1000);
}

/************************************************
 * 5. Maintain a sorted tally table             *
 ************************************************/
function updateTallyTable() {
  const tbody = document.querySelector("#tallyTable tbody");
  tbody.innerHTML = "";

  // Convert tally to array, sort descending
  const sorted = Object.entries(countryTally)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count);

  // Build table rows
  sorted.forEach(rowData => {
    const tr = document.createElement("tr");
    const tdCountry = document.createElement("td");
    const tdCount = document.createElement("td");
    tdCountry.textContent = rowData.country;
    tdCount.textContent = rowData.count;
    tr.appendChild(tdCountry);
    tr.appendChild(tdCount);
    tbody.appendChild(tr);
  });
}
