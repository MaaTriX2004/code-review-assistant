# Project Outline: Code Review Assistant

This document outlines the structure, features, and components of the Code Review Assistant application.

## 1. Objective

To create a full-stack web application that leverages a Large Language Model (LLM) to provide automated code reviews through a clean, interactive user interface.

## 2. Core Components

The application is divided into three main parts:

-   **Backend API**: A Python-based server responsible for handling file uploads, communicating with the LLM, and managing the database.
-   **Frontend UI**: A React-based single-page application (SPA) that provides the user interface for uploading files and viewing results.
-   **Database**: A simple SQLite database for persisting review history.

## 3. Feature Breakdown

### A. Backend (FastAPI)

-   **File Upload Endpoint (`POST /review/`)**
    -   Accepts `multipart/form-data` file uploads.
    -   Reads and decodes the file content.
    -   Constructs a detailed prompt for the LLM.
    -   Sends the code and prompt to the Gemini API.
    -   Saves the filename and the LLM's report to the database.
    -   Returns the newly created review object as JSON.

-   **History Endpoints**
    -   `GET /reviews/`: Fetches all saved reviews, ordered from newest to oldest.
    -   `DELETE /reviews/{review_id}`: Finds a review by its ID and removes it from the database.

-   **Database Model (`Review`)**
    -   `id`: Primary Key (Integer)
    -   `filename`: Name of the uploaded file (String)
    -   `report`: The full Markdown report from the LLM (Text)
    -   `created_at`: Timestamp of the review (DateTime)

### B. Frontend (React)

-   **Sidebar Component**
    -   Displays a list of all past reviews fetched from the API.
    -   Allows a user to select a review to view it.
    -   Provides a "New Review" button to clear the chat interface.
    -   Shows a delete icon on hover for each history item.
    -   Triggers a custom confirmation modal before deleting.

-   **Chat Interface Component**
    -   Displays a welcome message when no review is active.
    -   Handles the file upload logic.
    -   Shows a "Processing..." state while the backend is working.
    -   Renders the AI-generated report using `ReactMarkdown`.
    -   Applies Tailwind's `@tailwindcss/typography` plugin for beautiful formatting.
    -   Handles and displays errors gracefully using an Error Boundary.

-   **Confirmation Modal Component**
    -   A reusable pop-up that appears when a user tries to delete a review.
    -   Provides "Cancel" and "Delete" options.
    -   Is controlled by state in the main `App.jsx` component.

## 4. User Flow

1.  User opens the web application.
2.  The app fetches and displays the review history in the sidebar.
3.  User clicks the "Upload File" button and selects a code file.
4.  The frontend shows a loading state. The file is sent to the backend `POST /review/` endpoint.
5.  The backend processes the file with the Gemini API and saves the result.
6.  The backend returns the new review data.
7.  The frontend receives the data, updates its state, and displays the formatted report in the chat window. The history list is also refreshed.
8.  The user can then select old reviews from the history or delete them.