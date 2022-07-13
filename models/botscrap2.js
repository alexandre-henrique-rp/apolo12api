const puppeteer = require('puppeteer');


const botscrap = async (cnpj) => {

    const browser = await puppeteer.launch({
        headless: true        
    });
    const page = await browser.newPage();
    await page.goto('https://consultarcnpj.com.br/');
    await page.waitForSelector('figure[class="wp-block-image size-full"]');
    await page.type('input[class="form-control cnpj_search"]', cnpj, { delay: 155 });
    await page.waitForTimeout(1000);


    //raspagem
    await page.waitForSelector('div[class="cnpj-control cnpj_info"]');
    const grip = await page.$eval('div[class="panel panel-default resultado-cnpj form_cnpj"] > div[class="panel-body"] > div[class="cnpj-control input-sn"] > span[class="cnpj_razao"] ', span => span.innerText);
    await browser.close();

    try {
        if (grip === undefined || "" || null) {
            console.log('sistema indisponível')
            return 'sistema indisponível'
        } else {
            console.log(grip)
            return grip;
        }

    } catch (error) {
        if (grip === undefined || "" || null) {
            console.log('sistema indisponível')
            return 'sistema indisponível'
        }
        console.log(error)
    }
}
module.exports = botscrap;

