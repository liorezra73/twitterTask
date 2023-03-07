const Joi = require("joi");

const twitterFilterQuerySchema = Joi.object({
  userId: Joi.string().default("44196397"),
  count: Joi.number().min(1).max(100).default(50),
});

module.exports = twitterFilterQuerySchema;
