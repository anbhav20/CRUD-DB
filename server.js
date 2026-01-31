const app =require('./src/app');
const connecToDb = require('./src/config/database');
const NotesModel = require('./src/models/notes.model');
require('dotenv').config();
connecToDb();

const PORT = process.env.PORT||3000;

/*post method
create notes, req.body kaam ni krega jab tak app.use(express.json()), middleware use ni kroge!
*/
app.post('/notes', async (req, res)=>{
    const {title, discription}= req.body;
    const note = await NotesModel.create({
        title, discription
    })

    //jab hum naya resource create krte h to 201 bhjte h status code!
    res.status(201).json({
        message:"note created succesfully!",
        note
    })

})

/*
get method,  find method humesha array of obj return krta h [{}]
*/
app.get('/notes', async (req, res)=>{
   const notes= await NotesModel.find();
   res.status(200).json({
    message:"all notes fetced sucessfully!!",
    notes
   });
});



app.listen(PORT,()=>{
    console.log(`server is runing on ${PORT}`);
});