const { check, validationResult } = require('express-validator');

// sending error to the client generated from the express-validator
const sendError = (req, res, next) => {
    const errorInValidation = validationResult(req);
    if (!errorInValidation.isEmpty()) {
        res.status(200).json({ success: false, errors: errorInValidation.array() });
        return;
    } else {
        next();
    }
}

const validatePatientDetails = () => {
    return [
        check('patient_detail.*.patient_name').custom((value) => {
            if (isNaN(value)) {
                return true
            } else {
                throw new Error('Invalid Name')
            }
        }),
        check('patient_detail.*.patient_email').custom((value) => {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                throw new Error('Invalid Email')
            }
        }),
        check('patient_detail.*.patient_dob').isDate({ format: 'YYYY-MM-DD' }),
        // check('patient_detail.*.patient_mobile').isMobilePhone(),
        check('patient_detail.*.patient_mobile').custom((value) => {
            if (value !== "" && !isNaN(value)) {
                if (value.toString().length !== 10) {
                    throw new Error('Invalid mobile number')
                }
                return true
            }
            else {
                throw new Error('Please enter mobile number')
            }
        }),
        check('doctor_id').custom((value) => {
            if (value !== "" && !isNaN(value)) {
                return true
            } else {
                throw new Error('Invalid doctor id')
            }
        }),

    ]
}


module.exports = {
    sendError, validatePatientDetails
};

