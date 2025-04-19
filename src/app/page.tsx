// app/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/books')
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  const handleRequestBorrow = async (bookId: number) => {
    const userId = 1; // Simulate user ID
    const res = await fetch('/api/borrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, bookId }),
    });

    const data = await res.json();
    if (data.message) {
      alert(data.message);
    } else {
      alert(data.error);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Library Management</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="mb-2">
            📘 <strong>{book.title}</strong> by {book.author} ({book.stock} in stock)
            <button
              className="ml-4 p-2 bg-blue-500 text-white rounded"
              onClick={() => handleRequestBorrow(book.id)}
            >
              Request to Borrow
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
