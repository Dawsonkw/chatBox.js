import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home'
import Profile from './pages/Profile';
import PrivateRoutes from './components/PrivateRoutes';
import UserAuth from './components/UserAuth';
import Creator from './components/Creator';
import UpdateProfile from './components/UpdateProfile';


function App() {

  return (
    <Router>
      <div className="bg-periwinkle h-screen">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route exact path='/' element={<Home />}  />
            <Route path='/profile' element={<Profile />}/>
          </Route>
          <Route path='/login' element={<UserAuth />} />
          <Route path='/creator' element={<Creator />}/>
          <Route path='/updateProfile' element={<UpdateProfile />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App

