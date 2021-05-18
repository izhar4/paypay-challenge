const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

router.post('/addEmployee', async (req, res, next) => {
    try {
        const employeeData = await adminController.createEmployee(req);
        res.status(200).json(
            employeeData
        );
    } catch (error) {
        console.log(error)
        next(error);
    }
});

router.patch('/updateEmployee', async (req, res, next) => {
    try {
        const employeeData = await adminController.createUpdateEmp(req);
        res.status(200).json(
            employeeData
        );
    } catch (error) {
        console.log(error)
        next(error);
    }
})

router.delete('/deleteEmployee/:empId', async (req, res, next) => {
    try {
        await adminController.deleteEmp(req);
        res.status(200).json({
            data: {
                deleted: true
            }
        });
    } catch (error) {
        next(error);
    }
})

router.get('/getEmployeeList', async (req, res, next) => {
    try {
        const employees = await adminController.getEmpList(req);
        res.status(200).json(
            employees
        );
    } catch (error) {
        console.log(error);
        next(error);
    }
});

router.patch('/updateReview', async (req, res, next) => {
    try {
        const employeeData = await adminController.updateReview(req);
        res.status(200).json(
                employeeData
        );
    } catch (error) {
        console.log(error)
        next(error);
    }
})

router.get('/getEmployeeReviewList/:empId', async (req, res, next) => {
    try {
        const reviews = await adminController.getReviewList(req);
        res.status(200).json(
                reviews
        );
    } catch (error) {
        next(error);
    }
})

router.get('/employee/:empId',
	async (req, res, next) => {
		try {
			const emp = await adminController.getEmpDetails(req, res);
			res.status(200).json( emp );
		} catch (error) {
			console.log('error', error)
			next(error);
		}

	});

    router.post('/addReview', async (req, res, next) => {
        try {
            const reviewData = await adminController.createReview(req);
            res.status(200).json(
                reviewData
            );
        } catch (error) {
            console.log(error)
            next(error);
        }
    });

    router.post('/assignOthersToReview', async (req, res, next) => {
        try {
            const reviewData = await adminController.assignReviewsToOthers(req);
            res.status(200).json(
                reviewData
            );
        } catch (error) {
            console.log(error)
            next(error);
        }
    });


module.exports = router;