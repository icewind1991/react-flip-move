export type BoundingBox = {
  top: number,
  left: number,
  right: number,
  bottom: number,
  width: number,
  height: number,
};

export type GetBoundingBox = (node: HTMLElement) => BoundingBox;

export type NodeData = {
  domNode: HTMLElement,
  boundingBox: BoundingBox,
};

export type ReactChildren = React$Element<any> | Array<React$Element<any>>;

type AnimationObject = {
  from: { [string]: string | number },
  to: { [string]: string | number },
}

export type FlipMoveAnimation = string | boolean | AnimationObject

export type FlipMoveProps = {
  children: ?ReactChildren,
  easing: ?string,
  duration: ?string | ?number,
  delay: ?string | ?number,
  staggerDurationBy: ?string | ?number,
  staggerDelayBy: ?string | ?number,
  onStart?: (element: React$Element<any>, domNode: HTMLElement) => any,
  onFinish?: (element: React$Element<any>, domNode: HTMLElement) => any,
  onStartAll?: (
    elements: Array<React$Element<any>>,
    domNodes: Array<HTMLElement>
  ) => any,
  onFinishAll?: (
    elements: Array<React$Element<any>>,
    domNodes: Array<HTMLElement>
  ) => any,
  typeName: ?string,
  appearAnimation: ?FlipMoveAnimation,
  enterAnimation: ?FlipMoveAnimation,
  leaveAnimation: ?FlipMoveAnimation,
  disableAllAnimations: ?boolean,
  getPosition: GetBoundingBox,
  maintainContainerHeight: ?boolean,
  verticalAlignment?: 'top' | 'bottom',
};

export type FlipMoveAnimationPresets = {
  [string]: FlipMoveAnimation,
};
