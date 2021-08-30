const Streams = (streams=[], action) =>{
    switch (action.type) {
        case 'GET_ALL_STREAMS':
            return action.payload
        
        case 'ADD_STREAM':
            return [...streams,action.payload]
        
        case 'DELETE_STREAM':
            return streams.filter(stream=>stream._id!==action.payload)
    
        default:
            return streams
    }
}

export default Streams