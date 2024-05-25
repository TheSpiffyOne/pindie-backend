const { sendUserCreated, sendUserUpdated, sendUserById, sendAllUsers, sendUserDeleted, sendMe } = require('../controllers/users');
const { findAllUsers, createUser, updateUser, findUserById, deleteUser, filterPassword, hashPassword } = require('../middlewares/users');
const { checkIsUserExists, checkEmptyNameAndEmailAndPassword, checkEmptyNameAndEmail } = require('../middlewares/middlewares');
const { checkAuth } = require('../middlewares/auth');

const usersRouter = require('express').Router();

usersRouter.get("/users", findAllUsers, filterPassword, sendAllUsers);
usersRouter.get("/users/:id", findUserById, filterPassword, sendUserById);
usersRouter.get("/me", checkAuth, sendMe);

usersRouter.post(
  "/users",
  findAllUsers,
  checkIsUserExists,
  checkEmptyNameAndEmailAndPassword,
  checkAuth,
  hashPassword,
  createUser,
  sendUserCreated
);
usersRouter.put(
  "/users/:id",
  checkEmptyNameAndEmail,
  checkAuth,
  updateUser,
  sendUserUpdated
);
usersRouter.delete(
    "/users/:id",
    checkAuth,
    deleteUser,
    sendUserDeleted
);

module.exports = usersRouter;