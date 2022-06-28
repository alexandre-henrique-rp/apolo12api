const puppeteer = require('puppeteer');


const botscrap = async (cnpj) => {
    
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    await page.goto('https://www.situacao-cadastral.com/');
    await page.waitFor('input[name="doc"]');
    await page.type('input[name="doc"]', cnpj, { delay: 155 });
    await page.keyboard.press('Enter');

    //raspagem
    await page.waitFor('#resultado');
    const grip = await page.$eval('div[id="resultado"] > span > i', i => i.innerText);
    console.log(grip)
    await browser.close();
    
    try {
        console.log(grip)
        return grip;
    } catch (error) {
        console.log(error)
    }
}
module.exports = botscrap;

