import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { domain } from '../src/config/config.js';

export default class ActionPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `${domain}/api/actions`,
      content: [],
      isLoading: true,
    };
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const actions = navigation.getParam('actions', []);
    let res = await fetch(this.state.url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        actions: actions,
      }),
    });
    let json = await res.json();
    this.setState({content: json, isLoading: false});
  }

  render() {
    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    } else {
      const { content } = this.state;
      console.log('RENDER:', content);
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Action Plan</Text>
            {content.map((doc, index) => {
              const { tag, action } = doc[0];
              return <Text style={styles.headerText} key={index}>{action}</Text>;
            })}
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 64,
    paddingBottom: 32,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
});