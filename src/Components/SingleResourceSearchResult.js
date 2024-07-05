import style from './style/SingleBookSearchResult.module.css';

function SingleResourceSearchResult({ book, onSelectBook }) {
    return (
        <div className={style.container} onClick={() => onSelectBook(book)}>
            <p>Book ID: {book.resourceId}</p>
            <p>Title: {book.title}</p>
            <p>Author: {book.author}</p>
        </div>
    );
}

export default SingleResourceSearchResult;
