require('dotenv').config();
const axios = require('axios');

const exchangeKey = process.env.exchangeKey;
// const countryKey = countryKey;
const exchangeURL = 'http://data.fixer.io/api/latest?access_key=' + exchangeKey + '&format=1';

const getExchangeRate = (fromCurrency, toCurrency) => {
    axios.get(exchangeURL).then((response) => {
        const rate = response.data.rates;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];

        console.log(exchangeRate)
    });
}

getExchangeRate('USD', 'EUR');