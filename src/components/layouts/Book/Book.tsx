'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

import type { BookType } from '@/types/types';

type BookProps = {
  book: BookType;
  isPurchase: boolean;
}


// eslint-disable-next-line react/display-name
const Book = ({ book, isPurchase }: BookProps) => {
  const [showModal, setShowModal] = useState(false);
  const { data: session } = useSession();
  const user: any = session?.user;
  const router = useRouter();
  const startCheckout = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: book.title,
          price: book.price,
          userId: user?.id,
          bookId: book.id,
        })
      }
      );
      const responseData = await response.json();
      if (responseData) {
        router.push(responseData.checkout_url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
  };
  const handlePurchaseClick = () => {
    if (isPurchase) {
      alert('その商品は購入済みです');
    } else {
      setShowModal(true);
    }
  };
  const handlePurchaseConfirm = () => {
    if (!user) {
      setShowModal(false); // モーダルを閉じる
      router.push('/api/auth/signin');
    } else {
      //Stripe購入画面へ。購入済みならそのまま本ページへ。
      startCheckout();
    }
  };
  return (
    <>
      {/* アニメーションスタイル */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .modal {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>

      <div className='flex flex-col m-4 lg:w-[30%] md:w-[45%]'>
        <a onClick={handlePurchaseClick} className='cursor-pointer shadow-2xl duration-300 hover:translate-y-1 hover:shadow-none h-full bg-slate-100'>
          <Image
            priority
            src={book.thumbnail.url}
            alt={book.title}
            width={450}
            height={350}
            className='rounded-t-md object-cover aspect-ratio'
          />
          <div className='px-4 py-4 rounded-b-md'>
            <h2 className='text-md font-semibold'>{book.title}</h2>
            <p className='mt-2 text-md text-slate-700'>値段:{book.price}円</p>
          </div>
        </a>
        {showModal && (
          <div className='absolute top-0 left-0 right-0 bottom-0 bg-slate-900 bg-opacity-50 flex justify-center items-center modal'>
            <div className='bg-white p-8 rounded-lg'>
              <h3 className='text-xl mb-4'>本を購入しますか？</h3>
              <button onClick={handlePurchaseConfirm} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4'>
                購入する
              </button>
              <button onClick={handleCancel} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'>
                キャンセル
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Book;