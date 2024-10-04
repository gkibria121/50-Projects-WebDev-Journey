const API_TOKEN = "20d496eae0da7b88ed664d9c3e8c35ed"
const API_URL = `https://api.themoviedb.org/3`
const DESCOVER_URL = `${API_URL}/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&api_key=${API_TOKEN}`
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_URL =  `${API_URL}/search/movie?api_key=${API_TOKEN}`
const moviesContainer = document.querySelector('main')
const form = document.querySelector("form")
const search = document.getElementById('search')

getMovies(DESCOVER_URL)

form.addEventListener('submit',(e)=>{
    e.preventDefault(); 
    const searchEl = document.getElementById('search')
    const searchValue = searchEl.value;  
    const search = `${SEARCH_URL}&query="${searchValue}"`  
    getMovies(search)
    
    
})
async function  getMovies(URL){
    const rsp = await fetch(URL);
    const data = await rsp.json()  
    showMovies(data.results);
     
}

function trancate(text,limit=100){
    return text.length >limit  ? `${text.substring(0,limit)}. . .` : text;
}

function showMovies(movies){
    moviesContainer.innerHTML = '';
    movies.forEach((movie)=>{
         const movieEL = document.createElement('div')
         const {backdrop_path,original_title,overview,vote_average} = movie;
         movieEL.classList.add('movie')
         movieEL.innerHTML=`
          <img src="${IMG_PATH}${backdrop_path}" class="movie__img" alt="">
            <div class="movie__info">
                <h4 class="movie__name">${original_title}</h4>
                <span class="movie__rating  movie__rating--green">${vote_average}</span>
            </div>
            <div class="movie__overview">
                <h2 class="movie__overview-title">Overview</h2>
                <p> ${ trancate(overview)} </p>
            </div>`
            moviesContainer.appendChild(movieEL)
    })

}
