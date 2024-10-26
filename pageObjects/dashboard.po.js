const { expect } = require("@playwright/test");

const dashboardTestData = require("../fixtures/Dashboard.fixtures.json");
const exp = require("constants");

exports.DashboardPage = class DashboardPage {
  constructor(page) {
    this.page = page;
    this.newPost = '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[2]/div[2]/button';
    this.postButton =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[4]/div/div/div/div[1]/div/button[3]';
    this.cancelButton =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[4]/div/div/div/div[1]/div/button[1]';
    this.fill =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[4]/div/div/div/div[2]/div/div[1]/div[2]/div/div';

    //delete
    this.profile = '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[2]/a[1]/div/div';
    this.clk =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div[3]/div/div/div/div/div/div/div[2]/div[3]/div/div/div[2]/div[3]/div/div[5]/div';
    // this.clk = "//div[contains(text(),'This is Bluesky post')]";
    this.hover =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div[3]/div/div/div/div/div/div/div[2]/div[3]/div/div/div[2]/div[3]/div/div[5]/div';
    // this.delete = '//*[@id="radix-:r19:"]/div/div[10]';
    this.delete = "//div[contains(text(),'Delete post')]";
    this.deletePost =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[5]/div[2]/div/div[3]/button[1]';

    //repost
    this.hoverRepost =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div/div/div/div/div[4]/div/div[1]/div/div[2]/div[3]/div/div/div/div[2]/div[2]/div[3]/div[2]/div';
    // this.repost = "//div[contains(text(),'Repost')]";

    //signout
    this.settings = '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[2]/a[8]';
    this.signout =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div/div[2]/div/div[7]/div/div/div/div/button/div';

    /// Profile Edit
    this.editAvatar =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[1]/div/div[2]/div/div/div/div/div[1]/div/div[2]/div[1]/button';
    this.setUsername = "//div[contains(text(), 'Display Name')]/following-sibling::input";
    this.setDes = "//div[contains(text(), 'Description')]/following-sibling::textarea";
    this.saveChanges =
      '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[5]/div/div/div/div/div[3]/button[1]';

    ////send message
    this.msgHover = '//*[@id="root"]/div/div/div[1]/div/div/div[4]/div[2]/a[3]';
    this.clkPerson = 'a:has-text("pranisha")';
    this.enterMsg = 'textarea[placeholder="Write a message"]';
    this.send = 'button[aria-label="Send message"]';
  }

  async post() {
    // await this.page.waitForTimeout(2000);
    await this.page.locator(this.newPost).click();
    await this.page.locator(this.fill).fill(dashboardTestData.fill);
    // await this.page.waitForTimeout(2000);
    await this.page.locator(this.postButton).click();
  }

  async delPost() {
    await this.page.locator(this.profile).click();
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.clk).first().click();
    await this.page.waitForTimeout(5000);
    await this.page.locator(this.hover).click();
    await this.page.locator(this.delete).click();
    await this.page.locator(this.deletePost).click();
  }

  async rePost() {
    // await this.page.waitForTimeout(2000);
    await this.page.locator(this.hoverRepost).click();
    await this.page.waitForTimeout(2000);
    await this.page.getByText("Repost", { exact: true }).click();
    // await this.page.locator(this.repost).click();
  }

  async editProfile() {
    await this.page.context().clearCookies();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.profile).click();
    await this.page.locator(this.editAvatar).click();
    await this.page
      .locator(this.setUsername)
      .fill(dashboardTestData.profile.fillUsername);
    await this.page
      .locator(this.setDes)
      .fill(dashboardTestData.profile.fillDesc);
    await this.page.waitForTimeout(3000);
    await this.page.locator(this.saveChanges).click();
  }

  async Message() {
    await this.page.locator(this.msgHover).click();
    await this.page.waitForTimeout(2000);
    await this.page.locator(this.clkPerson).click();
    await this.page.locator(this.enterMsg).fill("hello");
    await this.page.locator(this.send).click();
  }

  async logout() {
    await this.page.locator(this.settings).click();
    await this.page.locator(this.signout).click();
  }
};
