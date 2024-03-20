/* eslint-disable jsx-a11y/anchor-is-valid */
// Home.jsx
import React, { useEffect, useState } from 'react';
import BookList from './BookList';
import Wishlist from './Wishlist';
import './Home.css'

const Home = () => {
    const [userDetails, setUserDetails] = useState({});
    const [books, setBooks] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [wish, setWish] = useState(false);

    useEffect(() => {
        fetchUserDetails();
        fetchAllBooks();
    }, []);

    const fetchUserDetails = async () => {
        try {
            const email = localStorage.getItem('email');


            const response = await fetch(`http://localhost:8080/members/get/${email}`);
            if (response.ok) {

                const data = await response.json();
                console.log(data)
                setUserDetails(data);

            } else {
                console.error('Failed to fetch user details:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while fetching user details:', error);
        }
    };

    const fetchAllBooks = async () => {
        try {
            const response = await fetch('http://localhost:8080/books/getall');
            if (response.ok) {
                const data = await response.json();
                setBooks(data);
            } else {
                console.error('Failed to fetch books:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while fetching books:', error);
        }
    };


    const handleTypeChange = (e) => {
        setSelectedType(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const logout = () => {
        // Implement logout functionality here
        localStorage.removeItem('email');
        window.location.href = '/login'; // Redirect to login page after logout
    };

    const refreshBooks = async () => {
        fetchAllBooks();
    };

    const refreshWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/members/get/${userDetails.email}`);
            if (response.ok) {
                const data = await response.json();
                setUserDetails(data);
            } else {
                console.error('Failed to refresh wishlist:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while refreshing wishlist:', error);
        }
    };
    


    return (
        <div>
            <nav>
                <div className="nav-items-left">
                    <span>Welcome, {userDetails.name}</span>
                    <select onChange={handleTypeChange}>
                        <option value="">All</option>
                        <option value="Fiction">Fiction</option>
                        <option value="Non-fiction">Non-fiction</option>
                        {/* Add other book types as options */}
                    </select>
                    <input type="text" placeholder="Search" onChange={handleSearchChange} />
                </div>
                <div className="nav-items-right">
                    <button onClick={()=>setWish(!wish)}>Wishlist</button>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>
           {!wish ? <BookList books={books} selectedType={selectedType} searchQuery={searchQuery} userDetails={userDetails} refreshBooks={refreshBooks} />
            : <Wishlist userDetails={userDetails} refreshWishlist={refreshWishlist}/>}
              </div>
    );
};

export default Home;
