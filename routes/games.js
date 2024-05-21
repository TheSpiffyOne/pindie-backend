const { sendGameCreated, sendGameById, sendAllGames, sendGameUpdated, sendGameDeleted } = require('../controllers/games');
const { findAllGames, createGame, findGameById, updateGame, deleteGame, checkIsVoteRequest } = require('../middlewares/games');
const { checkIsGameExists, checkIfCategoriesAvaliable, checkEmptyFields, checkIfUsersAreSafe } = require('../middlewares/middlewares');
const { checkAuth } = require("../middlewares/auth.js");

const gamesRouter = require('express').Router();

gamesRouter.get("/games", findAllGames, sendAllGames);
gamesRouter.get("/games/:id", findGameById, sendGameById);
gamesRouter.delete("/games/:id", checkAuth, deleteGame, sendGameDeleted);

gamesRouter.post(
  "/games",
  findAllGames,
  checkIsGameExists,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  createGame,
  sendGameCreated,
);

gamesRouter.put(
  "/games/:id",
  findGameById,
  checkIsVoteRequest,
  checkIfUsersAreSafe,
  checkIfCategoriesAvaliable,
  checkEmptyFields,
  checkAuth,
  updateGame,
  sendGameUpdated
);

module.exports = gamesRouter;