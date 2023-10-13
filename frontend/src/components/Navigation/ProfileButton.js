import React, { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';
import './ProfileButton.css';
import OpenModalButton from '../OpenModalButton';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

    const sessionUser = useSelector(state => state.session.user);
    const spots = useSelector((state) => state.spot.spots)
    // console.log("TESTTESTTESTSPOTSSPOTSSPOTS", spots)

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    }
    
    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener('click', closeMenu);
    }, [showMenu]);

    const closeMenu = () => setShowMenu(false);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push('/')
        closeMenu();
    };

    const handleManageSpots = () => {
        history.push('/spots/current');
        setShowMenu(false);
    }

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
        <button className ='profile-icon' onClick={openMenu}>
        <i className="fa fa-bars" /> {" "}  
        <i className="fa-thin fa-user fa"></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
            {user ? (
                <>
            <li className='user-nav-name'>Hello, {user.firstName}</li>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <li className='user-nav-name'>{user.email}</li>
            <li>
            <Link to='/current' className='manage-spots-btn-text' onClick={closeMenu}>Manage Spots</Link>
            </li>
            <li>
                <button className='logout-btn' onClick={logout}>Log Out</button>
            </li>
            </>
            ) : (
            <>
            <div className='userMenu'>

            <ul>
                <span className='logIn'>
                <OpenModalButton
                className='login-signup'
                buttonText='Log In'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
                </span>
            </ul>
            <ul>
                <span className='logIn'>
                <OpenModalButton
                className='login-signup'
                buttonText='Sign Up'
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                />
                </span>
            </ul>
                </div>
            </>
            )}
        </ul>
        </>
     );
}

export default ProfileButton;

