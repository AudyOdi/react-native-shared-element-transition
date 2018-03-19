import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TransitionProvider from './TransitionProvider';

import Router from './Router';

export default class App extends React.Component {
  render() {
    return (
      <TransitionProvider>
        <Router />
      </TransitionProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
