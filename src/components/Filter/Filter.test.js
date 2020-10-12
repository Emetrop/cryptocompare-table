import React from 'react';
import {render} from '@testing-library/react';
import Filter from '.';

const currencies = ["Currency 1", "Currency 2"];

test('renders filter', () => {
  const {getByText} = render(<Filter currencies={currencies} filtered={[]} onChange={() => true}/>);

  let linkElement = getByText('Filter');
  expect(linkElement).toBeInTheDocument();
});

test('renders currencies', () => {
  const {getByText} = render(<Filter currencies={currencies} filtered={[]} onChange={() => true}/>);

  let linkElement = getByText('Currency 1');
  expect(linkElement).toBeInTheDocument();

  linkElement = getByText('Currency 2');
  expect(linkElement).toBeInTheDocument();
});

test('uncheck filtered', () => {
  const {getByText} = render(<Filter currencies={currencies} filtered={['Currency 2']} onChange={() => true}/>);

  let linkElement = getByText('Currency 1').children[0];
  expect(linkElement).toBeChecked();

  linkElement = getByText('Currency 2').children[0];
  expect(linkElement).not.toBeChecked();
});
