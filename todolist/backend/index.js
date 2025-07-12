import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import connectDB from './db.js'
const port = process.env.PORT||3000
import Todomodel from '../models/models.js'

const app = express()
app.use(express.json())

app.use((cors()))

app.post('/getlogin',(req,res)=>{
    const task = req.body.task;
    Todomodel.create({
        task: task
    }).then(result =>res.json(result))
    .catch(erro=> res.json(erro))
})

app.get('/getlogin', (req, res) => {
    Todomodel.find()
        .then(tasks => res.json(tasks))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.listen(port,()=>{
    console.log(`Listening on port: ${port}`);
})

app.put('/getupdate/:id', (req, res) => {
    const id = req.params.id;
    Todomodel.findByIdAndUpdate(id, { done: true }, { new: true })
        .then(result => res.json(result))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.delete('/getdelete/:id', (req, res) => {
    const id = req.params.id;
    Todomodel.findByIdAndDelete(id)
        .then(result => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err.message }));
});

connectDB();