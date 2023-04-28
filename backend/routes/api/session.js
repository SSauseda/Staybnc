const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];


// Log in
router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        return res.status(401).json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
        // const err = new Error('Login failed');
        // err.status = 401;
        // err.title = 'Login failed';
        // err.errors = { credential: 'The provided credentials were invalid.' };
        // return next(err);
      }
  
      const token = await setTokenCookie(res, user);
  
      return res.json({
        user: {
          email: user.email,
          id: user.id,
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
        }
      });
    }
  );

  // Log out
router.delete('/', (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );

  // Restore session user
router.get('/', restoreUser, (req, res) => {
      const { user } = req;
      if (user) {
        return res.json({
          user: user.toSafeObject()
        });
      } else return res.json({ user: null });
    }
  );
  


module.exports = router;
