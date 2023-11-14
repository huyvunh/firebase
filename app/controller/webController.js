const firestoreDB = require('../../config/Database/firestoreDatabase/firestore');
const moment = require('moment-timezone');

exports.createStudent = async (req, res, next) => {

    let body = req.body;
    console.log(body)
    const name = body['name'], age = parseInt(body['age']), nameOfClass = body['nameOfClass'];

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
        const studentDoc = await studentRef.get();
        await studentRef.delete();


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

        const students = await firestoreDB.collection('Students').doc(id).update(id);


        return res.status(200).json({
            status: 200, message: 'Create User Success!'
        })

    } catch (error) {
        return res.status(400).json({
            status: 400, message: 'Request fail!'
        })
    }
}

// Tìm danh sách học sinh được tạo theo ngày tháng fromDate và toDate

exports.getStudentFromDate = async (req, res, next) => {
    let body = req.body;
    const id = body['id']

    try {

        const startDate = req.body.startDate;
        const toDate = req.body.toDate;

        const start = moment.tz(startDate, 'MM/DD/YYYY', 'Asia/Ho_Chi_Minh').unix();
        const to = moment.tz(toDate, 'MM/DD/YYYY', 'Asia/Ho_Chi_Minh').unix();

        const students = firestoreDB.collection('Students');
        const dataStudents = await students
            .where('createdAtTimestmap', '>=', start)
            .where('createdAtTimestmap', '<=', to)
            .get();

        const student = dataStudents.docs.map(doc => doc.data());

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