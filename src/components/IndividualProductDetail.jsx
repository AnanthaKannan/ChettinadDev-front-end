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
    const [currentStock, setCurrentStock] = useState(null);
    const [currentStockBackup, setCurrentStockBackup] = useState(null);
    const [reservedStock, setReservedStock] = useState(null);
    const [vendor, setVendor] = useState(null)
    const [options, setOptions] = useState([]);
    const [backUp, setBackUp] = useState([]);
    const [usedStockErrorMsg, setUsedStockErrorMsg] = useState('');
    const [isBtnDisable, setIsBtnDisable] = useState(true);

    useEffect(() =>{
        getProduct();
    },[])

    useEffect(() =>{
      if( (usedStock || addStock ) && selectedOption.value){
        setIsBtnDisable(false);
      }
      else{
        setIsBtnDisable(true)
      }
      currentStockCalculation();
  },[usedStock, addStock, selectedOption.value])


  const currentStockCalculation = () =>{
    // console.log('addStock', addStock, 'usedStock', usedStock);
      setCurrentStock(currentStockBackup);
    if(usedStock > 0){
      setCurrentStock(currentStockBackup - usedStock);
    }
    if(addStock > 0){
      setCurrentStock(Number(currentStockBackup) + Number(addStock));
    }
    
  }

    const onHandleSubmit = () =>{
        console.log('addStock', addStock);
        console.log('usedStock', usedStock);
        if(!usedStock && !addStock){
            toast.error('Please insert value in used stock or Add stock')
        }
        if(usedStockErrorMsg){
          return
        }
        const data ={
            openStock: addStock ? addStock: null,
            usedStock: usedStock ? usedStock : null,
            currentStock: currentStock,
            _productId: selectedOption.value
        }
        console.log('sendData', data);
        addStock_(data);
    }

    const addStock_ = async(data) => {
        const result = await generalService.addStock(data);
        if(result.status == 200){
            toast.success('Successfully Added');
            // to refresh the graph and gird
            setProductId('');
            setProductId(selectedOption.value)
            setCurrentStockBackup(currentStock);
            setUsedStock('');
            setAddStock('');
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
            setBackUp([...data]);
            const updatedData = data.map((obj) => ({value: obj._id, label: obj.name}))
            setOptions([...updatedData]);
        }
    }

    const onHandelProductChange = (product) =>{
      const _id = product.value;
        console.log('product', product);
        setSelectedOption(product);
        setProductId(_id);
        const details = backUp.find(obj => obj._id === _id);
        setVendor(details.vendor)
        const currentStock_ = details.currentStock ? details.currentStock : 0 ;
          setCurrentStock(currentStock_);
          setCurrentStockBackup(currentStock_);

        if(details.reserved){
          setReservedStock(details.reserved)
        }
        console.log('details', details)
    }

    const onHandelUsedStock = (value) => {
      setUsedStock(value);
      if(!value)
        setUsedStockErrorMsg('');
      else if(currentStock < value)
      setUsedStockErrorMsg('Used stock should not be more than current stock')
    else
      setUsedStockErrorMsg('');
    
    }
    
    return (
      <div>
<div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Product</span>
          <Select
          placeholder=''
        value={selectedOption}
        onChange={onHandelProductChange}
        options={options}
      />
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Vendor</span>
        <TextBox className='mb-2' value={vendor} readOnly={true}/> 
        </div>
      </div>
      <div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Reserved Stock</span>
          <TextBox className='mb-2' value={reservedStock} readOnly={true}/> 
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Current Stock</span>
          <TextBox type='number' className='mb-2' value={currentStock} readOnly={true} />
        </div>
      </div>
         

      <div className='row'>
        <div className="col-md-6">
        <span className='txt-sm'>Used Stock</span>
          <TextBox type='number' className={usedStockErrorMsg ? 'error mb-2' : 'mb-2'} readOnly={addStock} value={usedStock} onChange={onHandelUsedStock}/>
           <span className='error-txt'>{usedStockErrorMsg}</span>
        </div>
        <div className="col-md-6">
        <span className='txt-sm'>Add stock</span>
          <TextBox type='number' className='mb-2' readOnly={usedStock} value={addStock} onChange={(value) => setAddStock(value)}/>
        </div>
      </div>
         
          <div className='text-right'>
          <RsButton text='Submit' onClick={() => onHandleSubmit()} disabled={isBtnDisable} />
             </div>
      </div>
    )
}


