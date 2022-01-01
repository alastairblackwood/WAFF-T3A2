const multer = require('multer');
const sharp = require('sharp');
const Film = require('./../models/filmModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('./../utils/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image. Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadFilmImages = upload.single('image');

// upload.single('image') *for only one photo/image
// upload.array('images', 5)
// upload.fields([
//  { name: 'imageCover', maxCount: 1 },
//  { name: 'images', maxCount: 3 },

exports.resizeFilmImages = catchAsync(async (req, res, next) => {
  console.log(req.files);

  if (!req.files.imageCover || !req.files.images) return next();

  // 1) Cover image
  const imageCoverFilename = `film-${req.params.id}-${Date.now()}-cover.jpeg`;
  await sharp(req.files.imageCover[0].buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/films/${req.body.imageCover}`);

  // 2) Images
  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file, i) => {
      const filename = `film-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;

      await sharp(file.buffer)
        .resize(2000, 1333)
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/films/${filename}`);

      req.body.images.push(filename);
    })
  );
  next();
});

exports.getAllFilms = factory.getAll(Film);
exports.getFilm = factory.getOne(Film, { path: 'reviews' });
exports.createFilm = factory.createOne(Film);
exports.updateFilm = factory.updateOne(Film);
exports.deleteFilm = factory.deleteOne(Film);

// exports.getAllFilms = async (req, res) => {
//   try {
//     // EXECUTE QUERY
//     const features = new APIFeatures(Film.find(), req.query)
//       .filter()
//       .sort()
//       .limitFields()
//       .paginate();
//     const films = await features.query;

//     // SEND RESPONSE
//     res.status(200).json({
//       status: 'success',
//       results: films.length,
//       data: {
//         films,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.getFilm = async (req, res) => {
//   try {
//     const film = await Film.findById(req.params.id);
//     // Film.findOne({ _id: req.params.id })

//     res.status(200).json({
//       status: 'success',
//       data: {
//         film,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.createFilm = async (req, res) => {
//   try {
//     const newFilm = await Film.create(req.body);

//     res.status(201).json({
//       status: 'success',
//       data: {
//         film: newFilm,
//       },
//     });
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.updateFilm = async (req, res) => {
//   try {
//     const film = await Film.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });

//     res.status(200).json({
//       status: 'success',
//       data: {
//         film,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.deleteFilm = async (req, res) => {
//   try {
//     await Film.findByIdAndDelete(req.params.id);

//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };
