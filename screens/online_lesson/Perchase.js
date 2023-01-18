import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useMemo, useRef } from 'react';
import * as RN from 'react-native';
import WebView from 'react-native-webview';

const Perchase = ( props ) => {   
    const [user, setUser] = React.useState(props.route.params.user);
    const [perchaseUrl, setPerchaseUrl] = React.useState(props.route.params.perchaseUrl);
    let webRef = useRef();
    const navigation = props.navigation;

    useEffect(() => {
        const listener = RN.AppState.addEventListener('change', state => {
            if (state === 'active') {
                navigation.navigate('BuyPoints', {data: 'isRunning'})
            }
        });
    
        return (()=>{listener.remove()})
      }, []);

    const onShouldStartLoadWithRequest = event => {
        if (event.url.split('/WEBPAY_INPUT/').length > 1) {
            RN.Linking.openURL(event.url)
        }
        return true;
    };
    
    return (
        <>
            <RN.View style={{width: 0, height: 0}}>
                <WebView
                    ref={webRef}
                    source={{uri: `${perchaseUrl}`}}
                    javaScriptEnabled={true}
                    onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
                    style={{width: 0, height: 0}}
                />
            </RN.View>
        </>
    )
}


export default Perchase;