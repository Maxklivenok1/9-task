import Student from "./Student.js";
import path from "path"
const __dirname = path.resolve();

class Controller {
    // Start page load function
    async start(req, res) {
        res.sendFile(path.resolve(__dirname, 'index.html'))
    };

    // Function to create a new student
    async create(req, res) {
        try {
            // Check for existence in the database of the student with the entered id
            const studentId = req.body.id;
            const student = await Student.findOne({ id: studentId });
            if (student) {
                res.status(400).json({ message: 'Id уже используется' })
            } else {
                const { id, firstName, secondName, age, speciality } = req.body;
                const newStudent = await Student.create({ id, firstName, secondName, age, speciality });
                res.json(newStudent);
            }

        } catch (e) {
            res.status(500).json(e);
        };
    };

    // Function to get a list of all students
    async getAll(req, res) {
        try {
            const students = await Student.find();
            return res.json(students);
        } catch (e) {
            res.status(500).json(e);
        };
    };

    // The function of obtaining a student by ID
    async getOne(req, res) {
        try {
            const studentId = req.params.id;
            if (!studentId) {
                res.status(400).json({ message: 'Id не указан' })
            }
            const student = await Student.findOne({ id: studentId });
            return res.json(student);
        } catch (e) {
            res.status(500).json(e);
        };
    };

    // The function of updating information about the student with the entered id
    async update(req, res) {
        try {

            const student = req.body;
            const query = { id: student.id };
            if (!student.id) {
                res.status(400).json({ message: 'Id не указан' })
            }
            Student.findOneAndUpdate(query, {
                $set: {
                    id: student.id,
                    firstName: student.firstName,
                    secondName: student.secondName,
                    age: student.age,
                    speciality: student.speciality,
                }
            });
            return res.json(student);
        } catch (e) {
            res.status(500).json(e);
        };
    };

    // The function of deleting from the database of the student with the entered id
    async delete(req, res) {
        try {
            const studentId = req.params.id;
            const student = await Student.findOne({ id: studentId });
            if (!student) {
                res.status(400).json({ message: 'Студента с таким ID не существует' })
            } else {
                const student = await Student.findOneAndRemove({ id: studentId });
                return res.json(student);
            }


        } catch (e) {
            res.status(500).json(e);
        };
    };

}


export default new Controller();