import React from "react";
import LibrarianTopNavBar from "../Components/LibrarianTopNavBar";
import style from "./style/BookManagement.module.css";
import AddBooksComponent from "../Components/AddBooksComponent";
import EditBooksComponent from "../Components/EditBooksComponent";
import DeleteBooksComponent from "../Components/DeleteBooksComponent";
import { useState } from "react";

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Footer from "../Components/LibraryFooter";

function BookManagement() {
    const [displayComponent, setDisplayComponent] = useState('add');

    const handleButtonClick = (componentName) => {
        setDisplayComponent(componentName);
    };

    return (
        <div className={style.bookManagementPage}>
            <LibrarianTopNavBar />

            <div className={style.content}>
                <div className={style.menuItems}>
                    <button className={style.addBooks} onClick={() => handleButtonClick('add')}><AddIcon/>Add Books</button>
                    <button className={style.editBooks} onClick={() => handleButtonClick('edit')}><EditIcon />Edit Books</button>
                    <button className={style.deleteBooks} onClick={() => handleButtonClick('delete')}><DeleteIcon />Delete Books</button>
                </div>

                <div className={style.displayComponent}>
                    {displayComponent === 'add' && <AddBooksComponent />}
                    {displayComponent === 'edit' && <EditBooksComponent />}
                    {displayComponent === 'delete' && <DeleteBooksComponent />}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default BookManagement;