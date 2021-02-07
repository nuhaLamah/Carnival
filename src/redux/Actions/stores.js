import * as api from '../../api';
import ChangeStoreState from '../../component/StoreData/ChangeStoreState';



export const addStore = (store) => async (dispatch) => {
  try {
    const msg = await api.addStore(store);

    dispatch({ type: 'REG_STORE', payload: msg });
  } catch (error) {
    console.log(error);
  }
};


export const filterStores = (keySearch,pageNumber , perPage) => async (dispatch, useState) => {
  console.log(keySearch);
 
  const { totalPages } = useState().stores;
  console.log( useState().stores)
  console.log('page', totalPages)
  try {
    const response = await api.filterStores(keySearch, pageNumber, perPage);
    console.log(response);
    if(response.status ===200 || response.status ===201) {
      dispatch({ type:'FETCH_STORES' , payload: response.data.markets });
      dispatch({ type:'CHANGE_TOTAL_PAGES' , payload: response.data.total_pages});
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
  //console.log(address);
  try {
    const {data} = await api.checkAddress(address);
    //console.log(data.place_info);
    dispatch({ type: 'ADDRESS', payload: data.place_info });
  } catch (error) {
    console.log(error);
  }
};


export const changeState= (storeCode, state) => async (dispatch, useState) => {
  try {
    console.log('state', storeCode, state)
    const {data} = await api.ChangeStoreState(storeCode, state);
    const storeList = [...useState().stores.storeList].map(store => store.code ===storeCode? {... store, state:state}: store);

    dispatch({ type:'FETCH_STORES' , payload: storeList });
    console.log(data)

    
  } catch (error) {
    console.log(error);
  }
}; 


export const getStoreInfo = (storeCode) => async (dispatch) => {
  try{
    const {data} = await api.getStore(storeCode);
    console.log(data.market_info)
    dispatch({type:'SET_STORE_INFO', payload: data.market_info});
  }
  catch(e){
    console.log(e)
  }
}