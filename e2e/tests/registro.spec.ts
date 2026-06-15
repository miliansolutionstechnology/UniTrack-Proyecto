import { test, expect } from '@playwright/test';

test('Registro page has form and required fields', async ({ page }) => {
  await page.goto('/registro');
  await expect(page.locator('text=Registro e Inscripción')).toBeVisible();
  await expect(page.locator('input[formcontrolname="nombres"]')).toBeVisible();
  await expect(page.locator('input[formcontrolname="apellidos"]')).toBeVisible();
  await expect(page.locator('input[formcontrolname="correo"]')).toBeVisible();
  await expect(page.locator('button:has-text("Registrar e Inscribirse")')).toBeVisible();
});
