import React, { useEffect, useState } from 'react';
import { View, Alert, Platform} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createNoSubstitutionTemplateLiteral } from 'typescript';
import { Background } from 'victory-native';

import {
    VideoBackground,
    VideoBox,
    PlayBtn,
    VideoBtnBox,
    SaveBtn,
    AppendBtn,
    BtnText
} from '../../styled-components/analysis_list/AnalysisVideo';


const AnalysisVideo = () => {
    const [Btnbg,SetBtnbg] = useState ('#fff')
    
    const handleChangeBtnbg = () => {
        
    
        SetBtnbg(Btnbg === '#fff' ? '#919191' : '#fff');
        console.log(Btnbg);
    }

    const [TxtColor,SetTxtColor] = useState('#dad')

    const handleChangeColor = () => {

        SetTxtColor(TxtColor === '#dad' ? '#fff' : '#dad')
    }


    return (
        <>        
        <VideoBackground>
           <VideoBox>
               <PlayBtn source={require('../../images/playbtn.png')}></PlayBtn>
           </VideoBox>
        </VideoBackground>

        <VideoBtnBox>
            <SaveBtn>
                {Btnbg == '#fff' ? <BtnText onPress={handleChangeBtnbg} style={{color : Btnbg}}>저장</BtnText> : <BtnText onPress={handleChangeBtnbg}>라마바</BtnText>}                 
                
            </SaveBtn>
            <AppendBtn>
                {Btnbg == '#fff' ? <BtnText>보내기</BtnText> : <BtnText>가나다</BtnText>}                 
            </AppendBtn>
        </VideoBtnBox>
            {/* <SaveBtn>
                {TxtColor === '#dad' ? <BtnText onPress={handleChangeColor} style={{color : TxtColor}}>글씨색</BtnText> : <BtnText onPress={handleChangeColor} style={{color:"blue"}}>글씨색변경</BtnText>}
            </SaveBtn> */}
        </>
    )
}
export default AnalysisVideo;