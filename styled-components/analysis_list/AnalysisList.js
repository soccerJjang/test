import styled from "styled-components";

export const AnalysisContainer = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 0 0;
`
export const AnalysisBoxView = styled.View`
    position:relative;
    margin: 0 20px 24px;
    padding: 40px 24px 0 24px;
    border: 1px solid #EEEEEE;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background: #fff;
    z-index: -9999;
    elevation : 0;
`

export const AnalysisBoxView02 = styled.TouchableOpacity`
    position:relative;
    margin: 0 20px 24px;
    padding: 40px 24px 0 24px;
    border: 1px solid #EEEEEE;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background: #fff;
    z-index: -9999;
    elevation : 0;
`

export const FilterBox = styled.View`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    border-bottom-left-radius: 12px;
    border-bottom-right-radius: 12px;
    background: rgba(0, 0, 0, 0.4);
`
export const BoxTopView = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 20px;
`
export const ImageBox = styled.Image`
    height: 70px;
    width: 70px;
    border-radius: 35px;
    background: #D2D2D2;
`
export const ScoreBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    margin-top: 8px;
`
export const Score = styled.Text`
    font-size: 24px;
    font-weight: 700;
    color: #000;
`
export const ScoreDate = styled.Text`
    margin-bottom: 3px;
    font-size: 12px;
    color: #A8A8A8;
    font-weight: 200;
`
export const ScoreIcon = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 4px;
`
export const IcoStar = styled.Image`
    width: 14px;
    height: 14px;
    margin-right: 4px;
`
export const Border = styled.View`
    width: 100%;
    height: 1px;
    background: #eee;
`
export const BoxBottomView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 16px 0;
`

export const BoxBottomView02 = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;    
    padding: 16px 0;
`
export const BottomText = styled.Text`
    color: #060606;
    font-size: 14px;
    text-align: center;    
`

export const BottomText02 = styled.Text`
    margin: 0 auto;
    color: #060606;
    font-size: 14px;
    text-align: center;    
`
export const AnalysisTouchView = styled.TouchableOpacity`
    margin: 16px 20px 30px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    border: 1px solid #ddd;
    border-radius: 16px;
    background-color: #171C61;
    
`

export const AnalysisTouchText = styled.Text`    
    margin: auto 15px auto 0;
    font-size: 20px;
    font-weight: 200;
    color: #FFFFFF;
    
`;


export const IcoPlus = styled.Image`
    width: 24px;
    height: 24px;
    margin: 28px 0;
`


export const MoreContainer = styled.TouchableOpacity`
    position: relative;
    display: flex;
    flex-direction: row;
    margin: auto 0;
    padding: 10px 30px 9px 15px;
    background: #171C61;
    border: 1px solid #FFFFFF;
    border-radius: 3px;
`;

export const MoreText = styled.Text`
    font-weight: 400;
    font-size: 12px;
    color: #FFFFFF;
`;

export const MorePlus = styled.Image`
    position: absolute;
    top: 12px;
    right: 16px;
`;
