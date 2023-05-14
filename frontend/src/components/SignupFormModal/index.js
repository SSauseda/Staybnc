import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import { useModal } from '../../context/Modal';
import './SignupForm.css';

const SignupFormModal = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector((state) => state.session.user);
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const { closeModal } = useModal();

    // if (sessionUser) return <Redirect to='/' />;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(
                sessionActions.signup({
                    email,
                    username,
                    firstName,
                    lastName,
                    password,
                })
            )
            .then(closeModal)
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) {
                    setErrors(data.errors);
                }
            });
        }
        return setErrors({
            confirmPassword: "Confirm Password field must be the same as the Password field"
        });
    };

    const validateForm = () => {
      if (
        !email ||
        !username ||
        !firstName ||
        !lastName ||
        !password ||
        !confirmPassword || 
        username.length < 4 || 
        password.length < 6 ||
        password !== confirmPassword
      ) {
        setButtonDisabled(true);
      } else {
        setButtonDisabled(false);
      }
    }

    useEffect(() => {
      validateForm();
    }, [email, username, firstName, lastName, password, confirmPassword])

    return (
      <div>
      <h1 className='sign-up-header'>Sign Up</h1>
      <div className='signup-errors'>
        {errors && (
          <ul>
            {Object.values(errors).map((error, idx) => (
              <li className='error-li' key={idx}>{error}</li>
            ))}
          </ul>
        )}
      </div>
      <form onSubmit={handleSubmit} className='signup-form-container'>
        <div className='singup-form-input'>
        <label>
          Email
          </label>
          <input
            className='user-email'
            type="text"
            value={email}
            onChange={(e) => {setEmail(e.target.value) 
            validateForm();}}
            required
          />

        <label>
          Username
          </label>
          <input
          className='user-username-input'
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value)
            validateForm()}}
            required
          />

        <label>
          First Name
          </label>
          <input
          className='user-first-input'
            type="text"
            value={firstName}
            onChange={(e) => {setFirstName(e.target.value)
            validateForm()}}
            required
          />

        <label>
          Last Name
          </label>
          <input
          className='user-last-input'
            type="text"
            value={lastName}
            onChange={(e) => {setLastName(e.target.value)
            validateForm()}}
            required
          />

        <label>
          Password
          </label>
          <input
          className='user-password-input'
            type="password"
            value={password}
            onChange={(e) => {setPassword(e.target.value)
            validateForm()}}
            required
          />

        <label>
          Confirm Password
          </label>
          <input
          className='user-confirm-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => {setConfirmPassword(e.target.value)
            validateForm()}}
            required
          />

        </div>
        <button type="submit" className='signup-form-button' disabled={buttonDisabled}>Sign Up</button>
      </form>
    </div> 
    );
};

export default SignupFormModal;
