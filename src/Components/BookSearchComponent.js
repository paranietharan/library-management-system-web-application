import { useState } from 'react';
import http from '../service/http-common';
import style from './style/BookSearchComponent.module.css';
import SingleResourceSearchResult from './SingleResourceSearchResult';

function BookSearchComponent({ onSelectBook }) {
    const [bookName, setBookName] = useState('');
    const [book, setBook] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await http.get(`/resource/search?keyword=${bookName}`);
            if (response.data) {
                setBook(response.data);
                setNotFound(false);
            } else {
                setBook(null);
                setNotFound(true);
            }
        } catch (error) {
            console.error("There was an error fetching the book data!", error);
            setBook(null);
            setNotFound(true);
        }
    };

    return (
        <div className={style.container}>
            <div className={style.searchBar}>
                <input
                    type="text"
                    placeholder="Search for books"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className={style.searchResults}>
                {book &&
                    book.map((b) => (
                        <SingleResourceSearchResult key={b.resourceId} book={b} onSelectBook={onSelectBook} />
                    ))
                }
                {notFound && <p>Book not available</p>}
            </div>
        </div>
    );
}

export default BookSearchComponent;