import React from 'react';

import './styles.css';

const Filter = ({currencies, onChange, filtered}) => !currencies?.length
  ? null
  : (
    <div className="filter">
      <h3 className="filter__title">Filter</h3>
      <ul className="filter__list">
        {currencies.map(currency => (
          <li className="filter__item" key={currency}>
            <label>
              <input
                type="checkbox"
                name={currency}
                checked={!filtered.includes(currency)}
                onChange={({target}) => onChange({value: target.checked, name: currency})}/>
              {currency}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );

export default Filter;
