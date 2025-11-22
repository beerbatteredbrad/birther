// Approximate top 100 countries by annual births.
// If you have a more accurate or updated dataset, replace here.
window.BIRTH_DATA = [
    // Top 200 countries by annual births, with actual country names and demographic data
    {"country":"India","birthsPerYear":23420000,"cbr":16.53,"cdr":9.65,"imr":35.4},
    {"country":"China","birthsPerYear":13680000,"cbr":9.7,"cdr":7.82,"imr":9.89},
    {"country":"United States","birthsPerYear":4150000,"cbr":12.21,"cdr":8.42,"imr":5.82},
    {"country":"Indonesia","birthsPerYear":4280000,"cbr":15.05,"cdr":6.77,"imr":18.91},
    {"country":"Pakistan","birthsPerYear":6290000,"cbr":26.01,"cdr":5.94,"imr":61.33},
    {"country":"Nigeria","birthsPerYear":7610000,"cbr":34.00,"cdr":8.52,"imr":62.14},
    {"country":"Brazil","birthsPerYear":2270000,"cbr":10.67,"cdr":6.90,"imr":12.52},
    {"country":"Bangladesh","birthsPerYear":2970000,"cbr":17.50,"cdr":5.50,"imr":28.3},
    {"country":"Russia","birthsPerYear":1347000,"cbr":9.22,"cdr":13.27,"imr":5.76},
    {"country":"Mexico","birthsPerYear":1822000,"cbr":13.95,"cdr":7.07,"imr":7.84},
    {"country":"Japan","birthsPerYear":850000,"cbr":6.90,"cdr":11.74,"imr":1.76},
    {"country":"Philippines","birthsPerYear":2530000,"cbr":22.17,"cdr":6.10,"imr":19.66},
    {"country":"DR Congo","birthsPerYear":4450000,"cbr":39.64,"cdr":7.74,"imr":64.92},
    {"country":"Ethiopia","birthsPerYear":3340000,"cbr":29.97,"cdr":5.60,"imr":48.7},
    {"country":"Egypt","birthsPerYear":2200000,"cbr":20.48,"cdr":4.32,"imr":17.1},
    {"country":"Vietnam","birthsPerYear":1550000,"cbr":15.29,"cdr":5.77,"imr":16.71},
    {"country":"Iran","birthsPerYear":1270000,"cbr":14.79,"cdr":5.20,"imr":12.82},
    {"country":"Turkey","birthsPerYear":1200000,"cbr":14.04,"cdr":6.09,"imr":8.90},
    {"country":"Germany","birthsPerYear":753000,"cbr":9.02,"cdr":11.97,"imr":3.19},
    {"country":"United Kingdom","birthsPerYear":749000,"cbr":10.80,"cdr":9.81,"imr":3.76},
    {"country":"France","birthsPerYear":793000,"cbr":11.56,"cdr":9.51,"imr":3.03},
    {"country":"Tanzania","birthsPerYear":2240000,"cbr":32.90,"cdr":5.02,"imr":41.21},
    {"country":"Thailand","birthsPerYear":661000,"cbr":10.04,"cdr":7.86,"imr":2.11},
    {"country":"South Africa","birthsPerYear":1150000,"cbr":18.24,"cdr":9.25,"imr":27.24},
    {"country":"Italy","birthsPerYear":420000,"cbr":7.00,"cdr":11.27,"imr":2.60},
    {"country":"Myanmar","birthsPerYear":820000,"cbr":16.04,"cdr":7.14,"imr":38.40},
    {"country":"South Korea","birthsPerYear":347000,"cbr":6.95,"cdr":7.28,"imr":2.11},
    {"country":"Colombia","birthsPerYear":780000,"cbr":15.06,"cdr":7.84,"imr":12.64},
    {"country":"Kenya","birthsPerYear":1400000,"cbr":26.01,"cdr":4.95,"imr":36.34},
    {"country":"Spain","birthsPerYear":352000,"cbr":7.12,"cdr":10.11,"imr":2.35},
    {"country":"Argentina","birthsPerYear":713000,"cbr":15.38,"cdr":7.28,"imr":10.23},
    {"country":"Sudan","birthsPerYear":1630000,"cbr":33.32,"cdr":6.19,"imr":42.86},
    {"country":"Uganda","birthsPerYear":1850000,"cbr":40.27,"cdr":4.87,"imr":43.3},
    {"country":"Algeria","birthsPerYear":846000,"cbr":17.84,"cdr":4.33,"imr":13.1},
    {"country":"Iraq","birthsPerYear":1110000,"cbr":24.22,"cdr":3.88,"imr":19.5},
    {"country":"Afghanistan","birthsPerYear":1400000,"cbr":34.79,"cdr":12.08,"imr":37.8},
    {"country":"Poland","birthsPerYear":315000,"cbr":8.31,"cdr":9.37,"imr":3.28},
    {"country":"Canada","birthsPerYear":390000,"cbr":10.11,"cdr":8.17,"imr":4.51},
    {"country":"Morocco","birthsPerYear":620000,"cbr":17.10,"cdr":6.61,"imr":19.86},
    {"country":"Saudi Arabia","birthsPerYear":490000,"cbr":13.90,"cdr":3.45,"imr":6.31},
    {"country":"Peru","birthsPerYear":583000,"cbr":16.96,"cdr":4.33,"imr":12.79},
    {"country":"Uzbekistan","birthsPerYear":520000,"cbr":15.18,"cdr":5.43,"imr":20.83},
    {"country":"Malaysia","birthsPerYear":494000,"cbr":14.39,"cdr":5.72,"imr":5.90},
    {"country":"Angola","birthsPerYear":1500000,"cbr":41.42,"cdr":7.80,"imr":61.46},
    {"country":"Ghana","birthsPerYear":946000,"cbr":28.04,"cdr":5.99,"imr":32.1},
    {"country":"Mozambique","birthsPerYear":1260000,"cbr":36.94,"cdr":9.93,"imr":53.91},
    {"country":"Nepal","birthsPerYear":516000,"cbr":17.26,"cdr":5.59,"imr":27.93},
    {"country":"Yemen","birthsPerYear":785000,"cbr":24.05,"cdr":5.54,"imr":43.23},
    {"country":"Madagascar","birthsPerYear":892000,"cbr":28.14,"cdr":5.92,"imr":38.1},
    {"country":"Cameroon","birthsPerYear":1030000,"cbr":35.13,"cdr":7.54,"imr":61.18},
    {"country":"Australia","birthsPerYear":338000,"cbr":12.23,"cdr":6.76,"imr":3.11},
    {"country":"Ivory Coast","birthsPerYear":886000,"cbr":27.92,"cdr":7.45,"imr":52.4},
    {"country":"Niger","birthsPerYear":1230000,"cbr":46.86,"cdr":9.66,"imr":46.31},
    {"country":"Sri Lanka","birthsPerYear":296000,"cbr":13.61,"cdr":6.54,"imr":7.57},
    {"country":"Romania","birthsPerYear":165000,"cbr":8.63,"cdr":14.92,"imr":6.68},
    {"country":"Burkina Faso","birthsPerYear":786000,"cbr":32.71,"cdr":7.50,"imr":52.0},
    {"country":"Malawi","birthsPerYear":566000,"cbr":27.29,"cdr":4.51,"imr":53.9},
    {"country":"Chile","birthsPerYear":254000,"cbr":12.57,"cdr":6.58,"imr":12.79},
    {"country":"Kazakhstan","birthsPerYear":305000,"cbr":14.92,"cdr":8.05,"imr":7.67},
    {"country":"Zambia","birthsPerYear":678000,"cbr":34.48,"cdr":6.02,"imr":45.61},
    {"country":"Guatemala","birthsPerYear":395000,"cbr":21.88,"cdr":4.89,"imr":21.8},
    {"country":"Ecuador","birthsPerYear":294000,"cbr":16.19,"cdr":5.18,"imr":13.6},
    {"country":"Netherlands","birthsPerYear":199000,"cbr":10.98,"cdr":9.27,"imr":2.51},
    {"country":"Syria","birthsPerYear":464000,"cbr":22.19,"cdr":4.07,"imr":16.5},
    {"country":"Senegal","birthsPerYear":573000,"cbr":30.84,"cdr":5.00,"imr":32.1},
    {"country":"Chad","birthsPerYear":770000,"cbr":39.85,"cdr":9.21,"imr":68.6},
    {"country":"Somalia","birthsPerYear":741000,"cbr":37.71,"cdr":11.43,"imr":89.5},
    {"country":"Cambodia","birthsPerYear":329000,"cbr":18.75,"cdr":5.70,"imr":23.72},
    {"country":"Zimbabwe","birthsPerYear":559000,"cbr":32.77,"cdr":8.51,"imr":38.74},
    {"country":"Guinea","birthsPerYear":509000,"cbr":35.47,"cdr":7.97,"imr":52.4},
    {"country":"Rwanda","birthsPerYear":362000,"cbr":25.70,"cdr":5.77,"imr":42.44},
    {"country":"Benin","birthsPerYear":538000,"cbr":40.72,"cdr":7.82,"imr":58.7},
    {"country":"Burundi","birthsPerYear":432000,"cbr":34.87,"cdr":5.85,"imr":42.44},
    {"country":"Tunisia","birthsPerYear":168000,"cbr":14.05,"cdr":6.38,"imr":12.68},
    {"country":"Belgium","birthsPerYear":129000,"cbr":10.86,"cdr":9.57,"imr":2.83},
    {"country":"Haiti","birthsPerYear":247000,"cbr":20.81,"cdr":7.17,"imr":54.3},
    {"country":"Bolivia","birthsPerYear":200000,"cbr":18.08,"cdr":4.33,"imr":29.71},
    {"country":"Cuba","birthsPerYear":97500,"cbr":9.99,"cdr":9.37,"imr":4.3},
    {"country":"South Sudan","birthsPerYear":584000,"cbr":37.07,"cdr":9.22,"imr":64.36},
    {"country":"Dominican Republic","birthsPerYear":194000,"cbr":17.80,"cdr":6.31,"imr":20.9},
    {"country":"Czech Republic","birthsPerYear":92000,"cbr":8.43,"cdr":10.77,"imr":2.27},
    {"country":"Greece","birthsPerYear":78000,"cbr":7.52,"cdr":12.02,"imr":3.7},
    {"country":"Portugal","birthsPerYear":86000,"cbr":7.99,"cdr":10.90,"imr":2.6},
    {"country":"Jordan","birthsPerYear":261000,"cbr":22.37,"cdr":3.11,"imr":14.63},
    {"country":"Azerbaijan","birthsPerYear":135000,"cbr":13.20,"cdr":6.92,"imr":20.83},
    {"country":"Hungary","birthsPerYear":82000,"cbr":8.58,"cdr":12.89,"imr":4.05},
    {"country":"Sweden","birthsPerYear":114000,"cbr":10.76,"cdr":9.50,"imr":2.04},
    {"country":"Honduras","birthsPerYear":174000,"cbr":17.64,"cdr":4.69,"imr":14.6},
    {"country":"Austria","birthsPerYear":94000,"cbr":9.39,"cdr":9.86,"imr":3.15},
    {"country":"Switzerland","birthsPerYear":93000,"cbr":10.30,"cdr":8.37,"imr":3.37},
    {"country":"Israel","birthsPerYear":175000,"cbr":17.30,"cdr":5.05,"imr":3.3},
    {"country":"Tajikistan","birthsPerYear":213000,"cbr":20.28,"cdr":5.67,"imr":29.26},
    {"country":"Papua New Guinea","birthsPerYear":285000,"cbr":28.54,"cdr":5.48,"imr":23.49},
    {"country":"Sierra Leone","birthsPerYear":286000,"cbr":31.49,"cdr":9.14,"imr":63.6},
    {"country":"Laos","birthsPerYear":155000,"cbr":20.35,"cdr":6.26,"imr":23.72},
    {"country":"Paraguay","birthsPerYear":106000,"cbr":16.15,"cdr":4.90,"imr":22.1},
    {"country":"Serbia","birthsPerYear":86000,"cbr":8.87,"cdr":15.12,"imr":4.90},
    {"country":"Libya","birthsPerYear":156000,"cbr":20.88,"cdr":3.45,"imr":10.53},
    {"country":"Lebanon","birthsPerYear":87000,"cbr":12.86,"cdr":5.57,"imr":9.42},
    {"country":"Nicaragua","birthsPerYear":111000,"cbr":16.30,"cdr":5.19,"imr":16.78},
    {"country":"Kyrgyzstan","birthsPerYear":139000,"cbr":19.08,"cdr":6.07,"imr":15.51},
    {"country":"Turkmenistan","birthsPerYear":122000,"cbr":17.16,"cdr":5.96,"imr":6.31},
    {"country":"Denmark","birthsPerYear":67000,"cbr":11.25,"cdr":9.55,"imr":3.13},
    {"country":"El Salvador","birthsPerYear":112000,"cbr":17.49,"cdr":5.92,"imr":11.8},
    {"country":"Slovakia","birthsPerYear":48000,"cbr":8.78,"cdr":10.18,"imr":4.9},
    {"country":"Finland","birthsPerYear":57000,"cbr":10.33,"cdr":10.37,"imr":1.71},
    {"country":"Norway","birthsPerYear":54000,"cbr":11.89,"cdr":7.93,"imr":2.07},
    {"country":"Costa Rica","birthsPerYear":73000,"cbr":14.03,"cdr":4.97,"imr":7.32},
    {"country":"Botswana","birthsPerYear":47000,"cbr":19.95,"cdr":8.98,"imr":30.15},
    {"country":"Mali","birthsPerYear":909000,"cbr":40.54,"cdr":8.30,"imr":61.2},
    {"country":"Georgia","birthsPerYear":40000,"cbr":10.79,"cdr":10.76,"imr":9.37},
    {"country":"Panama","birthsPerYear":61000,"cbr":17.71,"cdr":5.88,"imr":13.73},
    {"country":"Mauritania","birthsPerYear":136000,"cbr":27.61,"cdr":7.33,"imr":27.1},
    {"country":"Mongolia","birthsPerYear":54000,"cbr":15.37,"cdr":6.33,"imr":18.09},
    {"country":"Armenia","birthsPerYear":33000,"cbr":10.80,"cdr":9.54,"imr":10.78},
    {"country":"Jamaica","birthsPerYear":44000,"cbr":15.77,"cdr":7.44,"imr":11.78},
    {"country":"Qatar","birthsPerYear":33000,"cbr":9.27,"cdr":1.42,"imr":5.7},
    {"country":"Albania","birthsPerYear":29000,"cbr":12.48,"cdr":7.36,"imr":2.7},
    {"country":"Lithuania","birthsPerYear":29000,"cbr":9.09,"cdr":15.16,"imr":1.87},
    {"country":"Estonia","birthsPerYear":11000,"cbr":8.48,"cdr":13.13,"imr":1.99},
    {"country":"Slovenia","birthsPerYear":17000,"cbr":8.12,"cdr":10.46,"imr":1.87},
    {"country":"Singapore","birthsPerYear":54000,"cbr":8.94,"cdr":4.15,"imr":1.63},
    {"country":"Oman","birthsPerYear":115000,"cbr":21.62,"cdr":3.21,"imr":7.1},
    {"country":"United Arab Emirates","birthsPerYear":18000,"cbr":10.76,"cdr":1.62,"imr":6.6},
    {"country":"Belarus","birthsPerYear":81000,"cbr":8.87,"cdr":12.81,"imr":2.97},
    {"country":"Latvia","birthsPerYear":17000,"cbr":8.50,"cdr":14.69,"imr":1.71},
    {"country":"Luxembourg","birthsPerYear":7000,"cbr":11.59,"cdr":7.17,"imr":2.87},
    {"country":"Brunei","birthsPerYear":7000,"cbr":15.98,"cdr":3.85,"imr":7.92},
    {"country":"Cyprus","birthsPerYear":12000,"cbr":10.37,"cdr":6.99,"imr":3.54},
    {"country":"Bahamas","birthsPerYear":6000,"cbr":14.49,"cdr":6.47,"imr":10.6}
  ];
  
  // We'll compute total births and attach a probability to each
  (() => {
    // Default global averages for countries where we didn't manually add data
    const DEFAULT_CBR = 17.0;
    const DEFAULT_CDR = 7.5;
    const DEFAULT_IMR = 26.0;

    let totalBirths = 0;
    let totalDeaths = 0;

    window.BIRTH_DATA.forEach(d => {
      // Fill in defaults if missing
      if (!d.cbr) d.cbr = DEFAULT_CBR;
      if (!d.cdr) d.cdr = DEFAULT_CDR;
      if (!d.imr) d.imr = DEFAULT_IMR;

      // Calculate deathsPerYear based on the ratio of CDR to CBR
      // births = pop * (cbr/1000)  => pop = births / (cbr/1000)
      // deaths = pop * (cdr/1000)
      // deaths = (births / cbr) * cdr
      d.deathsPerYear = Math.round((d.birthsPerYear / d.cbr) * d.cdr);

      totalBirths += d.birthsPerYear;
      totalDeaths += d.deathsPerYear;
    });

    window.GLOBAL_TOTAL_BIRTHS = totalBirths;
    window.GLOBAL_TOTAL_DEATHS = totalDeaths;

    // Assign probabilities
    window.BIRTH_DATA.forEach(d => {
      d.probability = d.birthsPerYear / totalBirths;
      d.deathProbability = d.deathsPerYear / totalDeaths;
    });
  })();
  