import type { NextApiRequest, NextApiResponse } from 'next'
import books from '@/database/books.json';
import { Library } from '@/types';

export default function handler(req: NextApiRequest, res: NextApiResponse<{ data?: Library[]; statusText?: string }>) {
  if (req.method === 'GET') {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return res.status(200).json({ data: books.library });
      }, 1000)
    })
  } else {
    return res.status(404).json({ statusText: 'Endpoint Not Found' })
  }
}