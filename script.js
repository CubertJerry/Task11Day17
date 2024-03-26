//JS
document.addEventListener("DOMContentLoaded", function() {
    // Fetching rest countries data
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        data.forEach(country => {
          // Creating card element
          const card = document.createElement('div');
          card.classList.add('col-lg-4', 'col-sm-12');
  
          // Creating card header
          const cardHeader = document.createElement('div');
          cardHeader.classList.add('card-header');
          cardHeader.textContent = country.name.common;
  
          // Creating card body
          const cardBody = document.createElement('div');
          cardBody.classList.add('card-body');
  
          // Adding country details to card body
          const capital = document.createElement('p');
          capital.textContent = `Capital: ${country.capital}`;
          cardBody.appendChild(capital);
  
          const region = document.createElement('p');
          region.textContent = `Region: ${country.region}`;
          cardBody.appendChild(region);
  
          const latlng = document.createElement('p');
          latlng.textContent = `Latlng: [${country.latlng.join(', ')}]`;
          cardBody.appendChild(latlng);
  
          const flag = document.createElement('img');
          flag.classList.add('card-img-top');
          flag.src = country.flags.png;
          flag.alt = country.name.common + ' Flag';
          cardBody.appendChild(flag);
  
          const countryCode = document.createElement('p');
          countryCode.textContent = `Country Code: ${country.cca2}`;
          cardBody.appendChild(countryCode);
  
          // Creating button
          const button = document.createElement('button');
          button.classList.add('btn', 'btn-primary');
          button.textContent = 'Get Weather';
          button.addEventListener('click', function() {
            getWeather(country.latlng, country.cca2);
          });
          cardBody.appendChild(button);
  
          // Appending header and body to card
          card.appendChild(cardHeader);
          card.appendChild(cardBody);
  
          // Appending card to country row
          document.getElementById('countryRow').appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching rest countries data:', error));
  
    // Function to fetch weather data
    function getWeather(latlng, countryCode) {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${apiKey}`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          // Display weather data in console for now
          console.log('Weather for ' + countryCode + ':', data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
    }
  });