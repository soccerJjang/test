import * as RN from 'react-native';
import React from 'react';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query'
import * as SecureStore from "expo-secure-store";
import * as Font from 'expo-font';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from './navigation/SplashScreen';
import * as ExpoSplashScreen from 'expo-splash-screen';
import HomeDraw from './navigation/HomeDraw';
import LoginDraw from './navigation/LoginDraw';
import 'react-native-gesture-handler';
import Config from 'react-native-config';

import AnalysisVideo from './screens/analysis_list/AnalysisVideo';
import AnalysisMenu from './screens/analysis_list/AnalysisMenu';

/* 콘솔오류 , 로그 안보이게 설정  */

// LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
// LogBox.ignoreAllLogs();



import AppLoading from "expo-app-loading";
import { IntroImage } from './styled-components';

import { LogBox } from 'react-native';


LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreAllLogs();


import Splash from './screens/splash/Splash';


/* 콘솔오류 , 로그 안보이게 설정  */

LogBox.ignoreLogs(['Warning: ...']); //Hide warnings
LogBox.ignoreAllLogs();

/* 콘솔오류 , 로그 안보이게 설정  */

const RootNav = createNativeStackNavigator();

export default function App() {

    const [ready, setReady] = React.useState(false);

    React.useEffect(() => {
      (async () => {
        await new Promise(resolve => setTimeout(resolve, 6000));
        setReady(true);
      })();
    }, []);

  const queryClient = new QueryClient();
  if(!ready) {
    return(
        <>
          <RN.StatusBar hidden={true} barStyle={'light-content'} />
          {/* <RN.ImageBackground style={{ flex: 1 }} source={require('./images/splashScreen.gif')} /> */}
          <RN.ImageBackground style={{ flex: 1 }} source={require('./images/splashScreen02.gif')} />
        </>
    )
  } else {
    return (
      <>
        <RN.StatusBar barStyle={"light-content"} />
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>
            <RootNav.Navigator
            initialRouteName='SplashScreen'
              screenOptions={{
                headerShown: false
              }}
            > 

              <RootNav.Screen name="SplashScreen" component={SplashScreen} />
              <RootNav.Screen name="HomeDraw" component={HomeDraw} />
              <RootNav.Screen name="LoginDraw" component={LoginDraw} />
            </RootNav.Navigator>
          </NavigationContainer>
        </QueryClientProvider>
      </>
    )
    }
}