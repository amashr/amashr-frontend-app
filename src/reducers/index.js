import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import accountReducer from './accountReducer';
import mailReducer from './mailReducer';
import chatReducer from './chatReducer';
import notificationsReducer from './notificationsReducer';


const rootReducer = combineReducers({
  account: accountReducer,
  notifications: notificationsReducer,
  mail: mailReducer,
  chat: chatReducer,
  form: formReducer
});

export default rootReducer;
