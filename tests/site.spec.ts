import { test, expect } from "@playwright/test";
test("semantic page, local assets and internal navigation", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
  await expect(page.locator("#pwb-body-wrap")).toHaveCSS("opacity", "1");
  expect(
    await page.evaluate(
      () => document.documentElement.scrollHeight > innerHeight,
    ),
  ).toBe(true);
  await expect(page.locator("main")).toHaveCount(1);
  await page
    .locator("header")
    .getByRole("link", { name: "Pricing", exact: true })
    .click();
  await expect(page).toHaveURL(/#ilwyn-2-2-2-3$/);
  expect(await page.locator("iframe").count()).toBe(0);
  expect(errors).toEqual([]);
});
test("mobile keyboard menu restores focus and prevents overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open menu" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});
test("scene loading and failed request leave content available", async ({
  page,
}) => {
  await page.route("**/scene/agency-scene.json*", (route) => route.abort());
  await page.goto("/");
  await expect(page.locator('[data-scene-status="error"]')).toBeAttached();
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});
