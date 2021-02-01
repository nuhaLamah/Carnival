<<<<<<< HEAD
=======
import {log} from '../../api';

>>>>>>> 95072ed8021b4cbf85418640a300c79bd640d22b

import {log} from '../../api';

export const login = (username, password, isRemember) => async (dispatch) => {
  try {
    console.log(username)
    const {data} = await log({username: username, password: password});
    console.log(data)
   dispatch({ type: 'LOGIN_INFO', payload: data});
   dispatch({ type: 'CHANGE_LOG_STATE', payload: true});
   //dispatch({ type: 'SET_IS_REMEMBER_ME', payload: true});
   if(isRemember) localStorage.setItem("refresh_token", data.refresh_token);

  } catch (error) {
    console.log(error.message);
    dispatch({ type: 'LOGIN_ERROR', payload: true});
    dispatch({ type: 'CHANGE_LOG_STATE', payload: false});
  }
};