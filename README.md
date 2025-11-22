# Global Birth Rate Simulation

A real-time visualization of global birth rates using D3.js. This project simulates births across the top 100 countries based on annual birth statistics, providing a visceral sense of population growth.

## Features

*   **Real-time Simulation:** Uses a Poisson process to simulate random birth events based on real-world probabilities.
*   **Interactive Map:** 
    *   Countries light up in neon pink when a birth occurs.
    *   **Hover Tooltips:** See detailed stats (Annual Births, Births Per Minute) for each country.
*   **Live Tally:** Tracks the number of simulated births per country in the current session.
*   **Simulation Controls:** 
    *   **Speed Slider:** Accelerate time from 1x up to 500x to visualize patterns more quickly.
*   **Responsive Design:** Works on various screen sizes with a modern dark theme.

## How It Works

1.  **Data:** We use a dataset of the top 100 countries by annual birth count.
2.  **Probability:** Each country is assigned a probability weight based on its share of the total births.
3.  **Timing:** The time between births is calculated using an exponential distribution (Poisson process), ensuring the randomness feels natural.
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

The simulation uses approximate annual birth figures. While the relative scale between countries is generally representative, specific numbers may vary from the most recent census data.

## License

MIT
