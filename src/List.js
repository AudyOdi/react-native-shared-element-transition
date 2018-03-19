// @flow

import React from 'react';
import {Dimensions, Image, TouchableOpacity} from 'react-native';
import SharedElementOrigin from './SharedElementOrigin';
import {Header} from 'react-navigation';

const imageList = [
  'https://images.unsplash.com/photo-1506043959821-2eda767099c8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8516f569db6d6ddcbc8daae137d08216&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1493805503700-3219b693ffcc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=37d5b7c1029473254fa38b7532a34543&auto=format&fit=crop&w=900&q=60',
  'https://images.unsplash.com/photo-1511225160131-38607044acc7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=77a03301906ed6f065ada0f8e6d3ffef&auto=format&fit=crop&w=900&q=60',
];

const {width: windowWidth} = Dimensions.get('window');

type Props = {
  navigation: { navigate: Function },
};

export default class List extends React.Component<Props> {
  _imageRefs = new Map();
  render() {
    return imageList.map((uri, index) => {
      return (
        <SharedElementOrigin
          key={index}
          id={uri}
          style={{width: '50%'}}
          headerHeight={Header.HEIGHT}
        >
          {({setImage, setDestination, animateElement}) => {
            setImage({uri});
            return (
              <TouchableOpacity
                onPress={() => {
                  setDestination({
                    x: 0,
                    y: 0,
                    width: windowWidth,
                    height: 300,
                  });
                  animateElement();
                  this.props.navigation.navigate('Detail', {imageUri: uri});
                }}
              >
                <Image
                  source={{uri, cache: 'force-cache'}}
                  style={{width: '100%', height: 100}}
                />
              </TouchableOpacity>
            );
          }}
        </SharedElementOrigin>
      );
    });
  }
}
