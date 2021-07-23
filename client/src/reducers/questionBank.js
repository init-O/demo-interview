const questionBank = (questionBank=[],action)=>{
    switch (action.type) {
        case 'CREATE_QUESTION_BANK':
            return [...questionBank, action.payload]
    
        case 'GET_QUESTION_BANK':
            return action.payload

        case 'DELETE_QUESTION_BANK':
            return questionBank.filter((question) => question._id !== action.payload)
        
        default:
            return questionBank
    }
}

export default questionBank