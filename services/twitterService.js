const httpBuilder = require("../builders/httpBuilder");
const objectMapper = require("../mappers/objectMapper");

const twitterService = {
  getTweetOfUserById: async (userId, count) => {
    try {
      const method = "GET";
      const url = "https://twitter135.p.rapidapi.com/UserTweets/";
      const params = { id: userId, count: count };
      const headers = {
        "X-RapidAPI-Key":
          process.env.RAPID_API_KEY ??
          "55042c76admsh04f014612e3f435p181eb7jsn01dfdd93e710",
        "X-RapidAPI-Host":
          process.env.RAPID_API_HOST ?? "twitter135.p.rapidapi.com",
      };

      const options = httpBuilder.buildOptions(method, url, params, headers);
      const response = await httpBuilder.sendRequest(options);

      const fieldName = "full_text";
      const values = objectMapper.getFieldValuesByName(
        response.data,
        fieldName
      );
      const words = values
        .join(" ")
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/[0-9]/g, "")
        .split(/\s+/);

      const wordCounts = {};
      for (const word of words) {
        wordCounts[word] = (wordCounts[word] || 0) + 1;
      }

      const wordCloudData = Object.entries(wordCounts)
        .map(([text, value]) => ({ text, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 100);

      return wordCloudData;
    } catch (error) {
      console.log(error);
      throw { code: 500, message: "something went wrong..." };
    }
  },
};

module.exports = twitterService;
