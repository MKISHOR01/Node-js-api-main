const userService = require('./UserServices');


// User Registration Function 
const UserRegistrationCFN = async (req, res) => {
    try {
        // Calls a promise to user registration services
        var result = await userService.UserRegistrationSFN(req.body);

        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg });
        }
    }
    catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg });
    }
}


// User Login Function 
const UserLoginCFN = async (req, res) => {
    var result = null;
    try {
        // Calls a promise to user login services
        result = await userService.UserLoginSFN(req.query);
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg });
    }
}


// All User Records Function
const GetAllUserRecordsCFN = async (req, res) => {
    var result = null;
    try {
        // Calls a promise to user records services
        result = await userService.GetAllUserRecordsSFN();
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg });
    }
}


// User Records ById Function
const GetUserRecordsByIdCFN = async (req, res) => {
    var result = null;
    try {
        var id = req.params.id;
        // Calls a promise to single user records services
        result = await userService.GetUserRecordsByIdSFN(id);
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg });
    }
}


// Update User Records Function
const UpdateUserRecordsCFN = async (req, res) => {
    var result = null;
    try {
        // Calls a promise to single user records services
        result = await userService.UpdateUserRecordsSFN(req.body);
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg });
    }
}


// Find Duplicate Email Function
const FindDuplicateEmailCFN = async (req, res) => {
    var result = null;
    try {
        var email = req.params.email;
        // Calls a promise to Duplicate Email services
        result = await userService.FindDuplicateEmailSFN(email);
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg, "result": error.records });
    }
}


// Find Duplicate Mobile Number ById Function
const FindDuplicateMobileNumberCFN = async (req, res) => {
    var result = null;
    try {
        var MobileNumber = req.params.MobileNumber;
        // Calls a promise to Duplicate Mobile Number services
        result = await userService.FindDuplicateMobileNumberSFN(MobileNumber);
        if (result.status) {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        } else {
            res.send({ "status": result.statuscode, "message": result.msg, "result": result.records });
        }

    } catch (error) {
        console.log(error);
        res.send({ "status": error.statuscode, "message": error.msg, "result": error.records });
    }
}

// Exporting all functions
module.exports = { UserRegistrationCFN, UserLoginCFN, GetAllUserRecordsCFN, GetUserRecordsByIdCFN, UpdateUserRecordsCFN, FindDuplicateEmailCFN, FindDuplicateMobileNumberCFN };