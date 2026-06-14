# Discover Cultures Backend Server

## 주요 기술 스택
 - Nest.js
 - TypeScript
 - MongoDB, Mongoose
 - JWT
 - Ky
 - fast-xml-parser
 - Sharp
 - PM2

## 도메인 기반 모듈 설계
 - auth : JWT 생성, 검증, 토큰 파싱 인증 실패 응답 처리 
 - culture : 문화정보 목록, 상세, 지도 기반 문화정보 조회
 - favorite : 문화정보 좋아요 목록 조회 및 좋아요 토글
 - review : 문화정보 리뷰 목록, 등록, 수정, 삭제
 - shared : 공통 API 응답, 외부 API 인스턴스, 미들웨어 유틸, 타입 등등
 - users : 소셜 로그인 기반 회원가입/로그인 

## 주요기능

### 문화정보 조회
 - 문화정보 목록, 상세, 인기 전시, 지도 영역 기반 전시 조회 지원

### 소셜 로그인 연동
 - Google, Naver, Kakao 로그인 지원

### JWT 인증 
 - Access Token / Refresh Token 기반 인증 시스템 구축
 - 로그인 상태 유지 지원

### 좋아요 기능
 - 로그인 유저의 문화정보 좋아요 목록 조회
 - 문화정보 상세 정보 기반 좋아요 등록/해제 토글
 - 문화정보 상세 조회 시 사용자별 `isFavorite` 상태 추가 제공

### 리뷰 기능 
 - 추후 추가 예정