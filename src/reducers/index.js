import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import chatReducer from './chatReducer';
import notificationsReducer from './notificationsReducer';


const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  chat: chatReducer,
  form: formReducer
});

export default rootReducer;
