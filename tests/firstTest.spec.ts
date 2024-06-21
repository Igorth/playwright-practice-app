import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Test suite 1", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
  });
  test("Click on Form Layouts", async ({ page }) => {
    await page.getByText("Form Layouts").click();

    await expect(page.getByText("Inline form")).toBeVisible();
  });

  test("Click on Datepicker", async ({ page }) => {
    await page.getByText("Datepicker").click();

    await expect(page.getByText("Common Datepicker")).toBeVisible();
  });
});

test.describe("Test Suite 2", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Charts", { exact: true }).click();
  });
  test("Testing if beforeEach will works here", async ({ page }) => {
    await page.getByText("Echarts").click();
  });
});
