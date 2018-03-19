// @flow

declare type ImageType = { uri: string } | number;
declare type ElementMeasurement = {
  x: number,
  y: number,
  width: number,
  height: number,
};

declare type AnimationParams = {
  type: 'spring' | 'timing',
  duration: number,
};
