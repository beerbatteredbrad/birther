// Approximate top 100 countries by annual births.
// If you have a more accurate or updated dataset, replace here.
window.BIRTH_DATA = [
    { "country": "India", "birthsPerYear": 24500000, "cbr": 16.53, "cdr": 9.65, "imr": 35.4 },
    { "country": "China", "birthsPerYear": 16000000, "cbr": 9.70, "cdr": 7.82, "imr": 11.4 },
    { "country": "Nigeria", "birthsPerYear": 7500000, "cbr": 34.00, "cdr": 8.52, "imr": 59.8 },
    { "country": "Pakistan", "birthsPerYear": 6000000, "cbr": 26.01, "cdr": 5.94, "imr": 52.3 },
    { "country": "Indonesia", "birthsPerYear": 4800000, "cbr": 15.05, "cdr": 6.77, "imr": 20.4 },
    { "country": "USA", "birthsPerYear": 4000000, "cbr": 12.21, "cdr": 8.42, "imr": 5.3 },
    { "country": "Brazil", "birthsPerYear": 2900000, "cbr": 10.67, "cdr": 6.90, "imr": 10.5 },
    { "country": "Bangladesh", "birthsPerYear": 2800000, "cbr": 17.50, "cdr": 5.50, "imr": 28.3 },
    { "country": "Ethiopia", "birthsPerYear": 2600000, "cbr": 29.97, "cdr": 5.60, "imr": 35.8 },
    { "country": "DR Congo", "birthsPerYear": 2500000, "cbr": 39.64, "cdr": 7.74, "imr": 64.5 },
    { "country": "Mexico", "birthsPerYear": 2200000, "cbr": 13.95, "cdr": 7.07, "imr": 10.7 },
    { "country": "Egypt", "birthsPerYear": 2100000, "cbr": 20.48, "cdr": 4.32, "imr": 17.1 },
    { "country": "Philippines", "birthsPerYear": 2000000, "cbr": 22.17, "cdr": 6.10, "imr": 20.0 },
    { "country": "Vietnam", "birthsPerYear": 1600000, "cbr": 15.29, "cdr": 5.77, "imr": 15.7 },
    { "country": "Turkey", "birthsPerYear": 1500000, "cbr": 14.04, "cdr": 6.09, "imr": 15.8 },
    { "country": "Iran", "birthsPerYear": 1400000, "cbr": 14.79, "cdr": 5.20, "imr": 14.9 },
    { "country": "Russia", "birthsPerYear": 1400000, "cbr": 9.22, "cdr": 13.27, "imr": 6.5 },
    { "country": "Japan", "birthsPerYear": 900000, "cbr": 6.90, "cdr": 11.74, "imr": 1.9 },
    { country: "Sudan", birthsPerYear: 900000 },
    { country: "France", birthsPerYear: 750000 },
    { country: "South Africa", birthsPerYear: 720000 },
    { country: "UK", birthsPerYear: 700000 },   // "United Kingdom"
    { country: "Myanmar", birthsPerYear: 690000 },
    { country: "Kenya", birthsPerYear: 650000 },
    { country: "Colombia", birthsPerYear: 640000 },
    { country: "Spain", birthsPerYear: 590000 },
    { country: "Argentina", birthsPerYear: 580000 },
    { country: "Uganda", birthsPerYear: 570000 },
    { country: "Algeria", birthsPerYear: 550000 },
    { country: "Poland", birthsPerYear: 370000 },
    { country: "Canada", birthsPerYear: 370000 },
    { country: "Iraq", birthsPerYear: 800000 },
    { country: "Ukraine", birthsPerYear: 340000 },
    { country: "Morocco", birthsPerYear: 350000 },
    { country: "Saudi Arabia", birthsPerYear: 530000 },
    { country: "Afghanistan", birthsPerYear: 900000 },
    { country: "Peru", birthsPerYear: 500000 },
    { country: "Malaysia", birthsPerYear: 450000 },
    { country: "Venezuela", birthsPerYear: 420000 },
    { country: "Uzbekistan", birthsPerYear: 700000 },
    { country: "Ghana", birthsPerYear: 700000 },
    { country: "Yemen", birthsPerYear: 600000 },
    { country: "Mozambique", birthsPerYear: 700000 },
    { country: "Nepal", birthsPerYear: 500000 },
    { country: "Australia", birthsPerYear: 300000 },
    { country: "North Korea", birthsPerYear: 350000 },
    { country: "Ivory Coast", birthsPerYear: 630000 },
    { country: "Taiwan", birthsPerYear: 180000 },
    { country: "Syria", birthsPerYear: 400000 },
    { country: "Romania", birthsPerYear: 200000 },
    { country: "Sri Lanka", birthsPerYear: 300000 },
    { country: "Burkina Faso", birthsPerYear: 650000 },
    { country: "Chile", birthsPerYear: 220000 },
    { country: "Kazakhstan", birthsPerYear: 390000 },
    { country: "Niger", birthsPerYear: 900000 },
    { country: "Mali", birthsPerYear: 650000 },
    { country: "Malawi", birthsPerYear: 600000 },
    { country: "Netherlands", birthsPerYear: 180000 },
    { country: "Ecuador", birthsPerYear: 280000 },
    { country: "Cambodia", birthsPerYear: 420000 },
    { country: "Guatemala", birthsPerYear: 380000 },
    { country: "Zambia", birthsPerYear: 530000 },
    { country: "Senegal", birthsPerYear: 520000 },
    { country: "Chad", birthsPerYear: 550000 },
    { country: "Somalia", birthsPerYear: 500000 },
    { country: "Zimbabwe", birthsPerYear: 400000 },
    { country: "Guinea", birthsPerYear: 600000 },
    { country: "Rwanda", birthsPerYear: 380000 },
    { country: "South Sudan", birthsPerYear: 600000 },
    { country: "Belgium", birthsPerYear: 120000 },
    { country: "Tunisia", birthsPerYear: 180000 },
    { country: "Cuba", birthsPerYear: 100000 },
    { country: "Bolivia", birthsPerYear: 250000 },
    { country: "Benin", birthsPerYear: 400000 },
    { country: "Haiti", birthsPerYear: 300000 },
    { country: "Greece", birthsPerYear: 90000 },
    { country: "Czechia", birthsPerYear: 100000 },
    { country: "Portugal", birthsPerYear: 85000 },
    { country: "Dominican Republic", birthsPerYear: 200000 },
    { country: "Jordan", birthsPerYear: 200000 },
    { country: "Sweden", birthsPerYear: 115000 },
    { country: "Azerbaijan", birthsPerYear: 130000 },
    { country: "Hungary", birthsPerYear: 90000 },
    { country: "Belarus", birthsPerYear: 90000 },
    { country: "Austria", birthsPerYear: 90000 },
    { country: "Tajikistan", birthsPerYear: 250000 },
    { country: "Honduras", birthsPerYear: 200000 },
    { country: "Israel", birthsPerYear: 180000 },
    { country: "Switzerland", birthsPerYear: 85000 },
    { country: "Togo", birthsPerYear: 300000 },
    { country: "Sierra Leone", birthsPerYear: 310000 },
    { country: "Hong Kong", birthsPerYear: 50000 },
    { country: "Laos", birthsPerYear: 200000 },
    { country: "Paraguay", birthsPerYear: 200000 },
    { country: "Bulgaria", birthsPerYear: 65000 },
    { country: "Libya", birthsPerYear: 150000 },
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
  