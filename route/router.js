const express = require('express');

const { getDoctors, insertPatient, getPatients } = require('../controller/patientController')

const validate = require('../validator')


const router = express.Router();

router.get('/get-doctors', getDoctors)
router.get('/get-patient', getPatients)

router.post('/insert-patient', validate.validatePatientDetails(), validate.sendError, insertPatient)


// router.route('/get-doctors').get(getDoctors)
// router.route('/get-patient').get(getPatients)

// router.route('/insert-patient').post(insertPatient)

module.exports = router