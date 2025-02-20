console.log("adults.js is loaded!")
document.addEventListener("DOMContentLoaded", () => {
    fetchGenres();
    fetchCompanies();
    populateDecades();
    loadPreferences();
    
    document.querySelector("button[onclick='findMovie()']").addEventListener("click", savePreferences);
});

// Fetch movies based on selected filters
async function findMovie() {
    const genre = document.getElementById("genreSelect").value;
    const company = document.getElementById("companySelect").value;
    const decade = document.getElementById("yearSelect").value;
    
    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`;

    if (genre) url += `&with_genres=${genre}`;
    if (company) url += `&with_companies=${company}`;
    if (decade) {
        const [startYear, endYear] = decade.split("-");
        url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    displayMovies(data.results);
}

// "Feeling Lucky" - Random movie with error handling
async function feelingLucky() {
    let page;
    let data;

    do {
        page = Math.floor(Math.random() * 100) + 1;
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
        const response = await fetch(url);
        data = await response.json();
    } while (data.results.length === 0); // Retry if no results

    const randomIndex = Math.floor(Math.random() * data.results.length);
    displayMovies([data.results[randomIndex]]);
}
console.log("adults.js loaded");