const express = require('express');
const router = express.Router();
const { handleValidationErrors } = require('../../utils/validation')
const { check } = require('express-validator');
const { Spot, Review, SpotImage, User, Booking, ReviewImage } = require('../../db/models');
const { QueryInterface, Sequelize } = require('sequelize');
const { requireAuth, setTokenCookie } = require('../../utils/auth');


const editReviewValidationError = [
    check('review')
        .exists({ checkFalsey: true })
        .notEmpty()
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
]

// get all reviews of current user
router.get('/current', requireAuth, async (req, res) => {
    const userId = req.user.id
    const user = await Review.findByPk(req.user.id)
    const reviews = await Review.findAll({
        include: [
            {model: User, attributes: ['id', 'firstName', 'lastName']},
            { model: Spot.scope({ method: ['withPreview', userId]})},
        {model: ReviewImage, attributes: ['id', 'url']}
        ]
    })
    return res.json({'Reviews': reviews })
})

//add an iamge to a reivew based on the review's id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId
    console.log(reviewId)
    const review = await Review.findByPk(reviewId)
    const { url } = req.body

    if (!review){
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    const maxImages = await ReviewImage.findAll({ where: { reviewId }})
    if (maxImages.length >= 10){
        return res.status(403).json({
            "message": "Maxium number of images for this resource was reached",
            "statusCode": 403
        })
    } else {
        const newImage = await ReviewImage.create({
            reviewId: reviewId,
            url: url
        })
        return res.status(200).json({
            id: newImage.id,
            url: newImage.url
        })
    }
})

//edit a review
router.put('/:reviewId', requireAuth, editReviewValidationError, async (req, res) => {
    const reviewId = req.params.reviewId
    // console.log(reviewId)
    const editReview = await Review.findByPk(reviewId)
    const { review, stars } = req.body
    if (!editReview){
        return res.status(400).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }
    if (editReview.userId !== req.user.id){
        res.status(400).json({
            "message": "User not authorized"
        })
    } else {
        const update = await editReview.update({
            review,
            stars
        })
        return res.status(200).json(update)
    }
})

//delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId
    const review = await Review.findByPk(reviewId)
    if (!review){
        res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    } else {
        await review.destroy(reviewId)
        return res.status(200).json({
            "message": "Successfully deleted",
            "statusCode": 200
        })
    }
})



module.exports = router;
