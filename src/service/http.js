import { environment } from '../environments/environment';
import axios from 'axios';
  const url = environment.apiURL;

  const unAuthorizeTest = (status) => {
    if(status === 401){
      window.location.href = "lgoin";
    }
  }
  
  /*************
  Purpose: Used to call the GET method in http request
  Parameter: {
   apiUrl: accept string (/apiName)
   data: accept Object
  }
  Return: Object
  ****************/
  export const get = (apiUrl, data = null) => {
    let qryString = `${url}${apiUrl}`;
    if (data !== null) {
      const keys = Object.keys(data);
      keys.forEach((key, i) => qryString += `${i===0 ? '?' : '&'}${key}=${data[key]}`)
    }
  
    const options = {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${ sessionStorage.getItem('token')}`
      },
      url: qryString
    };
    // console.log(options)
    return axios(options)
      .then(function (response) {
        return response;
      })
      .catch(function (err) {
        console.log("err", err.response);
        err && err.response && unAuthorizeTest(err.response.status);
        return err.response;
      });
  }
  
  
  /*************
  Purpose: Used to call the POST method in http request
  Parameter: {
   apiUrl: accept string (/apiName)
   data: accept Object
  }
  Return: Object
  ****************/
  export const post = (apiUrl, data) => {
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${ sessionStorage.getItem('token')}`
      },
      data: data,
      url: `${url}${apiUrl}`,
    };
    return axios(options)
      .then(function (response) {
        console.log('postResponse', response)
        return response;
      })
      .catch(function (err) {
        err && err.response && unAuthorizeTest(err.response.status);
        return err.response;
      });
  }
  
  /*************
  Purpose: Used to call the PUT method in http request
  Parameter: {
   apiUrl: accept string (/apiName)
   data: accept Object
  }
  Return: Object
  ****************/
  export const put = (apiUrl) => {
    const options = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${ sessionStorage.getItem('token')}`
      },
      url: `${url}${apiUrl}`
    };
    console.log(options.url);
    return axios(options)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .catch(function (err) {
        err && err.response && unAuthorizeTest(err.response.status);
        return err.response;
      });
  }
  
  /*************
  Purpose: Used to call the DELETE method in http request
  Parameter: {
   apiUrl: accept string (/apiName)
   data: accept Object
  }
  Return: Object
  ****************/
  export const delete_ = (apiUrl) => {
    const options = {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${ sessionStorage.getItem('token')}`
      },
      url: `${url}${apiUrl}`
    };
    console.log(options.url)
    return axios(options)
      .then(function (response) {
        if (response.status !== 200) {
          console.log(response);
        }
        return response.data;
      })
      .catch(function (err) {
        err && err.response && unAuthorizeTest(err.response.status);
        return err.response;
      });
  }
  
  export default {
    get,
    post,
    put,
    delete: delete_
  };