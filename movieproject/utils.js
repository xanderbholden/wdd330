const API_KEY = 'b0cf86c33b5cf40aebd94b3ce2728dbb';
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch Genres
async function fetchGenres() {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    populateDropdown("genreSelect", data.genres, "id", "name");
}

// Fetch Production Companies
async function fetchCompanies() {
    const companies = [420, 25, 33, 2, 19551, 13252, 9993, 5, 174, 2986];
    for (let companyId of companies) {
        const response = await fetch(`${BASE_URL}/company/${companyId}?api_key=${API_KEY}`);
        const data = await response.json();
        let option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.name;
        document.getElementById("companySelect").appendChild(option);
    }
}

// Populate Decade Dropdown
function populateDecades() {
    const select = document.getElementById("yearSelect");
    for (let year = 1900; year <= 2025; year += 10) {
        let option = document.createElement("option");
        option.value = `${year}-${year + 9}`;
        option.textContent = `${year}s`;
        select.appendChild(option);
    }
}

// Populate Dropdown Helper Function
function populateDropdown(id, items, valueKey, textKey) {
    const select = document.getElementById(id);
    items.forEach(item => {
        let option = document.createElement("option");
        option.value = item[valueKey];
        option.textContent = item[textKey];
        select.appendChild(option);
    });
}

// Display Movie Results
function displayMovies(movies) {
    const results = document.getElementById("movieResults");
    results.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path || 'placeholder.jpg'}">
            <h3>${movie.title}</h3>
            <p>⭐ Rating: ${movie.vote_average}</p>
            <p>📅 Release: ${movie.release_date}</p>
            <p>📖 ${movie.overview}</p>
        </div>
    `).join('');
}
