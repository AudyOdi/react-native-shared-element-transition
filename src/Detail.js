// @flow

import React from 'react';
import {View, Image, Text} from 'react-native';
import {Header} from 'react-navigation';

import SharedElementDestination from './SharedElementDestination';

type Props = {
  navigation: { state: { params: { imageUri: string, destination: Object } } },
};

export default class Detail extends React.Component<Props> {
  render() {
    let {imageUri} = this.props.navigation.state.params;
    return (
      <SharedElementDestination id={imageUri} headerHeight={Header.HEIGHT}>
        {({getState}) => {
          let {isAnimating, id} = getState();
          return (
            <View style={{flex: 1}}>
              <Image
                style={{
                  width: '100%',
                  height: 300,
                  opacity: isAnimating && id === imageUri ? 0 : 1,
                }}
                source={{
                  uri: imageUri,
                  cache: 'force-cache',
                }}
              />
              <Text>This is detail page</Text>
            </View>
          );
        }}
      </SharedElementDestination>
    );
  }
}
