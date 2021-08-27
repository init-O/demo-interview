import {combineReducers} from 'redux'

import User from './user'
import Meetings from './meetings'
import QuestionBank from './questionBank'

const reducer = combineReducers({User, QuestionBank, Meetings})

export default reducer