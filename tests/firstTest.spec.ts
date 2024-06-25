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

  test("Locating Parent elements", async ({ page }) => {
    await page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("button")
      .click();

    await page
      .locator("nb-card", { has: page.locator("#inputEmail1") })
      .getByRole("textbox", { name: "Email" })
      .fill("usingthe@grid");

    //FILTER, you can chain multiple filters one by one
    await page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .getByRole("textbox", { name: "Email" })
      .fill("basic@form");

    await page
      .locator("nb-card")
      .filter({ has: page.locator(".status-danger") })
      .getByRole("button")
      .click();

    //getByRole does not have a filter
    //Change multiple filters one by one

    await page
      .locator("nb-card")
      .filter({ has: page.locator("nb-checkbox") })
      .filter({ hasText: "Sign in" })
      .getByRole("textbox", { name: "Email" })
      .fill("horizontal@form.ca");
  });

  test("Reusing the locators", async ({ page }) => {
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const emailField = basicForm.getByRole("textbox", { name: "Email" });

    await emailField.fill("basic@form.ca");

    await basicForm.getByRole("textbox", { name: "Password" }).fill("123");

    await basicForm.locator("nb-checkbox").click();

    await basicForm.getByRole("button").click();

    await expect(page.getByLabel("Check me out")).toBeChecked();
    await expect(emailField).toHaveValue("basic@form.ca");
  });

  test("Extracting values", async ({ page }) => {
    //Single text value
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    //Pega o texto do botão que é Submit e coloca dentro da variavel
    const buttonText = await basicForm.locator("button").textContent();

    expect(buttonText).toEqual("Submit");

    //All text values
    const allRadioButtonsLabels = await page
      .locator("nb-radio")
      .allTextContents();

    expect(allRadioButtonsLabels).toContain("Option 1");

    //Input value
    const emailField = basicForm.getByRole("textbox", { name: "Email" });
    await emailField.fill("test@test.ca");
    const emailValue = await emailField.inputValue();

    expect(emailValue).toEqual("test@test.ca");

    //Get the attribute
    const placeholderValue = await emailField.getAttribute("placeholder");
    expect(placeholderValue).toEqual("Email");
  });

  test("Assertions", async ({ page }) => {
    //General Assertions
    const value = 5;
    expect(value).toEqual(5);

    const basicFormButton = page
      .locator("nb-card")
      .filter({ hasText: "Basic form" })
      .locator("button");

    const textButton = await basicFormButton.textContent();
    expect(textButton).toEqual("Submit");

    //Locator Assertions
    await expect(basicFormButton).toHaveText("Submit");

    //Soft Assertion
    //Continue execution even the assertion failed
    await expect.soft(basicFormButton).toHaveText("Submit");
    await basicFormButton.click();
  });
});
