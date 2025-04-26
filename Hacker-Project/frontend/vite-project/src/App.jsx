import Navigator from './Components/Navigator';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';


import Posts from './Components/Posts';
import RegisterForm from './Components/Register';
import LoginForm from './Components/LogIn';
import News from './Components/News';
import NewsDetails from './Components/NewsDeatils' 
import Newsest from './Components/Newsest';
import FrontNewsDisplay from './Components/Front';
import NewestCommentsDisplay from './Components/NewComment';
import Ask from './Components/Ask';
import CreateJobForm from './Components/CreateJob';
import JobList from './Components/Job';
import Footer from './Components/Footer';



function App() {
  return (
    <BrowserRouter>
      <Navigator />
      <Routes>
        <Route path="/submit" element={<Posts />} />
        <Route path="/ask" element={<Ask />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetails />} />
        <Route path='/newsest' element={<Newsest />} />
        <Route path='/front' element={<FrontNewsDisplay />} />
        <Route path='/comment' element={<NewestCommentsDisplay />} />
        <Route path='/show' element={<CreateJobForm />} />
        <Route path='/jobs' element={<JobList />} /> 
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;