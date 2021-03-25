import React, { useState, useEffect } from "react";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import Button from '@material-ui/core/Button';
import generalService from '../service/general.service'
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


export default function AddProducts() {

  const [imageRead, setImageRead] = useState("");
  const [vendorType, setVendorType] = useState([]);
  const [category, setCategory] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getCategory();
    getVendor();
  },[]);

  const getCategory = async () =>{
    const result = await generalService.getCategory();
    if(result.status == 200){
      const data = result.data.data;
      console.log('category', data);
      setCategory([...data]);
    }
  }

  const getVendor = async () =>{
    const result = await generalService.getVendor();
    if(result.status == 200){
      const data = result.data.data;
      console.log('vendorType', data);
      setVendorType([...data]);
    }
  }

  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setImageRead(base64)
    console.log(base64)
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log("image")
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  const onSubmit = (values) => {
    console.log(values);
    const sendValue = {
        "name": values.name,
        "status": true,
        "category": values.category,
        "vendor": values.vendorType,
        "description": values.productInfo,
        "sku": values.sku,
        "reserved": values.reserved
    }
    addProduct(sendValue);
  }

  const onRefreshPage = () => {
    let redirect = 'add-product';
    history.push({
      pathname: '/dummy-page',
      redirect,
    });
  }



  const addProduct = async(data) => {
    const result = await generalService.addProduct(data);
    if(result.status == 200){
      toast.success(`${data.name} product successfully added`);
      onRefreshPage();
    }
    else{
      toast.error('Failed to add the product')
    }
  }

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Add Product Name"),
    sku: Yup.string()
      .required("Add SKU"),
    vendorType: Yup.string()
      .required("Select vendor"),
    category: Yup.string()
      .required("Select category"),
      reserved: Yup.number()
      .required("Add reserved quantity"),
    // subcategory: Yup.string()
    //   .required("Select your User Type"),
    productInfo: Yup.string()
      .required("Add Product information"),
    // picture: Yup.string()
    //   .required("Upload Picture Required"),
  });

  return (
    <Formik
      initialValues={{ name: "", sku: "", vendorType: "", category: "", subcategory: "", productInfo: "", picture: "", reserved: "" }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      handleFileRead={handleFileRead}
    >
      {({ handleSubmit, handleChange, values, errors, setFieldValue }) => (

        <form onSubmit={handleSubmit}>

          <div className="container" >
          <br/>
            <div className='row mb-2'>
              <div className="col-md-6">
                <span className='txt-sm' htmlFor="name">Name</span>
                <input
                  class="form-control"
                  type="text"
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                />
                <ErrorMessage name="name">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="col-md-6">
                <span className='txt-sm' htmlFor="name">SKU</span>
                <input
                  class="form-control"
                  type="text"
                  onChange={handleChange}
                  value={values.sku}
                  name="sku"
                />

                <ErrorMessage name="sku">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
            </div>

            <div className='row mb-2'>
              <div className="col-md-6">
                <span className='txt-sm' htmlFor="name">Vendor</span>


                <select select id="vendorType"
                  placeholder="select"
                  className='form-control'
                  value={values.vendorType}
                  onChange={handleChange("vendorType")}
                >
                  <option value="" hidden></option>
                  {vendorType.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option >
                  ))}
                </select>

                <ErrorMessage name="vendorType">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="col-md-6">
                <span className='txt-sm' htmlFor="name">Category</span>
                <select
                  select id="category"
                  placeholder="select"
                  value={values.category}
                  onChange={handleChange("category")}
                  className='form-control'
                >
                  <option value="" hidden></option>
                  {category.map((option) => (
                    <option key={option._id} value={option.name}>
                      {option.name}
                    </option >
                  ))}
                </select>
                <ErrorMessage name="category">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
            </div>


            <div className='row mb-2'>
              <div className="col-md-6">
                <span className='txt-sm' htmlFor="name"> Product Info</span>
                <input
                  type="text"
                  class="form-control"
                  onChange={handleChange}
                  value={values.productInfo}
                  name="productInfo"
                />
                <ErrorMessage name="productInfo">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
              <div className="col-md-6">
              <span className='txt-sm' htmlFor="name"> Reserved</span>
                <input
                  type="number"
                  class="form-control"
                  onChange={handleChange}
                  value={values.reserved}
                  name="reserved"
                />
                 <ErrorMessage name="reserved">
                  {msg => <span className='error-txt'>{msg}</span>}
                </ErrorMessage>
              </div>
            </div>





            {/* <div className="form-row">
                 <span className='txt-sm' htmlFor="name">Subcategory</span>
            
              <TextField
                select id="subcategory"
                placeholder="select"
                value={values.subcategory}
                onChange={handleChange("subcategory")}
                margin="dense"
                 variant="outlined"
                fullWidth
              >
                {subcategory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <ErrorMessage name="vendorType">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
                 </div> */}



            {/* <div className="form-row">
             <span className='txt-sm' htmlFor="name"> Picture</span>
              <input
              class="form-control form-control-sm"
              type="file"
              name="picture"
              inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
            onChange={(event,value) => {setFieldValue("picture", handleFileRead(event))}}
            />
            <img src={imageRead} height="50px" />
               <ErrorMessage name="picture">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
               </div> */}

               <div className='text-right'>
               <Button variant="contained" type='submit' color="primary" onSubmit={handleSubmit} > Add Product </Button>
               </div>
           
          </div>
        </form>

      )}
    </Formik>
  );
};



