const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const spotsRouter = require('./spots');
const bookingsRouter = require('./bookings')
const reviewsRouter = require('./reviews')
const spotImageRouter = require('./spotImage')
const reviewImagesRouter = require('./reviewImage')
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth')

router.use(restoreUser);
router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/spots', spotsRouter);
router.use('/reviews', reviewsRouter);
router.use('/review-images', reviewImagesRouter);
router.use('/bookings', bookingsRouter);
router.use('/spot-images', spotImageRouter)



// router.post('/test', function(req, res) {
//     res.json({ requestBody: req.body });
//   });

  // GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
      where: {
        username: 'Demo-lition'
      }
    });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

// router.get(
//     '/restore-user',
//     (req, res) => {
//       return res.json(req.user);
//     }
//   );

// const { requireAuth } = require('../../utils/auth.js');
// router.get(
//   '/require-auth',
//   requireAuth,
//   (req, res) => {
//     return res.json(req.user);
//   }
// );



module.exports = router;
