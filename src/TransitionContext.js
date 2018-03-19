// @flow

import createReactContext from 'create-react-context';
export default createReactContext({});

export type TransitionState = {
  isAnimating: boolean,
  id: ?string,
};
