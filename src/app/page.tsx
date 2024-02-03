import { getServerSession } from 'next-auth';

import Book from '@/components/layouts/Book/Book';
import { getAllBooks } from '@/lib/microcms/client';
import { nextAuthOptions } from '@/lib/next-auth/option';
import type { BookType, Purchase, User } from '@/types/types';


export default async function Home() {
  const { contents } = await getAllBooks();
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  let purchasesBookIds: string[] = [];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    //console.log(purchasesData);
    purchasesBookIds = purchasesData.map((puchaseBook: Purchase) => puchaseBook.bookId);
    //console.log(purchasesBookIds);
  }
  return (
    <>
      <main className='flex flex-wrap justify-center md:mt-32 mt-20 max-w-[1400px]  px-4'>
        <h2 className='text-center w-full font-bold text-3xl mb-2'>
          Book Commerce
        </h2>
        {contents.map((book: BookType) => (
          <Book
            key={book.id}
            book={book}
            user={user}
            isPurchase={purchasesBookIds.includes(book.id)}
          />
        ))}
      </main>
    </>
  );
}
