const userDao = require("../dao/user.dao");
const reviewDoa = require("../dao/review.dao");

async function getEmpList(query = {}) {
    return await userDao.getUsersData();
}

async function getPerformanceReviewForFeedback(query) {
    return await reviewDoa.getReviews(query);
}

async function updateReviewData(data) {
    let {_id, ...payload} =  data;
    let query = { _id }
    return await reviewDoa.updateReview(query, payload);
}

async function getEmpData(query){
    console.log('queryquery', query)
    return await userDao.getUserData(query);
}

module.exports = {
    getEmpList,
    getPerformanceReviewForFeedback,
    updateReviewData,
    getEmpData
};
