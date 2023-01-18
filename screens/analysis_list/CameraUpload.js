import * as React from "react";
import * as RN from "react-native";
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as SecureStore from 'expo-secure-store';



const CameraUpload = () => {
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = React.useState(null);

    React.useEffect(() => {
        (async () => {

            const mediaLibraryStatus = await MediaLibrary.requestPermissionsAsync();
            setHasMediaLibraryPermission(mediaLibraryStatus.status === 'granted');

        })();
    }, []);

    const openGallery = async () => {
        
        console.log("사진첩을 열어라 ");
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        
        if(result.type === "video") {
            console.log("비디오다 ~~ ")


            (async () => {
                /*
                const formData = new FormData();
                const name = record.substring(record.lastIndexOf('/')+1);
                const docDir = await FileSystem.getInfoAsync(record);
                */

                const userData = await SecureStore.getItemAsync("userData"); 
                const userNo = JSON.parse(userData).user_no;

                FileSystem.FileSystemUploadOptions = {
                    httpMethod: 'POST',
                    uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                    fieldName: 'file',
                };
              
                const server = `http://211.55.64.43:5006/file/uploadTest?userNo=${userNo}`;
                

                const getUpload = await FileSystem.uploadAsync(server, result.uri, FileSystem.FileSystemUploadOptions);
                // const result = await FileApi.sendFile(formData);
            })();




        }else{

            console.log("비디오가 아니다 ~~ ")
        }
    }
    return (
        <>
            <RN.View style={style.container}>
                <RN.Text style={style.contents} onPress={openGallery}>ddkdkdk</RN.Text>

                <RN.TouchableOpacity onPress={openGallery}>
                    <RN.Text>열어보기 </RN.Text>
                </RN.TouchableOpacity>
            </RN.View>
        </>
    )
}

const style = RN.StyleSheet.create({

    container : { flex : 1, width : 100, height : 100},
    contents : {justifyContent:"center", alignItems: "center"}
})


export default CameraUpload;
