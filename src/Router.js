// @flow

import { StackNavigator } from 'react-navigation';

import List from './List';
import Detail from './Detail';

export default StackNavigator({
  List: {
    screen: List,
  },
  Detail: {
    screen: Detail,
  },
});
