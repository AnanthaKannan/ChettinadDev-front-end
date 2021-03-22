import React, { useState, useEffect } from "react";
import "./AddProduct.scss";
import { Formik,ErrorMessage} from "formik";
import MenuItem from "@material-ui/core/MenuItem";
import * as Yup from "yup";
import "./AddProduct.scss"
import { Select, TextField } from "@material-ui/core";
// import NavBar from '../reusable/NavBar'


const vendortype = [
    {
      value: "reliance",
      label: "Reliance",
    },
    {
      value: "nilgris",
      label: "Nilgris",
    },
    
      ];
      const category= [
        {
          value: "reliance",
          label: "Reliance",
        },
        {
          value: "nilgris",
          label: "Nilgris",
        },
        
          ];
          const subcategory = [
            {
              value: "reliance",
              label: "Reliance",
            },
            {
              value: "nilgris",
              label: "Nilgris",
            },
            
              ];
            
export default function AddProduct() {
  
  const [Imageread, setImageread] = useState("")  
  const handleFileRead = async (event) => {
    const file = event.target.files[0]
    const base64 = await convertBase64(file)
    setImageread(base64)
    console.log(base64)
  }
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
        console.log("imageeeeee")
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }
    
   const onSubmit=(values) => {
    // let file=values.picture
    // console.log("fileeee",file)
    // let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = () => {
    //       console.log({
    //         file: file,
    //         base64: reader.result
    //       });
    //     };
      console.log(values);
      if (window.confirm('Data Added Successfully'))
  {
  window.location.reload()
  }
  
  }
  const validationSchema = Yup.object({
    name: Yup.string()
    .required("Required"),
    sku: Yup.string()
    .required("Number is required"),
    vendortype: Yup.string()
    .required("Select your User Type"),
    category: Yup.string()
    .required("Select your User Type"),
    subcategory: Yup.string()
    .required("Select your User Type"),
    productinfo:Yup.string()
    .required("Required"),
    picture: Yup.string()
    .required("Upload Picture Required"),
  });
    return (
        <Formik
          initialValues={{ name: "", sku: "",vendortype:"",category:"",subcategory:"",productinfo:"",picture:"" }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          handleFileRead= {handleFileRead}
        >
           {({ handleSubmit, handleChange, values, errors,setFieldValue}) => (

            <form onSubmit={handleSubmit}>
                           {/* <NavBar/> */}

             <div className="container" >
              <div className="form-row"> 
              <h1>AddProduct</h1>

              <label htmlFor="name">Name</label>
              <input
              class="form-control form-control-sm"
                type="text"
                onChange={handleChange}
                value={values.name}
                name="name"
              />
               <ErrorMessage name="name">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
                </ErrorMessage>
                           </div>       

              <div className="form-row">
               <label htmlFor="sku">SKU</label>
              <input
              class="form-control form-control-sm"
               type="number" 
                onChange={handleChange}
                value={values.sku}
                name="sku"
              />

               <ErrorMessage name="sku">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
              </div>

               <div className="form-row">
               <label htmlFor="Vendortype" style={{ marginLeft: "1px" }}>
                VENDOR
              </label>
              <TextField
            //  class="form-control form-control-sm"
            //  class="custom-select my-1 mr-sm-2"
                select id="vendortype"
                placeholder="select"
                value={values.vendortype}
                onChange={handleChange("vendortype")}
                margin="dense"
                 variant="outlined"
                fullWidth
              >
                {vendortype.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <ErrorMessage name="vendortype">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
                 </div>

                 <div className="form-row">
               <label htmlFor="Vendortype" style={{ marginLeft: "1px" }}>
                CATEGORY              
                </label>
              <TextField
              // class="form-control form-control-sm"
              // class="custom-select my-1 mr-sm-2"
                select id="category"
                placeholder="select"
                value={values.category}
                onChange={handleChange("category")}
                margin="dense"
                 variant="outlined"
                fullWidth
              >
                {category.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <ErrorMessage name="category">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
                 </div>

                 <div className="form-row">
               <label htmlFor="Vendortype" style={{ marginLeft: "1px" }}>
               SUBCATEGORY             
                </label>
              <TextField
              // class="custom-select my-1 mr-sm-2"
              //  class="form-control form-control-sm"
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
              <ErrorMessage name="vendortype">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
                 </div>

                 <div className="form-row">
               <label htmlFor="productinfo">PRODUCTINFO</label>
              <input
                type="text"
                class="form-control form-control-sm"
                onChange={handleChange}
                value={values.productinfo}
                name="productinfo"
              />
               <ErrorMessage name="productinfo">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
              </div>

              <div className="form-row">
               <label htmlFor="picture" style={{ marginLeft: "1px" }}>
                   Picture
                </label>
              <input
              class="form-control form-control-sm"
              type="file"
              name="picture"
              inputProps={{ accept: 'image/*, .xlsx, .xls, .csv, .pdf, .pptx, .pptm, .ppt' }}
            onChange={(event,value) => {
            setFieldValue("picture", handleFileRead(event));
          }
       }
       
            />
            {/* <br></br> */}
            <img src={Imageread} height="50px" />
               <ErrorMessage name="picture">
               { msg => <div style={{ color: 'red' }}>{msg}</div> }
               </ErrorMessage>
               </div>
              <button type="submit" onSubmit={handleSubmit}>Save</button>
              </div>
               </form>

          )}
        </Formik>
      );
};

   

