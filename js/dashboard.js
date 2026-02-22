const moviecontainer = document.querySelector('.moviecontainer');
const popularcontainer = document.querySelector('#popularMoviesContainer');
const topratedcontainer = document.querySelector('#TopratedMoviesContainer');
const upcomingcontainer = document.querySelector('#UpcomingMoviesContainer');
const trendingDayBtn = document.querySelector('#trendingDay');
const trendingWeekBtn = document.querySelector('#trendingWeek');
const popularStreamingBtn = document.querySelector('#popularStreaming');
const popularOnTvBtn = document.querySelector('#popularOnTv');
const popularForRentBtn = document.querySelector('#popularForRent');
const popularInTheatersBtn = document.querySelector('#popularInTheaters');
const topratedMoviesBtn = document.querySelector('#toprated-movies');
const topratedTvBtn = document.querySelector('#toprated-tv');
const searchboxinput = document.querySelector('.search-boxinput');
const searchbtn = document.querySelector('.searchbtn');
const images = document.querySelectorAll(".slider img");
let currentIndex = 0;
setInterval(() => {
    images[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add("active");
}, 5000);

const API_KEY = 'b1bbbc80a37c2eb97c159a9352840008';
const BASE_URL = 'https://api.themoviedb.org/3';
let trendingTimeWindow = 'day';
let streamingType = 'streaming';
let topratedType = 'movie';

let trendingMovies = [];
let popularMovies = [];
let selectedMovies = [];
let topratedMovies = [];
let upcomingMovies = [];
let searchResults = [];

searchbtn.addEventListener("click", () => {
    const query = searchboxinput.value.trim();
    if (!query) return;

    window.location.href = `search.html?q=${encodeURIComponent(query)}`; // encode used to handle special characters
    searchboxinput.value = "";
});
searchboxinput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { 
        const query = searchboxinput.value.trim();
        if (!query) return;

        window.location.href = `search.html?q=${encodeURIComponent(query)}`;
        searchboxinput.value = "";
    }
});


