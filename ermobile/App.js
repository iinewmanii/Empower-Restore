import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import Question from './components/Question.js';
import ActionPlan from './components/ActionPlan.js';

const StackNav = createStackNavigator(
  {
    Question: Question,
    ActionPlan: ActionPlan,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Question',
  }
);

const AppContainer = createAppContainer(StackNav);
 
export default class App extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
    return <AppContainer />;
  }
}
