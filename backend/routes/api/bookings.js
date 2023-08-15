const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { QueryInterface, Sequelize, Op } = require('sequelize');
const { requireAuth, setTokenCookie } = require('../../utils/auth');


//get all of the current user's bookings
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const bookings = await Booking.findAll({
        where: { userId: userId },
        include: [
            { model: Spot.scope({ method: ['withPreview', req.user.id]})}
        //     { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
        // include: { model: SpotImage, attributes: ['url'], where: { preview: true}, require: false}}
        ]
    })
    return res.json({"Bookings": bookings })
})

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)
    const { startDate, endDate } = req.body
    const userId = req.user.id
    if (!booking){
        return res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    if (booking.userId !== userId){
        return res.status(403).json({
            "message": "User not authorized",
            "statusCode": 403
        })
    } else {
        if (new Date(endDate) < new Date(startDate)) {
            return res.status(400).json({
                "message": "Validation error",
                "statusCode": 400,
                "errors": ["endDate cannot come before startDate"]
            })
        }
    }
    if (new Date() > new Date(endDate)) {
        return res.status(403).json({
            "message": "Past bookings can't be modifed",
            "statusCode": 404
        })
    }
    const editBookingConflict = await Booking.findOne({
        where: {
            spotId: booking.spotId,
            [Op.and]: [
                {
                    startDate: { [Op.lt]: endDate },
                },
                {
                    endDate: { [Op.gt]: startDate },
                },
            ]
        }
    })
    if (!editBookingConflict){
        const updateBooking = await booking.update({
            startDate: new Date(startDate),
            endDate: new Date(endDate)
        })
        return res.status(200).json(updateBooking)
    } else {
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": [
              "Start date conflicts with an existing booking",
              "End date conflicts with an existing booking"
            ] 
        })
    }
})

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = req.params.bookingId
    const booking = await Booking.findByPk(bookingId)
    if (!booking){
        res.status(404).json({
            "message": "Booking couldn't be found",
            "statusCode": 404
        })
    }
    const startDate = booking.startDate
    const currDate = new Date()
    if (new Date(startDate) <= currDate) {
        return res.status(404).json({
            "message": "Bookings that have been started can't be deleted",
            "statusCode": 403
        })
    }
    if (booking.userId !== req.user.id){
        return res.status(403).json({
            "message": "User not authorized",
            "statusCode": 403
        })
    } else {
        await booking.destroy(bookingId)
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})











module.exports = router;
