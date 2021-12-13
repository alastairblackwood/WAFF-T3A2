const Film = require('./../models/filmModel');
const APIFeatures = require('./../utils/apiFeatures');

// exports.aliasTopFilms = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary';
//   next();
// };

// const films = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/films-simple.json`)
// );

// exports.checkID = (req, res, next, val) => {
//   console.log(`film id is: ${val}`);

//   if (req.params.id * 1 > films.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

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

// exports.getFilmStats = async (req, res) => {
//   try {
//     const stats = await Film.aggregate([
//       {
//         $match: { ratingsAverage: { $gte: 4.5 } },
//       },
//       {
//         $group: {
//           _id: { $toUpper: '$difficulty' },
//           numFilms: { $sum: 1 },
//           numRatings: { $sum: '$ratingsQuantity' },
//           avgRating: { $avg: '$ratingsAverage' },
//           avgPrice: { $avg: '$price' },
//           minPrice: { $min: '$price' },
//           maxPrice: { $max: '$price' },
//         },
//       },
//       {
//         $sort: { avgPrice: 1 },
//       },
//       // {
//       //   $match: { _id: { $ne: 'EASY' } }
//       // }
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         stats,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getMonthlyPlan = async (req, res) => {
//   try {
//     const year = req.params.year * 1; // 2021

//     const plan = await Film.aggregate([
//       {
//         $unwind: '$startDates',
//       },
//       {
//         $match: {
//           startDates: {
//             $gte: new Date(`${year}-01-01`),
//             $lte: new Date(`${year}-12-31`),
//           },
//         },
//       },
//       {
//         $group: {
//           _id: { $month: '$startDates' },
//           numFilmStarts: { $sum: 1 },
//           films: { $push: '$name' },
//         },
//       },
//       {
//         $addFields: { month: '$_id' },
//       },
//       {
//         $project: {
//           _id: 0,
//         },
//       },
//       {
//         $sort: { numTourStarts: -1 },
//       },
//       {
//         $limit: 12,
//       },
//     ]);

//     res.status(200).json({
//       status: 'success',
//       data: {
//         plan,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
