import React from 'react';
import Home from '../pages/Home';
import Profile from '../pages/Profile';
import UserAuth from './UserAuth';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const navItems = [
        {label: 'Chat', path: '/', component: <Home />},
        {label: 'Profile', path: '/profile', component: <Profile />},
        {label: 'Login', path:'/login', component: <UserAuth />}
    ]

    function handleNavClick(path) {
        navigate(path)
    }

    return (
        <div >
            <div className='h-14 bg-kitsuneBlue4'>
                <nav >
                    <ul className='flex flex-row justify-around py-3 text-white text-xl' >
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <a href="#" onClick={() => handleNavClick(item.path)}> {item.label} </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default Header;