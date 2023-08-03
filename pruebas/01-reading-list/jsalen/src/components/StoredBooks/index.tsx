import { Library } from '@/types';
import Image from 'next/image';
import React from 'react';

type StoreBooksProps = {
  storedBooks: Library[];
  removeBooks: (value: Library['book']['ISBN']) => void;
};

const StoredBooks = ({
  storedBooks,
  removeBooks,
}: StoreBooksProps): JSX.Element => {
  return (
    <div className='mb-8 mr-8 basis-1/3 rounded-xl border border-white bg-slate-900 p-9'>
      <h2 className='mb-8 w-full text-center text-sm sm:text-6xl'>
        Lista de Lectura
      </h2>
      <div className='flex flex-wrap gap-8'>
        {storedBooks.map(({ book }, idx) => {
          return (
            <Image
              key={`${book.title}-${idx}`}
              alt={`Cover of Book ${book.title}`}
              className='cursor-pointer'
              src={book.cover}
              onClick={() => removeBooks(book.ISBN)}
              width={120}
              height={240}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StoredBooks;
