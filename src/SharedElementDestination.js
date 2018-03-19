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
          return (
            <View
              style={[
                {
                  width: destination.width,
                  height: destination.height,
                  transform: [
                    {translateX: destination.x},
                    {translateY: destination.y - headerHeight},
                  ],
                },
                style,
              ]}
            >
              {children({getState})}
            </View>
          );
        }}
      </TransitionContext.Consumer>
    );
  }
}
