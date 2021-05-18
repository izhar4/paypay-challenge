// const utils = require("../utils/common");
const employeeController = {};
const CustomError = require('../errors/custom-errors');
const DB_CONSTANTS = require('../../config/dbConstants');
const empService = require('../services/employee.service');
/**
 * @description
 * Function employeeController is a Entry point for all employees
 * @param req {Object} the request object
 * */

employeeController.getEmpList = async (req, res) => {
    try {
        let query = { role_id: DB_CONSTANTS.ROLE_ID.employee };
        return await empService.getEmpList(query);
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }

};


employeeController.getPerformanceReviewsRequiredFeedback = async (req, res) => {
        let query = { assigned_to: req.params.empId, isCompleted: false,
                // $lookup:
                // {
                //     from: 'users',
                //     localField: 'employee_id',
                //     foreignField: '_id',
                //     as: 'employeeData'
                // }

    };
    return await empService.getPerformanceReviewForFeedback(query);
};

employeeController.submitReviewFeedback = async (body) => {
    return await empService.updateReviewData(body);
};

employeeController.getEmployeeData = async (req, res) => {
    try {
        console.log('params', req.params)
        return await empService.getEmpData({ _id: req.params.empId });
    } catch (error) {
        throw new CustomError(DB_CONSTANTS.ERROR_MESSAGES.INTERNAL_SERVER_ERROR, 500);
    }
};



module.exports = employeeController;
