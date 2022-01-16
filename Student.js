import mongoose from 'mongoose';

const Student = new mongoose.Schema({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    secondName: { type: String, required: true },
    age: { type: String, required: true },
    speciality: { type: String, required: true }
})

export default mongoose.model('Student', Student)