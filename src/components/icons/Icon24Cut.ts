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
const id = 'cut_24';
const content =
  '<svg fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="cut_24"><path d="m6 9c1.6568 0 3-1.3432 3-3s-1.3432-3-3-3-3 1.3432-3 3 1.3432 3 3 3z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="m6 21c1.6568 0 3-1.3431 3-3s-1.3432-3-3-3-3 1.3431-3 3 1.3432 3 3 3z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M20 4L8.12 15.88" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M14.47 14.48L20 20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/><path d="M8.12 8.12L12 12" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/></svg>';
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
