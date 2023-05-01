import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session';
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
// import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);
    // const dispatch = useDispatch();

    // const logout = (e) => {
    //     e.preventDefault();
    //     dispatch(sessionActions.logout());
    // };

    // let sessionLinks;
    // if (sessionUser) {
    //     sessionLinks = (
    //         <li>
    //             <ProfileButton user={sessionUser} />
    //             {/* <button onClick={logout}>Log Out</button> */}
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
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
            </li>
            {isLoaded && (
                <li>
                    <ProfileButton user={sessionUser} />
                </li>
            )}
        </ul>
    );
}

export default Navigation;

