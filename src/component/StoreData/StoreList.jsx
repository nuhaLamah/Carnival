import React , {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {filterStores} from '../../redux/Actions/stores';
import Store from './Store';
import NavBar from './NavBar';
import SearchBox from './SearchBox';
import PageButtons from './PageButtons';


const StoreList = ()=> {
  
      
    const dispatch = useDispatch();

    useEffect(() => {
    dispatch(filterStores("", 1, 5));
    }, [dispatch]);

     
      // const [search,setSearchInput] = useState("");
      const markets = useSelector((markets) => markets.stores.storeList)

      
    return (
      <div>
        <NavBar>
        <SearchBox />
        </NavBar> 
        <table className="ui table" style={{'marginTop': '100px'}}>
          <thead>
            <tr>
              <th className="center aligned">اسم المحل</th>
              <th className="center aligned"> العنوان البريدي</th>
              <th className="center aligned"> رقم المبنى</th>

              <th className="center aligned"> اسم المالك</th>
              <th className="center aligned"> رقم هاتف المالك</th>
              <th className="center aligned">رقم هاتف المحل</th>

              <th className="center aligned">إيميل</th>
              <th className="center aligned">نوع النشاط</th>  
              <th className="center aligned">الكود</th>
              
              <th className="center aligned">الحالة</th>
              <th className="center aligned">التاريخ</th>
              <th className="center aligned">عمليات</th>
            </tr>
          </thead>
          <tbody>
          {
          markets.map((store,index)=>
          <Store store = {store} key={index} />         
          )
        }
          </tbody>
          </table>
      
      
      
          <PageButtons />
      </div>
    
    )
}

export default StoreList