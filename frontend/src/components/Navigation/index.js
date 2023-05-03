import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
// import * as sessionActions from '../../store/session';
// import OpenModalButton from "../OpenModalButton";
// import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';
import OpenModalMenuItem from "./OpenModalMenuItem";
import CreateSpotForm from "../Spots/CreateSpot";

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
            {sessionUser ? (
              <div className="bnbButton">
                  <NavLink exact to='/spots/new'>
                    Staybnb your home
                {/* <OpenModalMenuItem
                  itemText="bnb your home"
                  modalComponent={<CreateSpotForm />}
                  /> */}
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

