const db = require('../config/db')

exports.insertPatient = async (req, res) => {
    let query = 'INSERT INTO patient SET ?'
    try {
        for (let i = 0; i < req.body.patient_detail.length; i++) {
            // console.log(req.body.patient_detail[i])
            let patient = { name: req.body.patient_detail[i].patient_name, dob: req.body.patient_detail[i].patient_dob, email: req.body.patient_detail[i].patient_email, mobile: req.body.patient_detail[i].patient_mobile, doctor_id: req.body.doctor_id }
            // console.log(patient)
            await db.query(query, patient, async (err, result) => {
                if (err) {
                    return res.status(500).json({
                        success: false,
                        msg: 'Internal server error'
                    })
                } else {
                    let query_1 = 'INSERT INTO patient_doctor SET ?'
                    let data = { patient_id: result.insertId, doctor_id: req.body.doctor_id }
                    await db.query(query_1, data, () => {})
                }
            })
        }
        return res.status(200).json({
            success: true,
            msg: 'Successfully inserted!'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Internal server error'
        })
    }



}

exports.getDoctors = async (req, res) => {
    try {
        let query = 'SELECT * FROM doctors';
        db.query(query, (err, result) => {
            if (err)
                return res.status(500).json({
                    success: false,
                    msg: 'Internal server error'
                })
            else {
                return res.status(200).json({
                    success: true,
                    doctors: result
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            doctors: result
        })
    }

}

exports.getPatients = async (req, res) => {
    try {
        let query = `SELECT patient.name AS name,
                         patient.dob AS dob, patient.email AS email, doctors.name AS doctor_name
                          FROM patient JOIN 
                         doctors ON patient.doctor_id = doctors.id`
        db.query(query, (err, result) => {
            if (err)
                return res.status(500).json({
                    success: false,
                    msg: 'Internal server error'
                })
            else {
                return res.status(200).json({
                    success: true,
                    patients: result
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            doctors: result
        })
    }

}