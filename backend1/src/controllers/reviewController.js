const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

const createReview = async (req, res, next) => {
    try {
        const { comments, rating, itemId, mentorId } = req.body;
        const buyerId = req.user.id; // User is logged in

        // Validation
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: 'Valid rating (1-5) is required'
            });
        }

        if (!itemId && !mentorId) {
            return res.status(400).json({
                success: false,
                message: 'itemId or mentorId is required'
            });
        }

        // Ensure user is a Buyer
        let buyer = await prisma.buyer.findUnique({ where: { userId: buyerId } });
        if (!buyer) {
            buyer = await prisma.buyer.create({ data: { userId: buyerId } });
        }

        const review = await prisma.review.create({
            data: {
                comments,
                rating: parseInt(rating),
                buyerId: buyerId,
                itemId: itemId ? parseInt(itemId) : null,
                mentorId: mentorId ? parseInt(mentorId) : null,
            },
            include: {
                buyer: {
                    include: {
                        user: {
                            select: { name: true, profileImageUrl: true }
                        }
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            data: review
        });
    } catch (error) {
        console.error('Create review error:', error);
        next(error);
    }
};

const getItemReviews = async (req, res, next) => {
    try {
        const { itemId } = req.params;
        const reviews = await prisma.review.findMany({
            where: { itemId: parseInt(itemId) },
            include: {
                buyer: {
                    include: {
                        user: {
                            select: { name: true, profileImageUrl: true }
                        }
                    }
                }
            },
            orderBy: { date: 'desc' }
        });

        const averageRating = reviews.length > 0
            ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
            : 0;

        res.status(200).json({
            success: true,
            data: reviews,
            averageRating: parseFloat(averageRating.toFixed(1)),
            count: reviews.length
        });
    } catch (error) {
        console.error('Get item reviews error:', error);
        next(error);
    }
};

const getMentorReviews = async (req, res, next) => {
    try {
        const { mentorId } = req.params;
        const reviews = await prisma.review.findMany({
            where: { mentorId: parseInt(mentorId) },
            include: {
                buyer: {
                    include: {
                        user: {
                            select: { name: true, profileImageUrl: true }
                        }
                    }
                }
            },
            orderBy: { date: 'desc' }
        });

        const averageRating = reviews.length > 0
            ? reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length
            : 0;

        res.status(200).json({
            success: true,
            data: reviews,
            averageRating: parseFloat(averageRating.toFixed(1)),
            count: reviews.length
        });
    } catch (error) {
        console.error('Get mentor reviews error:', error);
        next(error);
    }
};

module.exports = {
    createReview,
    getItemReviews,
    getMentorReviews
};
