// @flow

import React from 'react';
import {View, Image, Text} from 'react-native';
import {Header} from 'react-navigation';

import SharedElementDestination from './SharedElementDestination';

type Props = {
  navigation: { state: { params: { imageUri: string, destination: Object } } },
};

export default function Detail(props: Props) {
  let {imageUri} = props.navigation.state.params;
  return (
    <SharedElementDestination id={imageUri} headerHeight={Header.HEIGHT}>
      {({getState, destination}) => {
        let {isAnimating, id} = getState();
        return (
          <View style={{flex: 1}}>
            <Image
              style={{
                width: destination.width,
                height: destination.height,
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
