import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input Fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", {
        hasText: "Using the Grid",
      })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("using@grid.ca");

    //Generic Assertion
    const emailInputValue = await usingTheGridEmailInput.inputValue();
    expect(emailInputValue).toEqual("using@grid.ca");

    await usingTheGridEmailInput.clear();
    await usingTheGridEmailInput.pressSequentially("using2@grid.ca", {
      delay: 300,
    });

    //Locator Assertion
    await expect(usingTheGridEmailInput).toHaveValue("using2@grid.ca");
  });

  test("Radio buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    //If force:true we disabled the HID command
    await page.getByLabel("Option 1").check({ force: true });
    const radioStatusButtonOne = page.getByLabel("Option 1").isChecked();
    //Generic Assertion
    expect(radioStatusButtonOne).toBeTruthy();

    await page.getByRole("radio", { name: "Option 2" }).check({ force: true });
    //Locator Assertion
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" }),
    ).toBeChecked();

    //Generic Assertion
    expect(
      await page.getByRole("radio", { name: "Option 1" }).isChecked(),
    ).toBeFalsy();
    expect(
      await page.getByRole("radio", { name: "Option 2" }).isChecked(),
    ).toBeTruthy();
  });
});
