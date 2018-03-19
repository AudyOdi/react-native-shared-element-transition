// @flow

import React from 'react';
import ReactNative, {View, UIManager} from 'react-native';
import TransitionContext from './TransitionContext';

type Props = {
  id: string,
  style?: Object,
  headerHeight?: number,
  children: Function,
};

export default class SharedElementOrigin extends React.Component<Props> {
  _elementRef = null;
  _measurement = null;
  _image = null;
  render() {
    let {style, id, headerHeight = 0, children} = this.props;
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
                setDestination: ({...coordinate}) => {
                  setDestination({
                    ...coordinate,
                    y: headerHeight + coordinate.y,
                  });
                },
                getState,
                setImage: (image) => {
                  this._image = image;
                },
                animateElement: () => {
                  if (this._measurement) {
                    setSource(this._measurement);
                    setImage(this._image);
                    animateElement(id);
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
