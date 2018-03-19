// @flow

import React from 'react';
import {View} from 'react-native';
import TransitionContext, {type TransitionState} from './TransitionContext';

type Props = {
  style?: Object,
  headerHeight?: number,
  children: Function,
};

type ConsumerFunctions = {
  getDestination: () => ?ElementMeasurement,
  getState: () => TransitionState,
};

export default class SharedElementDestination extends React.Component<Props> {
  _elementRef = null;
  _measurement = null;
  _image = null;
  render() {
    let {style, headerHeight = 0, children} = this.props;
    return (
      <TransitionContext.Consumer>
        {({getDestination, getState}: ConsumerFunctions) => {
          let destination = getDestination();
          let adjustedDestination = destination;
          if (destination) {
            adjustedDestination = {
              ...destination,
              y: destination.y - headerHeight,
            };
          }
          let sharedElementDestinationStyle = {};
          if (adjustedDestination) {
            sharedElementDestinationStyle = {
              width: adjustedDestination.width,
              height: adjustedDestination.height,
              transform: [
                {translateX: adjustedDestination.x},
                {translateY: adjustedDestination.y},
              ],
            };
          }
          return (
            <View style={[sharedElementDestinationStyle, style]}>
              {children({getState, destination: adjustedDestination})}
            </View>
          );
        }}
      </TransitionContext.Consumer>
    );
  }
}
