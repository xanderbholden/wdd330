// OMDb API Key
const omdbApiKey = 'YOUR_OMDB_API_KEY';  // Replace with your OMDb API key
const tmdbApiKey = 'YOUR_TMDB_API_KEY';  // Replace with your TMDb API key

// Function to search for a movie using OMDb API
function searchMovie() {
    const movieName = document.getElementById('movieSearch').value;
    if (movieName.trim() === '') {
        alert('Please enter a movie name');
        return;
    }

    // Fetch movie data from OMDb API
    fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${omdbApiKey}`)
        .then(response => response.json())
        .then(movieData => {
            if (movieData.Response === "True") {
                // Display movie details from OMDb API
                displayMovieDetails(movieData);
                // Fetch additional details (like images or trailers) from TMDb API
                fetchTmdbData(movieData.Title);
            } else {
                document.getElementById('movieDetails').innerHTML = `<p>Movie not found. Please try again.</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching data from OMDb API:', error);
            alert('Failed to retrieve movie data. Please try again later.');
        });
}

// Function to display movie details from OMDb API
function displayMovieDetails(movie) {
    const movieDetailsDiv = document.getElementById('movieDetails');
    movieDetailsDiv.innerHTML = `
        <h3>${movie.Title} (${movie.Year})</h3>
        <p>Genre: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
        <p>Plot: ${movie.Plot}</p>
        <img src="${movie.Poster}" alt="Poster" style="width: 200px;">
        <button class="button" onclick="addToWatchlist('${movie.Title}')">Add to Watchlist</button>
    `;
}

// Function to fetch additional details (like trailers or images) from TMDb API
function fetchTmdbData(movieName) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.results && data.results.length > 0) {
                const movieTmdb = data.results[0];
                displayTmdbDetails(movieTmdb);
            }
        })
        .catch(error => {
            console.error('Error fetching data from TMDb API:', error);
        });
}

// Function to display TMDb additional details (e.g., trailer, images)
function displayTmdbDetails(movie) {
    const tmdbDetailsDiv = document.getElementById('tmdbDetails');
    tmdbDetailsDiv.innerHTML = `
        <h4>Additional Information (TMDb):</h4>
        <p>Overview: ${movie.overview}</p>
        <p>Rating: ${movie.vote_average}/10</p>
        <p>Release Date: ${movie.release_date}</p>
        <p>Popularity: ${movie.popularity}</p>
        <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="TMDb Poster" style="width: 200px;">
    `;
}

// Function to add movie to the Watchlist
function addToWatchlist(movieName) {
    const watchlistUl = document.getElementById('watchlist');
    const watchlistItem = document.createElement('li');
    watchlistItem.textContent = movieName;
    watchlistUl.appendChild(watchlistItem);
}
