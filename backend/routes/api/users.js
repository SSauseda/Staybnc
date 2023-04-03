const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Invalid email'),
    check('username')
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.')
      .exists({ checkFalsy: true })
      .withMessage("Username is required")
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .withMessage('First Name is required'),
    check('lastName')
      .exists({ checkFalsy: true })
      .withMessage('Last Name is required'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];


// Sign up
router.post('/', validateSignup, async (req, res) => {
  const { email, password, username, firstName, lastName } = req.body;
  const user = await User.signup({ email, username, password, firstName, lastName });
      const newToken = await setTokenCookie(res, user);
  
  
      return res.json({user:{
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        token: newToken
      }});
    }
  );



module.exports = router;
