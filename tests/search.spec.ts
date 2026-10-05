import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";
import { admin } from "./data/users";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, admin); // for now, simply test with admin credentials
    await expect(page).toHaveURL(/\/leads$/);
  });

  //   1. - Searching by a lead's name narrows the list.
  // Expected: searching for a lead's name filters the list and only display the matching results
  test("should narrow the list of leads when searching/typing lead name", async ({
    page,
  }) => {
    await page.getByTestId("search-input").fill("Gita");
    await expect(page.getByTestId("lead-row")).toHaveCount(1); //if it passes then we know the list of leads is narrow when searching by lead's first name
    await expect(
      page.getByTestId("lead-row").filter({ hasText: "Gita Rai" }),
    ).toBeVisible();

    // we can also search by last name
    await page.getByTestId("search-input").fill("Rai");
    await expect(page.getByTestId("lead-row")).toHaveCount(2);
    //list of leads is narrow when searching by lead's last name; returns Gita Rai and Pooja Bhattarai
  });
  //   Output: the lead's list narrow when searching by first name as well as last name
// Reminder: Pick random name from the leads table for the test


  // 2. - Searching by a company name narrows the list.
  // Expected: searching for company name also narrows the list of leads rows
  test("should narrow leads rows when searching for a company name", async ({
    page,
  }) => {
    await page.getByTestId("search-input").fill("Himalkart");
    await expect(page.getByTestId("lead-row")).toHaveCount(1);
    // await expect(
    //   page.getByTestId("lead-row").filter({ hasText: "Himalkart" }),
    // ).toBeVisible();
  });
// Output: test fails, blank table when searching by company name


  //   3. - Searching for something that does not exist shows the empty state.
  //   Expected: searching non-existent string displays message like "no data found"
  test("should return no data when searching for non-existing string value inside leads table", async ({
    page,
  }) => {
    await page.getByTestId("search-input").fill("apple");
    await page.getByTestId("empty-state").isVisible();
  });
  //   Output: passed, returns empty state with "No leads found." message


  // 4. - The count text reflects how many leads are shown after a search.
  //   Expected: the count text shows the total matching leads after a search
  test("should return matching number of leads row after a search", async ({
    page,
  }) => {
    await page.getByTestId("search-input").fill("Rai");
    await expect(page.getByTestId("lead-count")).toHaveText(
      "Showing 2 of 12 leads",
    );
  });
});
// Output: test failed, count text doesn't update
