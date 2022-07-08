import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CurrencysCodeName } from '../Utils';

const initialState = {
  currencysRateList: [],
};

export const fetchCurrencysRate = createAsyncThunk('currency/fetchCurrencysRate', async () => {
  const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');

  return response.json();
});

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrencysRate.fulfilled, (state, action) => {
      state.currencysRateList = action.payload.filter(
        (currency) => currency.cc === CurrencysCodeName.EUR || currency.cc === CurrencysCodeName.USD
      );
    });
  },
});

// Action creators are generated for each case reducer function
//export const {} = currencySlice.actions;

export default currencySlice.reducer;
