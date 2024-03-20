import React from 'react';
import "./Booklist.css";

const BookList = ({ books, selectedType, searchQuery, userDetails, refreshBooks }) => {
  const handleAddBook = async (bookId) => {
    try {
      const memberId = userDetails.id;
      const response = await fetch(`http://localhost:8080/members/${memberId}/books/${bookId}`, {
        method: 'POST',
      });

      if (response.ok) {
        console.log('Book added successfully');
        refreshBooks(); // Refresh the book list after adding the book
      } else {
        throw new Error('Failed to add book: ' + response.statusText);
      }
    } catch (error) {
      console.error('Error adding book:', error.message);
      alert('Failed to add book. Please try again later.');
    }
  };

  return (
    <div className="book-list">
      <h2>Book List</h2>
      {books.map((book) => (
        <div key={book.id} className="book-item">
          <h3>{book.title}</h3>
          <p>Author: {book.author}</p>
          <p>Type: {book.type}</p> {/* Added type */}
          <img src={book.url} alt={book.title} className="book-image" /> {/* Added image URL */}
          <button onClick={() => handleAddBook(book.id)}>Add to Collection</button>
        </div>
      ))}
    </div>
  );
};

export default BookList;
