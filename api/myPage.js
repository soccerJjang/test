const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const myPageApi ={ 
    updateProfile : async (user) => {
        
        let result = null;

        await fetch(`${DEV_URL}/myPage/updateProfile`, {
            method: 'POST',        
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "user_no" : user.user_no,
                "nickname": user.nickname,
                "phone": user.phone,
                "average_score" : user.average_score,
                "career" : user.career,
                "total_distance" : user.total_distance,
                "driver_distance" : user.driver_distance,
                "iron_distance" : user.iron_distance,
                "birth" : user.birth,
                "gender" : user.gender,
                "sido" : user.sido,
                "sigungu" : user.sigungu
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
        });
        return result;  
    } , 

    selectProfile : async (params) => {
        const { userNo } = params
        await fetch(`${DEV_URL}/myPage/selectProfile?userNo=${userNo}`, {
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

