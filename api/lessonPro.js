import * as FileSystem from 'expo-file-system';
import { SlideOutLeft } from 'react-native-reanimated';
const BASE_URL = "http://211.55.64.43:5006";
const LOCAL_URL = "http://localhost:5008";
const ANDROID_URL = 'http://10.0.0.6:5006';
const REAL_URL = "http://175.106.96.180:5008";
//const REAL_URL = "http://golfai.net:5008";
const DEV_URL = "http://223.130.132.180:5008";
const DEV_JAVA = "http://223.130.132.180:5009";


export const lessonPro = { 
    sendApplication : async( applicationInfo) => {
    
        let data = new FormData();
        data.append("userNo", applicationInfo.userNo)
        data.append("name", applicationInfo.name);
        data.append("gender", applicationInfo.gender);
        // data.append("grade", applicationInfo.grade);
        data.append("period", applicationInfo.period);
        data.append("awards", applicationInfo.awards);
        data.append("point01", applicationInfo.point01);
        data.append("point02", applicationInfo.point02);
        data.append("point03", applicationInfo.point03);
        data.append("area", applicationInfo.area);
        data.append("youtube", applicationInfo.youtube);
        data.append("instagram", applicationInfo.instagram);

        return new Promise((resolve, reject) => {
        
            if(applicationInfo.activityPhotos.length > 0) {
                applicationInfo.activityPhotos.map(async (item,idx) => {
                                    
                    const response = await fetch(item);                
                    const blob = await response.blob();
                                                            
                    //data.append("activityPhotos" , {uri :item, name: item.substring(item.lastIndexOf("/") + 1, item.length), type :  blob.type});

                    
                    const file = new File([blob], item.substring(item.lastIndexOf("/") + 1, item.length), {
                        type: blob.type,
                    });                    
                    data.append("activityPhotos", file, item.substring(item.lastIndexOf("/") + 1, item.length));                                                                     
                    

                    if(idx == applicationInfo.activityPhotos.length -1 ) {
                        resolve(true);
                    }
                    
                });
            }
        }).then((resolve)=> {
        
            return new Promise((resolve, reject) => {                
                if(applicationInfo.movies.length > 0) {
                    applicationInfo.movies.map(async (item,idx) => {
                                        
                        const response = await fetch(item);
                        const blob = await response.blob();
                        data.append("movies" , {uri :item, name: item.substring(item.lastIndexOf("/") + 1, item.length), type :  blob.type});

                        /*
                        const file = await new File([blob], item.substring(item.lastIndexOf("/") + 1, item.length), {
                            type: blob.type,
                        });                        
                        await data.append("movies", file, item.substring(item.lastIndexOf("/") + 1, item.length));                    
                        */
                        if(idx == applicationInfo.movies.length -1 ) {                       
                            resolve(true);
                        }                                          
                    });
                }
            });
        }).then((resolve)=> {
        
            return new Promise((resolve, reject) => {                
                if(applicationInfo.movies2.length > 0) {
                    applicationInfo.movies2.map(async (item,idx) => {
                                        
                        const response = await fetch(item);
                        const blob = await response.blob();
                        data.append("movies2" , {uri :item, name: item.substring(item.lastIndexOf("/") + 1, item.length), type :  blob.type});

                        /*
                        const file = await new File([blob], item.substring(item.lastIndexOf("/") + 1, item.length), {
                            type: blob.type,
                        });                        
                        await data.append("movies", file, item.substring(item.lastIndexOf("/") + 1, item.length));                    
                        */
                        if(idx == applicationInfo.movies2.length -1 ) {                       
                            resolve(true);
                        }                                          
                    });
                }
            });
        }).then((resolve)=> {
        
            return new Promise((resolve, reject) => {            
                if(applicationInfo.profilePhoto.length > 0) {
                    applicationInfo.profilePhoto.map(async (item,idx) => {                    
                        const response = await fetch(item);
                        const blob = await response.blob();
                        data.append("profilePhoto" , {uri :item, name: item.substring(item.lastIndexOf("/") + 1, item.length), type :  blob.type});


                        /*
                        const file = await new File([blob], item.substring(item.lastIndexOf("/") + 1, item.length), {
                            type: blob.type,
                        });    
                        await data.append("profilePhoto", file, item.substring(item.lastIndexOf("/") + 1, item.length));                  
                        */
                            
                        if(idx == applicationInfo.profilePhoto.length -1 ){                                    
                            resolve(true);
                        }                        
                    });            
                }
            });
        
        }).then((resolve)=> {        
            return new Promise((resolve, reject) => {
                if(applicationInfo.profilePhoto.length > 0) {
                    applicationInfo.profilePhoto.map(async (item,idx) => {
                        const resData = await fetch(`${DEV_JAVA}/lessonPro/sendApplication.do`, {
                            method: 'POST',
                            headers : {
                                'Content-Type': 'multipart/form-data'
                            },
                            body : data
                        });

                        console.log('response', resData);
                        const json = resData.json();
                        console.log('json', json);
                        if(idx == applicationInfo.profilePhoto.length -1 ){                                    
                            resolve(json);
                        }
                    });
                }
                /*
                .then((res) => res.json())
                .then((json) => {
                    console.log('json', json);
                    resolve(json);
                })
                .catch(error => console.log('error', error));
                */
            });
        });
    },
    // selectLessonProList : async () => {      
    //     await fetch(`${DEV_URL}/lesson/selectLessonProList`, {
    //         method : 'POST',
    //         headers : {
    //             "Content-Type" : "application/json",
    //         },
    //         body : JSON.stringify({
    //             "userNo" : userNo,
    //             "proNm" : proNm
    //         })
    //         .then(res => res.json())
    //         .then((json) => {
    //             result = json;
    //             return result;
    //         })
    //     });
    selectLessonProList : async () => {      
        await fetch(`${DEV_URL}/lesson/selectLessonProList`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;       
    },

    selectLessonProDetail : async (params) => {
        const { proSeq } = params      
        await fetch(`${DEV_URL}/lesson/selectLessonProDetail?proSeq=${proSeq}`, {
            method : 'GET',
            headers : {
                "Content-Type" : "application/json",
            }
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;       
    },

    updateLesson : async (body) => {
        
        await fetch(`${DEV_URL}/lesson/updateLesson`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "seq": body.seq,
                "status": body.status,
                "lectureComment": body.lectureComment,
                "lessonArea": body.lessonArea,
            })
        })
        .then(res => res.json())
        .then((json) => {
            result = json;
            return result;
        })
        return result;
    },
}