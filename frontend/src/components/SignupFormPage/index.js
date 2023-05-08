import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import * as sessionActions from '../../store/session'
// import './SignupFormPage.css'

function SignupFormPage ({ onSuccess, onClose }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState([])

  // when the newly signed up user is successfully logged in, redirect to homepage
  if (sessionUser) {
    return <Redirect to='/' />
  }

  const isDisabled =
    !email ||
    !username ||
    !firstName ||
    !lastName ||
    !password ||
    !confirmPassword ||
    username.length < 4 ||
    password.length < 6 ||
    password !== confirmPassword
  
  const handleSubmit = e => {
    e.preventDefault()
    if (password === confirmPassword) {
      setErrors([])

      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(() => {
          onSuccess() // call the onSuccess callback prop
          onClose() // close the modal and overlay
        })
        .catch(async res => {
          const data = await res.json()
          if (data && data.errors) {
            let errorMessages = []

            if (Array.isArray(data.errors)) {
              errorMessages = data.errors
            } else {
              for (const key in data.errors) {
                if (data.errors.hasOwnProperty(key)) {
                  const errorValue = data.errors[key]
                  if (Array.isArray(errorValue)) {
                    errorValue.forEach(errorMsg => {
                      errorMessages.push(`${errorMsg}`)
                    })
                  } else {
                    errorMessages.push(`${errorValue}`)
                  }
                }
              }
            }
            setErrors(errorMessages)
          }
        })
    }

    return setErrors([
      'Confirm Password field must be the same as the password field'
    ])
  }

  return (
    <>
      <h1>Sign Up</h1>
      <div className='err-container'>
        {errors.length > 0 && (
          <p>
            {errors.map((error, idx) => (
              <li className='error-li' key={idx}>
                {error}
              </li>
            ))}
          </p>
        )}
      </div>
      <form className='signup-form' onSubmit={handleSubmit} noValidate>
        <div className='signup-input'>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='First Name'
            value={firstName}
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='Last Name'
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button
          type='submit'
          className='signup-btn'
          onSubmit={onSuccess}
          noValidate
          disabled={isDisabled}
        >
          Sign Up
        </button>
      </form>
    </>
  )
}

export default SignupFormPage
