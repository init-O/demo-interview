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
            socket.emit("load-code", codeData.data)
        }
        
    
        socket.on("send-changes", delta => {
            console.log(delta)
          socket.broadcast.to(codeId).emit("receive-changes", delta)
        })
    
        socket.on("save-code", async data => {
          await Code.findByIdAndUpdate(codeId, { data })
        })
      })

      socket.on("get-output", async outputId => {
          var outputData = await Code.findById(outputId)
          if(!outputData){
              document=await Code.create({_id: outputId, data: ''})
          }
  
          socket.join(outputId)
          if(outputData){
              socket.emit('load-output', outputData.data)
          }
  
          socket.on("change-output", change =>{
              console.log('server change output....',change)
              socket.broadcast.to(outputId).emit("receive-output-change",change)
          })
  
          socket.on("save-output", async data => {
              await Code.findByIdAndUpdate(outputId,{data});
          })

          socket.on('output-change-on-run', data=>{
              socket.broadcast.to(outputId).emit("change-output-on-run",data)
          })
      })


      socket.on("get-input", async inputId => {
          var inputData = await Code.findById(inputId)
          if(!inputData){
              document=await Code.create({_id: inputId, data:''})
          }
          socket.join(inputId)
          if(inputData){
              socket.emit("load-input",inputData.data)
          }

          socket.on("save-input", async data => {
              await Code.findByIdAndUpdate(inputId, {data});
          })

          socket.on("change-input", async change => {
              socket.broadcast.to(inputId).emit("receive-input-change",change)
          })
      })

      socket.on('join-room',(roomId, userId)=>{
        console.log(`inside room on server ${roomId} ${userId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId);

        socket.on('disconnect', ()=>{
            socket.broadcast.to(roomId).emit("user-disconnected",userId)
        })

        socket.on("change-editor", (value)=>{
            socket.broadcast.to(roomId).emit("user-change-editor", value)
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