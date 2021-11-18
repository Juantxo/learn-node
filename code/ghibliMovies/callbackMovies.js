const request = require('request');
const fs = require('fs');

request('https://ghibliapi.herokuapp.com/films', (error, response, body) => {
    if (error) {
        console.error(`Could not send request to API: ${error.message}`);
        return;
    }
    if (response.statusCode != 200) {
        console.error(`Expected status`);
        return;
    }
    console.log('Processing our list of movies');
    let movieList = '';
    let movies = JSON.parse(body);

    movies.forEach(movie => {
        console.log(`${movie['title']}, ${movie['release_date']}`);
        movieList += `${movie['title']}, ${movie['release_date']}\n`;
    });

    fs.writeFile('callbackMovies.csv', movieList, (error) => {
        if (error) {
            console.error(`Could not save the Ghibli movies to a file: ${error.message}`);
            return;
        }
        console.log('Saved our list of movies to callbackMovies.csv');
    });
});
