import * as api from '../../api';

export const getStores = () => async (dispatch, useState) => {
  try {
    console.log(useState())
    const response = await api.getStores();
    console.log(response);
    if(response.status ===200 || response.status ===201)
    dispatch({ type: 'FETCH_ALL', payload: response.data.market_data.markets });

  } catch (error) {
    if(error.response.data.status===401 && error.response.data.sub_status===42){
      const newAccessToken = await (await api.refreshAccessToken()).data.access_token;
      localStorage.setItem("access_token", newAccessToken);
      getStores();
      
    }
    
  }
};


export const addStore = (store) => async (dispatch) => {
  try {
    const msg = await api.addStore(store);

    dispatch({ type: 'REG_STORE', payload: msg });
  } catch (error) {
    console.log(error.message);
  }
};


export const filterStores = (keySearch) => async (dispatch) => {
  console.log(keySearch);
  try {
    const {data} = await api.filterStores(keySearch);
    console.log(data);
    dispatch({ type: 'FILTER_STORES', payload: data.markets });
  } catch (error) {
    console.log(error.message);
  }
};


export const checkAddress = (address) => async (dispatch) => {
  try {
    const {data} = await api.checkAddress(address);
    //console.log(data.place_info);
    dispatch({ type: 'ADDRESS', payload: data.place_info });
  } catch (error) {
    console.log(error);
  }
};
