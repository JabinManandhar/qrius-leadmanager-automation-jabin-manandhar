import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { LeadsPage } from "../pages/LeadsPage";

type PageFixtures = {
  loginPage: LoginPage;
  leadsPage: LeadsPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  leadsPage: async ({ page }, use) => {
    await use(new LeadsPage(page));
  },
});

export { expect } from "@playwright/test";
