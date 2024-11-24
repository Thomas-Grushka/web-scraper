import puppeteer from "puppeteer";

const PAGE_PUPPETEER_OPTS = {
  networkIdle2Timeout: 3000,
  // waitUntil: 'networkidle2',
  waitUntil: "domcontentloaded",
  timeout: 3000000,
};

const scrapeFromAvito = async ({ cityName, scope }) => {
  const pageLink = `https://www.avito.ru/${cityName}/vakansii`;

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 100,
  });

  const page = await browser.newPage();

  await page.goto(pageLink, PAGE_PUPPETEER_OPTS);

  await page.setViewport({ width: 1080, height: 1024 });

  const [showMoreScopeLink] = await page.$$(
    '[data-marker="params[711]/show-button"]'
  );
  await showMoreScopeLink.click();

  const [, scopeListContainer] = await page.$$(
    ".expand-list-root-lae2Q.expand-list-scroll-lqEyS"
  );

  await scopeListContainer.evaluate((el) => (el.style.maxHeight = "none"));
  await scopeListContainer.evaluate((el) => (el.style.height = "auto"));
  await scopeListContainer.evaluate((el) => (el.style.overflowX = "auto"));

  const [, scopeListWrapper] = await page.$$(
    ".expand-list-root-lae2Q.expand-list-scroll-lqEyS > .virtualized-list-viewPortElement-BqeKB"
  );

  await scopeListWrapper.evaluate((el) => (el.style.maxHeight = "none"));
  await scopeListWrapper.evaluate((el) => (el.style.height = "auto"));
  await scopeListWrapper.evaluate((el) => (el.style.overflowX = "auto"));

  const elements = await page.$$(
    ".expand-list-root-lae2Q.expand-list-scroll-lqEyS > .virtualized-list-viewPortElement-BqeKB > div"
  );

  await elements[4].evaluate((el) => (el.style.height = "auto"));

  for(const dataMarker of scope) {
    const selector = `[data-marker="${dataMarker}"]`;
    await page.waitForSelector(selector);
    await page.click(selector);
  }

  await page.click('[data-marker="search-filters/submit-button"]');

  await page.waitForNavigation();
  const link = page.url();

  await browser.close();

  return `${link}&s=104`;
};

export default scrapeFromAvito;
