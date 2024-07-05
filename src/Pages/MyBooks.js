import BookView from "../Components/BookView";
import styles from "./style/MyBooks.module.css";
import UserNavBar from "../Components/UserNavBar";

function MyBooks() {

    // const selectedBook = books[0];
    const borrowedDate = '2024-04-28';

    return (
        <>
            <UserNavBar />
            <div className={styles.MyBooks}>

                <div className={styles.content}>
                    <h1>My Books</h1>
                    <div className={styles.bookViewContainer}>
                        {/* <BookView book={selectedBook} borrowedDate={borrowedDate} /> */}
                    </div>
                </div>

            </div>
        </>
    );
}

export default MyBooks;