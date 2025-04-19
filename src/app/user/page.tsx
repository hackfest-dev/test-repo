"use client";
import React, { useEffect, useState } from "react";

export default function User() {
  const [availableBooks, setAvailableBooks] = useState([]);
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const getBooks = async () => {
    const res = await fetch("/api/books");
    const data = await res.json();
    setAvailableBooks(data);
  };

  const getBorrowedBooks = async () => {
    const res = await fetch("/api/borrowed-books");
    const data = await res.json();
    setBorrowedBooks(data);
  };

  const handleBuy = async (bookId: string) => {
    await fetch(`/api/buy-book/${bookId}`, { method: "POST" });
    getBooks();
  };

  const handleReturn = async (bookId: string) => {
    await fetch(`/api/return-book/${bookId}`, { method: "POST" });
    getBorrowedBooks();
  };

  useEffect(() => {
    getBooks();
    getBorrowedBooks();
  }, []);

  return (
    <div>
      <h1>User Page</h1>

      <h2>Available Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {availableBooks.map((book: any) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleBuy(book.id)}>Buy</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />

      <h2>Borrowed Books</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrowedBooks.map((book: any) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <button onClick={() => handleReturn(book.id)}>Return</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
