const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { QueryInterface, Sequelize, Op } = require('sequelize');
const { requireAuth, setTokenCookie } = require('../../utils/auth');


//delete a review image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const review = await ReviewImage.findByPk(imageId, {
        include: { model: Review }
    })
    if (!review) {
        return res.status(404).json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
        })
    }
    if (review.Review.userId !== req.user.id){
        return res.status(403).json({
            "message": "User not authorized",
            "statusCode": 403
        })
    } else {
        await review.destroy(imageId)
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})




module.exports = router;
