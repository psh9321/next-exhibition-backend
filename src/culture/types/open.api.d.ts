declare global {

    /** 조회할 지역 */
    type DISTRICT = "서울" | "경기" | "세종" | "대전" | "대구" | "부산" | "광주" | "제주" | "강원" | "경남" | "경북" | "울산" | "인천" | "전남" | "전북" | "충남" | "충북";

    /** 분야별구분 (A:공연/전시, B:행사/축제, C:교육/체험) */
    type SERVICE_TYPE = "A" | "B" | "C"; 

    /** 정렬기준 (1:등록일, 2:공연명, 3:지역) */
    type SORT_STDR = "1" | "2" | "3"; 

    /** 전시 정보 */
    interface EXHIBITION_ITEM {
        serviceName: string; /** 카테고리(서비스명) */
        seq: string; /** ex) 311142 */
        title: string; /** ex) 창작의 순간 - 예술가의 작업실 */
        startDate: string; /** ex) 20250214 */
        endDate: string; /** ex) 20250214 */
        place: string; /** ex) 국립현대미술관 서울관 */
        realmName: string; /** ex) 전시 */
        area: DISTRICT | string; /** ex) 서울, 경기 ... */
        thumbnail: string; /** image src url */
        gpsX: string; /** ex) 126.98010361777375 */
        gpsY: string; /** ex) 37.578627490528596 */
        sigungu: string; /** 시, 군, 구 */
    }

    /** 전시 상세 정보 */
    interface EXHIBITION_DETAIL_ITEM extends EXHIBITION_ITEM {
        phone: string; /** 전시회장 연락처 */
        price: string; /** 전시회 가격 */
        imgUrl: string; /** 이미지 src url */
        placeUrl: string; /** 전시회장 seq */
        placeAddr: string; /** 전시회장 주소 */
        url: string;
        contents1: string; /** 설명 */
    }

    interface OPEN_API_SERVER_RESPONSE_DATA {
        totalCount: string;
        PageNo: string | number;
        numOfrows: string;
        items: { item: EXHIBITION_ITEM[] };
    }

    interface OPEN_API_QUERY_DATA {
        PageNo: string; /** 페이지 번호 (1부터 시작) */
        numOfrows: string; /** 한 페이지에 보여질 게시물 수 */
        serviceTp: SERVICE_TYPE ; /** 분야별구분 */
        sortStdr?: SORT_STDR; /** 정렬기준 */
        sido?: DISTRICT; /** 조회할 지역 */
        from?: string; /** 시작 날짜 ex) 20250419 */
        to?: string; /** 종료 날짜 ex) 20250419 */
        place?: string; /** 조회할 장소 ex) 국립현대미술관 서울관 (띄워쓰기 까지 정확히 입력해야해서 제외 하는게 나을듯) */
        gpsxto?: string; /** 경도 상한 */
        gpsyto?: string; /** 위도 상한 */
        keyword?: string; /** 검색 키워드 */
    }



interface ADDRESS_ITEM {
        /** 전체 지번 주소 */
        address_name: string;

        /** 광역시/도 */
        region_1depth_name: string;
        /** 시/군/구 */
        region_2depth_name: string;
        /** 읍/면/동 */
        region_3depth_name: string;
        /** 리 */
        region_4depth_name: string;
        /** 지역 코드(법정동 코드) */
        code: string;
        /** 산 여부(Y/N) */
        mountain_yn: "Y" | "N";
        /** 지번 주번지 */
        main_address_no: string;
        /** 지번 부번지 */
        sub_address_no: string;
        /** x(경도) */
        x: string;
        /** y(위도) */
        y: string;
    }

    interface ROAD_ADDRESS_ITEM {
        /** 전체 도로명 주소 */
        address_name: string;
        /** 광역시/도 */
        region_1depth_name: string;
        /** 시/군/구 */
        region_2depth_name: string;
        /** 읍/면/동 */
        region_3depth_name: string;
        /** 리 */
        region_4depth_name: string;
        /** 도로명 코드 */
        code: string;
        /** 도로명 */
        road_name: string;
        /** 지하 여부(Y/N) */
        underground_yn: "Y" | "N";
        /** 건물 본번 */
        main_building_no: string;
        /** 건물 부번 */
        sub_building_no: string;
        /** 건물명 */
        building_name: string;
        /** 우편번호 */
        zone_no: string;
        /** x(경도) */
        x: string;
        /** y(위도) */
        y: string;
        /** 좌표계 (기본 WGS84) */
        input_coord?: "WGS84" | "WCONGNAMUL" | "CONGNAMUL" | "WTM" | "TM";
    };
    
    interface SEARCH_ITEM {
        address_name: string,
        category_group_code: string,
        category_group_name: string,
        category_name: string,
        distance: string,
        id: string,
        phone: string,
        place_name: string,
        place_url: string,
        road_address_name: string,
        x: string,
        y: string
    }

    /** 카카오 api 리스폰스 */
    interface API_SERVER_ADDRESS {
        meta: {
            total_count: number
        },
        documents: {
            road_address: ROAD_ADDRESS_ITEM,
            address: ADDRESS_ITEM
        }[]
    }

    /** 카카오 키워드로 주소 찾기 api 리스폰스 */
    interface KAKAO_ADDRESS_SEARCH_API_RESPONSE {
        meta: {
            is_end: boolean,
            pageable_count: number,
            same_name: {
                keyword: string,
                region: [],
                selected_region: string
            },
            total_count: number
        },

        documents : SEARCH_ITEM[]
    }
}

export {}