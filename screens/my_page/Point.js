import * as React from 'react';
import { View, Text } from 'react-native';
import styled from "styled-components";
import { 
    CommonBackground, 
    CommonContainer4, 
    CommonBoxWrap, 
    TitLarge, 
    TxtSmallBlue, 
    PageButtonScr, 
    GreenBt, 
    GrayBox,
    PageBtnText,
    LayerBox,
    LayerConBox,
    CenterText,
    DimBox,
    LayerGreenBt,
    FontSize16,
    FontSize12,
} from '../../styled-components/Common';
import { DetailCloseBtn } from './../../styled-components/analysis_list/AnalysisSwingRear';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// import { AntDesign } from '@expo/vector-icons'; 
// import * as SecureStore from 'expo-secure-store';

const Point = () => {

    const [popup1, setPopup1] = React.useState(false);
    const [popup2, setPopup2] = React.useState(false);
    const navigation = useNavigation();

    return (
        <>
            <CommonBackground>
                <CommonContainer4>
                    <TitLarge>포인트 관리</TitLarge>
                    <CommonBoxWrap2>
                        <TxtSmallBlue>잔여 포인트 : 56,000P</TxtSmallBlue>
                        <GreenBtBox onPress={()=>{}}><FontSize12>잔여 포인트 환급</FontSize12></GreenBtBox>
                    </CommonBoxWrap2>
                    <GrayBoxMT>
                        <PointText>3회차 레슨 포인트 소멸 : 15,000P</PointText>
                    </GrayBoxMT>
                    <GrayBoxMT>
                        <PointText>2회차 레슨 포인트 소멸 : 15,000P</PointText>
                    </GrayBoxMT>
                    <GrayBoxMT>
                        <PointText>1회차 레슨 포인트 소멸 : 15,000P</PointText>
                    </GrayBoxMT>
                    <GrayBoxMT>
                        <PointText color={"#E63312"}>포인트 충전 : 100,000P</PointText>
                    </GrayBoxMT>
                    <View style={{marginBottom: 20}}>
                        <PageButtonScr onPress={()=>{navigation.navigate("BuyPoints")}} enabled><PageBtnText>포인트 충전하기</PageBtnText></PageButtonScr>                          
                    </View>
                </CommonContainer4>
            </CommonBackground>

            {popup1 ? 
                <DimBox>
                    <LayerBox>
                        <LayerConBox style={{ marginTop: 15 }}><CenterText>55,000점에 대한 잔여 포인트를 {'\n'} 환급 받으시겠습니까?</CenterText></LayerConBox>
                        <LayerGreenBt><FontSize16 style={{ fontWeight: "400" }}>환급하기</FontSize16></LayerGreenBt>
                        <DetailCloseBtn><AntDesign onPress={() => {}} name="close" size={24} color="#000" />닫기</DetailCloseBtn>
                    </LayerBox>  

                {/* <LayerBox>
                        <LayerConBox style={{ marginTop: 15 }}><CenterText>환급이 완료 되었습니다.</CenterText></LayerConBox>
                        <LayerGreenBt><FontSize16 style={{ fontWeight: "400" }}>확인</FontSize16></LayerGreenBt>
                    </LayerBox>    */}
                </DimBox>
            
                :
                null
            }

            {popup2 ? 
                <DimBox>
                    {/* <LayerBox>
                        <LayerConBox style={{ marginTop: 15 }}><CenterText>55,000점에 대한 잔여 포인트를 {'\n'} 환급 받으시겠습니까?</CenterText></LayerConBox>
                        <LayerGreenBt><FontSize16 style={{ fontWeight: "400" }}>환급하기</FontSize16></LayerGreenBt>
                        <DetailCloseBtn><AntDesign onPress={() => {}} name="close" size={24} color="#000" />닫기</DetailCloseBtn>
                    </LayerBox>   */}

                <LayerBox>
                        <LayerConBox style={{ marginTop: 15 }}><CenterText>환급이 완료 되었습니다.</CenterText></LayerConBox>
                        <LayerGreenBt><FontSize16 style={{ fontWeight: "400" }}>확인</FontSize16></LayerGreenBt>
                    </LayerBox>    
                </DimBox>
            
                :
                null
            }
            
        </>
    )
};

const CommonBoxWrap2 = styled(CommonBoxWrap)`
    marginVertical: 15px;
`
const GreenBtBox = styled(GreenBt)`
    width: 120px;
    height: 35px;
    fontSize: 12px;
`
const PointText = styled.Text`
    marginVertical: 10px;
    fontSize: 16px;
    fontWeight: 700;
    color: ${props => props.color || '#222'};
`
const GrayBoxMT = styled(GrayBox)`
    marginBottom: 15px;
`

export default Point;