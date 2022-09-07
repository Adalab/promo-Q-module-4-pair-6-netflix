const express = require('express');
const cors = require('cors');
const listMovies = require('./data/movies.json');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});

// create endpoint

server.get('/movies', (req, resp) => {
  const genderFilterParam = req.query.gender;
  const filteredList = listMovies.filter((movie) => {
    console.log(movie.gender, 'género');
    if (genderFilterParam === 'all') {
      return true;
    } else {
      return movie.gender === genderFilterParam;
    }
  });

  console.log(filteredList, 'lista filtrada');

  const orderedList = filteredList.sort((a, b) => a.name.localeCompare(b.name));

  console.log(orderedList, 'lista ordenada');

  resp.json({
    success: true,
    movies: orderedList,
  });
});

// motor de plantillas

server.set('view engine', 'ejs');

// Endpoint id película

server.get('/movie/:movieId', (req, res) => {
  console.log(req.params);

  const foundMovie = listMovies.find(
    (movie) => movie.id === req.params.movieId
  );

  console.log(foundMovie);

  res.render('movie', foundMovie);
});

// En esta carpeta ponemos los ficheros estáticos
const staticServerPathWeb = './src/public-react';
server.use(express.static(staticServerPathWeb));

const staticServerPhotos = './src/public-movies-images';
server.use(express.static(staticServerPhotos));

const staticServerCSS = './public';
server.use(express.static(staticServerCSS));
