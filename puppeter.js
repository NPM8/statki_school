const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    let consoles = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:9000',{waitUntil: 'domcontentloaded'});
    page.on('console', msg => {
        for (const arg of msg.args()) {
            consoles.push(arg);
        }
    });
    await page.screenshot({path: 'puppeter-fot/test.jpeg', type: 'jpeg', quality: 40, clip: { x: 0, y: 0, width: 400, height: 400 }});
    for (let i = 1; i <= 10; i++) {
       await page.reload({waitUntil: 'domcontentloaded'});
       await page.waitFor(1000);
        await page.screenshot({path: `puppeter-fot/test-${i}.jpeg`, type: 'jpeg', quality: 40, clip: { x: 0, y: 0, width: 400, height: 400 }});
    }
    // fs.writeFile('puppeter-fot/logs.json', JSON.stringify(consoles), err => {if (err) {throw Error(err); console.log("File writed");}});
    // console.log(consoles);
    await browser.close();
})();
