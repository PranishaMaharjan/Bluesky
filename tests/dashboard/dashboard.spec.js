const { test, expect } = require("@playwright/test");
const LoginTestData = require("../../fixtures/Login.fixtures.json");
const DashboardTestData = require("../../fixtures/Dashboard.fixtures.json");

const { DashboardPage } = require("../../pageObjects/dashboard.po.js");
const { LoginPage } = require("../../pageObjects/login.po.js");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.login(
    LoginTestData.validUser.username,
    LoginTestData.validUser.password
  );
  await login.verifyValidLogin();
});

test.describe("Post Delete and Edit Blog", () => {
  test.describe.configure({ mode: "serial" });

  test("create Blog", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.post();
  });

  // test("delete Blog", async ({ page }) => {
  //   const dashboard = new DashboardPage(page);
  //   await dashboard.delPost();
  // });

  test("repost", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.rePost();
  });

  test("edit profile", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.editProfile();
  });

  test("Message", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.Message();
  });

  test("signout", async ({ page }) => {
    const dashboard = new DashboardPage(page);
    await dashboard.logout();
  });
});
