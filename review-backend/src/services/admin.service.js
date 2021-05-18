const reviewDoa = require('../dao/review.dao');
const userDao = require("../dao/user.dao");
var mongoose = require('mongoose');
// var id = 


async function getEmpList(query) {
    return await userDao.getUsersData(query);
}

async function deleteEmp(query){
    return await userDao.deleteEmployee(query);
}

async function createUpdateEmp(data) {
    return await userDao.createUser(data);
}

async function updateReviewData(data) {
    let {_id, ...payload} =  data;
    let query = { _id }
    return await reviewDoa.updateReview(query, payload);
}

async function getReviewList(query = {}) {
    return await reviewDoa.getReviews(query);
}

async function createEmp(payload){
    return await userDao.addUser(payload);
}

async function createReview(payload){
    return await reviewDoa.addReview(payload);
}

async function assignReviewsToOthers(data){
    const allEmp = await userDao.getUsersData({_id:{ $ne: data.empId }, role_id: 2});
    const payload = allEmp.map(emp=>{
        return {
            review: '',
            employee_id: mongoose.Types.ObjectId(data.empId) ,
            assigned_to: emp._id,
            isCompleted: false
        }
    });
    return await reviewDoa.insertMany(payload);
}
module.exports = {
    getEmpList,
    deleteEmp,
    createUpdateEmp,
    updateReviewData,
    getReviewList,
    createEmp,
    createReview,
    assignReviewsToOthers
};