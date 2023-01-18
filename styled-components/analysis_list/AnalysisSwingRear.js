import styled from "styled-components";

export const AnalysisSwingRearContainer = styled.ScrollView`
    position: relative;
    width: 100%;
    padding: 32px 0 0 0; 
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background: #fff;
`
export const AnalysisSwingRearProContainer = styled.ScrollView`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 32px 20px 0 20px; 
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    background: #fff;
`
export const RankTit = styled.Text`
    margin: 0 20px;
    color: #E63312;
    font-weight: 700;
    font-size: 12px;
    line-height: 14px;
`
export const TextView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: stretch;
    margin: 16px 20px 24px;
`
export const TextLeft = styled.Text`
    font-size: 24px;
    color: #000;
    font-weight: 400;
`
export const ScoreText = styled.Text`
    font-size: 24px;
    font-weight: 700;
    letter-spacing: -1px;
`
export const RankText = styled.Text`
    font-size: 12px;
    color: #666;
    font-weight: 400;
`
export const ImageView = styled.View`
    position: relative;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
     overflow: hidden;
    background: #fff;
`
export const RearImage = styled.Image`
    width: 100%;
    height: 529px;
`
export const RearDetailButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px 20px;
    background-color: rgba(0,0,0,.5);
    color: #fff;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px; 
`
export const BoxShadow = styled.TouchableOpacity`
    background: #fff;
`
export const RearDetailBox = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 18px 20px 18px 20px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.8);
`
export const RearDetailTit = styled.Text`
    margin-bottom: 24px;
    font-size: 16px;
    color: #fff;
`
export const RearDetailText = styled.Text`
    font-size: 15px;
    color: #fff;
`
export const DetailCloseBtn = styled.Text`
    position: absolute;
    top: 25px;
    right: 26px;
    font-size: 0;
    width: 20px;
    height: 20px;
`
export const ProCardBox = styled.TouchableOpacity`
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    /* overflow: hidden; */
    background: #fff;
`
export const ProCardTit = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    padding: 24px 30px 24px 24px;
`
export const ProCardBadge = styled.View`
    padding: 2px 6px;
    border-radius: 10px;
    overflow: hidden;
    background: #000;
`
export const ProCardCon = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 25px 0 32px 24px;
`
export const ShotListBox = styled.TouchableOpacity`
    margin-right: 20px;
`
export const ShotList = styled.View`
    position: relative;
    width: 60px;
    height: 60px;
    margin : 0 auto;
    border-radius: 30px;
    overflow: hidden;
`
export const ShotListImg = styled.Image`
    height: 100%;
    width: 100%;
`
export const ShotListName = styled.Text`
    width: 60px;
    overflow: hidden;
    margin-top: 8px;
    font-size: 14px;
    color: #222;
    text-align: center;
`
export const ShotListChk = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(92, 238, 167, .8);
`
export const OpenBtn = styled.Image`
    position: absolute;
    width: 18px;
    height: 10px;
    top: 20px;
    right: 30px;
`
//ProCard
export const SwingRearImgBox = styled.View`
    position: relative;
    margin-top: 22px;
`
export const SwingRearImgInner = styled.View`
    display: flex;
    flex-direction: row;
    align-items: stretch;
`
export const SwingRearImg = styled.View`
    flex: 1;
    height: 493px;
    border-radius: 16px;
    overflow: hidden;
`
export const PercentBox = styled.View`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -39px;
    margin-left: -39px;
    width: 78px;
    height: 78px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: rgba(0,0,0,.5);
    border-radius: 39px;
`
export const PercentNum = styled.Text`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    font-size: 27px;
    color: #fff;
`
//SwingPositionComparisonImg
export const ComparisonImgBox = styled.View`
    position: relative;
    width: 100%;        
    height: ${props => props.width}px;
    margin-top: 20px;
`
export const ComparisonImgInner = styled.View`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 100%;    
`
export const ComparisonImg = styled.View`
    flex: 1;
   
`