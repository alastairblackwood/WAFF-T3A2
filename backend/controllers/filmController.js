const fs = require('fs');

const films = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/films-simple.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`film id is: ${val}`);

  if (req.params.id * 1 > films.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllFilms = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: films.length,
    data: {
      films,
    },
  });
};

exports.getFilm = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;

  const film = films.find(el => el.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      film,
    },
  });
};

exports.createFilm = (req, res) => {
  // console.log(req.body);

  const newId = films[films.length - 1].id + 1;
  const newFilm = Object.assign({ id: newId }, req.body);

  films.push(newFilm);

  fs.writeFile(
    `${__dirname}/dev-data/data/films-simple.json`,
    JSON.stringify(films),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          film: newFilm,
        },
      });
    }
  );
};

exports.updateFilm = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      film: '<Updated film here...>',
    },
  });
};

exports.deleteFilm = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
