// @flow

import React, {type Node} from 'react';
import {Animated} from 'react-native';

import TransitionContext from './TransitionContext';

type ImageType = { uri: string } | number;

type State = {
  id: ?number,
  isAnimating: boolean,
};

type Props = {
  children?: Node,
};

const initialState = {
  id: null,
  isAnimating: false,
};

export default class TransitionProvider extends React.Component<Props, State> {
  state = initialState;
  _animatedValue = new Animated.Value(0);
  _image: ?ImageType = null;
  _source = null;
  _destination = null;

  _animateImage = (
    toValue: number,
    animationParam: { type: 'spring' | 'timing', duration: number },
  ) => {
    let {type, ...otherAnimationParams} = animationParam;
    Animated[type](this._animatedValue, {
      toValue,
      duration: 2000,
      ...otherAnimationParams,
    }).start(() => {
      this.setState({
        id: null,
        isAnimating: false,
      });
    });
  };

  render() {
    let {isAnimating} = this.state;
    let animatedProps = {};
    if (isAnimating && this._source && this._destination) {
      animatedProps = {
        width: this._animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [this._source.width || 0, this._destination.width || 0],
        }),
        height: this._animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [
            this._source.height || 0,
            this._destination.height || 0,
          ],
        }),
        transform: [
          {
            translateX: this._animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this._source.x || 0, this._destination.x || 0],
            }),
          },
          {
            translateY: this._animatedValue.interpolate({
              inputRange: [0, 1],
              outputRange: [this._source.y || 0, this._destination.y || 0],
            }),
          },
        ],
      };
    }
    return (
      <TransitionContext.Provider
        value={{
          getState: () => {
            return {...this.state};
          },

          getTransitionValue: () => {
            return this._animatedValue;
          },

          animateElement: (id: string, animationParams: Object) => {
            if (id !== this.state.id) {
              this._animatedValue = new Animated.Value(0);
            }
            this.setState({id, isAnimating: true}, () => {
              this._animateImage(1, animationParams);
            });
          },

          setSource: ({width, height, x, y}) => {
            this._source = {
              width,
              height,
              x,
              y,
            };
          },

          setImage: (image) => {
            this._image = image;
          },

          setDestination: ({width, height, x, y}) => {
            this._destination = {
              width,
              height,
              x,
              y,
            };
          },

          getDestination: () => {
            return this._destination;
          },

          clear: () => {
            this._animatedValue = new Animated.Value(0);
            this._image = null;
            this._source = null;
            this._destination = null;
          },
        }}
      >
        {this.props.children}
        {this._image &&
          isAnimating && (
            <Animated.Image
              source={this._image}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                ...animatedProps,
              }}
            />
          )}
      </TransitionContext.Provider>
    );
  }
}
