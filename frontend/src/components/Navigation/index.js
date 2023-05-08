import React, { useState, useEffect, useRef } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from '../../store/session';
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import CreateSpotForm from "../Spots/CreateSpot";
// import CreateSpotModal from "../Spots/CreateSpot/CreateSpotModal";
// import LoginFormPage from "../LoginFormPage";
// import SignupFormPage from "../SignupFormPage";
import './Navigation.css';
import OpenModalMenuItem from './OpenModalMenuItem'
import OpenModalButton from "../OpenModalButton";

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
    };

    let sessionLinks;
    if (sessionUser) {
        sessionLinks = (
            <li>
                <ProfileButton user={sessionUser} />
                <button onClick={logout}>Log Out</button>
            </li>
        );
    } else {
        sessionLinks = (
            <li>
                <OpenModalButton
                buttonText='Log In'
                modalComponent={<LoginFormModal />}
                />
                <OpenModalButton 
                buttonText='Sign Up'
                modalComponent={<SignupFormModal />}
                />
            </li>
        );
    }

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {sessionUser ? (
              <div className="bnbButton">
                  <NavLink exact to='/spots/new'>
                    Staybnb your home
                <OpenModalMenuItem
                  modalComponent={<CreateSpotForm />}
                  /> 
                  </NavLink>
              </div>
            ) : (
              <div>
                <div className="bnbButton">
                  <OpenModalMenuItem
                    className="bnbButton"
                    itemText="Staybnb your home"
                    modalComponent={<SignupFormModal />}
                  />
                </div>
              </div>
            )}
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;
