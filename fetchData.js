
const PageDiv = document.querySelector(".container");
const BtnGoToPrivieusPage = document.querySelector(".btnBack")
const movie = JSON.parse(sessionStorage.getItem("movie")) 

BtnGoToPrivieusPage.addEventListener("click", ()=>{
    document.location.href = "index.html"
})
function displayPage() {

    let newDiv = document.createElement("div")
    newDiv.className = "sepecific__movie"

     newDiv.innerHTML = `    
<div class="container">
<div class="movie-info">
    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="Movie Poster">
    <div class="details">
        <h2>${movie.title}</h2>
        <p>Release Year:${movie.release_date.split("-").splice(0,1)}</p>
        <p>Director: Director Name</p>
        <p>Genre: Genre</p>
        <p>Plot:${movie.overview} Movie Plot</p>
    </div>
</div>
</div>`
PageDiv.append(newDiv)
}

displayPage()