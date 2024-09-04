import axios from "axios";
import Auth from "./components/register/Auth";
import './App.css';
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import Profile from "./components/user/Profile";
import CreateQuiz from "./components/quiz/CreateQuiz";
//import QuestionBank from "./components/quiz/QuestionBank";
import AddQuestion from "./components/quiz/AddQuestion";
import EditQuiz from "./components/quiz/EditQuiz";
import EditQuestion from "./components/quiz/EditQuestion";
import AttemptQuiz from "./components/quiz/AttempQuiz";
import QuizReview from "./components/quiz/QuizReview";
import 'bootstrap/dist/css/bootstrap.min.css';
import Results from "./components/quiz/Results";
import ChangePassword from "./components/user/ChangePassword";
import ChangeEmail from "./components/user/ChangeEmail";
import SelectedQuestions from "./components/quiz/SelectedQuestions";
import Workspace from './components/typeFrom/question/Workspace';
import Home from './components/typeFrom/Home';
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL + "/api/v1";

// if (!axios.defaults.headers.common["Authorization"])
//   axios.defaults.headers.common["Authorization"] = getBearer();
if (!axios.defaults.headers.post["Content-Type"])
  axios.defaults.headers.post["Content-Type"] = "application/json";
const storedToken = localStorage.getItem('token');
if (storedToken) {
  const accessToken = JSON.parse(storedToken);
  axios.defaults.headers.post['Authorization'] = `Bearer ${accessToken}`;
}
axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/new-quiz" element={<CreateQuiz />} />
          <Route path="/edit-quiz" element={<EditQuiz />} />
          <Route path="/question-manager" element={<Workspace />} />
          <Route path="/edit-question" element={<EditQuestion />} />
          <Route path="/add-question" element={<AddQuestion />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/quiz/:encodedQuizId" element={<AttemptQuiz />} />
          <Route path="/result" element={<QuizReview />} />
          <Route path="/result-report" element={<Results />} />
          <Route path="/LoadChangePassword" element={<ChangePassword />} />
          <Route path="/LoadChangeEmail" element={<ChangeEmail />} />
          <Route path="/quiz-questions" element={<SelectedQuestions />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
