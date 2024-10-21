document.addEventListener('DOMContentLoaded', () => {
    const apiKey = '4b2a7b6025d65c316a811c61861893b5';  // Tu API Key
    const climaDiv = document.getElementById('clima'); // Elemento donde se mostrará el clima
    const botonConsultar = document.getElementById('consultar'); // Botón para consultar

    botonConsultar.addEventListener('click', () => { // Evento de clic en el botón
      const ciudad = document.getElementById('ciudad').value; // Obtiene el valor de la ciudad
      if (!ciudad) { // Verifica si se ingresó una ciudad
        climaDiv.innerHTML = '<p>Por favor, ingresa una ciudad.</p>'; // Mensaje de error
        return; // Termina la función si no hay ciudad
    }

      // URL de la API para obtener el clima
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

      fetch(url) // Realiza la solicitud a la API
        .then(response => {
          if (!response.ok) { // Verifica si la respuesta es correcta
            throw new Error('Ciudad no encontrada'); // Lanza un error si la ciudad no existe
        }
          return response.json(); // Convierte la respuesta en JSON
        })
        .then(data => {
          // Extrae la temperatura, descripción, y nombre de la ciudad del JSON
        const temperatura = data.main.temp;
        const descripcion = data.weather[0].description;
        const nombreCiudad = data.name;
          const icono = data.weather[0].icon; // Código del ícono

          // URL del ícono de clima
        const iconoUrl = `https://openweathermap.org/img/wn/${icono}@2x.png`;

          // Muestra el clima, el ícono y la descripción en el HTML
        climaDiv.innerHTML = `
            <p>El clima en <strong>${nombreCiudad}</strong> es de <strong>${temperatura}°C</strong>.</p>
            <img src="${iconoUrl}" alt="${descripcion}">
            <div class="descripcion">${descripcion.charAt(0).toUpperCase() + descripcion.slice(1)}</div>
        `;
        })
        .catch(error => {
        climaDiv.innerHTML = '<p>Hubo un problema al obtener los datos del clima. Verifica la ciudad ingresada.</p>';
          console.error('Error:', error); // Muestra el error en la consola
        });
    });
});
