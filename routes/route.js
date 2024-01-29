var express = require('express');
var userController = require('../src/Users/UserController');
/* Using Router From Express Package */
const router = express.Router();

/* User Routes */

router.route('/User/Register').post(userController.UserRegistrationCFN); // User Registration Route
router.route('/User/Login').get(userController.UserLoginCFN); // User Login Route
router.route('/User/GetAllUserRecords').get(userController.GetAllUserRecordsCFN); // Get All User Records Route
router.route('/User/GetUserRecordsById/:id').get(userController.GetUserRecordsByIdCFN); // Get User By Id Route
router.route('/User/UpdateUserRecords').put(userController.UpdateUserRecordsCFN); // Get User By Id Route
router.route('/User/FindDuplicateEmail/:email').get(userController.FindDuplicateEmailCFN); // Find Duplicate Email Route
router.route('/User/FindDuplicateMobileNumber/:MobileNumber').get(userController.FindDuplicateMobileNumberCFN); // Find Duplicate Mobile Number Route

/* User Routes */

module.exports = router;