// @flow

import React from 'react';
import ReactNative, {View, UIManager} from 'react-native';
import TransitionContext from './TransitionContext';

type Props = {
  id: string,
  image: Object | number,
  destination: Object,
  children: Function,
  style?: Object,
  headerHeight?: number,
};

export default class SharedElementOrigin extends React.Component<Props> {
  _elementRef = null;
  _measurement = null;
  render() {
    let {
      style,
      id,
      headerHeight = 0,
      image,
      destination,
      children,
    } = this.props;
    return (
      <TransitionContext.Consumer>
        {({
          setSource,
          animateElement,
          setImage,
          setDestination,
          getState,
        }) => {
          return (
            <View
              ref={(node) => {
                this._elementRef = node;
              }}
              onLayout={async () => {
                if (this._elementRef) {
                  let handle = ReactNative.findNodeHandle(this._elementRef);
                  this._measurement = await new Promise((resolve) => {
                    UIManager.measure(
                      handle,
                      (x, y, width, height, pageX, pageY) => {
                        resolve({
                          width,
                          height,
                          x: pageX,
                          y: pageY,
                        });
                      },
                    );
                  });
                }
              }}
              style={style}
            >
              {children({
                getState,
                animateElement: (animationParam: Object) => {
                  if (this._measurement) {
                    setSource(this._measurement);
                    setDestination({
                      ...destination,
                      y: headerHeight + destination.y,
                    });
                    setImage(image);
                    animateElement(id, animationParam);
                  }
                },
              })}
            </View>
          );
        }}
      </TransitionContext.Consumer>
    );
  }
}
