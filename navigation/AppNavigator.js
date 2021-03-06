import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { dozy_theme } from '../config/Themes';
import LoginScreen from '../screens/LoginScreen';

// Create the main app auth navigation flow
// Define the stack navigator
// (do I need individual definitions, or should I just use "Stack" every time?)
const TopStack = createStackNavigator();

// Set up a loading screen for waiting on Firebase response
function LoadingScreen() {
  return (
    <View
      styles={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#232B3F',
        padding: 20
      }}
    >
      <ActivityIndicator
        size="large"
        color={dozy_theme.colors.primary}
        style={{
          width: 50,
          height: 50,
          marginTop: '100%',
          alignSelf: 'center'
        }}
      />
    </View>
  );
}

// Export the navigation components and screens, with if/then for auth state
export default function InitialAuthNavigator({
  userToken,
  authLoading,
  onboardingComplete
}) {
  if (authLoading) {
    return <LoadingScreen />;
  }

  return (
    <TopStack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false
      }}
    >
      {userToken != undefined ? (
        <></>
      ) : (
        <TopStack.Screen
          name="Auth"
          component={LoginScreen}
          options={{
            // If not logged in, jump to the login screen
            header: null
          }}
        />
      )}
    </TopStack.Navigator>
  );
}
