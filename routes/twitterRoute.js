const express = require("express");
const { createValidator } = require("express-joi-validation");
const twitterFilterQuerySchema = require("../schemas/twitterFilterQuerySchema");
const twitterService = require("../services/twitterService");

const route = express.Router();
const validator = createValidator();

route.get(
  "",
  validator.query(twitterFilterQuerySchema),
  async (req, res, next) => {
    try {
      const { userId, count } = req.query;
      const wordCloudData = await twitterService.getTweetOfUserById(
        userId,
        count
      );
      res.status(200).send(wordCloudData);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = route;
