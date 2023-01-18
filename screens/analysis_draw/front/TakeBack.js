import React from 'react';
import * as RN from 'react-native';
import {
    CommonThreeDepthContainer,
} from '../../../styled-components/Common';
import {
    AddressContainer,
    AddressImageView,
    AddressImage,
    AddressButtonView,
    AddressAntDesignView,
    AntDesignView,
    AntDesignDownloadView,
    DrawingButtonBox,
    DrawingCircle,
    DrawingImg,
    DrawingCircleEdit,
} from '../../../styled-components/analysis_draw/rear/Address';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import PhotoEditor from '@baronha/react-native-photo-editor';

const FRTakeBack = (props) => {

    const [loadedImage, setLoadedImage] = React.useState(null);
    const [photo, setPhoto] = React.useState(null);

    const stickers = [];
    
    React.useEffect(() => {

        if(loadedImage == null) {
 
        }
    });

    if(loadedImage != null ) {
        return ( 
                <CommonThreeDepthContainer>
                    <AddressContainer>
                        <AddressImageView>
                            <AddressImage 
                                source={photo == null ? {uri : loadedImage.uri} : {uri : photo.path}}
                            />
                            
                        </AddressImageView>
    
                        <DrawingButtonBox>
                            <DrawingCircle style={{marginRight:16}} onPress={onShare}>
                                <DrawingImg source={require("../../../images/ico-share.png")}></DrawingImg>
                            </DrawingCircle>
    
                            <DrawingCircle onPress={onSave}>
                                <DrawingImg source={require("../../../images/ico-download.png")}></DrawingImg>
                            </DrawingCircle>

                            <DrawingCircle onPress={onUpload}>
                                <DrawingImg source={require("../../../images/ico-download.png")}></DrawingImg>
                            </DrawingCircle>
    
                            <DrawingCircleEdit onPress={onEdit}>
                                <DrawingImg source={require("../../../images/ico-pencil.png")}></DrawingImg>    
                            </DrawingCircleEdit> 
                        </DrawingButtonBox>
    
                        {/* <AddressButtonView>
                            <AddressAntDesignView>
                                <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>          
                                    <AntDesignView>
                                        <AntDesign name="link" size={20} color="black" />
                                    </AntDesignView>
                                    <AntDesignView>
                                        <AntDesign name="download" size={20} color="black" />
                                    </AntDesignView>
                                </View>
                                <AntDesignDownloadView>
                                    <AntDesign name="download" size={20} color="white" />
                                </AntDesignDownloadView>
                             </AddressAntDesignView>
                        </AddressButtonView> */}
                    </AddressContainer>
                </CommonThreeDepthContainer>
        )

    }else {
        return (
            <RN.View>
                <RN.Text>로딩중</RN.Text>
            </RN.View>
        )
    }
}

export default FRTakeBack;