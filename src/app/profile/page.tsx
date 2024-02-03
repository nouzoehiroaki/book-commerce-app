import Image from 'next/image';
import { getServerSession } from 'next-auth';

import PurchasesDetailBook from '@/components/layouts/PurchasesDetailBook/PurchasesDetailBook';
import { getDetailBook } from '@/lib/microcms/client';
import { nextAuthOptions } from '@/lib/next-auth/option';
import type { BookType, Purchase, User } from '@/types/types';

export default async function ProfilePage() {
  const session = await getServerSession(nextAuthOptions);
  const user = session?.user as User;
  let purchasesDetailBooks: BookType[] = [];
  if (user) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/purchases/${user.id}`
    );
    const purchasesData = await response.json();
    purchasesDetailBooks = await Promise.all(purchasesData.map(async (purchase: Purchase) => {
      return await getDetailBook(purchase.bookId);
    }));
  }
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-xl font-bold mb-4'>プロフィール</h1>

      <div className='bg-white shadow-md rounded p-4'>
        <div className='flex items-center'>
          <Image
            priority
            src={user.image || '/default_icon.png'}
            alt=''
            width={60}
            height={60}
            className='rounded-t-md'
          />
          <h2 className='text-lg ml-4 font-semibold'>お名前：{user.name}</h2>
        </div>
      </div>

      <span className='font-medium text-lg mb-4 mt-4 block'>購入した記事</span>
      <div className='flex gap-6 justify-center'>
        {purchasesDetailBooks.map((purchasesDetailBook: BookType) => (
          <PurchasesDetailBook
            key={purchasesDetailBook.id}
            PurchasesDetailBook={purchasesDetailBook}
          />
        ))}
      </div>
    </div>
  );
}