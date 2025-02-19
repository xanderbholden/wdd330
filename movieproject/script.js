const TMDB_API_KEY = 'b0cf86c33b5cf40aebd94b3ce2728dbb';
const movieListDiv = document.getElementById('movieList');
const getMovieBtn = document.getElementById('get-movie-btn');
const luckyBtn = document.getElementById('feeling-lucky-btn');
const closeListBtn = document.getElementById('close-list-btn');

const genreMap = {
    action: 28,
    comedy: 35,
    drama: 18,
    horror: 27,
    romance: 10749,
    adventure: 12,
    fantasy: 14,
    thriller: 53,
    documentary: 99, 
    animation: 16,
    mystery: 9648,
    family: 10751,
    music: 10402,
    sciFi: 878, 
    actionComedy: 10749, 
    psychological: 53,
    crime: 80, 
    historical: 36 
};

const subjectMap = {
    cars: [28, 12],            
    guns: [28, 53],            
    war: [10752, 28],          
    space: [878, 12],          
    spy: [53, 28],             
    zombies: [27],             
    history: [36, 99],         
    superheroes: [878],        
    animals: [10751],          
    pirates: [12, 28],         
    sports: [10751],           
    love: [10749],             
    magic: [14, 12],           
    vampires: [27],            
    aliens: [878],             
    robots: [878, 28],         
    horror: [27],              
    comedy: [35],              
    drama: [18],               
    mystery: [9648],           
    thriller: [53],            
    fantasy: [14],             
    crime: [80],               
    animation: [16],           
    biography: [36],           
    music: [10402],            
    adventure: [12],           
    documentary: [99],         
    warriors: [28],            
    espionage: [53],           
    survival: [28, 53],        
    murder: [80, 53],          
};

// Handle "Get Movie Suggestions" button
getMovieBtn.addEventListener('click', () => {
    const productionCompany = document.getElementById('productionCompany').value;
    const genre = document.getElementById('genre').value;
    const subject = document.getElementById('subject').value;

    console.log('Get Movie Button Clicked');
    console.log(`User Selection - Production Company: ${productionCompany}, Genre: ${genre}, Subject: ${subject}`);

    if (!productionCompany && !genre && !subject) {
        alert('Please make sure to select at least one filter!');
        return;
    }

    // Fetch movies based on the selection
    fetchMovies(productionCompany, genre, subject);
});

luckyBtn.addEventListener('click', () => {
    const productionCompany = document.getElementById('productionCompany').value;
    const genre = document.getElementById('genre').value;
    const subject = document.getElementById('subject').value;

    console.log('Feeling Lucky Button Clicked');
    console.log(`User Selection for Lucky - Production Company: ${productionCompany}, Genre: ${genre}, Subject: ${subject}`);

    if (!productionCompany && !genre && !subject) {
        alert('Please make sure to select at least one filter!');
        return;
    }

    // Call the fetchRandomMovie function to fetch a random movie based on the user's selection
    fetchRandomMovie(productionCompany, genre, subject);
});

// Close Button logic
closeListBtn.addEventListener('click', () => {
    movieListDiv.innerHTML = '';  // Clear the movie list
    closeListBtn.style.display = 'none';  // Hide the Close Button
});

// Fetch Movies with selected filters
function fetchMovies(productionCompany, genre, subject) {
    const randomPage = Math.floor(Math.random() * 5) + 1; // Random page (1-5)
    const randomSortBy = Math.random() < 0.5 ? 'popularity.desc' : 'top_rated'; // Random sort by

    // Prepare genre and subject filters
    let selectedGenres = [];
    let selectedSubjects = [];

    if (genre && genre !== 'None') {
        selectedGenres = genreMap[genre];
    }
    if (subject && subject !== 'None') {
        selectedSubjects = subjectMap[subject];
    }

    // Combine selected genre and subject filters
    const selectedFilters = [...selectedGenres, ...selectedSubjects];

    // Debugging: Log the filters to ensure we're sending the right ones
    console.log('Selected Filters:', selectedFilters);
    console.log('Selected Production Company:', productionCompany);

    // Start building the API URL
    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=${randomSortBy}&page=${randomPage}`;

    // Add genre and subject filters to the URL if selected
    if (selectedFilters.length > 0) {
        apiUrl += `&with_genres=${selectedFilters.join(',')}`;
    }

    // Add production company filter if selected
    if (productionCompany && productionCompany !== 'None') {
        apiUrl += `&with_companies=${productionCompany}`;
    }

    // Log the final API URL to help with debugging
    console.log('Final API URL:', apiUrl);

    // Make the API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('API Response Data:', data);
            if (data.results) {
                displayMovies(data.results);
            } else {
                alert('No movies found with the selected filters.');
            }
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Fetch Random Movie with selected filters
function fetchRandomMovie(productionCompany, genre, subject) {
    const randomPage = Math.floor(Math.random() * 5) + 1;
    const randomSortBy = Math.random() < 0.5 ? 'popularity.desc' : 'top_rated';

    let selectedGenres = [];
    let selectedSubjects = [];

    if (genre && genre !== 'None') {
        selectedGenres = genreMap[genre];
    }
    if (subject && subject !== 'None') {
        selectedSubjects = subjectMap[subject];
    }

    const selectedFilters = [...selectedGenres, ...selectedSubjects];

    // Debugging: Log the filters to ensure we're sending the right ones
    console.log('Selected Filters for Random Movie:', selectedFilters);
    console.log('Selected Production Company for Random Movie:', productionCompany);

    let apiUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=${randomSortBy}&page=${randomPage}`;

    if (selectedFilters.length > 0) {
        apiUrl += `&with_genres=${selectedFilters.join(',')}`;
    }

    if (productionCompany && productionCompany !== 'None') {
        apiUrl += `&with_companies=${productionCompany}`;
    }

    console.log('Final API URL for Random Movie:', apiUrl);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
            displayMovies([randomMovie]);
        })
        .catch(error => {
            console.error('Error fetching movies:', error);
        });
}

// Display movies on the page
function displayMovies(movies) {
    movieListDiv.innerHTML = '';  // Clear previous movies
    if (movies.length === 0) {
        movieListDiv.innerHTML = '<p>No movies found with the selected criteria.</p>';
    }
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie-card');
        movieDiv.innerHTML = `
            <h3>${movie.title}</h3>
            <img src="https://image.tmdb.org/t/p/w200${movie.poster_path}" alt="${movie.title}">
            <p>${movie.overview}</p>
            <p><strong>Rating:</strong> ${movie.vote_average}</p>
        `;
        movieListDiv.appendChild(movieDiv);
    });

    closeListBtn.style.display = 'block';  // Show the Close Button
}
