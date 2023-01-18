import { createImportSpecifier } from "typescript";
const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const chatApi ={
    chatUpload : async (form) => {
        await fetch(`${DEV_URL}/file/file/chatUpload`, {
            method: 'POST',
            headers : {
                'Content-Type': 'multipart/form-data', Accept: 'application/x-www-form-urlencoded', mode: 'no-cors', 'Access-Control-Allow-Origin': '*'
            },
            body : form
        })
        .then((data) => {
            console.log(data,"data")
            result = data
            return result;
        })
        // return result;
        // .then(res => {return res})
        // .then(res => res.json())
        // .then((json) => {
        //     resolve(json);
        //     return result.success;
        // });
    },
    selectChatList : async (params) => {
        const { roomSeq, pageNo } = params
        await fetch(`${DEV_URL}/lesson/selectChatList?roomSeq=${roomSeq}&pageNo=${pageNo}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    }
}
