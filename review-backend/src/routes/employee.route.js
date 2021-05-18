const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller");

router.get('/getReviewsForFeedback/:empId',
	async (req, res, next) => {
		try {
			const reviews = await employeeController.getPerformanceReviewsRequiredFeedback(req, res);
			res.status(200).json(reviews );
		} catch (error) {
			console.log(error)
			next(error);
		}

	});

router.patch('/submitFeedback', async (req, res, next) => {
	try {
		const reviewData = await employeeController.submitReviewFeedback(req.body);
		res.status(200).json(reviewData );
	} catch (error) {
		console.log(error)
		next(error);
	}
});

router.get('/getEmployeeList',
	async (req, res, next) => {
		try {
			const emp = await employeeController.getEmpList(req, res);
			res.status(200).json(emp);
		} catch (error) {
			console.log(error)
			next(error);
		}

	});

router.get('/:empId',
	async (req, res, next) => {
		try {
			const emp = await employeeController.getEmployeeData(req, res);
			res.status(200).json( emp );
		} catch (error) {
			console.log('error', error)
			next(error);
		}

	});




module.exports = router;