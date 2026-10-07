import { Locator, Page, expect } from "@playwright/test";

export class LeadsPage {
  constructor(private readonly page: Page) {}

  get roleBadge(): Locator {
    return this.page.getByTestId("nav-role");
  }

  get searchInput(): Locator {
    return this.page.getByTestId("search-input");
  }

  get leadCount(): Locator {
    return this.page.getByTestId("lead-count");
  }

  get leadRows(): Locator {
    return this.page.getByTestId("lead-row");
  }

  async search(
    searchTerm: string
  ): Promise<void> {
    await this.searchInput.fill(searchTerm);
  }

  getLeadRow(
    leadName: string
  ): Locator {
    return this.leadRows.filter({
      hasText: leadName,
    });
  }

  getLeadRowByEmail(email: string): Locator {
    return this.leadRows.filter({ hasText: email });
  }

  getDeleteButtonByEmail(email: string): Locator {
    return this.getLeadRowByEmail(email).getByTestId("delete-button");
  }
  async deleteLeadByEmail(email: string): Promise<void> {
    await this.getDeleteButtonByEmail(email).click();
  }

  // Add leads locators

  get addLeadButton(): Locator {
    return this.page.getByTestId("add-lead-button");
  }
  get leadModal(): Locator {
    return this.page.getByTestId("lead-modal");
  }
  get nameInput(): Locator {
    return this.page.getByTestId("name");
  }
  get emailInput(): Locator {
    return this.page.getByTestId("email");
  }
  get companyInput(): Locator {
    return this.page.getByTestId("company");
  }
  get statusSelect(): Locator {
    return this.page.getByTestId("status");
  }
  get saveButton(): Locator {
    return this.page.getByTestId("save-button");
  }

  // Add lead popup/modal actions
  async addLead(
    name: string,
    email: string,
    company: string,
    status: string,
  ): Promise<void> {
    await this.addLeadButton.click();
    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.companyInput.fill(company);
    await this.statusSelect.selectOption(status);
    await this.saveButton.click();
  }

  async expectRole(
    role: string
  ): Promise<void> {
    await expect(this.roleBadge)
      .toHaveText(role);
  }
}
