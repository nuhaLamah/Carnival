import * as api from '../../api';
import{ getLocationInfo } from '../../apiMakani';

export const addStore = (store) => async (dispatch) => {
  try {
    const  data  = await api.addStore(store);
    dispatch({ type: 'REG_STORE', payload: data , isDone:true });   
    if(data.status === 201)
    {
      dispatch(clearInfo);
      window.location.replace(`/Success/${store.code}`);
    } 
  } catch (error) {
    console.log(error)
    alert("لقد حدث خطأ ! الرجاء التأكد من صحة البيانات المدخلة"+error)
    dispatch({ type: 'IS_Error', payload:true });
  }
};

export const filterStores = (keySearch,pageNumber , perPage) => async (dispatch, useState) => {
  try {
    const response = await api.filterStores(keySearch, pageNumber, perPage);
    if(response.status ===200 || response.status ===201) {
      const totalPages =  response.data.total_pages;
      dispatch({ type:'FETCH_STORES' , payload: response.data.markets });
      dispatch({ type:'CHANGE_TOTAL_PAGES' , payload: totalPages===0?1:totalPages });
      dispatch({ type:'CHANGE_PAGE' , payload: pageNumber});
      dispatch({ type:'CHANGE_FILTER_TERM' , payload: keySearch});
    }
  } catch (error) {
    if(error.response.data.status===401 && error.response.data.sub_status===42){
      const newAccessToken = await (await api.refreshAccessToken()).data.access_token;
      localStorage.setItem("access_token", newAccessToken);
      filterStores();
  }
}
};

export const checkAddress = (address) => async (dispatch) => {
  try {
    const {data} = await getLocationInfo(address);
    if(data.status === 'valid')
    dispatch({ type: 'ADDRESS', payload: data, isInValid:false });
    else
    dispatch({ type: 'ADDRESS', payload: data, isInValid:true });
  } catch (error) {
    console.log(error);
    dispatch({ type: 'INVALID_ADDRESS', payload: true });
  }
};

export const changeState= (storeCode, state) => async (dispatch, useState) => {
  try {
    await api.ChangeStoreState(storeCode, state);
    const storeList = [...useState().stores.storeList].map(store => store.code ===storeCode? {...store, state:state}: store);
    dispatch({ type:'FETCH_STORES' , payload: storeList }); 
  } catch (error) {
    console.log(error);
    alert("لقد حدث خطأ ! الرجاء التأكد من صحة البيانات المدخلة"+error)
    
  }
}; 

export const getStoreInfo = (storeCode) => async (dispatch) => {
  try{
    const {data} = await api.getStore(storeCode);
    dispatch({type:'SET_STORE_INFO', payload: data.market_info});
  }
  catch(e){
    console.log(e)
    alert("The QR Is Invalid")
  }
}
export const clearInfo = () => async (dispatch) => {
  try {
    dispatch({type:'ADDRESS', payload: {} , isInValid:false});
  } catch (error) {
    console.log(error);
    dispatch({ type:'SET_IS_ERROR', payload:true });
  }
};

export const clearAddress = () => async (dispatch) => {
  try {
    dispatch({type:'INVALID_ADDRESS', isInValid:false});
    dispatch({type:'IS_ERROR', isError:false});
  } catch (error) {
    console.log(error);
    dispatch({ type:'IS_ERROR', payload:true });
  }
};

