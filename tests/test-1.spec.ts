import { test, expect } from '@playwright/test';

// Automatically generated code by codegen upon recording
// using codegen to get list of locators; will cleanup later

test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/login');
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('admin.qrius');
  await page.getByTestId('username').press('Tab');
  await page.getByTestId('password').fill('Admin@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('nav-role').click();
  await page.getByTestId('logout-button').click();
  await page.getByTestId('username').click();
  await page.getByTestId('username').fill('agent.qrius');
  await page.getByTestId('username').press('Tab');
  await page.getByTestId('password').fill('Agent@123');
  await page.getByTestId('login-button').click();
  await page.getByTestId('nav-role').click();
  await page.getByRole('heading', { name: 'Leads' }).click();
});