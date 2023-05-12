import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateSpotForm from "../Spots/CreateSpot";
import {ReactComponent as Logo} from '../Navigation/images/logo.svg'
// import CreateSpotModal from "../Spots/CreateSpot/CreateSpotModal";
// import LoginFormPage from "../LoginFormPage";
// import SignupFormPage from "../SignupFormPage";
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem'
import OpenModalButton from "../OpenModalButton";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());
    // };

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <li>
    //             <ProfileButton user={sessionUser} />
    //             <button onClick={logout}>Log Out</button>
    //         </li>
    //     );
    // } else {
    //     sessionLinks = (
    //         <li>
    //             <OpenModalButton
    //             buttonText='Log In'
    //             modalComponent={<LoginFormModal />}
    //             />
    //             <OpenModalButton 
    //             buttonText='Sign Up'
    //             modalComponent={<SignupFormModal />}
    //             />
    //         </li>
    //     );
    // }

    return (
        <ul className="navigation-bar-container">
            <ui>
                <NavLink exact to='/'>
                  <Logo className='logo' alt='logo'></Logo>
                  </NavLink>
            </ui>
            {sessionUser ? (
              <button className="create-spot-nav">
                  <NavLink style={{ textDecoration: 'none', color: '#fff'}} exact to='/spots/new'>
                    Create a New Spot
                <OpenModalMenuItem
                  modalComponent={<CreateSpotForm />}
                  /> 
                  </NavLink>
              </button>
            ) : (
              <div>
                <button className="login-to-create-spot-nav">
                  <OpenModalMenuItem
                    className="bnbButton"
                    itemText="Log In to Create a New Spot"
                    modalComponent={<LoginFormModal />}
                  />
                </button>
              </div>
            )}
            {isLoaded && (
                <ul className="profile-btn-position">
                    <ProfileButton user={sessionUser} />
                </ul>
            )}
        </ul>
    );
}

export default Navigation;
