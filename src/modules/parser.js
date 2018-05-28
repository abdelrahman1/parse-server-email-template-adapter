const hbs = require("handlebars");
const fs = require("fs");

const parser = (templatePath, data) => {
  return new Promise((resolve, reject) => {
    fs.readFile(templatePath, "utf-8", (error, buffer) => {
      if (error) {
        reject(error);
      } else {
        const template = hbs.compile(buffer);
        resolve(template(data));
      }
    });
  });
};

module.exports = parser;
