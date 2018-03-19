// @flow

import React from 'react';
import {View} from 'react-native';
import TransitionContext from './TransitionContext';

type Props = {
  style?: Object,
  headerHeight?: Object,
  children: Function,
};

export default class SharedElementDestination extends React.Component<Props> {
  _elementRef = null;
  _measurement = null;
  _image = null;
  render() {
    let {style, headerHeight = 0, children} = this.props;
    return (
      <TransitionContext.Consumer>
        {({getDestination, getState}) => {
          let destination = getDestination();
          let adjustedDestination = {
            ...destination,
            y: destination.y - headerHeight,
          };
          return (
            <View
              style={[
                {
                  width: adjustedDestination.width,
                  height: adjustedDestination.height,
                  transform: [
                    {translateX: adjustedDestination.x},
                    {translateY: adjustedDestination.y},
                  ],
                },
                style,
              ]}
            >
              {children({getState, destination: adjustedDestination})}
            </View>
          );
        }}
      </TransitionContext.Consumer>
    );
  }
}
