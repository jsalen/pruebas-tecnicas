import Image from 'next/image';
import { Library } from '@/types';

type ListOfBooksProps = {
  books: Library[];
  storedBooks: Library['book']['ISBN'][];
  saveBook: (value: Library['book']['ISBN']) => void;
};

export const ListOfBooks = ({
  books,
  storedBooks,
  saveBook,
}: ListOfBooksProps): JSX.Element => {
  return (
    <section className='mt-6 flex basis-1/2 flex-wrap gap-8'>
      {books?.map(({ book }, idx) => {
        const isStored = storedBooks.includes(book.ISBN);

        return (
          <Image
            key={`${book.title}-${idx}`}
            alt={`Cover of Book ${book.title}`}
            className={isStored ? 'opacity-50' : 'cursor-pointer'}
            onClick={() => saveBook(book.ISBN)}
            src={book.cover}
            width={120}
            height={240}
          />
        );
      })}
    </section>
  );
};
