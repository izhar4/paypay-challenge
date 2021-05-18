/**
 * Created by Izhar Ahmad on 01/01/2019.
 */

var employeeRouter = require('./employee.route');
var adminRouter = require('./admin.route');
/**
 * Creates an object of the exports module to be able to access controller function
 * @param app exports object connects the url to the controller function
 */

module.exports = function index(app) {
    app.use('/api/admin', adminRouter);
    app.use('/api/employee', employeeRouter);
};