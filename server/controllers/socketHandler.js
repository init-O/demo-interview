const socketio=require('socket.io')
const Code=require('../models/codeModel')
const defaultValue = ""

module.exports=(io, socket)=>
{
    //Whiteboard Socket IO Code goes here
    //socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));

    socket.on('get-drawing', async (boardId)=>
    {
        console.log('The whiteboard has connected')
        console.log(boardId)
        if (boardId==null)
            return 
        socket.join(boardId)
        socket.on('drawing', (data)=>socket.broadcast.to(boardId).emit('drawing', data))

    })

    //FUCK AROUND->FIND OUT
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

      socket.on('join-room',(roomId, userId, userIdDatabase,userName)=>{
        console.log(`inside room on server ${roomId} ${userId}`)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit('user-connected', userId, userIdDatabase, userName);

        socket.on('disconnect', ()=>{
            console.log('This user disconnected')
            socket.broadcast.to(roomId).emit("user-disconnected",userId)
        })

        socket.on("change-editor", (value)=>{
            socket.broadcast.to(roomId).emit("user-change-editor", value)
        })

        socket.on("meeting-closed", ()=>{
            socket.broadcast.to(roomId).emit("meeting-closed-exit")
        })

        socket.on("upload-question-pdf",(hash)=>{
            socket.broadcast.to(roomId).emit("upload-question-pdf-hash", hash)
        })

        socket.on("giving-back-id",(peerId, peerName)=>{
            socket.broadcast.to(roomId).emit("get-back-id", peerId, peerName)
        })

    })

    socket.on("join-stream", (roomId,userId)=>{
        console.log('inside stream',roomId,userId)
        socket.join(roomId)
        socket.broadcast.to(roomId).emit("user-join-stream", userId)
    })

}