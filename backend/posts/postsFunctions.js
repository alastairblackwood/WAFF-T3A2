const { Post } = require('../schemas/PostSchema');

// get all posts
async function getAllPosts() {
  let allPosts = await Post.find();
  return JSON.stringify(allPosts);
}

// create a post
async function createSpecificPost(postDetails) {
  console.log(`Received postdetails of ${JSON.stringify(postDetails)}`);
  let newPost = new Post({
    postTitle: postDetails.postTitle,
    postContent: postDetails.postContent,
    postAuthorID: postDetails.postAuthorID,
    postRating: postDetails.postRating,
  });

  let creationResult = await newPost.save();
  return creationResult;
}

async function getAllPostByAuthorID(authorID) {
  let queryResult = await Post.find({ postAuthorID: authorID });
  return queryResult;
}

function randomNumberGenerator() {
  return 3;
}

async function someAsyncFunction() {
  return 'some async thing';
}

module.exports = {
  randomNumberGenerator,
  someAsyncFunction,
  getAllPosts,
  createSpecificPost,
  getAllPostByAuthorID,
};
