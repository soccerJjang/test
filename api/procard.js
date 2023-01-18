const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const procard = {
    selectProCardBoxList : async(userNo) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardBoxList`, { userNo : userNo }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectProCardBoxStatus : async(userId) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardBoxStatus`, { userId : userId }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    confirmProCardBoxList : async(userId) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/confirmProCardBoxList`, { userId : userId }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectProCardList : async(userNo) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardList`, { userNo : userNo }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectProCardDetail : async(userNo, name) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardDetail`, { userNo : userNo, name: name }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectproCardStatus : async(userNo, name) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardStatus`, { userNo : userNo, name : name }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectProCardVideo : async(name) => {
        let result = null;
        await fetch(buildUrl(`${REAL_URL}/article/selectProCardVideo`, { name : name }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    insertProCardStatus : async(proNm, userNo) => {
        let result = null;
        await fetch(`${REAL_URL}/article/insertProCardStatus`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                "userNo" : userNo,
                "pronm" : proNm
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    deleteProCardStatus : async(proNm, userNo) => {
        let result = null;
        await fetch(`${REAL_URL}/article/deleteProCardStatus`, {
            method : 'POST',
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify({
                "userNo" : userNo,
                "proNm" : proNm
            })
            .then(res => res.json())
            .then((json) => {
                result = json;
                return result;
            })
        });
        return result;
    }
}

export const buildUrl = (url, parameters) => {
    let qs = '';
    for(let key in parameters) {
        let value = parameters[key];
        qs += encodeURIComponent(key) + "=" + encodeURIComponent(value) + "&";
    }
    if(qs.length > 0) {
        qs = qs.substring(0, qs.length - 1);
        url = url + "?" + qs;
    }
    return url;
}