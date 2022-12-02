var assert = require("assert");
var DriverFactory = require("./driver.js");
const { By } = require("selenium-webdriver");
SLEEP_TIME = 1000;
describe("Test", function () {
  this.timeout(40000);
  var driver;

  before(async function () {
    const { Builder } = require("selenium-webdriver");
    const chrome = require("selenium-webdriver/chrome");

    const chromeOptions = new chrome.Options();
    chromeOptions.excludeSwitches("enable-logging");

    driver = await new Builder()
      .forBrowser("chrome")
      .setChromeOptions(chromeOptions)
      .build();
  });

  after(async function () {
    await driver.quit();
  });

  it("1.Open my app at local host successfully", async function () {
    await driver.get("http://localhost:3000/");
  });

  it("2.The title is 'React App'", async function () {
    var title = await driver.getTitle();
    assert.equal(title, "React App");
  });

  it("3.Imported recipe by entering shared code should show on home page", async function () {
    await driver.get("http://localhost:3000/Import");
    driver.findElement(By.xpath("/html/body/div/div/div[4]"));
    let l = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/textarea[1]")
    );
    await l.clear();
    await l.sendKeys(
      "eyJicmV3RXF1aXAiOiJhdXRvdGVzdDEiLCJiZWFuIjoiYXV0b3Rlc3QxIiwidGFza3MiOlt7InRpbWUiOjEsImRlc2NyaXB0aW9uIjoiYXV0b3Rlc3QxIn0seyJ0aW1lIjoxLCJkZXNjcmlwdGlvbiI6ImF1dG90ZXN0MSJ9XX0="
    );
    driver.findElement(By.xpath("/html/body/div/div/button")).click();
    await driver.sleep(SLEEP_TIME);
    const src = await driver.getPageSource();
    assert(src.includes("autotest1"));
    // assert(driver.getPageSource().includes("autotest1"))
    // console.log(text)
    // assert.equal(title, "React App");
  });

  it("4.Should receive brew feedback and show on home", async function () {
    await driver.get("http://localhost:3000/");
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath("/html/body/div/div/div[1]/div[1]/div[1]")
    );
    await l.click();
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath(
        "/html/body/div/div/div[1]/div[2]/div/div/div/div/div[5]/button[1]"
      )
    );
    await l.click();
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath("/html/body/div/div/div/div/div/div/div[2]/button")
    );
    for (let index = 0; index < 3; index++) {
      await l.click();
      await driver.sleep(SLEEP_TIME);
    }
    l = await driver.findElement(By.xpath("/html/body/div/div/div/div/button"));
    l.click();
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath("/html/body/div/div/div/div[2]/div/div/div/textarea[1]")
    );
    let randomStr = Math.random().toString(36).slice(2, 8);
    l.sendKeys(randomStr);
    l = await driver.findElement(
      By.xpath("/html/body/div/div/div/div[2]/div/button")
    );
    l.click();
    await driver.sleep(SLEEP_TIME);
    const src = await driver.getPageSource();
    assert(src.includes(randomStr));
  });

  it("5. Export should raise alert and copy to clipboard", async function () {
    await driver.get("http://localhost:3000/");
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath("/html/body/div/div/div[1]/div[1]/div[1]")
    );
    await l.click();
    await driver.sleep(SLEEP_TIME);
    l = await driver.findElement(
      By.xpath(
        "/html/body/div/div/div[1]/div[2]/div/div/div/div/div[5]/button[2]"
      )
    );
    await l.click();
    await driver.sleep(SLEEP_TIME);
    driver.switchTo().alert().then(
        function() {
          assert(true)
        },
        function() {
          assert(false)
        }
      );
      
  });
});
