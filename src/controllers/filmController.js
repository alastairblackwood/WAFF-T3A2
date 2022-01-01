const Film = require('./../models/filmModel');
const factory = require('./handlerFactory');

exports.getAllFilms = factory.getAll(Film);
exports.getFilm = factory.getOne(Film, { path: 'reviews' });
exports.createFilm = factory.createOne(Film);
exports.updateFilm = factory.updateOne(Film);
exports.deleteFilm = factory.deleteOne(Film);

exports.getAllFilms = async (req, res) => {
  try {
    // EXECUTE QUERY
    const features = new APIFeatures(Film.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const films = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: films.length,
      data: {
        films,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getFilm = async (req, res) => {
  try {
    const film = await Film.findById(req.params.id);
    // Film.findOne({ _id: req.params.id })

    res.status(200).json({
      status: 'success',
      data: {
        film,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createFilm = async (req, res) => {
  try {
    const newFilm = await Film.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        film: newFilm,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.updateFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        film,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteFilm = async (req, res) => {
  try {
    await Film.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
