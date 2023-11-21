 async function showEarthquakeResults() {
      const north = document.getElementById('northInput').value;
      const south = document.getElementById('southInput').value;
      const east = document.getElementById('eastInput').value;
      const west = document.getElementById('westInput').value;

      const url = `http://api.geonames.org/earthquakesJSON?north=${north}&south=${south}&east=${east}&west=${west}&username=simban6`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const resultBox = document.getElementById('resultBox');
        resultBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async function showStreetResults() {
      const streetName = document.getElementById('streetInput').value;

      const url = `http://api.geonames.org/streetNameLookupJSON?q=${streetName}&username=simban6`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const resultBox = document.getElementById('resultBox');
        resultBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    async function showCountryResults() {
      const country = document.getElementById('countryInput').value;

      const url = `http://api.geonames.org/countryInfoJSON?country=${country}&username=simban6`;

      try {
        const response = await fetch(url);
        const data = await response.json();

        const resultBox = document.getElementById('resultBox');
        resultBox.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }


 