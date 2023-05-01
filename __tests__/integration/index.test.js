import { randomBytes } from "crypto";
import { deepEqual } from "node:assert";
import { describe, it } from "node:test";
import { lambdaLocalInvoke } from "../utils/lambdaLocalInvoke.js";

describe("/user", () => {
  const randomEmail = randomBytes(8).toString("hex") + "@example.com";
  const randomPassword = randomBytes(10).toString("hex");
  const randomWrongEmail = randomBytes(8).toString("hex");
  const randomWrongPassword = randomBytes(3).toString("hex");

  describe("POST /user/register", () => {
    it("Missing no properties", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userName: "Testing Name",
        userEmail: randomEmail,
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 201);
    });

    it("Missing 'name' property", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userEmail: randomEmail,
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 400);
    });

    it("Missing 'email' property", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userName: "Testing Name",
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 400);
    });

    it("Missing 'password' property", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userName: "Testing Name",
        userEmail: randomEmail,
      });

      deepEqual(statusCode, 400);
    });

    it("Email with incorrect pattern", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userName: "Testing Name",
        userEmail: randomWrongEmail,
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 400);
    });

    it("Password with incorrect lenght", async () => {
      const { statusCode } = await lambdaLocalInvoke("userRegister", {
        userName: "Testing Name",
        userEmail: randomEmail,
        userPassword: randomWrongPassword,
      });

      deepEqual(statusCode, 400);
    });
  });

  describe("POST /user/login", () => {
    it("Missing no properties", async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        userEmail: randomEmail,
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 200);
    });

    it("Missing 'email' property", async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 400);
    });

    it("Missing 'password' property", async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        userEmail: randomEmail,
      });

      deepEqual(statusCode, 400);
    });

    it("Email with incorrect pattern", async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        userEmail: randomWrongEmail,
        userPassword: randomPassword,
      });

      deepEqual(statusCode, 400);
    });

    it("Password with incorrect lenght", async () => {
      const { statusCode } = await lambdaLocalInvoke("userLogin", {
        userEmail: randomEmail,
        userPassword: randomWrongPassword,
      });

      deepEqual(statusCode, 400);
    });
  });
});
