const BaseDao = require("./base.dao");
const UserModel = require("../models/user.model");

const userDao = new BaseDao(UserModel);

async function createUser(data) {
    let {_id, ...payload} =  data;
    let query = {};
    if(_id){
        query = { _id }
    }
    let options = {new: true, upsert: true};
    const userData = await userDao.findOneAndUpdate(query, payload, options).exec();
    return userData;
}

async function addUser(payload){
    userData= new UserModel(payload);
    return await userData.save();
}

async function getUserData(query){
    const projection = {};
    const userData = await userDao.findOne(query, projection).lean().exec();
    return userData;
}

async function getUsersData(query){
    const projection = {};
    return await userDao.findMany(query, projection).lean().exec();
}

async function deleteEmployee(query){
    const userData = await userDao.removeOne(query).lean().exec();
    return userData;
}

module.exports = {
    createUser,
    getUserData,
    deleteEmployee,
    getUsersData,
    addUser
};