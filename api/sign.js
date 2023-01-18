import { createImportSpecifier } from "typescript";
const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const signApi ={
    checkId : async (id) => {
        const check = await fetch(`${DEV_URL}/signUp/checkId?id=${id}`);
        const result = await check.json();

        // result.success = false -> id 중복, true -> id 중복 x
        return result.success;
    },
    insertId : async (user) => {
        let result = null;

        await fetch(`${DEV_URL}/signUp`, {
            method: 'POST',        
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id" : user.id,
                "password": user.pwd,
                "nickname": user.nickname,            
                "agreement": "Y",
                "memberType" : user.memberType,
                "subscriptionPath" : user.subscriptionPath,
                "progress" : user.progress
            })
        })

        .then(res => res.json())
        .then((json) => {
            result = json            
        })
        return result.success;
        
    },
    login : (user) => {
        let loginResult = fetch(`${DEV_URL}/login`,{
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": user.id,
                "password": user.pwd,
            })
        })
        .then(response => response.json())
        .then(result => {return result })
        .catch(e => {
            return {success: false};
        })
        .finally(result => {

            if(result) {
                return result;
            }else {
                return {success : false}
            }
        });

        return loginResult;
    },
    checkNickname : async (nickname) => {
        const check = await fetch(`${DEV_URL}/signUp/checkNickname?nickname=${nickname}`);
        const result = await check.json();

        return result.success;        
    },
    checkPhoneNumber : async (phoneNumber) => {
        const check = await fetch(`${DEV_URL}/signUp/phoneCheck?phoneNumber=${phoneNumber}`);
        const result = await check.json();

        return result.success;
    },
    sendSMS : async (userInfo, infoType, type, phone) => {

        console.log("API ON");
        let result = null;
        //const result = await fetch(`${DEV_URL}/sign/findPwd/sms`, {
        if(type != 'profile') {
            result = await fetch(`${DEV_URL}/sign/findPwd/sms`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userInfo": userInfo,
                    "infoType": infoType,
                })
            });
        } else {
            result = await fetch(`${DEV_URL}/sign/findPwd/sms`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userInfo": userInfo,
                    "infoType": infoType,
                    "phone": phone
                })
            });
        }
      

        return result.status;
    },
    sendSMTP : async (userInfo, infoType) => {
        const result = await fetch(`${DEV_URL}/sign/findPwd/sendSMTP`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userInfo": userInfo,
                "infoType": infoType,
            }) 
        })
        
        return result.status;

    },
    verifySMS : async (userInfo, infoType, verifyCode) => {
        let result = '';
        await fetch(`${DEV_URL}/sign/findPwd/verify`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userInfo": userInfo,
                "infoType": infoType,
                "verifyCode": verifyCode,
            })
        })
        .then(res => result = res.status);
        return result;
    },
    pwdUpdate : async (userInfo, infoType, updatePwd) => {
        let result = '';
        await fetch(`${DEV_URL}/sign/findPwd/pwdUpdate`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userInfo": userInfo,
                "infoType": infoType,
                "updatePwd": updatePwd
            })
        })
        .then(res => result = res.status);
        return result;
    }
}

export const snsApi = {
    snsIdChk : async(snsId) => {
        const result = await fetch(`${DEV_URL}/signUp/snsIdCheck?snsId=${snsId}`)
        return result.json();
    },
    snsJoin : async(id, nickname, snsType, snsId, progress, memberType) => {
        const result = await fetch(`${DEV_URL}/signUp/snsJoin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id" : id,
                "snsId": snsId,
                "nickname": nickname,
                "snsType" : snsType,
                "progress" : progress,
                "memberType" : memberType
            })
        })
        console.log(result);
        return result.json();
    }
}

