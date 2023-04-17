const crypto = require("crypto");
const lambdaLocalInvoke = require("../../../src/utils/lambdaLocalInvoke");

const randomPassword = crypto.randomBytes(10).toString("hex");
const randomWrongPassword = crypto.randomBytes(3).toString("hex");
const randomEmail = crypto.randomBytes(8).toString("hex") + "@example.com";
const randomWrongEmail = crypto.randomBytes(8).toString("hex");

/*
 USER HANDLERS
*/
describe("POST /user/register", () => {
  const testCases = [
    {
      name: "Missing no properties",
      input: {
        name: "Testing Name",
        email: randomEmail,
        password: randomPassword,
      },
      expectedStatusCode: 201,
    },
    {
      name: "Missing 'name' property",
      input: { email: randomEmail, password: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'email' property",
      input: { name: "Testing Name", password: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'password' property",
      input: {
        name: "Testing Name",
        email: randomEmail,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Email with incorrect pattern",
      input: {
        name: "Testing Name",
        email: randomWrongEmail,
        password: randomPassword,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Password with incorrect lenght",
      input: {
        name: "Testing Name",
        email: randomEmail,
        password: randomWrongPassword,
      },
      expectedStatusCode: 400,
    },
  ];
  testCases.forEach(({ name, input, expectedStatusCode }) => {
    it(`${name} should return ${expectedStatusCode} status code`, async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        body: input,
      });
      expect(statusCode).toEqual(expectedStatusCode);
    }, 30000);
  });
});

describe("POST /user/login", () => {
  const testCases = [
    {
      name: "Missing no properties",
      input: {
        email: randomEmail,
        password: randomPassword,
      },
      expectedStatusCode: 200,
    },
    {
      name: "Missing 'email' property",
      input: { password: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'password' property",
      input: {
        email: randomEmail,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Email with incorrect pattern",
      input: {
        email: "wrong email",
        password: randomPassword,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Password with incorrect lenght",
      input: { email: randomEmail, password: randomWrongPassword },
      expectedStatusCode: 400,
    },
  ];
  testCases.forEach(({ name, input, expectedStatusCode }) => {
    it(`${name} should return ${expectedStatusCode} status code`, async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        body: input,
      });
      expect(statusCode).toEqual(expectedStatusCode);
    }, 30000);
  });
});
