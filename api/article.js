const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const article = { 
    analysisList : async( {queryKey }) => {
        const [_, userData] = queryKey;
        let result = null;
        await fetch(`${DEV_URL}/article/analysisList?userNo=${userData.user_no}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    analysisView : async(userId) => {
        let result = null;
        await fetch(buildUrl(`${DEV_URL}/article/analysisView`, { userId : userId }), {
            method : 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectList : async ({queryKey}) => {

        const [_, userData] = queryKey;        
        
        let result = null;

        await fetch(`${DEV_URL}/article/selectArticleList?userNo=${userData.user_no}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;       
            return result;
        })
        return result;  
    },
    selectAnalysisList : async( {queryKey}) => {

        const [_, userData] = queryKey;        
        
        let result = null;

        await fetch(`${DEV_URL}/article/selectAnalysisList?userNo=${userData.user_no}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            result = json;               
            return result;
        })

        return result;  

    },
    deleteAnalysis : async(userId, imgPath) => {
        let result = null;
        await fetch(`${DEV_URL}/article/deleteAnalysis`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userId" : userId,
                "imgPath" : imgPath.replace(/\"/g, "")
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })

        return result;
    },
    deleteAnalysisList : async(userIdList) => {
        let result = null;
        await fetch(`${DEV_URL}/article/deleteAnalysisList`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userIdList" : userIdList                
            })
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
        await fetch(`${DEV_URL}/article/selectProCardList?userNo=${userNo}`, {
            method: 'GET',
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
        await fetch(`${DEV_URL}/article/selectProCardDetail?userNo=${userNo}&name=${name}`, {
            method: 'GET',
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    selectProCardStatus : async(userNo, name) => {
        let result = null;
        await fetch(`${DEV_URL}/article/selectProCardStatus?userNo=${userNo}&name=${name}`, {
            method: 'GET',
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
        await fetch(`${DEV_URL}/article/selectProCardVideo?name=${name}`, {
            method: 'GET',
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
        await fetch(`${DEV_URL}/article/insertProCardStatus`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userNo" : userNo,
                "proNm" : proNm,
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
        await fetch(`${DEV_URL}/article/deleteProCardStatus`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userNo" : userNo,
                "proNm" : proNm
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })

        return result;
    },
    selectProCardBoxList : async(userNo) => {
      let result = null;
      await fetch(buildUrl(`${DEV_URL}/article/selectProCardBoxList`, {userNo: userNo}), {
          method: 'GET'
      })  
      .then(res => res.json())
      .then((json) => {
          result = json;
          return result;
      });
      return result;
    },
    insertInquiry : async(subject, contents, userNo) => {
        let result = null;
        await fetch(`${DEV_URL}/article/insertInquiry`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "userNo" : userNo,
                "subject" : subject,
                "contents" : contents,
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
    insertCommunity : async(subject, contents, userNo) => {
        let result = null;

        await fetch(`${DEV_URL}/article/insertCommunity`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "userNo" : userNo,
                "subject" : subject,
                "contents" : contents,
            })
        })
        .then(res => res.json())
        .then((json)=> {
            result = json;
            return result;
        })
        return result;
    },
    updateCommunity : async(subject, contents, articleNo) => {
        let result = null;

        await fetch(`${DEV_URL}/article/updateCommunity`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "articleNo" : articleNo,
                "subject" : subject,
                "contents" : contents,
            })
        })
        .then(res => res.json())
        .then((json)=> {
            result = json;
            return result;
        })
        return result;
    },
    deleteCommunity : async( articleNo ) => {
        let result = null;
        await fetch(`${DEV_URL}/article/deleteCommunity`, {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                "articleNo" : articleNo                
            })
        })
        .then(res => res.json())
        .then((json)=> {
            result = json;
            return result;
        })
        return result;
    },
    selectCommunityList : async() => {

        console.log("selectCommunity !!")
        let result = null;

        await fetch(`${DEV_URL}/article/selectCommunity`, {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
            }            
        })
        .then(res => res.json())
        .then((json)=> {
            result = json;
            return result;
        })
        return result;
    },
    getAdmobVideoPath : async() => {

        console.log("getAdmobVideoPath");
        let result = null; 

        await fetch(`${DEV_URL}/file/file/getAdmobVideoPath`, {
            method : "GET",
            headers : {
                "Conteng-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then((json) => {

            result = json;
            return json;
        })
        return result;
    },
    getAdmobVideoPathList : async() => {

        console.log("getAdmobVideoPathList");
        let result = null; 

        await fetch(`${DEV_URL}/file/file/getAdmobVideoPathList`, {
            method : "GET",
            headers : {
                "Conteng-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then((json) => {

            result = json;
            return json;
        })
        return result;
    },
    convertImage : async(userPath, proPath) => {

        console.log("convertImage");
        let result = null; 

        await fetch(`http://223.130.132.180:5009/imageConverterProcess/convert.do?userFilePath=${userPath}&proFilePath=${proPath}`, {
            method : "GET",
            headers : {
                "Conteng-Type" : "application/json",
            }
        })        
        .then(res => res.json())
        .then((json) => {

            result = json;
            return json;
        })
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
