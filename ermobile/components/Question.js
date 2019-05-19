import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

import { domain } from '../src/config/config.js';

export default class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: `${domain}/api/questions`,
      question: '',
      answerA: '',
      answerB: '',
      actions: [],
    };
  }
 
  componentDidMount() {
    this.getInitialQuestion();
  }

  parseResponse = async (res) => {
    if (res.ok) {
      const json = await res.json();
      console.log(json);
      const question = json.data.question;
      const answerA = json.data.answers[0];
      const answerB = json.data.answers[1];
      this.setState({
        question: question,
        answerA: answerA,
        answerB: answerB,
      });
    } else {
      console.log('Error from server');
    }
  }

  getInitialQuestion = async () => {
    const res = await fetch(this.state.url + '/default', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }});
    console.log(res.status);
    this.parseResponse(res);
  }

  getNextQuestion = async (answer) => {
    if (answer.next === '') {
      this.props.navigation.navigate('ActionPlan', { actions: this.state.actions });
    } else {
      this.state.actions.push(answer.next);
      const data = await fetch(this.state.url + '/' + answer.next);
      this.parseResponse(data);
    }
  }
 
  render() {
    const { question, answerA, answerB } = this.state;
    return (
      <View style={homeStyles}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{question}</Text>
        </View>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => this.getNextQuestion(answerA)}
            style={styles.button}>
            <Text style={styles.buttonText}>{answerA.answer}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.getNextQuestion(answerB)}
            style={styles.button}>
            <Text style={styles.buttonText}>{answerB.answer}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
    color: 'white',
  },
  buttons: {
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'deepskyblue',
    borderRadius: 50,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 16,
    paddingLeft: 16,
    margin: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

const homeStyles = [
  styles.container,
  { backgroundColor: 'dodgerblue' }
];