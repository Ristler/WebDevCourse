
const movies = [];
let list = document.querySelector("#movies");

function movieApp() {
    let amount = parseInt(prompt("How many movies do you want to rate?"));

    while(amount) {
    amount--;

    const movieName = prompt("Movie name");
    let rating = parseInt(prompt("Rate movie " + movieName + "."));

    if(rating > 5) {
        rating = 5;
    }

    let movie = {
        name:movieName,
        rating:rating
    }
    movies.push(movie);
    }
    movies.sort((a,b) => b.rating-a.rating);

    for(let i = 0; i < movies.length; i++) {
        const movie = document.createElement("li");
        movie.textContent = movies[i].name + ": " + movies[i].rating;
        list.appendChild(movie);
    }
}
movieApp();