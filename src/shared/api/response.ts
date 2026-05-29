class ResponseModel<T> implements RESPONSE_MODEL<T> {
    resultCode : number;
    data : T | null ;
    errMsg : string;  
    
    constructor() {
        this.resultCode = 0;
        this.data = null;
        this.errMsg = "";
    }
}

export class ApiSuccess<T> extends ResponseModel<T> {
    constructor(data : T) {
        super();

        this.resultCode = 200;
        this.data = data;
    }
}

export class ApiFail<T> extends ResponseModel<T> {
    constructor(data : T , msg : string) {
        super();

        this.resultCode = 400;
        this.data = data;
        this.errMsg = msg;
    }
}

export class ApiError<T> extends ResponseModel<T> {
    constructor(data : T, msg : string) {
        super();

        this.resultCode = 500;
        this.data = data;
        this.errMsg = msg;
    }
}

/** 유효하지 않은 토큰 */
export class UnauthorizedException<T> extends ResponseModel<T> {

    constructor(data : T, errMsg : string) {
        super();

        this.resultCode = -999;
        this.data = data??null;
        this.errMsg = `(Unauthorized) ${errMsg}`;
    }
}