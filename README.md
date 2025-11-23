# Global Birth Rate & Death Rate Simulation

A real-time visualization of global birth and death rates using D3.js. This project simulates demographic events across the top 100 countries based on annual statistics, providing a visceral sense of population dynamics.

## Features

*   **Real-time Simulation:** Uses independent Poisson processes to simulate random birth and death events based on real-world rates.
*   **Interactive Map:** 
    *   **Births:** Countries light up in **Neon Pink**.
    *   **Deaths:** Countries light up in **Red**.
    *   **Hover Tooltips:** See detailed stats including Annual Births, Births Per Minute, Death Rate, and Infant Mortality Rate.
*   **Global Counters:** 
    *   **Simulated Time:** Tracks the elapsed time in the simulation (Hours, Minutes, Seconds).
    *   **Global Births & Deaths:** Running totals for the current session.
*   **Live Tally Table:** A real-time leaderboard showing which countries have had the most simulated births in the current session.
*   **Simulation Controls:** 
    *   **Speed Slider:** Accelerate time from 1x up to 500x to visualize patterns more quickly.
    *   **Choropleth Maps:** Visualize global data distributions for Crude Birth Rate (CBR), Crude Death Rate (CDR), Infant Mortality Rate (IMR), and Annual Births.
*   **Responsive Design:** Works on various screen sizes with a modern dark theme.

## Technologies Used

*   **D3.js (v7):** For rendering the interactive SVG map and handling data visualizations.
*   **HTML5 & CSS3:** For the layout, responsive design, and dark mode styling.
*   **JavaScript (ES6+):** For the simulation logic, Poisson process calculations, and DOM manipulation.
*   **GeoJSON:** World map data sourced from [D3 Graph Gallery](https://github.com/holtzy/D3-graph-gallery).

## How It Works

1.  **Data:** We use a dataset of approximately 100 countries, prioritizing those with the highest annual birth counts. This data is enriched with Crude Birth Rates (CBR), Crude Death Rates (CDR), and Infant Mortality Rates (IMR).
2.  **Probability:** Each country is assigned probability weights for births and deaths based on their share of the global totals.
3.  **Timing:** The time between events is calculated using an exponential distribution (Poisson process), ensuring the randomness feels natural and mathematically accurate.
4.  **Visualization:** D3.js renders the world map and handles the DOM updates for the flashing effects.

## Running Locally

1.  Clone the repository:
    ```bash
    git clone https://github.com/beerbatteredbrad/birther.git
    cd birther
    ```
2.  Open `index.html` in your web browser.
    *   *Note:* Because the project loads a GeoJSON file from an external URL, you might need a local server to avoid CORS issues if you modify the data source.
    *   You can use Python's built-in server: `python -m http.server`
    *   Or VS Code's "Live Server" extension.

## Data Accuracy

The simulation uses 2023-2024 estimates for the top 18 most populous countries (sourced from CIA World Factbook and other demographic databases). For other countries, global averages are used to fill in missing rates (CBR, CDR, IMR) to ensure the simulation remains robust. While the relative scale is representative, specific real-time numbers are probabilistic simulations, not live reports.

## License

MIT
