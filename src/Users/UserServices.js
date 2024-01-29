var userModel = require('./UserModel');
const bcrypt = require('bcryptjs');

// User Registration Service Function
const UserRegistrationSFN = (records) => {
    return new Promise((resolve, reject) => {

        // Creating a new instance
        var UserModel = new userModel({
            FirstName: records.FirstName,
            LastName: records.LastName,
            Email: records.Email,
            MobileNumber: records.MobileNumber,
            Password: records.Password
        });

        userModel.findOne({ Email: UserModel.Email }).then(EmailExists => {
            if (EmailExists) {
                reject({ status: false, statuscode: 404, msg: "Email Already Exists" });
                return;
            }

            userModel.findOne({ MobileNumber: UserModel.MobileNumber }).then(MobileExists => {
                if (MobileExists) {
                    reject({ status: false, statuscode: 404, msg: "Mobile Number Already Exists" });
                    return;
                }

                if (!EmailExists && !MobileExists) {
                    // Password encryption
                    bcrypt.hash(records.Password, 10, (err, hash) => {
                        if (err) {
                            return console.log('Cannot encrypt');
                        }
                        UserModel.Password = hash;

                        // Storing data in database
                        UserModel.save().then(result => {
                            if (result) {
                                resolve({ status: true, statuscode: 200, msg: "User Registered successfully" });
                            } else {
                                reject({ status: false, statuscode: 404, msg: "Error User Registration" });
                            }
                        }).catch(err => {
                            console.error(err);
                            reject({ status: false, statuscode: 500, msg: "Error Getting Registration" });
                        });
                    });
                }
            });
        });

    });

}


// User Login Service Function
const UserLoginSFN = (UserDetails) => {
    return new Promise((resolve, reject) => {

        // Find Records By Email
        userModel.findOne({ Email: UserDetails.Email }).then(result => {

            if (result) {
                // Comparing Passwords
                bcrypt.compare(UserDetails.Password, result.Password, async (err, isMatch) => {

                    if (isMatch) {
                        resolve({
                            status: true,
                            statuscode: 200,
                            msg: "User Validated Successfully",
                            records: result
                        });
                    } else {
                        reject({ status: false, statuscode: 401, msg: "Invalid Password" });
                    }
                });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "No Records Found" });
            }

        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Records" });
        });
    });
}


// All User Records Service Function
const GetAllUserRecordsSFN = () => {
    return new Promise((resolve, reject) => {
        userModel.find().then(result => {

            if (result) {
                resolve({ status: true, statuscode: 200, msg: "Get All Records Successfully", records: result });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "No Records Found" });
            }


        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Records" });
        });

    });
}


// Single User Records Service Function
const GetUserRecordsByIdSFN = (id) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ _id: id }).then(result => {

            if (result) {
                resolve({ status: true, statuscode: 200, msg: "Get User Records Successfully", records: result });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "No Records Found" });
            }


        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Records" });
        });

    });
}

// Single User Records Service Function
const UpdateUserRecordsSFN = (UserDetails) => {
    return new Promise((resolve, reject) => {
        userModel.updateOne({ _id: UserDetails._id }, UserDetails).then(result => {

            if (result) {
                resolve({ status: true, statuscode: 200, msg: "User Updated Successfully", records: UserDetails });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "No Records Found" });
            }


        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Update" });
        });

    });
}



// Find Email Duplicate Service Function
const FindDuplicateEmailSFN = (email) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ Email: email }).then(result => {

            if (result) {
                resolve({ status: true, statuscode: 200, msg: "Email Already Exists", records: false });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "Email Not Found", records: true });
            }


        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Records" });
        });

    });
}



// Find Mobile Number Duplicate Service Function
const FindDuplicateMobileNumberSFN = (MobileNumber) => {
    return new Promise((resolve, reject) => {
        userModel.findOne({ MobileNumber: MobileNumber }).then(result => {

            if (result) {
                resolve({ status: true, statuscode: 200, msg: "Mobile Number Already Exists", records: false });
            }
            else {
                reject({ status: false, statuscode: 404, msg: "Mobile Number Not Found", records: true });
            }


        }).catch(err => {
            console.error(err);
            reject({ status: false, statuscode: 500, msg: "Error Getting Records" });
        });

    });
}

// Exporting all functions
module.exports = { UserRegistrationSFN, UserLoginSFN, GetAllUserRecordsSFN, GetUserRecordsByIdSFN, UpdateUserRecordsSFN, FindDuplicateEmailSFN, FindDuplicateMobileNumberSFN };