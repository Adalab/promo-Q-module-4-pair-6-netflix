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
  const filteredList = listMovies.filter(
    (movie) => movie.gender === genderFilterParam
  );

  console.log(filteredList, 'lista filtrada');

  resp.json({
    success: true,
    movies: filteredList,
  });
});

// En esta carpeta ponemos los ficheros estáticos
const staticServerPathWeb = './src/public-react'; 
server.use(express.static(staticServerPathWeb));

const staticServerPhotos = './src/public-movies-images'; 
server.use(express.static(staticServerPhotos));