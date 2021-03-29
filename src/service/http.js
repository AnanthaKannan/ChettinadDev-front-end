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

        if(!err.response)

          return { status: 500 }

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

    console.log("===>post")

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

        console.log("err", err.response);

        if(!err.response)

          return { status: 500 }

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

  export const put = (apiUrl, query = null, data = null) => {

    

    let qryString = `${url}${apiUrl}`;

    if (query !== null) {

      const keys = Object.keys(query);

      keys.forEach((key, i) => qryString += `${i===0 ? '?' : '&'}${key}=${query[key]}`)

    }

    console.log("data", data,'qryString', qryString)

 

    const options = {

      method: 'PUT',

      headers: {

        'content-type': 'application/json',

        Authorization: `Bearer ${ sessionStorage.getItem('token')}`

      },

      url: qryString,

      data: data

    };

    console.log(options.url);

    return axios(options)

    .then(function (response) {

      console.log('postResponse', response)

      return response;

    })

    .catch(function (err) {

      console.log("err", err.response);

      if(!err.response)

        return { status: 500 }

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

  export const delete_ = (apiUrl, data = null) => {

    let qryString = `${url}${apiUrl}`;

    if (data !== null) {

      const keys = Object.keys(data);

      keys.forEach((key, i) => qryString += `${i===0 ? '?' : '&'}${key}=${data[key]}`)

    }

    const options = {

      method: 'DELETE',

      headers: {

        'content-type': 'application/json',

        Authorization: `Bearer ${ sessionStorage.getItem('token')}`

      },

      url: qryString

    };

    console.log(options.url)

    return axios(options)

      .then(function (response) {

        console.log('postResponse', response)

        return response;

      })

      .catch(function (err) {

        console.log("err", err.response);

        if(!err.response)

          return { status: 500 }

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