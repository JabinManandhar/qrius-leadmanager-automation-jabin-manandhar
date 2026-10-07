import { Page } from "@playwright/test";
import { TestUser } from "../../test-data/users";

export async function login(page: Page, user: TestUser): Promise<void> {
  await page.goto("/login");
  await page.getByTestId("username").fill(user.username);
  await page.getByTestId("password").fill(user.password);
  await page.getByTestId("login-button").click();
}
