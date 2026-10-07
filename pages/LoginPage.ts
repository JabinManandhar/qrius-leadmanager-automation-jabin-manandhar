import { Page } from "@playwright/test";
import { User } from "../test-data/users";

export class LoginPage {
  constructor(private readonly page: Page) {}

  async goto(): Promise<void> {
    await this.page.goto("/login");
  }

  async login(user: User): Promise<void> {
    await this.page.getByTestId("username").fill(user.username);
    await this.page.getByTestId("password").fill(user.password);

    await this.page
      .getByRole("button", {
        name: "Sign in",
      })
      .click();
  }
}
