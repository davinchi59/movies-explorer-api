const router = require('express').Router();
const movieController = require('../controllers/movie');
const DeleteMovieValidation = require('../middlewares/validations/DeleteMovieValidation');
const CreateMovieValidation = require('../middlewares/validations/CreateMovieValidation');

router.get('/', movieController.getMovies);
router.post('/', CreateMovieValidation, movieController.createMovie);
router.delete('/:_id', DeleteMovieValidation, movieController.deleteMovie);

module.exports = router;
