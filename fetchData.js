
const PageDiv = document.querySelector(".container");
const BtnGoToPrivieusPage = document.querySelector(".btnBack")
const movie = JSON.parse(sessionStorage.getItem("movie")) 


BtnGoToPrivieusPage.addEventListener("click", ()=>{
    document.location.href = "index.html"
})


function displayPage() {

    let newDiv = document.createElement("div")
    newDiv.className = "sepecific__movieData"

     newDiv.innerHTML = `    
        <h2 class="specific__title">${movie.title}</h2>
        <h3>${movie.tagline}</h3>      
        <p class="specific__year">${movie.release_date.split("-").splice(0,1)}</p>
        <h4 class="specific__runtime">${movie.runtime} min </h4><h4>${movie.popularity}</h4>
        <h4 class="specific__genres" > genres </h4>
        <p class="overview">Director: Director Name</p>
        <p class="specific__overviewT">Overview</p>
        <p class="specific__overview">${movie.overview}</p>
`


PageDiv.append(newDiv)
}

function displayImg() {
    let newDiv = document.createElement("div")
    newDiv.className = "sepecific__movieImg"

    newDiv.style.backgroundImage =`url(https://image.tmdb.org/t/p/w500/${movie.poster_path})`
    //  newDiv.innerHTML = `    
    // <img class="sepecific__Img" src="" alt="Movie Poster">
    //     `


PageDiv.append(newDiv)
}

displayPage()
displayImg()