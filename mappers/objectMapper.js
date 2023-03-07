const removeWords = require("remove-words");

const objectMapper = {
  getFieldValuesByName: (obj, fieldName) => {
    let values = [];

    for (let key in obj) {
      if (typeof obj[key] === "object") {
        values = values.concat(objectMapper.getFieldValuesByName(obj[key], fieldName));
      } else if (key === fieldName) {
        let value = obj[key];
        const valueArr = removeWords(value, false);
        value = valueArr.join(" ");
        values.push(value);
      }
    }

    return values;
  },
};

module.exports = objectMapper;
