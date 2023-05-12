import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

const LoginFormModal = () => {
    const dispatch = useDispatch();
    // const sessionUser = useSelector(state => state.session.user);
    const [credential, setCredential] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();

    // if (sessionUser) return (
    //     <Redirect to='/' />
    // );

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(sessionActions.login({ credential, password }))
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.message) 
            setErrors(['The provided credentials were invalid.'])
            setCredential('')
            setPassword('')
        });
    }

    const demoUser = (e) => {
        e.preventDefault();
        dispatch(
            sessionActions.login({
                credential: "demo@user.io",
                password: "password",
            })
        )
        .then(closeModal)
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
        })
    }


    return (
        <>
        <h1 className='log-in-header'>Log In</h1>
        <form className='login-modal-container' onSubmit={handleSubmit}>
            <ul>
                {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
            <label className='user-login-input'>
                Username or Email
            </label>
                <input 
                type='text'
                className='user-email-input'
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
                />
            <label className='user-password-input'>
                Password
            </label>
                <input 
                type='password'
                className='pass-input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            <button type='submit' className='submit-login-btn'>Log In</button>
            <button onClick={demoUser} type='submit' className='demoLogin'> Demo User</button>
        </form>
        </>
    );
};

export default LoginFormModal;

