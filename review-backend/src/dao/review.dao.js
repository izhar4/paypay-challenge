const BaseDao = require('./base.dao');
const ReviewModel = require('../models/review.model');
const dbConstants = require('../../config/dbConstants')
const reviewDao = new BaseDao(ReviewModel);

async function updateReview(query, data) {
    let options = {new: true, upsert: true};
    const reviewData = await reviewDao.findOneAndUpdate(query, data, options).exec();
    return reviewData;
}

async function getReviews(query, populate= {}) {
    return await reviewDao.findMany(query).populate({path: 'employee_id'});
}

async function getReview(query) {
    return await reviewDao.findOne(query).populate({'path': 'user_id'}).lean().exec();
}

async function addReview(payload){
    const reviewData= new ReviewModel(payload);
    return await reviewData.save();
}

async function insertMany(payload){
    return await reviewDao.insertMany(payload);
}

module.exports = {
    updateReview,
    getReviews,
    getReview,
    addReview,
    insertMany
};