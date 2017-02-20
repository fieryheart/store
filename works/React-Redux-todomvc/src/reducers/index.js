import {combineReducers} from 'redux';
import TodoDraftReducer from './TodoDraftReducer';
import TodoReducer from './TodoReducer';


const rootReducer = combineReducers({
	TodoDraft: TodoDraftReducer,
	Todo: TodoReducer
})

export default rootReducer;