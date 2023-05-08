import React, { useState } from 'react'
import * as sessionActions from '../../store/session'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
// import './LoginFormPage.css'

function LoginFormPage ({ onSuccess }) {
  const dispatch = useDispatch()
  const sessionUser = useSelector(state => state.session.user)
  const [credential, setCredential] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [loginFailed, setLoginFailed] = useState(false)

  // redirect user to homepage after logging in
  if (sessionUser) return <Redirect to='/' />

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors([])
    setLoginFailed(false)

    const success = await dispatch(
      sessionActions.login({ credential, password, setErrors })
    ).catch(async res => {
      const data = await res.json()

      if (data && data.errors) {
        setErrors(data.errors)
      }
    })

    if (success && onSuccess) {
      onSuccess()
    }

    if (!success) {
      setLoginFailed(true)
    }
  }

  const handleDemoLogin = async e => {
    e.preventDefault()
    setErrors([])
    setLoginFailed(false)

    const success = await dispatch(sessionActions.demoLogin()).catch(
      async res => {
        const data = await res.json()

        if (data && data.errors) {
          setErrors(data.errors)
        }
      }
    )

    if (success && onSuccess) {
      onSuccess()
    }

    if (!success) {
      setLoginFailed(true)
    }
  }

  return (
    <>
      <h1 className='login-title'>Log In</h1>
    {loginFailed && (
      <div className='error-message'>
        The provided credentials were invalid.
      </div>
    )}
      <div className='login-form'>
        <form noValidate onSubmit={handleSubmit} className='login-form'>
          <div className='login-input'>
            <label className='label'>
              <input
                className='input'
                type='text'
                placeholder='Username or Email'
                value={credential}
                onChange={e => setCredential(e.target.value)}
                required
              />
            </label>
            <label className='label'>
              <input
                className='input'
                type='password'
                placeholder='Password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className='demo-login-btns'>
            <button type='submit' className='login-btn'>
              Log In
            </button>
            <button
              type='button'
              className='demo-btn'
              onClick={handleDemoLogin}
              noValidate
            >
              Demo User
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginFormPage
