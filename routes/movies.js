const express = require('express');
const MoviesService = require('../services/movies');
const validationHandler = require('../utils/middleware/validationHandler');
const {
  createMovieSchema,
  movieIdSchema,
  updateMovieSchema,
} = require('../utils/schemas/movies');
const cacheResponse = require('../utils/cacheResponses');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS,
} = require('../utils/time');

const moviesApi = (app) => {
  const router = express.Router();
  app.use('/api/movies', router);

  const moviesService = new MoviesService();

  router.get('/', async (req, res, next) => {
    cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
    const tagsParams = req.query.tags;
    const tags = tagsParams
      ? tagsParams.split(',').map((tag) => tag.toLowerCase())
      : null;
    try {
      const movies = await moviesService.getMovies({
        tags,
      });
      res.status(200).json({
        data: movies,
        message: 'Movies listed',
      });
    } catch (error) {
      next(error);
    }
  });

  router.get(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }),
    async (req, res, next) => {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { movieId } = req.params;

      try {
        const movies = await moviesService.getMovie({
          movieId,
        });

        res.status(200).json({
          data: movies,
          message: 'Movies retrieved',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  // create
  router.post(
    '/',
    validationHandler(createMovieSchema),
    async (req, res, next) => {
      const movie = req.body;
      try {
        const createdMovieId = await moviesService.createMovie({ movie });
        res.status(201).json({
          data: createdMovieId,
          message: 'movie created',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.put(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    validationHandler(updateMovieSchema),
    async (req, res, next) => {
      const { movieId } = req.params;
      const movie = req.body;

      try {
        const updatedMovieId = await moviesService.updateMovie({
          movieId,
          movie,
        });

        res.status(200).json({
          data: updatedMovieId,
          message: 'movie updated',
        });
      } catch (error) {
        next(error);
      }
    }
  );

  router.delete(
    '/:movieId',
    validationHandler({ movieId: movieIdSchema }, 'params'),
    async (req, res, next) => {
      const { movieId } = req.params;

      try {
        const deleteMovieId = await moviesService.deleteMovie({
          movieId,
        });

        res.status(200).json({
          data: deleteMovieId,
          message: 'movies deleted',
        });
      } catch (error) {
        next(error);
      }
    }
  );
};

module.exports = {
  moviesApi,
};
