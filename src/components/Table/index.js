import React, { useMemo } from 'react';
import { useTable, useSortBy } from "react-table";

import './styles.css';

const formatNumber = (price) => price.toFixed(2).toLocaleString('en-US');

const columns = [
  {
    Header: "Coin Name",
    accessor: "FROMSYMBOL",
  },
  {
    Header: "Current Price (USD)",
    accessor: "PRICE",
    Cell: ({ value }) => `$${formatNumber(value)}`,
  },
  {
    Header: "Opening Price (USD)",
    accessor: "OPENDAY",
    Cell: ({ value }) => `$${formatNumber(value)}`,
  },
  {
    Header: "Price Increase",
    accessor: "CHANGEPCTDAY",
    Cell: ({ value, row }) => `${formatNumber(value)}% ($${formatNumber(row.original.CHANGEDAY)})`,
  },
];

function Table({ data }) {
  const memoData = useMemo(() => data, [data]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: memoData,
      initialState: {
        sortBy: [
          {
            id: 'CHANGEPCTDAY',
            desc: true,
          }
        ]
      }
    },
    useSortBy,
  );

  return (
      <table {...getTableProps()} className="table">
        <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th className="table__header" {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                {column.isSorted && column.isSortedDesc && '↓'}
                {column.isSorted && !column.isSortedDesc && '↑'}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody className="table__body" {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr className="table__row" {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td className="table__cell" {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
        </tbody>
      </table>
  );
}

export default Table;
