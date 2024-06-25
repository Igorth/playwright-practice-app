import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://www.uitestingplayground.com/ajax");
  //await page.getByRole("button").click();
  await page.getByText("Button Triggering AJAX Request").click();
});

test("Auto waiting", async ({ page }) => {
  const successButton = page.locator(".bg-success");
  //await successButton.click();

  //const text = await successButton.textContent();
  //expect(text).toEqual("Data loaded with AJAX get request.");

  //We can create a method for the methods that not wait for a content
  // the methods that not implement the await logic
  // await successButton.waitFor({ state: "attached" });
  // const text = await successButton.allTextContents();
  // expect(text).toContain("Data loaded with AJAX get request.");

  await expect(successButton).toHaveText("Data loaded with AJAX get request.", {
    timeout: 20000,
  });
});

test("Alternative waits", async ({ page }) => {
  const successButton = page.locator(".bg-success");

  // Wait for element
  await page.waitForSelector(".bg-success");

  // Wait for particular response
  //await page.waitForResponse("http://www.uitestingplayground.com/ajaxdata");

  // Wait for network calls to be completed NOT RECOMMENDED
  //await page.waitForLoadState("networkidle");

  const text = await successButton.allTextContents();
  expect(text).toContain("Data loaded with AJAX get request.");
});

test("Timeouts", async ({ page }) => {
  //test.setTimeout(10000);
  test.slow(); // multiply the timeout by 3 in the playwright.config
  const successButton = page.locator(".bg-success");
  await successButton.click();
});
