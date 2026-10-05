import { test, expect } from "@playwright/test";
import { login } from "./helpers/auth";
import { admin, agent } from "./data/users";

test.describe("Leads List", () => {
  //1. - After signing in, the correct number of leads is shown.
  //   Expected: with no leads added, the initial lead count must be 12.

  test("should display correct number of leads in the leads page", async ({
    page,
  }) => {
    await login(page, admin);
    await expect(page.getByTestId("lead-row")).toHaveCount(12);
  });
  //   Output: passed as expected. matches 12 leads which were seeded initially.


  //2. - The role badge shows the signed-in user's role.
  // Expected:if a valid admin signs in, see Admin on the nav bar
  test("should display 'Admin' on the nav bar when a valid admin signs in", async ({
    page,
  }) => {
    await login(page, admin);
    await expect(page.getByTestId("nav-role")).toHaveText(admin.role);
  });
  //   Output: passed. same text in the nav bar as mentioned in the role for Admin test data

  // Expected:if a valid agent signs in, see Agent on the nav bar
  test("should display 'Agent' on the nav bar when a valid agent signs in", async ({
    page,
  }) => {
    await login(page, agent);
    await expect(page.getByTestId("nav-role")).toHaveText(agent.role);
  });
  //   Output: passed. same text in the nav bar as mentioned in the role for Agent test data
});
