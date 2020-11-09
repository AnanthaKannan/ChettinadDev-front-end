import http from './http';
const api = '/api/Tilt'
export const chargeDetails = () => {
    return http.get(`${api}/GetChargeDetails`);
}

export const createCharge = (data) => {
    console.log('sendData', data);
    return http.post( `${api}/createCharge`, data);
}

export const getPotRooms = () => {
    return http.get(`${api}/getPotRooms`);
}

export const getChargeListByPotRoom = (data) => {
    return http.get(`${api}/getChargeListByPotRoom`, data);
}

export const GetPotDetailsByChargeNo = (data) => {
    return http.get(`${api}/GetPotDetailsByChargeNo`, data);
}

export const getSmallCrucibleNo = () => {
    return http.get(`${api}/getSmallCrucibleNo`);
}

export default {
    chargeDetails,
    createCharge,
    getPotRooms,
    GetPotDetailsByChargeNo,
    getChargeListByPotRoom,
    getSmallCrucibleNo
}