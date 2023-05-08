import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
// import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import OpenModalMenuItem from './OpenModalMenuItem';
import './ProfileButton.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();

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
        closeMenu();
    };

    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

    return (
        <>
        <button onClick={openMenu}>
        <i className="fa-thin fa-user fa"></i>
        </button>
        <ul className={ulClassName} ref={ulRef}>
            {user ? (
                <>
            <div>Hello, {user.username}</div>
            {/* <li>{user.firstName} {user.lastName}</li> */}
            <div>{user.email}</div>
            <Link to='/current' className='manage-spots' onClick={closeMenu}>Manage Spots</Link>
            <div>
                <button onClick={logout}>Log Out</button>
            </div>
            </>
            ) : (
            <>
            <div className='userMenu'>

            <ul>
                <span className='logIn'>
                <OpenModalMenuItem
                itemText='Log In'
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
                </span>
            </ul>
            <ul>
                <span className='signUp'>
                <OpenModalMenuItem
                itemText='Sign Up'
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

