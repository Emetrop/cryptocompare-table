import React, { useEffect, useState } from 'react';
import axios from 'axios'

import './App.css';
import Filter from "./components/Filter";
import Table from './components/Table';

const getEndpoint = (currencies) => `https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=${currencies.join(',')}`;

const currencies = ['BTC','ETH','USDT','XRP','BCH','BNB','DOT','LINK','CRO','LTC'];

function App() {
  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(getEndpoint(currencies))
      .then(response => {

        if (response.status !== 200 || !response?.data?.RAW) {
          setError('Fetching data failed.');
          return;
        }

        const preparedData = Object.values(response.data.RAW).map(value => value.USD);

        setData(preparedData);
      })
      .catch(() => setError('Fetching data failed.'))
      .then(() => setLoading(false))
  }, []);

  return (
    <div className="app">
      {loading && "Loading.."}
      {error !== null && <div>{error}</div>}
      {!loading && !error && (
        <>
          <Filter
            currencies={currencies}
            filtered={filteredCurrencies}
            onChange={({ name, value }) => setFilteredCurrencies(value ? filteredCurrencies.filter(currency => currency !== name) : [...filteredCurrencies, name])}
          />
          <Table data={data.filter(currency => !filteredCurrencies.includes(currency.FROMSYMBOL))} />
        </>
      )}
    </div>
  );
}

export default App;
