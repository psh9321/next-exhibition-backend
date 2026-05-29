declare global {
    interface RESPONSE_MODEL<T> {
        resultCode: number; /** number */
        data: T | null; /** object | string | null */
        errMsg: string; /** string */
    }

    /** 리스트 데이터 타입 */
    interface INFINITY_RESPONSE_ITEM<T> {
        /** 현재 페이지 */
        page : number;

        limit : number;

        /** 전체 게시물 수 */
        total : number;

        list : T,

        isNextPage : boolean
    }
}

export {}