let nodemailer=require("nodemailer"),UserModel=require("../model/user").UserModel,generateRandomKey=require("../util/generateRandomCode").generateRandomKey,ResponseModel=require("../model/response").ResponseModel;async function AuthEmail(e){try{var r,o,n;return await UserModel.findOne({id:e})?new ResponseModel(403,null,"이미 가입된 이메일 입니다."):(r=nodemailer.createTransport({service:"gmail",port:2953,auth:{user:process.env.GMAIL_USER,pass:process.env.GMAIL_APP_KEY}}),o=generateRandomKey(6),n={from:process.env.GMAIL_USER,to:e,subject:"회원가입을 위한 인증 메일",html:`
                <dl>
                    <dt>아래의 인증번호를 입력해주세요.</dt>
                    <dd>${o}</dd>
                </dl>
            `},await r.sendMail(n),new ResponseModel(200,o))}catch(e){throw new ResponseModel(500,e,"authEmail api 에서 알수없는 에러")}}module.exports={AuthEmail:AuthEmail};// build date : 2025. 5. 21. 오후 7:06:44