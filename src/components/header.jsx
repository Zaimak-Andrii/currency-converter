import React from 'react';
import { AppBar, Typography } from '@mui/material';
import { Container } from '@mui/system';

import { useSelector } from 'react-redux';
import { CurrencysCodeName, findCurrencyByCodeName } from '../Utils';

export default function Header() {
  const { currencysRateList } = useSelector((state) => state.currency);

  return (
    <AppBar component='nav' position='static' sx={{ flexDirection: 'row', padding: '10px', alignItems: 'center' }}>
      <Typography variant='h6' component='div' sx={{ width: '100%' }}>
        Currency converter
      </Typography>

      <Container sx={{ textAlign: 'right' }}>
        {Object.keys(CurrencysCodeName).map((key, index) => {
          const cc = CurrencysCodeName[key];
          if (cc === CurrencysCodeName.UAH) return '';
          const rate = findCurrencyByCodeName(currencysRateList, cc)?.rate;

          return <Typography key={index}>{`1 ${cc} = ${rate ? rate : '...'}`}</Typography>;
        })}
      </Container>
    </AppBar>
  );
}