async function fetchTrending(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/trending/movie/${trendingTimeWindow}?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        trendingMovies = data.results;
        console.log(trendingMovies);
        displayMovies(trendingMovies, moviecontainer, "trending");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

trendingDayBtn.addEventListener("click", () => {
    if (trendingTimeWindow === "day") return;
    trendingTimeWindow = "day";
    trendingDayBtn.classList.add("active");
    trendingWeekBtn.classList.remove("active");
    changeTrendingSmooth();
});

trendingWeekBtn.addEventListener("click", () => {
    if (trendingTimeWindow === "week") return;
    trendingTimeWindow = "week";
    trendingWeekBtn.classList.add("active");
    trendingDayBtn.classList.remove("active");
    changeTrendingSmooth();
});

async function changeTrendingSmooth() {
    moviecontainer.classList.add("fade-out");
    await wait(450);
    await fetchTrending();
    moviecontainer.classList.remove("fade-out");
    moviecontainer.classList.add("fade-in");
    setTimeout(() => {
        moviecontainer.classList.remove("fade-in");
    }, 400);
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchPopular(page = 1) {
    let url = "";

    switch (streamingType) {
        case "streaming":
            url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
            break;

        case "onTV":
            url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`;
            break;

        case "forRent":
            url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_watch_monetization_types=rent&page=${page}`;
            break;

        case "inTheaters":
            url = `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=${page}`;
            break;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();
        popularMovies = data.results;
        displayMovies(popularMovies, popularcontainer, "popular");
    } catch (error) {
        console.error(error);
    }
}


popularStreamingBtn.addEventListener("click", () => {
    if (streamingType === "streaming") return;
    streamingType = "streaming";
    popularStreamingBtn.classList.add("active");
    popularOnTvBtn.classList.remove("active");
    popularForRentBtn.classList.remove("active");
    popularInTheatersBtn.classList.remove("active");
    changePopularSmooth();
});
popularOnTvBtn.addEventListener("click", () => {
    if (streamingType === "onTV") return;
    streamingType = "onTV";
    popularOnTvBtn.classList.add("active");
    popularStreamingBtn.classList.remove("active");
    popularForRentBtn.classList.remove("active");
    popularInTheatersBtn.classList.remove("active");
    changePopularSmooth();
});
popularForRentBtn.addEventListener("click", () => {
    if (streamingType === "forRent") return;
    streamingType = "forRent";
    popularForRentBtn.classList.add("active");
    popularStreamingBtn.classList.remove("active");
    popularOnTvBtn.classList.remove("active");
    popularInTheatersBtn.classList.remove("active");
    changePopularSmooth();
});
popularInTheatersBtn.addEventListener("click", () => {
    if (streamingType === "inTheaters") return;
    streamingType = "inTheaters";
    popularInTheatersBtn.classList.add("active");
    popularStreamingBtn.classList.remove("active");
    popularOnTvBtn.classList.remove("active");
    popularForRentBtn.classList.remove("active");
    changePopularSmooth();
});

async function changePopularSmooth() {
    popularcontainer.classList.add("fade-out");
    await wait(450);
    await fetchPopular();
    popularcontainer.classList.remove("fade-out");
    popularcontainer.classList.add("fade-in");
    setTimeout(() => {
        popularcontainer.classList.remove("fade-in");
    }, 400);
}


async function fetchTopRated(page = 1) {
    const url =
        topratedType === "movie"
            ? `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`
            : `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=en-US&page=${page}`;

    const res = await fetch(url);
    const data = await res.json();

    topratedMovies = data.results;
    displayMovies(topratedMovies, topratedcontainer, "toprated");
}

topratedMoviesBtn.addEventListener("click", () => {
    if (topratedType === "movie") return;
    topratedType = "movie";
    topratedMoviesBtn.classList.add("active");
    topratedTvBtn.classList.remove("active");
    changeTopRatedSmooth();
});
topratedTvBtn.addEventListener("click", () => {
    if (topratedType === "tv") return;
    topratedType = "tv";
    topratedTvBtn.classList.add("active");
    topratedMoviesBtn.classList.remove("active");
    changeTopRatedSmooth();
});

async function changeTopRatedSmooth() {
    topratedcontainer.classList.add("fade-out");
    await wait(450);
    await fetchTopRated();
    topratedcontainer.classList.remove("fade-out");
    topratedcontainer.classList.add("fade-in");
    setTimeout(() => {
        topratedcontainer.classList.remove("fade-in");
    }, 400);
}



async function fetchUpcoming(page = 1) {
    try {
        const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${page}`);
        const data = await response.json();
        upcomingMovies = data.results;
        console.log(upcomingMovies);
        displayMovies(upcomingMovies, upcomingcontainer, "upcoming");
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function displayMovies(items, container, category) {
    container.innerHTML = '';
    items.forEach(movie => {
        container.innerHTML += `
         <div onclick="selectMovie(${movie.id})" class="moviecards">
                <div class="movie-poster">
                    <img src="https://image.tmdb.org/t/p/w300/${movie.poster_path}" alt="${movie.title}" />
                </div>
                <div class="movie-info">
                    <h3 class="movie-title">
                    ${movie.title || movie.name}
                    </h3>
                    <p class="movie-release">📅${formatDate(movie.release_date) || movie.first_air_date}</p>
                </div>
            </div>
            
        `;
    });
    container.innerHTML += `
        <div class="view-all-wrapper">
            <button class="view-all-btn" onclick="viewAll('${category}')">
                View All →
            </button>
        </div>
    `;
}

function formatDate(dateStr) {
    if (!dateStr) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
}

function viewAll(category) {
    window.location.href = `viewall.html?category=${category}`;
}

function selectMovie(id) {
    const movie = trendingMovies.find(m => m.id === id) || popularMovies.find(m => m.id === id) || topratedMovies.find(m => m.id === id) || upcomingMovies.find(m => m.id === id);
    const isAlreadySelected = selectedMovies.find(m => m.id === id);
    if (!isAlreadySelected) {
        selectedMovies.push(movie);
        console.log('Selected Movies:', selectedMovies);
        localStorage.setItem("selectedMovie", JSON.stringify(movie));
        window.location.href = `moviedetail.html?id=${id}`;
    }
}






fetchTrending();
fetchPopular();
fetchTopRated();
fetchUpcoming();