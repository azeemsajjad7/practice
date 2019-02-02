//     const url = `http://www.omdbapi.com/?apikey=f3110b4b&s=${movieInput}`

$(document).ready(function () {
    $('#searchBtn').on('click', function (event) {
        let searchText = $('#searchText').val()
        getMovies(searchText)
        event.preventDefault()
    })
})



$(document).ready(function () {
    $('#searchForm').on('submit', function (event) {
        let searchText = $('#searchText').val()
        getMovies(searchText)
        event.preventDefault()
    })
})


//getMovies function

function getMovies(searchText) {
    axios.get(`http://www.omdbapi.com/?apikey=f3110b4b&s=${searchText}`)
        .then(function (response) {
            let movies = response.data.Search
            let output = ''
            $.each(movies, function (index, movie) {
                output += `
                    <div class="col-md-3">
                        <div class="well text-center">
                            <img src="${movie.Poster}">
                            <h5 id="movieTilte">${movie.Title} (${movie.Year})</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>   
                        </div>
                    </div>
                `
            })
            $('#movies').html(output)
        })
        .catch(function (err) {
            console.log(err)
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id)
    window.location = 'movie.html'
    return flase
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId')


    axios.get(`http://www.omdbapi.com/?apikey=f3110b4b&i=${movieId}`)
        .then(function (response) {
            console.log(response)
            let movie = response.data
            let output = `
            <div class="row">
                <div class="col-md-4">
                    <img src="${movie.Poster}" class="thumbnail">
                </div>
                <div class="col-md-8">
                    <h2>${movie.Title} (${movie.Year})</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre : </strong>${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released : </strong>${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated : </strong>${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDb Rating : </strong>${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director : </strong>${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer : </strong>${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors : </strong>${movie.Actors}</li>
                            <li class="list-group-item"><strong>Runtime : </strong>${movie.Runtime}</li>
                            <li class="list-group-item"><strong>Language : </strong>${movie.Language}</li>
                            <li class="list-group-item"><strong>Awards : </strong>${movie.Awards}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        <p id="moviePlot">${movie.Plot}</p>                        
                        <hr>
                        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" id="imdbBtn" class="btn btn-primary">View IMDb</a>
                        <a href="index.html" id="goBackBtn" class="btn btn-primary">Go back to Search</a>                        
                    </div>                    
                </div>                
            `
            $('#movie').html(output)
        })
        .catch(function (err) {
            console.log(err)
        })
}