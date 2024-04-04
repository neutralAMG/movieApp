


let operation = {
    add: "up",
    sustract: "down",
    none: "none"
    }


let url = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=`

let movies = []

const btnBack = document.querySelector(".page__back")
const PageCounter = document.querySelector(".page__counter")
PageCounter.innerHTML = UpdateCounter(operation.none)
const btnFoward = document.querySelector(".page__foward")

let apiKey = 'Your api key here'

const mainDiv = document.querySelector(".body__movieCards")
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: apiKey
    }
  };

async function fetchData(counter) {
const responde = await fetch (url + counter, options)
if (!responde.ok) {
    const errorMessage = "Error fecthing data form the api"
    throw Error(errorMessage)
}
const data = await responde.json()

 return data
}



// TODO: make sure that when we comback to this page we have the same data that when we left
fetchData(UpdateCounter(operation.none)).then( data => {
    
    // console.log(counter);
    RenderPage(data.results.length > 0? data.results : []) 

}
);

function RenderPage(data) {
    let catchData = JSON.parse(sessionStorage.getItem("Page")) 
    movies = []
    
    if(!data || data.length === 0) return console.log("Datos no recividos")

    if (!catchData) {
        sessionStorage.setItem("Page", JSON.stringify(data))
        movies = data
        makeMovieCards(movies)
     return
    }
    sessionStorage.setItem("Page", JSON.stringify(data))
     movies = JSON.parse(sessionStorage.getItem("Page")) 
     makeMovieCards(movies)
    
    
    console.log(data)
}

function makeMovieCards(data) {
    mainDiv.innerHTML ="";

    for (let movie of data){
        //let movie = data[0]
        //console.log(movie)
        let div = document.createElement("div")
        div.className = "card"
        div.addEventListener("click", ()=>{
            fetch('https://api.themoviedb.org/3/movie/' + movie.id, options)
            .then(response => response.json())
            .then(data => {
                changePage(data)
            } )
            .catch(err => console.error(err));
            //console.log(movie);
            
        })
        div.innerHTML = `
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path} class="card__img" alt="Image of the movie ${movie.title}">
        <p class"card__rating"> ${movie.vote_average}</p>
        <h4 class"card__title"> ${movie.title}</h4>

        `

        
        mainDiv.append(div) 
        
        
   }
}

btnBack.addEventListener("click", () => {
    let counter = UpdateCounter(operation.sustract);
    // counter--
    PageCounter.innerHTML = counter
    fetchData(counter).then(data => {
        console.log(data)
        RenderPage(data.results)})
} )

btnFoward.addEventListener("click", ()=>{
    // counter++
    let counter = UpdateCounter(operation.add);
    PageCounter.innerHTML = counter
    fetchData(counter).then(data => {
        console.log(data)
        RenderPage(data.results)})
} )


function changePage(movie) {
    if (sessionStorage.getItem("movie")) {
        // If yes, remove it
        sessionStorage.removeItem("movie");
    }
    sessionStorage.setItem("movie", JSON.stringify(movie));
    document.location.href = "index2.html"
}

function UpdateCounter(operation) {
    let counterGetter = sessionStorage.getItem("counter");
    let counter = counterGetter ? parseInt(counterGetter) : 1;

    if(operation === "up") counter++
    if(operation === "down" && counter > 1) counter--
    
    sessionStorage.setItem("counter", JSON.stringify(counter));
   return parseInt(sessionStorage.getItem("counter"))
}