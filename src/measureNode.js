// @flow

import ReactNative, {UIManager} from 'react-native';

export default async function measureNode(node: ?number) {
  let handle = ReactNative.findNodeHandle(node);
  let measurement = await new Promise((resolve) => {
    UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
      resolve({
        width,
        height,
        x: pageX,
        y: pageY,
      });
    });
  });
  return measurement;
}
