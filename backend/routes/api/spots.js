const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { Sequelize, Op } = require('sequelize');
const { requireAuth, spotAuthorization, checkPermission, setTokenCookie } = require('../../utils/auth');

const validateCreateSpotError = [
    check('address')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Latitude is required'),
    check('lng')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Longitude is required'),
    check('name')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isLength({ max: 49 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Price per day is required'),
    handleValidationErrors
]

const createReviewValidationError = [
    check('review')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Reveiw text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]


// Get all spots
router.get('/', async (req, res) => {
    const allSpots = await Spot.findAll({
        include: [
            { model: Review, attributes: [] },
            { model: SpotImage, attributes: [] }
        ],
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.col('Reviews.stars'), 'avgRating'],
            [Sequelize.col('SpotImages.url'), 'previewImage']

        ],
    })
    return res.json({ "Spots": allSpots })
})

//Get all Spots from current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const allSpots = await Spot.findAll({
        where: { ownerId: userId },
        include: [
            { model: SpotImage, attributes: []},
            { model: Review, attributes: ['stars'] }
        ],
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
            [Sequelize.col('Reviews.stars'), 'avgRating'],
            [Sequelize.col('SpotImages.url'), 'previewImage']
        ],
        // group: ['Spot.id', 'SpotImages.id', 'Reviews.spotId', 'Reviews.id']
    })
    if (allSpots){
        const spots = allSpots.map(spot => {
            spot = spot.toJSON()
            // const lat = parseFloat(spot.lat)
            // const lng = parseFloat(spot.lng)
            // const price = parseFloat(spot.price)
            const avgRating = parseFloat(spot.avgRating)
            return {
                id: spot.id,
                ownerId: spot.ownerId,
                address: spot.address,
                city: spot.city,
                state: spot.state,
                country: spot.county,
                lat: spot.lat,
                lng: spot.lng,
                name: spot.name,
                description: spot.description,
                price: spot.price,
                createdAt: spot.createdAt,
                updatedAt: spot.updatedAt,
                avgRating,
                previewImage: spot.previewImage
            }
        })
        return res.status(200).json({ "Spots": spots })
    } else {
        res.status(400).json({
            "message": 'Current user has no spots',
            'statusCode': 404
        })

    }
})

//get details of spot from an ID
router.get('/:spotId', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId, {
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview']},
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: Review, attributes: [] }
        ],
        attributes: {
            include: [
                [Sequelize.fn("COUNT", Sequelize.col('Reviews.stars')), 'numReviews'],
                [Sequelize.fn('AVG', Sequelize.col('Reviews.stars')), 'avgStarRating']
            ]
        }, 
        group: ['Spot.id', 'SpotImages.id', "Reviews.spotId", "User.id"]
    })
    if (spot){
        return res.status(200).json(spot)
    }else{
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
})

  


//create a Spot
router.post('/', requireAuth, validateCreateSpotError, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const ownerId = req.user.id;

    const newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.status(201).json(newSpot)
});

//Add image to a spot based on spot's id
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        res.status(404)
        return res.json({
            "message": "Spot counldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            "message": "User not authorized"
        })
    } else {
        const newImage = await SpotImage.create({
            spotId: spotId,
            url: url,
            preview: preview
        })
        return res.status(200).json({
            id: newImage.id,
            url: newImage.url,
            preview: newImage.preview
        })
    }
});



//Edit a spot
router.put('/:spotId', requireAuth, validateCreateSpotError, async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    if(!spot){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId !== req.user.id){
        return res.status(403).json({
            "message": "User not authorized"
        })
    } else {
        const spotEdit = await spot.update({
            address,
            city,
            state, 
            country,
            lat,
            lng,
            name,
            description,
            price,
        })
        return res.status(200).json(spotEdit)
    }
})


//delete a spot
router.delete('/:spotId', async (req, res) => {
    const spotId = req.params.spotId;
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId !== req.user.id) {
        return res.status(403).json({
            "message": "User not authorized"
        })
    } else {
        await spot.destroy()
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})


//get all reviews by spot id
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404 
        })
    }
    const allReviews = await Review.findAll({
        where: { spotId: spotId },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: ReviewImage, attributes: ['id', 'url']}
        ]
    })
    return res.status(200).json({"Reviews": allReviews})
})

//create a review for a spot based on spots id
router.post('/:spotId/reviews', requireAuth, createReviewValidationError, async (req, res) => {
    const userId = req.user.id
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const { review, stars } = req.body
    const reviewExists = await Review.findOne({ where: { userId, spotId }})

    if (reviewExists){
        return res.status(403).json({ 
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }
    if (!spot){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }else{
        const newReview = await Review.create({
            userId,
            spotId: spotId,
            review,
            stars
        })
        return res.status(201).json(newReview)
    }
})

//get all bookings for a spot based on spots id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    if(!spot){
        res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if (spot.ownerId === req.user.id){
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            include: { model: User, attributes: ['id', 'firstName', 'lastName']}
        })
        return res.status(200).json({"Bookings": bookings})
    } else {
        const bookings = await Booking.findAll({
            where: { spotId: spotId },
            attributes: ['spotId', 'startDate', 'endDate']
        })
        return res.status(200).json({"Bookings": bookings })
    }
})

//create a booking from a spot based on the spot's id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const spot = await Spot.findByPk(spotId)
    const { startDate, endDate } = req.body
    const userId = req.user.id
    if (!spot){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    if(spot.ownerId !== req.user.id) {
        return res.status(403).json({
            "message": "user not authorized"
        })
    } else {
        if (endDate <= startDate) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": ["endDate cannot be on or before startDate"]  
            })
        }
    }
    const bookConflict = await Booking.findAll({
        where: {
            spotId,
            [Op.or]: [
                {
                    startDate: { [Op.lte]: startDate },
                    endDate: { [Op.gte]: startDate }
                },
                {
                    startDate: { [Op.lte]: endDate },
                    endDate: { [Op.gte]: endDate }
                },
                {
                    startDate: { [Op.gte]: startDate },
                    endDate: { [Op.lte]: endDate }
                } 
            ]
        }
    })
    if (bookConflict.length) {
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": [ "Start date conflicts with an existing booking", "End date conflicts with an existing booking"]
        })
    }
    const newBooking = await Booking.create({
        spotId: spotId,
        userId,
        startDate,
        endDate
    })
    return res.status(200).json(newBooking)
})



module.exports = router;
