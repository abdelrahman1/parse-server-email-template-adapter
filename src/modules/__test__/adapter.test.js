const adapter = require("../adapter");

test("adapter should be a function", () => {
  expect(typeof adapter).toEqual("function");
});
