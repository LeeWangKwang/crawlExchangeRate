const rp = require('request-promise');
const cheerio = require('cheerio');

(async function crawl() {
  try {
    const USDKRWRate = await getExchangeRate()
    // change text to number
    console.log(USDKRWRate.replace(",","")*1);

    // TODO save exchangeRate to dynamodb

  } catch (err) {
    console.log(err);
  }
}());

async function getExchangeRate(type = "USDKRW") {
  const options = {
    uri: `https://finance.naver.com/marketindex/exchangeDegreeCountQuote.nhn?marketindexCd=FX_${type}`,
    transform: function (body) {
          return cheerio.load(body);
      }
  }

  const exchangeRate = await rp(options)
      .then(function ($) {

        return parse($)
      })
      .catch(function (err) {
          console.log(err);
      });
  return exchangeRate

}

const parse = function parseExchangeRate($) {

  return exchangeRate = $('.up .num').first().text();
}
