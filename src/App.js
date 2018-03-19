import React from 'react';
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
