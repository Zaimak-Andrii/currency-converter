import { MenuItem, Select, TextField } from '@mui/material';
import React from 'react';
import { CurrencysCodeName } from '../Utils';
import PropTypes from 'prop-types';

const CurrencyItem = ({ type, amount = 0, codeName, setCurrency, convertCurrency }) => {
  const onChange = (evt) => {
    if (evt.target.tagName === 'INPUT') {
      setCurrency((prev) => {
        return { ...prev, amount: evt.target.value };
      });
      convertCurrency({ type, amount: evt.target.value, codeName: codeName });
    } else {
      setCurrency((prev) => {
        return { ...prev, codeName: evt.target.value };
      });
      convertCurrency({ type, amount: amount, codeName: evt.target.value });
    }
  };

  return (
    <>
      <TextField variant='outlined' type='number' value={amount} onChange={onChange} sx={{ marginRight: '10px' }} />

      <Select value={codeName} onChange={onChange} sx={{ minWidth: '100px' }}>
        {Object.keys(CurrencysCodeName).map((key, index) => {
          const cc = CurrencysCodeName[key];
          return (
            <MenuItem value={cc} key={index}>
              {cc}
            </MenuItem>
          );
        })}
      </Select>
    </>
  );
};

CurrencyItem.propTypes = {
  type: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  codeName: PropTypes.string.isRequired,
  setCurrency: PropTypes.func.isRequired,
  convertCurrency: PropTypes.func.isRequired,
};

export default CurrencyItem;
