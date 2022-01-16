import express from 'express';
import mongoose from 'mongoose';
import router from './router.js';
import bodyParser from 'body-parser';
import path from "path"


const PORT = 8000;
const DB_URL = 'mongodb+srv://max:123456xx@cluster0.zqxcy.mongodb.net/students';
const __dirname = path.resolve();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', router);
app.use(express.static(path.join(__dirname, 'public')));


async function startApp() {
    try {
        // Connecting the database
        await mongoose.connect(DB_URL, { useNewUrlParser: true });
        // If the connection is successful, start the server
        app.listen(PORT, () => console.log('Server has been started on port' + PORT));
    } catch (e) {
        console.log(e);
    }
};



startApp();


























// const express = require('express');
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;

// const app = express();

// MongoClient.connect('mongodb+srv://max:123456xx@cluster0.zqxcy.mongodb.net/students', { useUnifiedTopology: true })
//     .then(client => {
//         console.log("conected to database");
//         const db = client.db('students');
//         const studentsCollection = db.collection('students');
//         app.set('view engine', 'ejs');
//         app.use(bodyParser.urlencoded({ extended: true }));
//         app.use(bodyParser.json());
//         app.use(express.static('public'));


//         app.get('/', (req, res) => {
//             db.collection('students').find().toArray()
//                 .then(students => {
//                     res.render('index.ejs', { students: students })
//                 })
//                 .catch(error => console.error(error))
//         });
//         app.post('/students', (req, res) => {
//             studentsCollection.insertOne(req.body)
//                 .then(result => {
//                     res.redirect('/')
//                 })
//                 .catch(error => console.error(error))
//         });
//         app.put('/students', (req, res) => {
//             studentsCollection.findOneAndUpdate({ id: req.body.id }, {
//                     $set: {
//                         id: req.body.id,
//                         firstName: req.body.firstName,
//                         secondName: req.body.secondName,
//                         age: req.body.age,
//                         speciality: req.body.speciality,
//                     }
//                 })
//                 .then(result => res.json('Success'))
//                 .catch(error => console.error(error))
//         });
//         app.delete('/students', (req, res) => {
//             studentsCollection.deleteOne({ id: req.body.id })
//                 .then(result => {
//                     if (result.deletedCount === 0) {
//                         return res.json('No students to delete')
//                     }
//                     res.json('Deleted student')
//                 })
//                 .catch(error => console.error(error))
//         })


//         app.listen(3000, function() {
//             console.log('listening on 3000')
//         });
//     })



// .catch(error => console.error(error))