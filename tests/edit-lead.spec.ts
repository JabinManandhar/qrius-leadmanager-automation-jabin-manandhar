import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";
import { admin } from "./data/users";

test.describe("Edit lead status and display correct status", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin); // for now, simply test with admin credentials
    await expect(page).toHaveURL(/\/leads$/);
  });

  // - Editing a lead's status updates it in the list.

  // Expected: after editing the lead status, it should appear on the lead's list with updated status
  test("should display correct lead status after editing a lead's status", async ({
    page,
  }) => {
    const row = page
      .getByTestId("lead-row")
      .filter({ hasText: "bikash@daraz.com.np" }); //using email, since there could be similar names, but emails are usually unique for each (preferred:use unique id for the person when available)

    await expect(row.getByTestId("lead-status")).toHaveText("New"); // Bikash's initial status: "New" as per the first seeded leads lists
    await row.getByTestId("edit-button").click();
    await expect(page.getByTestId("lead-modal")).toBeVisible();
    await page.getByTestId("status").selectOption("Qualified");
    await page.getByTestId("save-button").click();
    await expect(page.getByTestId("lead-modal")).toBeHidden(); //the modal is removed from DOM so use toBeHidden
    await expect(row.getByTestId("lead-status")).toHaveText("Qualified"); //check if Bikash's initial status (New) appears as 'Qualified' after editing his status
  });

  // (Optional) Expected: if the user clicks cancel after clicking 'Edit' button, the lead's status must remain the same. only increment the lead row count by 1, when adding a lead.
  test("should display same status after if users clicks Cancel on the modal", async ({
    page,
  }) => {
    const row = page
      .getByTestId("lead-row")
      .filter({ hasText: "bikash@daraz.com.np" });

    await expect(row.getByTestId("lead-status")).toHaveText("Qualified"); // Bikash's initial status now "Qualified" due to the first test
    await row.getByTestId("edit-button").click();
    await expect(page.getByTestId("lead-modal")).toBeVisible();
    await page.getByTestId("status").selectOption("New");
    await page.getByTestId("cancel-button").click();
    await expect(page.getByTestId("lead-modal")).toBeHidden();
    await expect(row.getByTestId("lead-status")).toHaveText("Qualified"); //check if Bikash has the same 'Qualified' status after cancelling status edit
  });
  // Output: test passed, the status remains the same if clicked Edit and clicked Cancel
});
