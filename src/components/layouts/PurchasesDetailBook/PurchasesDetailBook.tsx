import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import type { BookType } from '@/types/types';

type PurchasesDetailBookprops = {
  PurchasesDetailBook: BookType;
}

const PurchasesDetailBook = ({ PurchasesDetailBook }: PurchasesDetailBookprops) => {
  return (
    <Link
      href={`/book/${PurchasesDetailBook.id}`}
      className='cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none'
    >
      <Image
        priority
        src={PurchasesDetailBook.thumbnail.url}
        alt={PurchasesDetailBook.title}
        width={450}
        height={350}
        className='rounded-t-md'
      />
      <div className='px-4 py-4 bg-slate-100 rounded-b-md'>
        <h2 className='text-lg font-semibold'></h2>
        {/* <p className="mt-2 text-lg text-slate-600">この本は○○...</p> */}
        <p className='mt-2 text-md text-slate-700'>値段：{PurchasesDetailBook.price}円</p>
      </div>
    </Link>
  );
};

export default PurchasesDetailBook;