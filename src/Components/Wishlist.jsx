import React from 'react';
import "./Wishlist.css"

const Wishlist = ({ userDetails, refreshWishlist }) => {
  const handleRemoveBook = async (bookId) => {
    if (!userDetails || !userDetails.id) {
      console.error('User details or user id is undefined.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/members/${userDetails.id}/delbooks/${bookId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        console.log('Book removed successfully.');
        refreshWishlist();
      } else {
        console.error('Failed to remove book from user:', response.statusText);
      }
    } catch (error) {
      console.error('Error occurred while removing book from user:', error);
    }
  };

  return (
    <div className="wishlist-container">
      <h2>Wishlist</h2>
      {userDetails && userDetails.books && userDetails.books.map((book) => (
        <div key={book.id} className="wishlist-item">
          <div className="wishlist-item-info">
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
            <p>Type: {book.type}</p>
            <img src={book.url} alt={book.title} className="wishlist-item-image" />
          </div>
          <button onClick={() => handleRemoveBook(book.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default Wishlist;
