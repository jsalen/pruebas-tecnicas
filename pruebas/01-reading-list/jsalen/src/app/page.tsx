'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Library } from '@/types';
import { useFetchResource, useLocalStorage } from '@/hooks';
import { filteredBooks, getGenres, getMaximumPages } from '@/utils';
import { ListOfBooks } from '@/components/ListOfBooks';
import StoredBooks from '@/components/StoredBooks';
import FilterList from '@/components/FilterList';

export default function Home() {
  const [genres, setGenres] = useState<string[]>([]);
  const [maxPages, setMaxPages] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [selectedMaxPages, setSelectedMaxPages] = useState<string>('');
  const [books, setBooks] = useState<Library[]>([]);

  const { storedValues, addValue, removeValue } = useLocalStorage(
    'savedBooks',
    []
  );
  const { data, loading, error } = useFetchResource(
    process.env.NEXT_PUBLIC_API_URL || ''
  );

  const storedBooks = storedValues.map((isbn: string) => {
    const book = data?.find(({ book }) => book.ISBN === isbn);

    return book;
  });

  useEffect(() => {
    if (data) {
      const maximumPages = getMaximumPages(data);

      setGenres(getGenres(data));
      setMaxPages(maximumPages);
      setSelectedMaxPages(maximumPages);
      setBooks(data);
    }
  }, [data]);

  const handleFilterChange = (
    type: 'genre' | 'maxPage',
    value: string
  ): void => {
    if (type === 'genre') {
      setSelectedGenre(value);
      setBooks(filteredBooks(data, value, selectedMaxPages));
    } else if (type === 'maxPage') {
      setSelectedMaxPages(value);
      setBooks(filteredBooks(data, selectedGenre, value));
    }
  };

  if (loading || error) {
    return (
      <div className='grid h-screen place-items-center'>
        <h1 className='text-7xl'>
          {loading ? 'Fetching books...' : 'There was an error, please reload'}
        </h1>
      </div>
    );
  }

  return (
    <main className='min-h-screen pl-8 pt-8 sm:pl-14 sm:pt-14 lg:flex'>
      <div className='mb-9 basis-2/3 lg:mb-0'>
        <h1 className='mb-3 text-sm sm:text-4xl'>
          {books.length} libros disponibles
        </h1>
        {storedValues.length > 0 && (
          <p className='mb-3'>{storedValues.length} en la lista de lectura</p>
        )}
        <FilterList
          genres={genres}
          maxPages={maxPages}
          selectedGenre={selectedGenre}
          selectedMaxPages={selectedMaxPages}
          handleFilterChange={handleFilterChange}
        />
        <ListOfBooks
          books={books}
          storedBooks={storedValues}
          saveBook={addValue}
        />
      </div>
      {!loading && storedBooks.length > 0 && (
        <StoredBooks
          storedBooks={storedBooks as Library[]}
          removeBooks={removeValue}
        />
      )}
    </main>
  );
}
