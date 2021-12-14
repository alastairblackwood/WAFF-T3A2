const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const filmSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A film must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A film name must have less or equal then 40 characters'],
      minlength: [10, 'A film name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'film name must only contain characters']
    },
    year: {
      type: Number,
      required: [true, 'A film must have a year'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A film must have a duration'],
    },
    price: {
      type: Number,
      required: [true, 'A film must have a price'],
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A film must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A film must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// filmSchema.virtual('durationWeeks').get(function () {
//   return this.duration / 7;
// });

// // DOCUMENT MIDDLEWARE: runs before .save() and .create()
// filmSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

// filmSchema.pre('save', function(next) {
//   console.log('Will save document...');
//   next();
// });

// filmSchema.post('save', function(doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE
// filmSchema.pre('find', function(next) {
// filmSchema.pre(/^find/, function (next) {
//   this.find({ secretFilm: { $ne: true } });

//   this.start = Date.now();
//   next();
// });

filmSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
filmSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretFilm: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

const Film = mongoose.model('Film', filmSchema);

module.exports = Film;
