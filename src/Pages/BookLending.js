import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import Style from './style/BookLending.module.css';
import Footer from '../Components/LibraryFooter';
import AdminBookIssue from '../Components/AdminBookIssue';
import { useState } from 'react';
import AdminBookGetReturn from '../Components/AdminBookGetReturn';

function BookLending() {

    const [displayComponent, setDisplayComponent] = useState('lend');

    const handleButtonClick = (componentName) => {
        setDisplayComponent(componentName);
    };

    return (
        <>
            <div className={Style.navbar}>
                <LibrarianTopNavBar />
            </div>
            <div className={Style.container}>
                <div className={Style.menuItems}>
                    <button className={Style.lend} onClick={() => handleButtonClick('lend')}>Lend Books</button>
                    <button className={Style.get} onClick={() => handleButtonClick('get')}>Get Books</button>
                </div>

                <div className={Style.displayComponent}>
                    {displayComponent === 'lend' && <AdminBookIssue />}
                    {displayComponent === 'get' && <AdminBookGetReturn />}
                </div>
            </div>

            <Footer />
        </>
    );
}

export default BookLending;