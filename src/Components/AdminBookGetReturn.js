import React, { useState, useEffect } from 'react';
import MemberSearchComponent from './MemberSearchComponent';
import style from './style/AdminBookGetReturn.module.css';
import http from '../service/http-common';

function AdminBookGetReturn() {
    const [selectedMember, setSelectedMember] = useState({});
    const [issue, setIssue] = useState({});
    const [book, setBookData] = useState({});

    const handleSelectMember = (member) => {
        setSelectedMember(member);
        getLendingDetails(member.userID);
    };

    // get lending details
    const getLendingDetails = async (userId) => {
        try {
            const response = await http.get(`/issues/check?memberId=${userId}`);
            setIssue(response.data);
            if(response.data){
                getBookDetailsID(response.data.resourceId)
            }
        } catch (error) {
            console.error("Error getting lending details:", error);
        }
    }

    const handleReturnBook = async () => {
        try {
            const response = await http.post(`/issues/return?memberId=${selectedMember.userID}`);
            console.log("Book returned successfully:", response.data);
            // Reset the issue status
            setIssue({});
            setSelectedMember({});
            alert("Book returned successfully!");
        } catch (error) {
            console.error("Error returning book:", error);
        }
    }

    // Get book details by id
    const getBookDetailsID = async (id) => {
        try{
            const response = await http.get(`/resource/get/id/${id}`)
            setBookData(response.data);
        }catch (error) {
            console.error('Error fetching book details:', error);
        }
    }

    return (
        <div className={style.container}>
            <div className={style.MemberSearch}>
                <MemberSearchComponent onSelectMember={handleSelectMember} />
            </div>

            <div className={style.LendBookDetails}>
                {selectedMember.userID && (
                    issue ?
                    (<div className={style.issueDetails}>
                        <p>Issue ID: {issue.issueId}</p>
                        <p>Resource ID: {issue.resourceId}</p>
                        <p>Book Name: {book.title}</p>
                        <p>Date: {issue.date}</p>
                    </div>) :
                    <p>This user don't have any Lended Books</p>
                )}
            </div>

            <div className={style.returnButton}>
                {
                    issue.issueId && (
                        <button onClick={handleReturnBook}>Return Book</button>
                    )
                }
            </div>
        </div>
    );
}

export default AdminBookGetReturn;