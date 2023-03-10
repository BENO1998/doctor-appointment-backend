import express from 'express';
import { AddAppointMentCollection, AddDoctor, AppointmentPatientsList, appointMentByDate, DoctorList, IsDoctor } from '../controllers/doctor.js';
import { login, register } from '../controllers/user.js';

const router = express.Router();

router.post('/appointByDate', appointMentByDate);
router.post('/addDoctor', AddDoctor);
router.get('/doctors', DoctorList);
router.post('/addAppointMent', AddAppointMentCollection);
router.get('/allPatients', AppointmentPatientsList);
router.post('/isDoctor', IsDoctor);

//auth
router.post('/auth/register', register);
router.post('/auth/login', login);

export default router;