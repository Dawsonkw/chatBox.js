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
      <div className="">
        <Routes>
          <Route exact path='/' element={<Home />}  />
          <Route element={<PrivateRoutes />}>
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


// https://www.youtube.com/watch?v=k4mjF4sPITE
// https://levelup.gitconnected.com/building-chat-app-using-firebase-cross-platform-with-mobile-app-nativescript-web-app-nuxtjs-44b5984e7b7a
// 
// 
//  finish chatScreen section for individual chats
//  
//  Figure out how to add images to firestorage instead of firestore
//  
//  
// 
// 
// 
// 
