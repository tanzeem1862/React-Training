# Timed Quiz Game

This is the solution for Question 1 of the React Training Assessment.

## 🚀 Demo Video

👉 [Demo Video for Quiz App](https://drive.google.com/file/d/171mdRz43dgSxp07Sbv26GUnubn0stVki/view?usp=sharing)

## Setup Steps

1.  **Ensure Mock API is running:**
    ```bash
    json-server --watch db.json --port 4000
    ```
2.  Navigate to the project directory:
    ```bash
    cd quiz-app
    ```
3.  Install dependencies:
    ```bash
    npm install
    ```
4.  Run the application:
    ```bash
    npm run dev
    ```

## React Concept Implementation

| Concept | Location | Usage |
| :--- | :--- | :--- |
| `useState` | `useQuiz.ts` | Used for managing `questions` data, `score`, `currentQuestionIndex`, `timer`, and `quizStatus`. |
| `useEffect` | `useQuiz.ts` | **1.** Data fetching (`fetchQuestions` function called on start/restart). **2.** Timer logic with **cleanup** to prevent memory leaks (`clearInterval`). **3.** POSTing final results when `quizStatus` becomes 'finished'. |
| Custom Hook | `useQuiz.ts` | Encapsulates all quiz state management, data fetching, timer logic, and navigation functions. |
| Data Fetching | `useQuiz.ts` | Uses the native `fetch` API to GET questions and POST results. |
| Loading/Error | `useQuiz.ts`, `App.tsx` | `quizStatus` and `error` state variables handle the UI display for loading and error messages. |
| `useMemo` | `useQuiz.ts` | Used to compute the `scoreSummary` (including percentage) only when the `score` or `questions.length` changes. |
