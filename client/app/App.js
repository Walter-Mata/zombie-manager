import React from 'react';
import {
  StyleSheet,Platform,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'; // Version can be specified in package.json
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import {UserProvider} from './context/userContext';
import {AppContextProvider} from './context/AppContext';
import Main from './src/Main';
import List from './src/List';
import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";


const client = new ApolloClient({ uri: 'http://127.0.0.1:4800/graphql' });


const App=()=>{
    const Stack = createStackNavigator();

    return(
      <AppContextProvider>
      <UserProvider>
    <ApolloProvider client={client}>
        <NavigationContainer>
        <Stack.Navigator initialRouteName={"Main"} 
                  screenOptions={{ 
                  headerTitle: 'Zombie Quarantine' ,
                  headerBackTitle:'Back',
                
                  gestureEnabled:false,
                  gestureDirection:'horizontal',
                  ...
                  Platform.OS=='android'?
                  TransitionPresets.FadeFromBottomAndroid:
                  TransitionPresets.SlideFromRightIOS
                  }}>

            <Stack.Screen name="Main" component={Main} options={{headerShown:true}} />
            <Stack.Screen name="List" component={List} options={{headerShown:true}} />


         </Stack.Navigator>

        </NavigationContainer>
        </ApolloProvider>
        </UserProvider>
        </AppContextProvider>
    )


}

export default App;
