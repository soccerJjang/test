import { createImportSpecifier } from "typescript";
const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const lessonRoomApi ={

    selectLessonList : async (params) => {
        const { userNo } = params
        await fetch(`${DEV_URL}/lesson/selectLessonList?userNo=${userNo}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },

    selectLessonListPro : async (params) => {
        const { proSeq } = params
        await fetch(`${DEV_URL}/lesson/selectLessonListPro?proSeq=${proSeq}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },

    selectLesson : async (params) => {
        const { seq, userNo } = params
        await fetch(`${DEV_URL}/lesson/selectLesson?seq=${seq}&userNo=${userNo}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },

    insertLessonRecommend : async (body) => {
        
        await fetch(`${DEV_URL}/lesson/insertLessonRecommend`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "lessonSeq" : body.lessonSeq,
                "userNo": body.userNo
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },

    uploadFile : async (form) => {
        await fetch(`${DEV_URL}/lesson/uploadFile`, {
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
        .catch(error => console.log('error', error))
    },

    regLesson : async (body) => {
        
        await fetch(`${DEV_URL}/lesson/insertLessonRecommend`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "proSeq": body.proSeq,
                "userNo": body.userNo,
                "status": body.status,
                "type": body.type,
                "lectureComment": body.lectureComment,
                "lessonArea": body.lessonArea,
                "lessonFlag": body.lessonFlag
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },

    regPayment : async (body) => {
        
        await fetch(`${DEV_URL}/payApp/payRequest`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userNo": body.userNo,
                "price": body.price,
                "recvphone": body.recvphone
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        .catch(error => console.log('error', error))
        return result;
    },
}


