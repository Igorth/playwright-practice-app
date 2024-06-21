import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.describe("Test Suite 1", () => {
  test("Locators syntax rules", async ({ page }) => {
    //by Tag name
    page.locator("input");

    //by ID
    await page.locator("#inputEmail1").click();

    //by Class
    page.locator(".shape-rectangle");

    //by Attribute
    page.locator('[placeholder="Email"]');

    //by combine different selectors
    page.locator('input[placeholder="Email"]');

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text-is("Using the Grid")');
  });
});
