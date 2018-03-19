// @flow

import {UIManager} from 'react-native';

export default function measureNode(node: ?number) {
  return new Promise((resolve, reject) => {
    UIManager.measureInWindow(
      node,
      (e) => reject(e),
      (x, y, w, h) => {
        resolve({x, y, w, h});
      },
    );
  });
}
