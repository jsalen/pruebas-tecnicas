import React from 'react';

type FilterListProps = {
  maxPages: string;
  genres: string[];
  selectedGenre: string;
  selectedMaxPages: string;
  handleFilterChange: (type: 'maxPage' | 'genre', value: string) => void;
};

const FilterList = ({
  genres,
  maxPages,
  selectedGenre,
  selectedMaxPages,
  handleFilterChange,
}: FilterListProps) => {
  return (
    <div>
      <form className='flex gap-16'>
        <fieldset className='flex flex-col gap-1'>
          <label className='text-lg' htmlFor='maxPages'>
            Filtrar por páginas
          </label>
          <div className='flex flex-row justify-center gap-2 pt-1'>
            <input
              className='h-2 my-auto w-full cursor-pointer appearance-none rounded-lg bg-gray-200 py-1 dark:bg-gray-700'
              max={maxPages}
              name='maxPages'
              onChange={(event) => {
                handleFilterChange('maxPage', event.target.value);
              }}
              step={10}
              type='range'
              value={selectedMaxPages}
            />
            <span>
              {Number(selectedMaxPages) !== Number(-Infinity)
                ? selectedMaxPages
                : null}
            </span>
          </div>
        </fieldset>
        <fieldset className='flex flex-col gap-1'>
          <label className='text-lg' htmlFor='genre'>
            Filtrar por género
          </label>
          <select
            className='w-32 max-w-xs truncate bg-slate-100 py-1 pl-3 text-slate-900 caret-slate-900'
            name='genre'
            onChange={(event) => {
              handleFilterChange('genre', event.target.value);
            }}
            value={selectedGenre}
          >
            {genres.map((genre, idx) => {
              return <option key={`${genre}-${idx}`}>{genre}</option>;
            })}
          </select>
        </fieldset>
      </form>
    </div>
  );
};

export default FilterList;
