const express = require('express');
const router = express.Router();
const webController = require('../../controller/webController');

router.post('/createStudent', webController.createStudent);
router.post('/getDataStudent', webController.getDataStudent);
router.post('/getStudentById', webController.getStudentById);
router.post('/chooseDataStudent', webController.chooseDataStudent);
router.post('/deleteStudentById', webController.deleteStudentById);
router.post('/getStudentFromDate', webController.getStudentFromDate);
router.post('/updateStudentById', webController.updateStudentById);

module.exports = router;