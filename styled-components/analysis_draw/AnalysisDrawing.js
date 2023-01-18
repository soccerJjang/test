import styled from "styled-components";

export const DrawingContainer = styled.View`
    position:relative;
    width: 100%;
    height: 100%;
    background-color: white;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
    padding: 40px 0 0;
`
export const AnalysisDrawingContainer = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 0 20px 16px;
    padding: 24px 20px;
    border-radius: 12px;
    background: #fff;
    border: 1px solid #eee;
`
export const AnalysisDrawingLeft = styled.View`
    
`
export const AnalysisDrawingRight = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const ScoreBox = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`
export const Score = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #171C61;
`
export const ScoreDate = styled.Text`
    font-size: 14px;
    font-weight: 400;
    color: #999999;
`
export const ScoreIcon = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 9px;
`
export const IcoStar = styled.Image`
    width: 14px;
    height: 14px;
    margin-right: 4px;
`
export const AiText = styled.Text`
    color: #171C61;
    font-weight: 400;
`