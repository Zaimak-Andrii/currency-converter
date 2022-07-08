export const CurrencysCodeName = { USD: 'USD', EUR: 'EUR', UAH: 'UAH' };

export const findCurrencyByCodeName = (currencysList, currencyCodeName) => {
  return currencysList.find((currency) => currency.cc === currencyCodeName);
};

export const numberFormatted = (value) => Math.floor(value * 1000) / 1000;
