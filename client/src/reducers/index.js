import {combineReducers} from 'redux'

import User from './user'
import Meetings from './meetings'
import QuestionBank from './questionBank'
import Streams from './streams'

const reducer = combineReducers({User, QuestionBank, Meetings, Streams})

export default reducer