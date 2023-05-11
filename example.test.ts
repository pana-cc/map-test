import { describe, test } from "@jest/globals";
import "chromedriver";
import * as webdriver from "selenium-webdriver";

describe("Example tests", () => {
    let driver: webdriver.WebDriver;

    const findMapLabel = (name: string) =>
        driver.findElement(
            webdriver.By.xpath(
                `//*[local-name()='svg' and contains(@class, "svg-layer") and contains(@class, "vm-labels")]` +
                `//*[local-name()='tspan' and text()="${name}"]`));
    const clickMapLabel = (name: string) => findMapLabel(name).click();
    const zoomInMapLabel = async (name: string) =>
        await (<any>driver).actions({ async: true })
            .scroll(0, 0, 0, -300, await findMapLabel(name))
            .perform();

    const delay = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));
    const pauseForASecond = () => delay(1000);
    const pauseForTenMinutes = () => delay(10 * 60 * 1000);

    beforeAll(async () => {
        driver = await
            new webdriver.Builder()
            .forBrowser('chrome')
            .build();
    });

    afterAll(async () => {
        await driver.close();
    });

    test("Test 1", async () => {
        await driver.navigate().to("https://staging.ecosystem.guide/maps/bucks-strategy/_base");
        await pauseForASecond();

        await clickMapLabel("Individuals");
        await pauseForASecond();
        
        await zoomInMapLabel("Individuals");
        await pauseForASecond();

        await zoomInMapLabel("Individuals");
        await pauseForASecond();

        // To use the dev tools and inspect elements...
        // await pauseForTenMinutes();
    }, 15 * 60000);
});
