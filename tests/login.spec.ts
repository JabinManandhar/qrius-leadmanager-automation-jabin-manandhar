import { test, expect } from "@playwright/test";

//Using describe block to group related tests
test.describe("Login", () => {
  // since we will need to login each time, we can use the "beforeEach" hook for login
  test.beforeEach(async ({ page }) => {
    await page.goto("/login");
  });
  // 1. - The login page title is correct.
  // Expected: the login page displays "Qrius Lead Manager"
  test("should display correct page title on the login page", async ({
    page,
  }) => {
    await expect(page).toHaveTitle("Qrius Lead Manager");
  });
  // Output: passed

  // 2. - A valid admin signs in and reaches the Leads page.
  // Expected: user with valid admin username and admin password can sign in and enters the Leads page. (/leads)
  test("should reach leads page with valid admin credentials", async ({
    page,
  }) => {
    await page.getByTestId("username").fill("admin.qrius");
    await page.getByTestId("password").fill("Admin@123");
    await page.getByTestId("login-button").click();
    // await expect(page).toHaveURL(/leads/); //this could mean the test works if "leads" appears anywhere in the URL
    await expect(page).toHaveURL(/\/leads$/); //check exact match for URL ending with /leads; nothing after /leads
  });
  // Output: valid admin successfully reaches Leads page

  // 3. - A valid agent signs in and sees their role.
  // Expected: When user with valid agent credentials signs in, he/she sees the Agent role in the leads page
  test("should display 'Agent' inside the Leads page after valid agent login", async ({
    page,
  }) => {
    await page.getByTestId("username").fill("agent.qrius");
    await page.getByTestId("password").fill("Agent@123");
    await page.getByTestId("login-button").click();
    await expect(page).toHaveURL(/\/leads$/); //strict match for "/leads" in the URL
    await expect(page.getByTestId("nav-role")).toHaveText("AGENT");
  });
  // Output: passed as expected

  // 4. - A wrong password shows the error message and stays on the login page.
  // Expected: when entering wrong password, display some type of error message and stay on login page

  test("should display error message on wrong password and stay on login page", async ({
    page,
  }) => {
    await page.getByTestId("username").fill("agent.qrius");
    await page.getByTestId("password").fill("123");
    await page.getByTestId("login-button").click();
    // await expect(page).toHaveURL(/login/); //check the url
    await expect(page).toHaveURL(/\/login$/); //strict match for "/login" in the URL
    await expect(page.getByTestId("login-error")).toHaveText(
      "Invalid username or password",
    );
  });
  // Output: passed; got the error message and still on the login page
});
