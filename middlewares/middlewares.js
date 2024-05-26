const express = require("express");
const app = express();

// Объявили middleware-функцию loggingMiddleware
function loggingMiddleware(req, res, next) {
  console.log("Внутри loggingMiddleware");
}

// Контроллер для маршрута /
function homeController(req, res) {
  console.log("Внутри homeController");
  res.send("Home Page");
}

// Контроллер для маршрута /users
function usersController(req, res) {
  console.log("Внутри usersController");
  res.send("Users Page");
}

const checkEmptyFields = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
  }
  if (
    !req.body.title ||
    !req.body.description ||
    !req.body.image ||
    !req.body.link ||
    !req.body.developer
) {
    res.status(400).send({ message: "Заполни все поля" });
} else {
    next();
}
};

const checkEmptyName = async (req, res, next) => {
  if (!req.body.name) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите название категории" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmailAndPassword = async (req, res, next) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя, email и пароль" }));
  } else {
    next();
  }
};

const checkEmptyNameAndEmail = async (req, res, next) => {
  if (!req.body.username || !req.body.email) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Введите имя и email" }));
  } else {
    next();
  }
};

const checkIsGameExists = async (req, res, next) => {
  const isInArray = req.gamesArray.find((game) => {
    return req.body.title === game.title;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Игра с таким названием уже существует" }));
  } else {
    next();
  }
};

const checkIsUserExists = async (req, res, next) => {
  const isInArray = req.usersArray.find((user) => {
    return req.body.email === user.email;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Пользователь с таким email уже существует" }));
  } else {
    next();
  }
};

const checkIsCategoryExists = async (req, res, next) => {
  const isInArray = req.categoriesArray.find((category) => {
    return req.body.name === category.name;
  });
  if (isInArray) {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Категория с таким названием уже существует" }));
  } else {
    next();
  }
};

const checkIfCategoriesAvaliable = async (req, res, next) => {
  if (req.isVoteRequest) {
    next();
    return;
}
if (!req.body.categories || req.body.categories.length === 0) {
    res.headers = { "Content-Type": "application/json" };
    res.status(400).send({ message: "Выбери хотя бы одну категорию" });
} else {
    next();
}
}

const checkIfUsersAreSafe = async (req, res, next) => {
  if (!req.body.users) {
    next();
    return;
  }
  if (req.body.users.length - 1 === req.game.users.length) {
    next();
    return;
  } else {
    res.setHeader("Content-Type", "application/json");
    res.status(400).send(JSON.stringify({ message: "Нельзя удалять пользователей или добавлять больше одного пользователя" }));
  }
};

module.exports = {
  loggingMiddleware,
  homeController,
  usersController,
  checkEmptyFields,
  checkEmptyName,
  checkEmptyNameAndEmailAndPassword,
  checkEmptyNameAndEmail,
  checkIsGameExists,
  checkIsUserExists,
  checkIsCategoryExists,
  checkIfCategoriesAvaliable,
  checkIfUsersAreSafe
}

app.get("/", homeController);

app.get("/users", usersController);