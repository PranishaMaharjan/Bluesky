const { test, expect } = require("@playwright/test");
const testData = require("../../fixtures/Login.fixtures.json");
const { LoginPage } = require("../../pageObjects/login.po.js");

// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
// }, 60000);

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Login test", () => {
  test.describe("invalid login tests", () => {
    test.describe.configure({ mode: "serial" });
    test("login invalid", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.invalidCredentials.username,
        testData.invalidUser.invalidCredentials.password
      );

      await login.invalidLogin();
    });

    test("user with leading space", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.userLeadingSpace.username,
        testData.invalidUser.userLeadingSpace.password
      );
      await page.waitForTimeout(3000);
      await login.verifyValidLogin();
    });

    test("password with leading space", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.invalidUser.passwordLeadingSpace.username,
        testData.invalidUser.passwordLeadingSpace.password
      );
      await login.invalidLogin();
    });
  });
  test.describe.configure({ mode: "serial" });
  test.describe("valid login test", () => {
    test("valid login", async ({ page }) => {
      const login = new LoginPage(page);
      await login.login(
        testData.validUser.username,
        testData.validUser.password
      );
    });
  });
});
