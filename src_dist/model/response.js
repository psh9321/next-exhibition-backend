"use strict"

class ResponseModel {
    /**
     * 
     * @param {number} resultCode 
     * @param {string | object | null} data 
     * @param {string} errMsg 
     * 
     * @returns {object} 
     * {resultCode : number, data : string | object | null, errMsg : string}
     */
    constructor(resultCode, data, errMsg = "") {
        this.resultCode = resultCode;
        this.data = data;
        this.errMsg = errMsg;
    }
}

module.exports = { ResponseModel }// build date : 2025. 5. 21. 오후 7:06:44