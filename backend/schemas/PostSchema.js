const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  postTitle: String,
  postContent: String,
  postAuthorID: String,
  postRating: Number,
});

// If this happens after mongoose.model, methods won't have this
PostSchema.methods.getAuthorName = async function getAuthorName() {
  console.log(
    'Combine with Firebase Admin to find a user by ID and return their display name'
  );
};

const Post = mongoose.model('Post', PostSchema);

// If this happens after mongoose.model, methods won't have this
// PostSchema.methods.getAuthorName = async function getAuthorName(){
//     console.log('Combine with Firebase Admin to find a user by ID and return their displayname');
// }

module.exports = { Post };
