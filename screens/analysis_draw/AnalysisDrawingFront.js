import React from 'react';
import { TouchableOpacity , ScrollView} from 'react-native-gesture-handler';
import { CommonBackground, CommonContainer } from '../../styled-components/Common';
import {DrawingTabMenuBox,DrawingTabMenu,DrawingTabMenuTextOn, DrawingContentBox,DrawingButtonBox, DrawingCircle, AnalysisRearWrap, DrawingImg,DrawingCircleEdit,DrawingCircleEditAll,EditImage} from "../../styled-components/analysis_draw/rear/AnalysisDrawingFront";

const AnalysisDrawingFront = (props) => {
    return (
        <AnalysisRearWrap>
            <CommonBackground>
                <CommonContainer>
                    {/*tabmenu*/}
                    <ScrollView horizontal={true}>
                    </ScrollView>
                {/*tabmenu end */}
                {/*contentBox*/}
                <DrawingContentBox/>
                {/*contentBox end*/}
                {/*button*/}
                <DrawingButtonBox>
                    <DrawingCircle style={{marginRight:16}}>
                        <DrawingImg source={require("../../images/ico-share.png")}></DrawingImg>
                    </DrawingCircle>
                    <DrawingCircle>
                        <DrawingImg source={require("../../images/ico-download.png")}></DrawingImg>
                    </DrawingCircle>
                    <DrawingCircleEdit>
                        <DrawingImg source={require("../../images/ico-pencil.png")}></DrawingImg>    
                    </DrawingCircleEdit> 
                </DrawingButtonBox>
                <DrawingCircleEditAll>
                    <EditImage source={require("../../images/ico-trash.png")}/>
                    <EditImage source={require("../../images/ico-undo.png")}/>
                    <EditImage source={require("../../images/ico-modify.png")}/>
                    <EditImage source={require("../../images/ico-horizontal.png")}/>
                    <EditImage source={require("../../images/ico-Vertical.png")}/>
                    <EditImage source={require("../../images/ico-plus-sm.png")}/>
                    <EditImage source={require("../../images/ico-circle.png")}/>
                    <EditImage source={require("../../images/ico-square.png")}/>
                    <EditImage source={require("../../images/ico-triangle-white.png")}/>
                    <EditImage style={{marginTop:30}}source={require("../../images/ico-close-sm.png")}/>    
                </DrawingCircleEditAll>
                {/*button end*/}
    
            </CommonContainer>
        </CommonBackground>
        </AnalysisRearWrap>
        )
}

export default AnalysisDrawingFront;