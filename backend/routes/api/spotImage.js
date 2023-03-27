const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { QueryInterface, Sequelize, Op } = require('sequelize');
const { requireAuth, setTokenCookie } = require('../../utils/auth');

//delete a spot image
router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageId = req.params.imageId
    const image = await SpotImage.findByPk(imageId, {
        include: { model: Spot }
    })
    if (!image) {
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
        })
    }
    if (image.Spot.ownerId !== req.user.id){
        return res.status(403).json({
            "message": "User not authorized",
            "statusCode": 403
        })
    } else {
        await image.destroy(imageId)
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})


module.exports = router;
