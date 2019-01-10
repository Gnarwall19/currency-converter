require('dotenv').config();
const axios = require('axios');

const exchangeKey = process.env.exchangeKey;
const exchangeURL = `http://data.fixer.io/api/latest?access_key=${exchangeKey}&format=1`;

const getExchangeRate = async (fromCurrency, toCurrency) => {

    // await keyword won't allow anything to be assigned to response until call is finished
    const response = await axios.get(exchangeURL);

    const rate = response.data.rates;
    const euro = 1 / rate[fromCurrency];
    const exchangeRate = euro * rate[toCurrency];

    if (isNaN(exchangeRate)) {
        throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
    };

    return exchangeRate;

    /*
    NOW ALL OF THIS NESTING IS NO LONGER NEEDED

    axios.get(exchangeURL).then((response) => {
        const rate = response.data.rates;
        const euro = 1 / rate[fromCurrency];
        const exchangeRate = euro * rate[toCurrency];

        console.log(exchangeRate)
    });
    */
};

getCountries = async (toCurrency) => {

    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`);

        return response.data.map(country => country.name);

    } catch (error) {
        throw new Error(`Unable to get countries that use ${toCurrency}`);
    };

};

const convertCurrency = async (fromCurrency, toCurrency, amount) => {
    const countries = await getCountries(toCurrency);
    const exchangeRate = await getExchangeRate(fromCurrency, toCurrency);
    const convertedAmount = (amount * exchangeRate).toFixed(2);

    return `${amount} ${fromCurrency} is worth ${convertedAmount} ${toCurrency}.
    \nThis currency can be spent in the following countries:\n${countries}`;
};

convertCurrency('USD', 'EUR', 30).then((message) => {
    console.log(message);
});