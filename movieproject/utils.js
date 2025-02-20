const API_KEY = 'b0cf86c33b5cf40aebd94b3ce2728dbb';
const BASE_URL = "https://api.themoviedb.org/3";

document.addEventListener("DOMContentLoaded", () => {
    console.log("utils.js is loaded!");

    const goBackButton = document.getElementById("goBackButton");
    if (goBackButton) {
        goBackButton.addEventListener("click", () => {
            console.log("Going back to the previous page...");
            window.history.back();
        });
    } else {
        console.error("Go Back button not found!");
    }

    // Attach event listener to Find Movie button
    const findMovieBtn = document.getElementById("findMovieBtn");
    if (findMovieBtn) {
        findMovieBtn.addEventListener("click", fetchMovies);
    }
});

// Fetch Movies based on filters
async function fetchMovies() {
    const genre = document.getElementById("genreSelect")?.value || "";
    const production = document.getElementById("companySelect")?.value || "";
    const decade = document.getElementById("yearSelect")?.value || "";

    let apiUrl = `${BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

    if (genre) apiUrl += `&with_genres=${genre}`;
    if (production) apiUrl += `&with_companies=${production}`;
    if (decade) {
        const [startYear, endYear] = decade.split("-");
        apiUrl += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.results.length === 0) {
            alert("No movies found. Try different filters.");
            return;
        }

        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Display only 6 random movies at a time
function displayMovies(movies) {
    const results = document.getElementById("movieResults");
    results.innerHTML = ""; // Clear previous results

    // Shuffle movies and pick 6 random ones
    const randomMovies = movies.sort(() => 0.5 - Math.random()).slice(0, 6);

    randomMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");

        movieCard.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path || 'placeholder.jpg'}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>⭐ Rating: ${movie.vote_average}</p>
            <p>📅 Release: ${movie.release_date}</p>
            <p>📖 ${movie.overview.length > 100 ? movie.overview.substring(0, 100) + "..." : movie.overview}</p>
        `;

        results.appendChild(movieCard);
    });
}

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

// Clear results when needed
function clearResults() {
    const movieResults = document.getElementById("movieResults");
    if (movieResults) {
        movieResults.innerHTML = "";
    } else {
        console.error("Element #movieResults not found.");
    }
}

// Navigate to another page
function navigateTo(page) {
    window.location.href = page;
}
