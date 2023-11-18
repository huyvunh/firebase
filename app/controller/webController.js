const { name } = require('ejs');
const firestoreDB = require('../../config/Database/firestoreDatabase/firestore');
const moment = require('moment-timezone');

exports.createStudent = async (req, res, next) => {

    let body = req.body;
    console.log(body)
    const name = body['name'], age = parseInt(body['age']), nameOfClass = body['nameOfClass'], createdAtTimestmap = body['currentDate'];

    try {

        const currentDate = moment.tz(new Date(), 'Asia/Ho_Chi_Minh').unix();
        const currentCreatedAt = moment.unix(currentDate).tz('Asia/Ho_Chi_Minh').format('MM/DD/YYYY HH:mm:ss',)
        const id = 'STU-' + currentDate;
        let newStudent = {
            id: id,
            name: name,
            age: age,
            nameOfClass: nameOfClass,
            createdAt: currentCreatedAt,
            createdAtTimestmap: currentDate
        }
        await firestoreDB.collection('Students').doc(id).set(newStudent);

        return res.status(200).json({
            status: 200, message: 'Create User Success!'
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
};

exports.getDataStudent = async (req, res, next) => {
    let body = req.body;

    try {

        const students = await firestoreDB.collection('Students');
        const dataStudents = await students
            .where('age', '>=', 18)
            .get();

        console.log(dataStudents)
        let listData = [];
        if (!dataStudents.empty) {
            dataStudents.forEach(doc => {
                const stu = doc.data();
                listData.push(stu)
            });
        }

        return res.status(200).json({
            status: 200, message: 'Create User Success!',
            data: listData
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}


exports.getStudentById = async (req, res, next) => {
    let body = req.body;
    const id = body['id']

    try {
        //fromDate , toDate

        const students = firestoreDB.collection('Students');
        const dataStudents = await students
            //  .where('id', '==', id)
            // .where('createdAtTimestmap', '>=', fromDate)
            // .where('createdAtTimestmap', '<=', toDate)
            .get();
        // const dataStudents = await students
        //     .where('age', '>=', 18)
        //     .get();


        const student = dataStudents.docs[0].data();

        return res.status(200).json({
            status: 200, message: 'Create User Success!',
            data: student
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}


//Tìm danh sách học sinh lớn 17 và nhỏ 22
exports.chooseDataStudent = async (req, res, next) => {
    let body = req.body;

    try {

        const students = await firestoreDB.collection('Students');
        const dataStudents = await students
            .where('age', '>=', 17)
            .where('age', '<', 22)
            .get();

        console.log(dataStudents)
        let listData = [];
        if (!dataStudents.empty) {
            dataStudents.forEach(doc => {
                const stu = doc.data();
                listData.push(stu)
            });
        }

        return res.status(200).json({
            status: 200, message: 'Create User Success!',
            data: listData
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}

//Xóa dữ liệu
exports.deleteStudentById = async (req, res, next) => {
    const id = req.body.id;

    try {

        const studentRef = firestoreDB.collection('Students').doc(id);
        const studentDoc = await studentRef.delete();


        return res.status(200).json({
            status: 200, message: 'Delete User Success!'
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}
//Sửa dữ liệu
exports.updateStudentById = async (req, res, next) => {
    let body = req.body;
    const id = body['id']

    try {

        const studentRef = firestoreDB.collection('Students').doc(id);
        const studentDoc = await studentRef.update({
            name: body['name'],
            age: body['age'],
            nameOfClass: body['nameOfClass']
        });

        return res.status(200).json({
            status: 200, message: 'Create User Success!'
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
};

// Tìm danh sách học sinh được tạo theo ngày tháng fromDate và toDate

exports.getStudentFromDate = async (req, res, next) => {
    let body = req.body;
    const startDate = moment.tz(`${req.body.startDate} 00:00:00`, 'MM/DD/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh');
    const toDate = moment.tz(`${req.body.toDate} 23:59:59`, 'MM/DD/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh');
    console.log(startDate, toDate)

    const startDateTimeStamp = moment.tz(startDate, 'MM/DD/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh').unix();
    const toDateTimeStamp = moment.tz(toDate, 'MM/DD/YYYY HH:mm:ss', 'Asia/Ho_Chi_Minh').unix();
    console.log(startDateTimeStamp, toDateTimeStamp)

    try {

        const students = await firestoreDB.collection('Students');
        const dataStudents = await students
            .where('createdAtTimestmap', '>=', startDateTimeStamp)
            .where('createdAtTimestmap', '<=', toDateTimeStamp)
            .get();

        let student = [];
        if (!dataStudents.empty) {
            dataStudents.forEach(doc => {
                const stu = doc.data();
                student.push(stu)
            });
        }
        console.log(student)
        return res.status(200).json({
            status: 200, message: 'Get Student Success!',
            data: student
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}