import puppeteer from 'puppeteer';
import {
  afterAll, beforeAll, describe, expect, test,
} from '@jest/globals';
import ValidatorCard from '../src/js/ValidatorCard';

describe('validateForm', () => {
  let browser; let
    page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });

    page = await browser.newPage();
  }, 15000);

  afterAll(async () => {
    await browser.close();
  }, 15000);

  test('Форма загружена', async () => {
    await page.goto('http://localhost:8080');

    await page.waitForSelector('form');
  }, 20000);

  test.each`
    typingCardNumber
    ${'4916604236086017'}
    ${'6011854270513967'}
    ${'36039290664917'}
  `(
    'Активируется валидная иконка платежной системы',
    async ({ typingCardNumber }) => {
      await page.goto('http://localhost:8080');

      const paySystem = await ValidatorCard.validatePaymentSystems(typingCardNumber);

      const form = await page.$('form');
      const input = await form.$('input');

      await input.type(typingCardNumber);

      const iconPaySystemClasses = new Set(
        await page.$eval(
          `#${paySystem}`,
          (el) => [...el.classList],
        ),
      );

      expect(iconPaySystemClasses.has(paySystem)).toBe(false);
    },
    15000,
  );

  test.each`
    typingCardNumber
    ${'4916604236086017'}
    ${'6011854270513967'}
    ${'5121116822292931'}
    ${'5477358436163609'}
    ${'5406081712672889'}
  `(
    'После нажатия кнопки, добавляется <p> с сообщением',
    async ({ typingCardNumber }) => {
      await page.goto('http://localhost:8080');

      const form = await page.$('form');
      const input = await form.$('input');
      const btn = await form.$('button');

      await input.type(typingCardNumber);
      await btn.click();

      const p = await page.$('p');
      const textContent = await p.evaluate((el) => el.textContent);

      expect(textContent.trim()).toBe(`Номер карты ${typingCardNumber} валидный`);
    },
    15000,
  );
});
