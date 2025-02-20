document.addEventListener("DOMContentLoaded", () => {
    fetchGenres();
    fetchCompanies();
    loadPreferences();

    document.querySelector("button[onclick='findMovie()']").addEventListener("click", savePreferences);
});

// Fetch kid-friendly movies based on selections
async function findMovie() {
    const genre = document.getElementById("genreSelect").value;
    const company = document.getElementById("companySelect").value;
    const ageCategory = document.getElementById("ageSelect").value;

    let url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&certification_country=US&certification.lte=PG`;

    if (genre) url += `&with_genres=${genre}`;
    if (company) url += `&with_companies=${company}`;
    if (ageCategory) {
        const [startYear, endYear] = ageCategory.split("-");
        url += `&primary_release_date.gte=${startYear}-01-01&primary_release_date.lte=${endYear}-12-31`;
    }

    const response = await fetch(url);
    const data = await response.json();
    
    displayMovies(data.results);
}

// "Feeling Lucky" - Random Kid-Friendly Movie
async function feelingLucky() {
    let page;
    let data;

    do {
        page = Math.floor(Math.random() * 100) + 1;
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&certification_country=US&certification.lte=PG`;
        const response = await fetch(url);
        data = await response.json();
    } while (!data.results || data.results.length === 0);

    const randomIndex = Math.floor(Math.random() * data.results.length);
    displayMovies([data.results[randomIndex]]);
}
