import LibrarianTopNavBar from '../Components/LibrarianTopNavBar';
import style from './style/AdminComplaintPageStyle.module.css';
import AdminComplaints from '../Components/AdminComplaints';

function AdminComplaintPage() {
    return (
        <div className={style.Container}>
            <LibrarianTopNavBar />

            <div>
                <AdminComplaints />
            </div>
        </div>
    );
}

export default AdminComplaintPage;