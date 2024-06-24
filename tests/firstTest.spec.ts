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

  test("User facing locators", async ({ page }) => {
    //getByRole
    await page.getByRole("textbox", { name: "Email" }).first().click();
    await page.getByRole("button", { name: "Sign in" }).first().click();

    //getByLabel
    await page.getByLabel("Email").first().fill("test@test.ca");

    //getByPlaceholder
    await page.getByPlaceholder("Jane Doe").fill("John Doe");

    //getByText
    await page.getByText("Using the Grid").click();

    //getByTitle
    await page.getByTitle("IoT Dashboard").click();

    //getByTestId
    await page.getByTestId("Header").click();
  });

  test("Locating child elements", async ({ page }) => {
    //find the child with the same locator
    await page.locator('nb-card nb-radio :text-is("Option 1")').check();

    //chaning one by one
    await page
      .locator("nb-card")
      .locator("nb-radio")
      .locator(":text-is('Option 2')")
      .check();

    await page.locator('nb-card input[id="inputPassword2"]').fill("123");

    await page
      .locator("nb-card")
      .getByRole("button", { name: "Sign in" })
      .first()
      .click();

    //index of the element // try to avoid this aproach
    await page.locator("nb-card").nth(3).getByRole("button").click();
  });
});
