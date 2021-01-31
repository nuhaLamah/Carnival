import axios from 'axios';
const URL = 'http://10.40.0.49:5000/api';
const url = 'http://10.40.0.49:5000/api/markets';
const urlMakani = "http://10.40.0.49:5000/api/location_info/"

export const getStores = () => axios.get(url);

export const filterStores = (keySearch) => axios.get(url,keySearch);

export const checkAddress = (address) => axios.get(urlMakani,address);

export const addStore = (newStore) => {
    const form_data = new FormData();
    for ( var key in newStore ) {
    form_data.append(key, newStore[key]);
    } 
    axios.post(url, form_data)
}

export const log = (logData) =>{
    const log_form_data = new FormData();
    for ( var key in logData ) {
    log_form_data.append(key, logData[key]);
    } 
    axios.post(`${URL}/login`, log_form_data);
}
=======
<<<<<<< HEAD


//----------------------- Customer API -----------//
const urlCustomer = 'http://10.40.0.49:5000/api/customers';
export const addCustomer = (newCustomer) => {
    const form_data = new FormData();
    for ( var key in newCustomer ) {
    form_data.append(key, newCustomer[key]);
    } 
    axios.post(urlCustomer, form_data)
}
<<<<<<< HEAD
=======
=======
>>>>>>> 642009ef510f38b5b9f6dbaab66bb1e80898986a
>>>>>>> 044858e54ed07a34384ffe9a6979be87d9395e51
>>>>>>> 4768423aef7e2ac62f3d041767e3e6386f2b2389
