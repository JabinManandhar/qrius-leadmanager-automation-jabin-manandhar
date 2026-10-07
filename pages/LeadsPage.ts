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

  async expectRole(
    role: string
  ): Promise<void> {
    await expect(this.roleBadge)
      .toHaveText(role);
  }
}