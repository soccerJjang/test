const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";

export const ranking = {

    selectList : async ({queryKey}) => {

        const [_, type] = queryKey;
        let result = null;

        await fetch(`${REAL_URL}/ranking/list?type=${type}`, {
            method: 'GET'
        })
        .then(res => res.json())
        .then((json) => {
            
            if(Array.isArray(json)){
                console.log(json)
                result = json;       
                return result;
            }
        })
        return result;  

    }
}