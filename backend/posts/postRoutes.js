const express = require('express');
const {
  randomNumberGenerator,
  someAsyncFunction,
  getAllPosts,
  createSpecificPost,
  getAllPostByAuthorID,
} = require('./postsFunctions');

const router = express.Router();

// get all posts
router.get('/', async (request, response) => {
  let allPosts = await getAllPosts();
  response.json(allPosts);

  //response.json(`Received a request on ${request.originalUrl}`);
});

// create a new post
router.post('/', async (request, response) => {
  //let tempPostDetails = {}
  //let creationResult = await createSpecificPost(tempPostDetails)
  let creationResult = await createSpecificPost({
    postTitle: request.body.postTitle,
    postContent: request.body.postContent,
    postAuthorID: request.body.postAuthorID,
    postRating: request.body.postRating,
  });

  response.json(creationResult);
});

router.get('/:authorID', async (request, response) => {
  let allAuthorPosts = await getAllPostByAuthorID(request.params.authorID);

  response.json(allAuthorPosts);
});

router.get('/randomNumber', async (request, response) => {
  let asyncResult = await someAsyncFunction();
  response.send(`<h1>${randomNumberGenerator()}</h1>`);
});

router.get('/:postID', (request, response) => {
  response.json(`Route param was ${request.params.postID}`);
});

// router.post('/:postID', (request, response) => {

//     let submittedData = request.body;

//     console.log(JSON.stringify(submittedData));

//     let submittedName = request.body.name.toUpperCase();
//     submittedName += submittedName;

//     // for form urlencoded submission
//     //let submittedPokemon = JSON.parse(request.body.favouritePokemon).name;

//     // for raw json submission
//     let submittedPokemon = request.body.favouritePokemon.name;

//     response.json(`Received fave Pokemon of ${submittedPokemon} `)
// });

// router.get('/:username/status/:postID', (request, response) => {

//     response.json(`Route param was ${request.params}`)

// });

module.exports = router;
