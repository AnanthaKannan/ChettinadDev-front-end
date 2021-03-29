import React, {useEffect, useState} from 'react'
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import generalService from '../service/general.service'
import TextBox from '../reusable/TextBox';
import RsButton from '../reusable/RsButton';
import { toast } from 'react-toastify';
import { IoIosCloseCircleOutline } from "react-icons/io";




export default function Category() {

    const [category, setCategory] = useState([]);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() =>{
        getCategory();
    },[])

    const getCategory = async() =>{
        const result = await generalService.getCategory();
        if(result.status == 200){
            const data = result.data.data;
            console.log('data', data);
            setCategory([...data]);
        }
    }

    const addCategory = async() => {
        if(!categoryName){
            toast.error('Please enter category name');
            return;
        }
        const result = await generalService.addCategory({name: categoryName});
        if(result.status === 200){
            toast.success('successfully added');
            getCategory();
            setCategoryName('');
        }
    }

    const deleteCategoryId = async(_id) => {
        const result = await generalService.deleteCategoryId({_id});
        if(result.status === 200){
            toast.success('successfully deleted');
            getCategory();
        }
    }

    const onHandleCategoryChange = (value) =>{
        console.log('value', value)
        setCategoryName(value);
    }

    const onHandleClose = (_id) =>{
        console.log('_id', _id);
        deleteCategoryId(_id);
    }

    return (
        <div>
             <p className='txt-lg mb-2'>Category</p>
             <div>
                 <div className='d-flex'>
                 <TextBox value={categoryName} className='mb-1 d-inline required' onChange={onHandleCategoryChange} />
                 <RsButton text='Add' className='ml-2 mb-1 d-inline' onClick={() => addCategory()} />
                 </div>
                 {
                     category.map((obj) =>{
                         return <div  key={obj._id} className="d-flex bg-primary text-white py-1 px-2 mb-1 txt-sm rounded justify-content-between">
                             <p className='mb-0' >{obj.name}</p>
                             <p className='mb-0 point'><IoIosCloseCircleOutline onClick={() => onHandleClose(obj._id)} /></p>
                         </div>
                     })
                 }
                
             </div>
        </div>
    )
}
