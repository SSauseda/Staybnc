const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { QueryInterface, Sequelize, Op } = require('sequelize');
const { requireAuth, setTokenCookie, checkPermission } = require('../../utils/auth');

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

//Get all spots owned by current user
router.get('/current', )


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




module.exports = router;
