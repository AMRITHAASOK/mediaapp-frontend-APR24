import Button from 'react-bootstrap/Button';
import './App.css'
import { Routes , Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Home from './Pages/Home';
import WatchHistory from './Pages/WatchHistory';
import PageNotFound from './Pages/PageNotFound';
import Header from './Components/Header';
import Footer from './Components/Footer';
function App() {

  return (
    <>
    <Header/>
     <Routes>
      {/* landing page path : http://localhost:5173/ */}
      <Route path='/' element={<LandingPage/>}/>
       {/* home page path : http://localhost:5173/home */}
       <Route path='/home' element={<Home/>}/>
       {/* watch history page path : http://localhost:5173/watch-history */}
       <Route path='/watch-history' element={<WatchHistory/>}/>
       <Route path='*' element={<PageNotFound/>}/>
     </Routes>
     <Footer/>
    </>
  )
}

export default App
