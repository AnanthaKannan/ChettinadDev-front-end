import React, {useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import RsButton from '../reusable/RsButton';
import TextBox from '../reusable/TextBox';
import Select from 'react-select';
import generalService from '../service/general.service'

export default function IndividualProductDetail({setProductId}) {

    const [addStock, setAddStock] = useState(null);
    const [usedStock, setUsedStock] = useState(null);
    const [selectedOption, setSelectedOption] = useState({});
    const [pendingStock, setPendingStock] = useState(null)
    const [reservedStock, setReservedStock] = useState(null);
    const [currentStock, setCurrentStock] = useState(null)
    const [vendor, setVendor] = useState(null)
    const [options, setOptions] = useState([]);

    useEffect(() =>{
        getProduct();
    },[])

    const onHandleSubmit = () =>{
        console.log('addStock', addStock);
        console.log('usedStock', usedStock);
        if(!usedStock && !addStock){
            toast.error('Please insert value in used stock or Add stock')
        }
        const data ={
            openStock: addStock,
            usedStock: usedStock,
            currentStock: currentStock
        }
        console.log('sendData', data);
    }

    const addStock_ = (data) => {
        const result = generalService.addStock(data);
        if(result.status == 200){
            toast.success('Successfully Added');
        }
        else{
            toast.error('Failed to add');
        }
    }

    const getProduct = async() => {
        const result = await generalService.getProduct();
        if(result.status == 200){
            const data = result.data.data;
            console.log('data', data);
            const updatedData = data.map((obj) => ({value: obj._id, label: obj.name}))
            setOptions([...updatedData]);
        }
    }

    const onHandelProductChange = (product) =>{
        console.log('product', product);
        setSelectedOption(product);
        console.log('productId', product.value)
        setProductId(product.value);
    }
    
    return (
      <div>

           <span className='txt-sm'>Product</span>
          <Select
          placeholder=''
        value={selectedOption}
        onChange={onHandelProductChange}
        options={options}
      />
      <div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Pending Stock</span>
          <TextBox className='mb-2' value={pendingStock} readOnly={true}/>
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Reserved Stock</span>
          <TextBox className='mb-2' value={reservedStock} readOnly={true}/> 
            </div>
      </div>

      <div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Current Stock</span>
          <TextBox className='mb-2' value={currentStock} readOnly={true}/> 
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Vendor</span>
          <TextBox type='number' className='mb-2' readOnly={true} value={vendor} />
        </div>
      </div>
         

      <div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Used Stock</span>
          <TextBox type='number' className='mb-2' readOnly={addStock} value={usedStock} onChange={(value) => setUsedStock(value)}/>
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Add stock</span>
          <TextBox type='number' className='mb-2' readOnly={usedStock} value={addStock} onChange={(value) => setAddStock(value)}/>
        </div>
      </div>
         
         
        
        
          <div className='text-right'>
          <RsButton text='Submit' onClick={() => onHandleSubmit()}/>
             </div>
      </div>
    )
}


