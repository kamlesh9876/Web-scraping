import React from 'react';

export interface TableColumn<T> {
  key: keyof T;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: TableColumn<T>[];
  className?: string;
  emptyMessage?: string;
}

export const Table = <T,>({
  data,
  columns,
  className = '',
  emptyMessage = 'No data available',
}: TableProps<T>) => {
  if (!data || data.length === 0) {
    return React.createElement(
      'div',
      {
        className: `text-center py-8 text-gray-500 ${className}`,
      },
      emptyMessage
    );
  }

  const renderCell = (column: TableColumn<T>, row: T) => {
    const value = row[column.key];
    return column.render ? column.render(value, row) : String(value || '');
  };

  const renderHeader = (column: TableColumn<T>) => {
    return React.createElement(
      'th',
      {
        key: String(column.key),
        className: 'px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200',
      },
      column.header
    );
  };

  const renderRow = (row: T, index: number) => {
    return React.createElement(
      'tr',
      {
        key: index,
        className: index % 2 === 0 ? 'bg-white' : 'bg-gray-50',
      },
      columns.map(column =>
        React.createElement(
          'td',
          {
            key: String(column.key),
            className: 'px-4 py-2 text-sm text-gray-900 border-b border-gray-100',
          },
          renderCell(column, row)
        )
      )
    );
  };

  return React.createElement(
    'div',
    {
      className: `overflow-hidden shadow ring-1 ring-gray-200 rounded-lg ${className}`,
    },
    React.createElement(
      'table',
      {
        className: 'min-w-full divide-y divide-gray-200',
      },
      React.createElement(
        'thead',
        {
          className: 'bg-gray-50',
        },
        React.createElement(
          'tr',
          null,
          columns.map(renderHeader)
        )
      ),
      React.createElement(
        'tbody',
        {
          className: 'bg-white divide-y divide-gray-200',
        },
        data.map(renderRow)
      )
    )
  );
};
