import { Container, Typography } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { CurrencysCodeName, findCurrencyByCodeName, numberFormatted } from '../Utils';
import CurrencyItem from './currencyItem';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

export default function Converter() {
  const { currencysRateList } = useSelector((state) => state.currency);

  const [currencyFrom, setCurrencyFrom] = useState({ type: 'from', amount: 0, codeName: CurrencysCodeName.UAH });
  const [currencyTo, setCurrencyTo] = useState({ type: 'to', amount: 0, codeName: CurrencysCodeName.USD });

  const calculateAmount = ({ currency, amount, codeName }) => {
    let updatedAmount = 0;

    if (currency.codeName === codeName) {
      updatedAmount = amount;
    } else if (codeName === CurrencysCodeName.UAH) {
      updatedAmount = amount / findCurrencyByCodeName(currencysRateList, currency.codeName).rate;
    } else {
      updatedAmount =
        (amount * findCurrencyByCodeName(currencysRateList, codeName).rate) /
        (currency.codeName === CurrencysCodeName.UAH
          ? 1
          : findCurrencyByCodeName(currencysRateList, currency.codeName).rate);
    }

    return updatedAmount;
  };

  const convertCurrency = ({ type, amount, codeName }) => {
    if (type === 'from') {
      setCurrencyTo((prev) => ({
        ...prev,
        amount: numberFormatted(calculateAmount({ currency: prev, amount, codeName })),
      }));
    } else {
      if (codeName !== currencyTo.codeName) {
        setCurrencyTo((prev) => ({
          ...prev,
          amount: numberFormatted(
            calculateAmount({ currency: prev, amount: currencyFrom.amount, codeName: currencyFrom.codeName })
          ),
        }));
      } else {
        setCurrencyFrom((prev) => ({
          ...prev,
          amount: numberFormatted(calculateAmount({ currency: prev, amount, codeName })),
        }));
      }
    }
  };

  useEffect(() => {
    const rate = findCurrencyByCodeName(currencysRateList, CurrencysCodeName.USD)?.rate;

    if (!rate) return;

    setCurrencyFrom((prev) => ({ ...prev, amount: 1 }));
    setCurrencyTo((prev) => ({ ...prev, amount: numberFormatted(1 / rate) }));
  }, [currencysRateList]);

  return (
    <Container component='main' sx={{ marginTop: '20px', textAlign: 'center' }}>
      <Typography variant='h5' sx={{ marginBottom: '10px' }}>
        Convert
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <CurrencyItem {...currencyFrom} setCurrency={setCurrencyFrom} convertCurrency={convertCurrency} />
        <CompareArrowsIcon sx={{ margin: 'auto 20px', justifyItems: 'center' }} />
        <CurrencyItem {...currencyTo} setCurrency={setCurrencyTo} convertCurrency={convertCurrency} />
      </Container>
    </Container>
  );
}
