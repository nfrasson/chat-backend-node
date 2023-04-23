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
        userName: "Testing Name",
        userEmail: randomEmail,
        userPassword: randomPassword,
      },
      expectedStatusCode: 201,
    },
    {
      name: "Missing 'name' property",
      input: { userEmail: randomEmail, userPassword: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'email' property",
      input: { userName: "Testing Name", userPassword: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'password' property",
      input: {
        userName: "Testing Name",
        userEmail: randomEmail,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Email with incorrect pattern",
      input: {
        userName: "Testing Name",
        userEmail: randomWrongEmail,
        userPassword: randomPassword,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Password with incorrect lenght",
      input: {
        userName: "Testing Name",
        userEmail: randomEmail,
        userPassword: randomWrongPassword,
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
        userEmail: randomEmail,
        userPassword: randomPassword,
      },
      expectedStatusCode: 200,
    },
    {
      name: "Missing 'email' property",
      input: { userPassword: randomPassword },
      expectedStatusCode: 400,
    },
    {
      name: "Missing 'password' property",
      input: {
        userEmail: randomEmail,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Email with incorrect pattern",
      input: {
        userEmail: "wrong email",
        userPassword: randomPassword,
      },
      expectedStatusCode: 400,
    },
    {
      name: "Password with incorrect lenght",
      input: { userEmail: randomEmail, userPassword: randomWrongPassword },
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
