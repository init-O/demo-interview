import {combineReducers} from 'redux'

import User from './user'
import QuestionBank from './questionBank'

const reducer = combineReducers({User, QuestionBank})

export default reducer