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
import LogoutUser from './service/LogoutUser';

function App() {

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/logout" element={<LogoutUser />} />
          
          {/* Paranietharan */}
          <Route path="/about" element={<ProtectedRoute roles={['MEMBER']}><AboutPage /></ProtectedRoute>} />
          <Route path="/article-home" element={<ProtectedRoute roles={['MEMBER']}><ArticleHome /></ProtectedRoute>} />
          <Route path="/article/:articleId" element={<ProtectedRoute roles={['MEMBER']}><ViewArticle /></ProtectedRoute>} />
          <Route path='/my-profile' element={<ProtectedRoute roles={['MEMBER']}><MyProfile /></ProtectedRoute>} />
          <Route path='/publish-articles' element={<ProtectedRoute roles={['MEMBER']}><PublishArticles /></ProtectedRoute>} />
          <Route path='/article-edit/:articleId' element={<ProtectedRoute roles={['MEMBER']}><ArticleEdit /></ProtectedRoute>} />
          <Route path='/article-search' element={<ProtectedRoute roles={['MEMBER']}><ArticleSearch /></ProtectedRoute>} />


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
          <Route path="/" element={<ProtectedRoute roles={['MEMBER']}><UserHome /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute roles={['MEMBER']}><ViewBook /></ProtectedRoute>} />
          <Route path='/complaint' element={<ProtectedRoute roles={['MEMBER']}><Complaint /></ProtectedRoute>} />
          <Route path='/make-new-complaint' element={<ProtectedRoute roles={['MEMBER']}><MakeNewComplaint /></ProtectedRoute>} />
          <Route path='/user-chat' element={<ProtectedRoute roles={['MEMBER']}><UserChat /></ProtectedRoute>} />
          <Route path='/todo-list' element={<ProtectedRoute roles={['MEMBER']}><ToDoListPage /></ProtectedRoute>} />
          <Route path='/notes' element={<ProtectedRoute roles={['MEMBER']}><Notes /></ProtectedRoute>} />
          {/* Librarian chat */}
          <Route path='/librarian-chat' element={<ProtectedRoute roles={['LIBRARIAN']}><LibrarianChat /></ProtectedRoute>} />

          {/* Yasothan */}
          <Route path="/message" element={<ProtectedRoute roles={['MEMBER']}><UserMessages /></ProtectedRoute>} />
          <Route path='/mybooks' element={<ProtectedRoute roles={['MEMBER']}><MyBooks /></ProtectedRoute>} />
          <Route path="/fine" element={<ProtectedRoute roles={['MEMBER']}><FineManagement /></ProtectedRoute>} />
          <Route path='/book-reservation' element={<ProtectedRoute roles={['MEMBER']}><BookReservation /></ProtectedRoute>} />
          <Route path='/lending-history' element={<ProtectedRoute roles={['MEMBER']}><LendingHistory /></ProtectedRoute>} />
          <Route path='/terms' element={<ProtectedRoute roles={['MEMBER']}><TermsAndPolicies /></ProtectedRoute>} />
          <Route path='/fine-history' element={<ProtectedRoute roles={['MEMBER']}><FineHistory /></ProtectedRoute>} />
          <Route path='/edit-profile' element={<ProtectedRoute roles={['MEMBER']}><EditProfile /></ProtectedRoute>} />
          <Route path='/security' element={<ProtectedRoute roles={['MEMBER']}><SecurityPage /></ProtectedRoute>} />



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

          <Route path='/librarian-article-management' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <ArticleManagement />
            </ProtectedRoute>
          } />

          <Route path="/librarian-article-management/:articleId" element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <LibrarianArticleManagement />
            </ProtectedRoute>
          } />

          <Route path='/admin-notification-control' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <AdminNotificationControl />
            </ProtectedRoute>
          } />

          <Route path="/book-lending" element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <BookLending />
            </ProtectedRoute>
          } />

          <Route path='/admin-complaint' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <AdminComplaintPage />
            </ProtectedRoute>
          } />

          <Route path='/admin-fine-management' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <AdminFineManagement />
            </ProtectedRoute>
          } />

          <Route path='/librarian-book-reservation' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <LibrarianBookReservation />
            </ProtectedRoute>
          } />

          <Route path='/membership-management' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <MembershipManagement />
            </ProtectedRoute>
          } />

          <Route path='/admin-profile-management' element={
            <ProtectedRoute roles={['LIBRARIAN']}>
              <AdminProfileManagement />
            </ProtectedRoute>
          } />

          {/* Sample code for test */}
          <Route path='/test' element={<Test />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;