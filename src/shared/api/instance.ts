import ky from "ky";
import dotenv from "dotenv";

dotenv.config();

export const OPEN_API = ky.create({
    prefix : process.env.OPEN_API_URL,
    method : "get",
    timeout : 10000,
    headers : {
        Accept : "application/xml",
    },
    searchParams : {
        serviceKey : process.env.OPEN_API_SECRET_KEY 
    },
    hooks : {
        beforeRequest : [
            async ({ request }) => {
                return request
            }
        ],

        beforeError : [
            async ({ error }) => {
                return error
            }
        ],

        afterResponse : [
            async ({response, request}) => {
                
                return response
            }
        ]
    }
})
