const express=require('express');
const app=express();
const socketio=require('socket.io');
const http=require('http');
const cors=require('cors');
const mongoose=require('mongoose')
mongoose.connect("mongodb://localhost/google-docs-clone", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})

app.use(cors())
const defaultValue = ""

const PORT=process.env.PORT||5000;

const codeSchema=new mongoose.Schema({
    _id: String,
    data: String
})

const Code=mongoose.model('Code', codeSchema)

const server=http.createServer(app);
const io=socketio(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
});

io.on('connection', (socket)=>
{

    socket.on("get-code", async codeId => {
        console.log(codeId)
        if (codeId==null)
            return
        var codeData = await Code.findById(codeId)
        if (!codeData)
            document=await Code.create({ _id: codeId, data: defaultValue })
        
        socket.join(codeId)
        if (codeData)
        {
            console.log('This runs when you click that')
            socket.emit("load-code", codeData.data)
        }
        
    
        socket.on("send-changes", delta => {
            console.log(delta)
          socket.broadcast.to(codeId).emit("receive-changes", delta)
        })
    
        socket.on("save-code", async data => {
            console.log('The code saving was started')
          await Code.findByIdAndUpdate(codeId, { data })
        })
      })
})



app.get('/', (req,res)=>
{
    res.send('<h1>This is working</h1>')
})

server.listen(PORT, ()=>
{
    console.log("Server is up and running")
})