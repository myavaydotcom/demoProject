import React from 'react';
import { createSwitchNavigator , createAppContainer } from 'react-navigation';
import Form from './Form';
import HomePage from './HomePage';
import Login from './Login';

const Stack = createSwitchNavigator({
   Form : { screen : Form },
   Login : { screen : Login },
   HomePage : { screen : HomePage },
},{
  initialRouteName : 'Form',
}
)

const Navigator = createAppContainer(Stack);

export default Navigator;
