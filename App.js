import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

import MainScreen from './screens/MainScreen';
import ArchiveScreen from './screens/ArchiveScreen';
import ArchiveScreen2 from './screens/ArchiveScreen2';
import ResultScreen from './screens/ResultScreen';

class App extends React.Component {
    render(){
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName="MAIN">
                <Stack.Screen name="MAIN" component={MainScreen}
                    options={{
                        title: '메인화면'
                }}/>
                <Stack.Screen name="ARCHIVE" component={ArchiveScreen}
                    options={{
                        title: '저장소'
                }}/>
                <Stack.Screen name="ARCHIVE2" component={ArchiveScreen2}
                    options={{
                        title: '저장소'
                    }}/>
                <Stack.Screen name="RESULT" component={ResultScreen}
                    options={{
                        title: '저장소'
                    }}/>



                </Stack.Navigator>
            </NavigationContainer>
        );
    }
}

export default App;