import type React from 'react';

interface Column {
  header: string;
  accessor: string;
}

interface TableProps {
  columns: Column[];
  data: any[];
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full bg-white'>
        <thead>
          <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
            {columns.map((column) => (
              <th key={column.accessor} className='py-3 px-6 text-left'>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='text-gray-600 text-sm font-light'>
          {data.map((row, index) => (
            <tr
              key={index}
              className='border-b border-gray-200 hover:bg-gray-100'
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className='py-3 px-6 text-left whitespace-nowrap'
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
