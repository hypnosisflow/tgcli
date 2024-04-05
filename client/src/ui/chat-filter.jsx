import React from 'react';
import { FilterButton } from './buttons/FilterButton';

export const ChatFilter = ({ filter, handleFilter }) => (
  <div className="flex text-sm flex-col w-full mt-8 justify-between rounded-md  ">
    <p className="text-sm font-semibold">Select time period:</p>
    <p className='text-gray-500 text-xs'>At the moment service supports limited filters.</p>
    <div className="flex text-sm items-center justify-between mt-2">
      <FilterButton cb={() => handleFilter('week')} filter={filter} text="One week" value={'week'} />
      <FilterButton cb={() => handleFilter('month')} filter={filter} text="One month" value={'month'} />
      <FilterButton cb={() => handleFilter('quater')} filter={filter} text="One quater" value={'quater'} />
    </div>
  </div>
);
