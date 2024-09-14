document.addEventListener('DOMContentLoaded', () => {
    const movieList = document.getElementById('movie-list');
    const form = document.getElementById('form');

    // Función para obtener películas desde la API
    function getMovies() {
        fetch('https://movie.azurewebsites.net/api/cartelera?title=&ubication=')
            .then(response => response.json())
            .then(data => {
                movieList.innerHTML = '';
                data.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('movie-card');
                    movieCard.innerHTML = `
                        <img src="${movie.Poster}" alt="${movie.Title}">
                        <h3>${movie.Title}</h3>
                        <p>${movie.description}</p>
                        <p><strong>Año:</strong> ${movie.Year}</p>
                        <p><strong>Género:</strong> ${movie.Type}</p>
                        <p><strong>Ubicación:</strong> ${movie.Ubication}</p>
                        <p><strong>Estado:</strong> ${movie.Estado ? 'Activo' : 'Inactivo'}</p>
                        <button onclick="deleteMovie('${movie.imdbID}')">Eliminar</button>
                    `;
                    movieList.appendChild(movieCard);
                });
            })
            .catch(error => console.error('Error fetching movies:', error));
    }

    // Función para añadir nueva película
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const newMovie = {
            imdbID: document.getElementById('imdbID').value,
            Title: document.getElementById('Title').value,
            Year: document.getElementById('Year').value,
            Type: document.getElementById('Type').value,
            Poster: document.getElementById('Poster').value,
            description: document.getElementById('description').value,
            Ubication: document.getElementById('Ubication').value
