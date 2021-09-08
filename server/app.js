const express=require('express');
const app=express();
const socketio=require('socket.io');
const http=require('http');
const cors=require('cors');
const mongoose=require('mongoose')

//Mongoose setup
mongoose.connect("mongodb+srv://jacksapera:muhmeinlele69!@cluster0.qadkz.mongodb.net/DemoInterview01?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

//Models
const Code=require('./models/codeModel')
const questionPack=require('./models/questionPackModel')

//Socket Handlers
const socketHandler=require('./controllers/socketHandler')

//Server utilites
app.use(express.json({limit:"30mb", extended:true}))
app.use(express.urlencoded({limit:"30mb", extended:true}))
app.use(cors())
const PORT=process.env.PORT||5000;

//Routes
const questionRoutes=require('./routes/questionRoutes')
const userRoutes=require('./routes/userRoutes')
const inviteRoutes=require('./routes/inviteRoutes')
const streamRoutes = require('./routes/streamRoutes')


//Socket IO Setup
const server=http.createServer(app);
const io=socketio(server, {
    cors: {
        origin: "https://demointerview01.herokuapp.com/",
        methods: ["GET", "POST"]
      }
});

const onConnection=(socket)=>
{
    socketHandler(io, socket);
    
}
io.on('connection', onConnection) 

app.use('/', questionRoutes)
app.use('/user', userRoutes)
app.use('/', inviteRoutes)
app.use('/stream', streamRoutes)

app.get('/', (req,res)=>
{
    res.send('<h1>This is working</h1>')
})

server.listen(PORT, ()=>
{
    console.log("Server is up and running")
})


  