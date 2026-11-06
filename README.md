# Library Management System — Frontend

A React application for a school library, developed as a second-year university group project. Members can browse library resources, manage their borrowing activity, and share articles; librarians have dedicated management screens.

This repository contains the browser interface. The companion [Spring Boot backend](https://github.com/paranietharan/library-management-system) provides the REST API and MySQL persistence.

## Project ownership and contribution

[Paranietharan](https://github.com/paranietharan) is the **team leader**, was responsible for the **article section**, and now maintains the full codebase across both repositories.

The article module is the primary area of individual contribution highlighted here. Overall codebase maintenance reflects the team-lead role; the wider library system was developed collaboratively by the project team.

## Application overview

```text
Member / librarian
        |
        v
React + Material UI (localhost:3000)
        |
        | Axios: JSON and multipart requests
        v
Spring Boot API (localhost:8080)
        |
        v
MySQL
```

The application includes screens for:

- Login, email verification, account recovery, and profile management.
- Book browsing, lending, reservations, and borrowing history.
- Fines, complaints, and member/librarian management.
- Article publishing, reading, searching, editing, comments, and ratings.
- Member/librarian chat, which uses a separate Firebase integration.

## Article module

The article section demonstrates the connection between interactive React screens and the Java backend:

- A publishing form collects the article title, body, and image, with a local image preview.
- Article listing and search screens help members find content.
- The detail view presents an article with comments and ratings.
- Editing and deletion controls support article management.
- Librarian article-management screens are part of the wider application.

### Screen and source guide

Routes are declared in [src/App.js](src/App.js). Member routes require a signed-in member in the frontend route guard; librarian routes use the `LIBRARIAN` role.

| Route | Purpose | Source |
| --- | --- | --- |
| `/article-home` | Browse articles | [ArticleHome.js](src/Pages/ArticleHome.js) |
| `/publish-articles` | Publish an article with an image | [PublishArticles.js](src/Pages/PublishArticles.js) |
| `/article/:articleId` | Read an article and interact with it | [ViewArticle.js](src/Pages/ViewArticle.js) |
| `/article-search` | Search articles | [ArticleSearch.js](src/Pages/ArticleSearch.js) |
| `/article-edit/:articleId` | Edit an article | [ArticleEdit.js](src/Pages/ArticleEdit.js) |
| `/librarian-article-management` | Librarian article list | [ArticleManagement.js](src/Pages/ArticleManagement.js) |
| `/librarian-article-management/:articleId` | Librarian article detail | [LibrarianArticleManagementView.js](src/Pages/LibrarianArticleManagementView.js) |

Shared article components live in [src/Components](src/Components), including the article navigation, summaries, reviews, and deletion dialogs. The backend README documents the [article API endpoints](https://github.com/paranietharan/library-management-system#main-article-endpoints).

## Technology

- React 18 and React Router 6.
- Material UI 5, Emotion, and styled-components.
- Axios for HTTP requests.
- JWT decoding and shared authentication context.
- Firebase integration for chat.
- Create React App tooling (`react-scripts` 5.0.1).

Dependency versions and available scripts are declared in [package.json](package.json).

## Run locally

### 1. Start the backend

Follow the [backend setup instructions](https://github.com/paranietharan/library-management-system#run-locally) to configure Java, MySQL, SMTP, and the API at `http://localhost:8080`.

The frontend needs the API for library and article data. Email verification and article edit/delete notifications also depend on the backend's SMTP configuration.

### 2. Install frontend dependencies

Install Node.js and npm, then:

```bash
git clone https://github.com/paranietharan/library-management-system-web-application.git
cd library-management-system-web-application
npm ci
```

`npm ci` installs dependencies using the committed `package-lock.json`. The repository does not currently pin a Node.js version.

### 3. Check the API address

The current source reads its API address from [src/service/BaseUrl.js](src/service/BaseUrl.js):

```javascript
export const baseURL = 'http://localhost:8080';
```

Update that file if your backend runs elsewhere. The shared [JSON client](src/service/http-common.js) and [multipart client](src/service/http-multipart.js) import this value. Setting `REACT_APP_API_BASE_URL` in a `.env` file alone does not change the API address in the current implementation.

If the frontend origin changes, also update the backend's CORS configuration. For browser connection failures, check the API address and the exact allowed origin in the backend's `WebConfig.java`.

### 4. Start the development server

```bash
npm start
```

Open `http://localhost:3000/login`. Use an account from your configured backend; protected routes require a signed-in user with the corresponding role.

### Optional: chat integration

Chat uses Firebase separately from the Spring Boot article API. Review the Firebase project configuration in [Chat.js](src/Components/Chat.js) and [AdminChat.js](src/Components/AdminChat.js) if you want to exercise those screens with your own Firebase project.

## Build and test commands

```bash
npm run build
npm test
```

The build output is written to `build/`. The test command starts the Create React App test runner; there are currently no dedicated `*.test.*` files under `src`. Automated article-flow tests are a future improvement.

For deployment, configure the host to serve `index.html` for application routes so that direct navigation to React Router pages works.

## Project structure

```text
src/
├── App.js           Application routes and role-specific screens
├── Pages/           Member and librarian pages
├── Components/      Reusable UI and article components
├── service/         API clients, authentication, and route guards
└── resources/       Images and other UI assets
public/              Static public assets
```

## Suggested article demonstration

1. Start the backend and frontend, then sign in as a member.
2. Open `/article-home` and navigate to the publishing form.
3. Enter a title and body, select an image, and publish the article.
4. Find it through the article list or search, then open its detail page.
5. Add a comment and rating, then demonstrate the edit/delete workflow.
6. With a librarian account, show the separate article-management screens.

Use an image when demonstrating publication: the current backend multipart publish endpoint requires the `articleImg` parameter. This walkthrough provides a focused way to discuss the article contribution alongside the broader team project.
