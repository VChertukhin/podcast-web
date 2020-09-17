import React, { FC, HTMLAttributes, RefCallback, RefObject } from 'react';
// @ts-ignore
import BrowserSymbol from 'svg-baker-runtime/browser-symbol';
// @ts-ignore
import {
  addSpriteSymbol,
  useIsomorphicLayoutEffect,
} from '@vkontakte/icons/dist/sprite';
import { SvgIcon } from '@vkontakte/icons/dist/SvgIcon.js';

const viewBox = '0 0 24 24';
const id = 'add_circle_24';
const content =
  '<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="add_circle_24"><path d="m12 1c6.0751 0 11 4.9249 11 11 0 6.0751-4.9249 11-11 11-6.0751 0-11-4.9249-11-11 0-6.0751 4.9249-11 11-11zm0 5c-0.5523 0-1 0.44772-1 1v4h-4c-0.51284 0-0.93551 0.386-0.99327 0.8834l-0.00673 0.1166c0 0.5523 0.44772 1 1 1h4v4c0 0.5128 0.386 0.9355 0.8834 0.9933l0.1166 0.0067c0.5523 0 1-0.4477 1-1v-4h4c0.5128 0 0.9355-0.386 0.9933-0.8834l0.0067-0.1166c0-0.5523-0.4477-1-1-1h-4v-4c0-0.51284-0.386-0.93551-0.8834-0.99327l-0.1166-0.00673z" fill="currentColor"/></svg>';
let isMounted = false;
function mountIcon() {
  if (!isMounted) {
    addSpriteSymbol(
      new BrowserSymbol({
        id: id,
        viewBox: viewBox,
        content: content,
      }),
    );
    isMounted = true;
  }
}
export interface Icon24AddCircleProps extends HTMLAttributes<HTMLDivElement> {
  fill?: string;
  width?: number;
  height?: number;
  getRootRef?: RefCallback<HTMLDivElement> | RefObject<HTMLDivElement>;
}
const Icon24AddCircle: FC<Icon24AddCircleProps> = (props) => {
  useIsomorphicLayoutEffect(() => {
    mountIcon();
  }, []);
  return React.createElement(
    SvgIcon,
    Object.assign({}, props, {
      viewBox: viewBox,
      id: id,
      width: props.width && !isNaN(props.width) ? +props.width : 24,
      height: props.height && !isNaN(props.height) ? +props.height : 24,
    }),
  );
};
(Icon24AddCircle as any).mountIcon = mountIcon;
export default Icon24AddCircle;
