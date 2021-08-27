const meetings = (meetings=[],action) => {
    switch (action.type) {
        case "GET_MEETINGS":
            return action.payload

        case "ADD_MEETING":
            return [...meetings, action.payload]

        case "DELETE_MEETING":
            return meetings.filter(meeting=> meeting.roomId!== action.payload)

        default:
            return meetings
    }
}

export default meetings