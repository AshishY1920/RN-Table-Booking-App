import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './Components/Navigation/Navigation';
import {StatusBar} from 'react-native';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {RFPercentage} from 'react-native-responsive-fontsize';
import {Provider} from 'react-redux';
import Store from './Store';
import {PaperProvider} from 'react-native-paper';

// https://restaurant-app-server-three.vercel.app
// https://restaurant-app-server-three.vercel.app

const App = () => {
  useEffect(() => {
    // Change the status bar color when the component mounts
    StatusBar.setBackgroundColor('#86469C'); // Use your desired color
    StatusBar.setBarStyle('light-content'); // Set the text color of the status bar
    return () => {
      // Reset the status bar color when the component unmounts
      StatusBar.setBackgroundColor('#ffffff'); // Reset to your default color
      StatusBar.setBarStyle('dark-content'); // Reset the text color
    };
  }, []);
  return (
    <Provider store={Store}>
      <PaperProvider>
        <AlertNotificationRoot
          toastConfig={{
            textBodyStyle: {
              fontFamily: 'HvDTrial_Brandon_Grotesque_bold-BF64a625c9151d5',
              fontSize: RFPercentage(2),
            },
          }}>
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </AlertNotificationRoot>
      </PaperProvider>
    </Provider>
  );
};

export default App;
