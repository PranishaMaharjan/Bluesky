const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.like =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[2]/div/div/div[2]/button[2]';
    this.username =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div[2]/div/div/div/div/div[2]/div[2]/div[1]/input';
    this.password =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div[2]/div/div/div/div/div[2]/div[2]/div[2]/input';
    this.signin =
      "//div[contains(text(),'Sign in or create your account to join the conversation!')][1]/following-sibling::div[1]//button[@aria-label='Sign in']";
    // this.account =
    //   '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div[2]/div/div/div/div/div[1]/div[2]/button[1]';
    this.nextButton =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div[2]/div/div/div/div/div[3]/button[2]/div';
    this.errorMessage =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div[2]/div/div/div/div/div[3]/div/div';
    // this.loginButton =
    //   '//*[@id="__next"]/div[2]/main/section[1]/div[3]/div[2]/div/div[3]/div/a';
  }

  async login(username, password) {
    // await this.page.waitForTimeout(3000);
    await this.page.locator(this.like).click();
    // await this.page.waitForTimeout(5000);
    // await this.page.locator(this.signin).click();
    // await this.page.locator(this.account).click();
    await this.page.locator(this.username).fill(username);
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.password).fill(password);
    // await this.page.waitForTimeout(3000);
    await this.page.locator(this.nextButton).click();
  }

  async verifyValidLogin() {
    await expect(this.page).toHaveURL("https://bsky.app/");
  }
  async invalidLogin() {
    await expect(this.page.locator(this.errorMessage)).toHaveText("Invalid identifier or password");
  }
};
