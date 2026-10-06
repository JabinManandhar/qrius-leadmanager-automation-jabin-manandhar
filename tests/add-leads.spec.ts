import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";
import { admin } from "./data/users";

// Task: Adding a lead with a chosen status saves that lead with that status and appears in the leads list
test.describe("Add a lead", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin); // for now, simply test with admin credentials; agent can also add leads
    await expect(page).toHaveURL(/\/leads$/);
  });

  // Expected: adding a lead with status saves the lead with "Qualified" status, and likewise for other status
  test("should add a lead with status 'New' and appear on the lead's list with status 'New'", async ({
    page,
  }) => {
    await page.getByTestId("add-lead-button").click();

    // checking if the modal is visible first
    const leadModal = page.getByTestId("lead-modal");
    await expect(leadModal).toBeVisible();

    const id = Date.now(); //using a unique id since we will be running multiple tests

    await leadModal.getByTestId("name").fill(`test new ${id}`);
    await leadModal.getByTestId("email").fill(`test.new@email.com`);
    await leadModal.getByTestId("company").fill("XYZ");
    await leadModal.getByTestId("status").selectOption("New");
    await leadModal.getByTestId("save-button").click();
    await expect(leadModal).not.toBeVisible();
    const newLeadRow = page.getByTestId("lead-row").filter({
      hasText: `test new ${id}`, //finds the exact lead
    });
    await expect(newLeadRow).toBeVisible(); //check the newly created lead is visible now in the leads table
    await expect(newLeadRow.getByTestId("lead-status")).toHaveText("New"); //checking if newly created lead has the 'New' status
  });
  // Output: test passed. newly created lead has status 'New' and appears on the leads list.

  test("should add a lead with status 'Contacted' and appear on the lead's list with status 'Contacted'", async ({
    page,
  }) => {
    await page.getByTestId("add-lead-button").click();

    // checking if the modal is visible first
    const leadModal = page.getByTestId("lead-modal");
    await expect(leadModal).toBeVisible();

    const id = Date.now(); //using a unique id since we will be running multiple tests

    await leadModal.getByTestId("name").fill(`test contacted ${id}`);
    await leadModal.getByTestId("email").fill(`test.contacted@email.com`);
    await leadModal.getByTestId("company").fill("XYZ");
    await leadModal.getByTestId("status").selectOption("Contacted");
    await leadModal.getByTestId("save-button").click();
    await expect(leadModal).not.toBeVisible();
    const newLeadRow = page.getByTestId("lead-row").filter({
      hasText: `test contacted ${id}`, //finds the exact lead
    });
    await expect(newLeadRow).toBeVisible(); //check the newly created lead is visible now in the leads table
    await expect(newLeadRow.getByTestId("lead-status")).toHaveText("Contacted"); //checking if newly created lead has the 'Contacted' status
  });
  // Output: test failed. new lead is created but has the "New" status instead of "Contacted"

  test("should add a lead with status 'Qualified' and appear on the lead's list with status 'Qualified'", async ({
    page,
  }) => {
    await page.getByTestId("add-lead-button").click();

    // checking if the modal is visible first
    const leadModal = page.getByTestId("lead-modal");
    await expect(leadModal).toBeVisible();

    const id = Date.now(); //using a unique id since we will be running multiple tests

    await leadModal.getByTestId("name").fill(`test qualified ${id}`);
    await leadModal.getByTestId("email").fill(`test.qualified@email.com`);
    await leadModal.getByTestId("company").fill("XYZ");
    await leadModal.getByTestId("status").selectOption("Qualified");
    await leadModal.getByTestId("save-button").click();
    await expect(leadModal).not.toBeVisible();
    const newLeadRow = page.getByTestId("lead-row").filter({
      hasText: `test qualified ${id}`, //finds the exact lead
    });
    await expect(newLeadRow).toBeVisible(); //check the newly created lead is visible now in the leads table
    await expect(newLeadRow.getByTestId("lead-status")).toHaveText("Qualified"); //checking if newly created lead has the 'Contacted' status
  });
  // Output: test failed. new lead is created but has the "New" status instead of "Qualified"

  test("should add a lead with status 'Lost' and appear on the lead's list with status 'Lost'", async ({
    page,
  }) => {
    await page.getByTestId("add-lead-button").click();

    // checking if the modal is visible first
    const leadModal = page.getByTestId("lead-modal");
    await expect(leadModal).toBeVisible();

    const id = Date.now(); //using a unique id since we will be running multiple tests

    await leadModal.getByTestId("name").fill(`test lost ${id}`);
    await leadModal.getByTestId("email").fill(`test.lost@email.com`);
    await leadModal.getByTestId("company").fill("XYZ");
    await leadModal.getByTestId("status").selectOption("Lost");
    await leadModal.getByTestId("save-button").click();
    await expect(leadModal).not.toBeVisible();
    const newLeadRow = page.getByTestId("lead-row").filter({
      hasText: `test lost ${id}`, //finds the exact lead
    });
    await expect(newLeadRow).toBeVisible(); //check the newly created lead is visible now in the leads table
    await expect(newLeadRow.getByTestId("lead-status")).toHaveText("Lost"); //checking if newly created lead has the 'Contacted' status
  });
  // Output: test failed. new lead is created but has the "New" status instead of "Lost"
});

// Reminder: for each status, certain code is repeated. Need to find a way to refactor it.
