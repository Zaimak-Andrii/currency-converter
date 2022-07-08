import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCurrencysRate } from './store/currencySlice';
import Header from './components/header';
import { Box } from '@mui/material';
import Converter from './components/converter';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencysRate());
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Header />
      <Converter />
    </Box>
  );
}

export default App;
