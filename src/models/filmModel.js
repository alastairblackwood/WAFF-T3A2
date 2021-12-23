const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const filmSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'A film must have a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'A film name must have less or equal then 50 characters'],
      minlength: [3, 'A film name must have more or equal then 3 characters'],
      // validate: [validator.isAlpha, 'film name must only contain characters']
    },
    image: {
      type: String,
    },
    language: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      required: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
      trim: true,
    },
    cast: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    showDate: {
      type: Date,
      required: true,
    },
    showTime: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

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
