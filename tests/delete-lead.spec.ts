import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";
import { admin, agent } from "../test-data/users";

test.describe("verify if only admin can delete the lead but agent cannot", () => {
  // 1. - An admin can delete a lead and the row disappears.
  // Expected: after admin deletes the lead, the lead's row disappears
  test("should make the lead's row disappear after admin deletes the lead", async ({
    page,
  }) => {
    await login(page, admin); //signing in with admin credentials
    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByTestId("nav-role")).toHaveText("ADMIN");

    const leadRow = page
      .getByTestId("lead-row")
      .filter({ hasText: "bikash@daraz.com.np" });

    await expect(leadRow).toHaveCount(1); //lead's row count before deleting
    await leadRow.getByRole("button", { name: "Delete" }).click(); //Delete Bikash's row
    // After deleting
    await expect(leadRow).toHaveCount(0);

    await expect(page.getByTestId("lead-row")).toHaveCount(11); //initial count is 12
  });
  // Output: test passes as expected, the admin can delete a lead row and it disappears from the list.

  // 2. - An agent does not see a delete button.
  // Expected: After signing in with agent credentials, the delete button is not visible in the dashboard.
  test("should hide the delete button if an agent signs in", async ({
    page,
  }) => {
    await login(page, agent); //signing in with admin credentials
    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByTestId("nav-role")).toHaveText("AGENT");

    await expect(
      page.getByRole("button", { name: "Delete" }),
    ).toBeHidden();

    // Alternative solution: count of Delete button is zero in the entire table
    // await expect(page.getByTestId("delete-button")).toHaveCount(0);
  });

  // Output: test passes, the agent doesn't find any 'Delete' button in the after login
});
