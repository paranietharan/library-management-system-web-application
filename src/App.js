import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React from 'react';

import UnauthorizedPage from './Pages/UnauthorizedPage';

//AuthContext
import { AuthProvider } from './service/AuthContext';
import ProtectedRoute from './service/ProtectedRoute';

// Paranie
import AboutPage from './Pages/About';
import ArticleHome from './Pages/ArticleHome';
import PublishArticles from './Pages/PublishArticles';
import MyProfile from './Pages/MyProfile';
import ViewArticle from './Pages/ViewArticle';
import ArticleSearch from './Pages/ArticleSearch';
import ArticleEdit from './Pages/ArticleEdit';

// Shobikan
import Login from './Pages/login';
import DetailsFilling from './Pages/DetailsFilling';
import DetailsConfirmation from './Pages/DetailsConfirmation';
import VerifyEmail from './Pages/VerifyEmail';
import VerificationSuccess from './Pages/VerificationSuccess';
import SearchAccount from './Pages/SearchAccount';
import ChangeForgotPassword from './Pages/ChangeForgotPassword';
import VerifyForgotPassword from './Pages/VerifyForgotPassword';

// Mihunan
import UserHome from './Pages/UserHome';
import UserChat from './Pages/UserChat';
import ViewBook from './Pages/ViewBook';
import Complaint from './Pages/complaint';
import MakeNewComplaint from './Pages/MakeNewComplaint';

// Yasothan
import Test from './Pages/Test';
import FineManagement from './Pages/FineManagement';
import UserMessages from './Pages/UserMessages';
import MyBooks from './Pages/MyBooks';
import EditProfile from './Pages/EditProfile';
import SecurityPage from './Pages/SecurityPage';
import LendingHistory from './Pages/LendingHistory';
import FineHistory from './Pages/FineHistory';

// Lathisana
import AdminDashboardHome from './Pages/AdminDashboardHome';
import BookManagement from './Pages/BookManagement';
import MembershipManagement from './Pages/MembershipManagement';
import LibrarianChat from './Pages/LibrarianChat';
import ArticleManagement from './Pages/ArticleManagement';
import TermsAndPolicies from './Pages/TermsAndPolicies';
import AdminFineManagement from './Pages/AdminFineManagement';
import AdminProfileManagement from './Pages/AdminProfileManagement';
import AdminNotificationControl from './Pages/AdminNotificationControl';
import LibrarianArticleManagement from './Pages/LibrarianArticleManagementView';
import BookLending from './Pages/BookLending';
import AdminComplaintPage from './Pages/AdminComplaintPage';
import BookReservation from './Pages/BookReservation';
import LibrarianBookReservation from './Pages/LibrarianBookReservation';
import ToDoListPage from './Pages/ToDoListPage';
import Notes from './Pages/Notes';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Paranietharan */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/article-home" element={<ArticleHome />} />
          <Route path="/article/:articleId" element={<ViewArticle />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/publish-articles' element={<PublishArticles />} />
          <Route path='/article-edit/:articleId' element={<ArticleEdit />} />
          <Route path='/article-search' element={<ArticleSearch />} />


          {/*Shobikan */}
          <Route path="/login" element={<Login />} />
          <Route path='/details-fill' element={<DetailsFilling />} />
          <Route path='/details-confirmation' element={<DetailsConfirmation />} />
          <Route path='/verify-email' element={<VerifyEmail />} />
          <Route path='/verification-success' element={<VerificationSuccess />} />
          <Route path='/search-account' element={<SearchAccount />} />
          <Route path='/change-forgot-password' element={<ChangeForgotPassword />} />
          <Route path='/verifyMailForgotPassword' element={<VerifyForgotPassword />} />
          <Route path='/unauthorized' element={<UnauthorizedPage />} />


          {/* Mihunan */}
          <Route path="/" element={<UserHome />} />
          <Route path="/book/:id" element={<ViewBook />} />
          <Route path='/complaint' element={<Complaint />} />
          <Route path='/make-new-complaint' element={<MakeNewComplaint />} />
          <Route path='/user-chat' element={<UserChat />} />
          <Route path='/librarian-chat' element={<LibrarianChat />} />
          <Route path='/todo-list' element={<ToDoListPage />} />
          <Route path='/notes' element={<Notes />} />


          {/* Yasothan */}
          <Route path="/message" element={<UserMessages />} />
          <Route path='/mybooks' element={<MyBooks />} />
          <Route path="/fine" element={
            <ProtectedRoute roles={['MEMBER']}>
              <FineManagement />
            </ProtectedRoute>
          } />
          <Route path='/book-reservation' element={<BookReservation />} />
          <Route path='/lending-history' element={<LendingHistory />} />
          <Route path='/terms' element={<TermsAndPolicies />} />
          <Route path='/fine-history' element={<FineHistory />} />
          <Route path='/edit-profile' element={<EditProfile />} />
          {/*TODO: Do security page connection */}
          <Route path='/security' element={<SecurityPage />} />



          {/* Lathisana */}
          <Route path="/admin" element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <AdminDashboardHome />
            </ProtectedRoute>
          } />
          <Route path='/admin-book-management' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <BookManagement />
            </ProtectedRoute>
          } />
          <Route path='/librarian-article-management' element={<ArticleManagement />} />
          <Route path="/librarian-article-management/:articleId" element={<LibrarianArticleManagement />} />
          <Route path='/admin-notification-control' element={<AdminNotificationControl />} />
          <Route path="/book-lending" element={<BookLending />} />
          <Route path='/admin-complaint' element={<AdminComplaintPage />} />
          <Route path='/admin-fine-management' element={<AdminFineManagement />} />
          <Route path='/librarian-book-reservation' element={<LibrarianBookReservation />} />
          <Route path='/membership-management' element={<MembershipManagement />} />
          <Route path='/admin-profile-management' element={<AdminProfileManagement />} />

          {/* Sample code for test */}
          <Route path='/test' element={<Test />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;