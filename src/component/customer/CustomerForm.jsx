// Customer component 
import React , {useEffect, useState } from 'react'
import logo from '../../image/CustomerLogo.png';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer } from '../../redux/Actions/customer';
import { getStoreInfo } from '../../redux/Actions/stores';
import ErrorMessage from '../ErrorMessage';
import ReCaptcha from './ReCaptcha';
import Footer from '../Footer';

const CustomerForm = (props) => {
// declarition of variabls and states in customer form
    const dispatch = useDispatch();
    const isError = useSelector(state => state.customer.isError);
    const isDone = useSelector(state => state.customer.isDone);
    const storeInfo = useSelector(state => state.stores.storeInfo);
   
    const [verfied,setVerified] = useState(false)
    const [validInput,setValidInput] = useState ({status:false ,type:'' , msg:'الرجاء التاكد من صحة البيانات المدخلة'});
    const [customerData, setCustomerData] = useState({fullname:'', phonenumber:'',buildingnumber:'',postcode:'',shopname:'', city:''});
    
    const cityList = ['مصراتة','طرابلس','بنغازي','غريان','الخمس','زليتن','سرت','الزاوية'];
    //assigning store information to customer data to be used in customer registration process
        if (storeInfo) 
        {
           customerData.buildingnumber = storeInfo.building_number;
           customerData.postcode = storeInfo.postcode;
           customerData.shopname = storeInfo.name +" "+ storeInfo.details ;
        }   
    // fetching store information when the component mount using store code property
    useEffect(()=>{
        dispatch(getStoreInfo(props.match.params.storeCode));
    },[]);
    // handle submit button 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { fullname, phonenumber, city } = customerData
        let nameLen = fullname.trim().split(" ").length;
        if (nameLen >= 4 && nameLen <= 7) {
            if (isNaN(fullname) && !isNaN(phonenumber) && phonenumber.length === 10 && city && !validInput.status) {
                dispatch(addCustomer(customerData));
            }
            else {
                setValidInput({ status: true, type: 'generalError', msg: " يجب أن تكون المدخلات غير فارغة وصحيحة " })
            }
        }
        else
        setValidInput({ status: true, type: 'generalError', msg: 'الرجاء ادخال الاسم الرباعي ' });
    };
    //handle input field which contain only number
    const handleChangeOfNumber = (e)=>{
        if(isNaN(e.target.value))
        setValidInput({status : true , type :"NumberError" , msg:"يجب إدخال رقم فقط"})
        else{
            setCustomerData({...customerData,[e.target.name]:e.target.value})
            setValidInput({status : false,type:"" , msg:""})
        }
    }
    //handle input fields which contain only text
    const handleChangeOfText = (e)=>{
        let format = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~1234567890]/;
        if (!isNaN(e.target.value) || format.test(e.target.value))
            setValidInput({ status: true, type: "TextError", msg: "يجب ادخال حروف فقط" })
        else {
            setCustomerData({ ...customerData, [e.target.name]: e.target.value })
            setValidInput({ status: false, type: "", msg: "" })
        }
    }
    // main form
    const form = () => (
        <div>
            <div className="ui container centered grid reg-container" >
            <div className="ui form segment log-form" >
            <form className="ui form " >
            {/* Title section */}
            <img className="ui centered large image" alt="logo" src={logo}/>
            <h2 style={{fontFamily: 'inherit', color:"#222" , marginTop:"50px"}}><b>نموذج المشاركة </b> </h2>
            <h3 style={{fontFamily: 'inherit', color:"#222" }}><b>{storeInfo.name}</b> {storeInfo.details} </h3>
            {/* Error message box  */}
            {isError || (validInput.status && validInput.type=== "generalError") ? (<ErrorMessage head="لقد حدث خطأ" content={validInput.msg?validInput.msg:"لا يمكنك التسجيل الآن"} /> ): null}
            <div className="ui form" >
            {/* full name field */}
            <div className={validInput.status && validInput.type=== "TextError" ?'error field':'field'}>
                <label className="text required">الاسم الرباعي</label>
                <input type="text" name="fullname" onChange ={handleChangeOfText} placeholder="الاسم" required  maxLength="40"/>
                <div className="five wide field">
                <p>{validInput.status && validInput.type=== "TextError" ?`${validInput.msg}`:''}</p>
                </div>  
            </div>
            {/* phone number field */}
            <div className={validInput.status && validInput.type=== "NumberError" ?'error field':'field'}>
                <label className="text required" >رقم الهاتف</label>
                <div className="ui labeled input ">
                <input type="tel" name="phonenumber" placeholder="xxxxxxxx" onChange ={handleChangeOfNumber}  maxLength="10" required/>
                <p>{validInput.status && validInput.type=== "NumberError" ?`${validInput.msg}`:''}</p>
                </div>

            </div>
            {/* cities List  */}
            <div className="field ">
                <label className="text required" >المدينة</label>
                <select name="city" className="ui search dropdown drop-text" onChange={handleChangeOfText}>
                <option value="">اختر مدينة</option>
                {
                    cityList.map((city,index)=>
                    <option value={city} key={index}>{city}</option>)
                }
                </select>
            </div>
            {/* recaptch section */}
            <div className="ui centered medium image" style={{marginTop:"30px"}}>
            <ReCaptcha setVerified={setVerified}/>
            </div>
            {/* submit Button */}
            <div className="field">
            <button className="ui button text" type="submit" onClick={handleSubmit} disabled ={!verfied} >تسجيل</button>
            </div>
            </div>
            </form>
            <div className="ui section divider"></div>
            {/* Footer Section */}
            <Footer />
            </div>
            
            </div>
            
        </div>
    )
    return ( 
        // if the customer has been succefuuly registred clear customerData state , else check the store info 
        // if there is a data in it show the customer registration form 
        isDone ? (()=>{
            setCustomerData({fullname:'', phonenumber:'',buildingnumber:'',postcode:'',shopname:'', city:''});
            
        }): storeInfo? form() : <></>
    )
}

export default CustomerForm;

