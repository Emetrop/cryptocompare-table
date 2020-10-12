import React from 'react';
import {render} from '@testing-library/react';
import Table from '.';

const data = [
  {
    FROMSYMBOL: "Currency 1",
    PRICE: 111,
    OPENDAY: 222,
    CHANGEPCTDAY: 333,
    CHANGEDAY: 444,
  },
  {
    FROMSYMBOL: "Currency 2",
    PRICE: 555,
    OPENDAY: 666,
    CHANGEPCTDAY: 777,
    CHANGEDAY: 888,
  },
];

test('renders header', () => {
  const {getByText} = render(<Table data={data} />);

  let linkElement = getByText('Coin Name');
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText('Current Price (USD)');
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText('Opening Price (USD)');
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText(/Price Increase/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders data', () => {
  const {getByText} = render(<Table data={data} />);

  let linkElement = getByText('Currency 1');
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText(/111/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText(/222/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText(/333/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText(/444/i);
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText('Currency 2');
  expect(linkElement).toBeInTheDocument();
});
