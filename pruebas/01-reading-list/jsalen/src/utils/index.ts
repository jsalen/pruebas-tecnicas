import { Library } from '@/types';

export const getGenres = (books: Library[]): string[] => {
  const genres = books.map(({ book }) => book.genre);

  return ['All', ...new Set(genres)];
};

export const getMaximumPages = (books: Library[]): string => {
  const pages = books.map(({ book }) => book.pages);

  return Math.max(...pages).toString();
};

export const filteredBooks = (
  books: Library[],
  genre: string,
  pages: string
): Library[] => {
  return books.filter(({ book }) => {
    const genreMatch = genre === 'All' || book.genre === genre;
    const pageMatch = book.pages <= parseInt(pages);

    return genreMatch && pageMatch;
  });
};
