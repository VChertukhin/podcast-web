import React, { FC, HTMLAttributes, ReactNode } from 'react';
import {
  Progress,
  SimpleCell,
  Separator,
  usePlatform,
  getClassName,
  classNames,
} from '@vkontakte/vkui';
import type { HasRootRef } from '@vkontakte/vkui/dist/types';

export interface EditorProps
  extends HTMLAttributes<HTMLElement>,
    HasRootRef<HTMLElement> {
  /**
   * Изображение
   */
  background?: ReactNode;
  title?: string;
  description?: string;
  progress?: string;
  value?: number;
  action?: ReactNode;
}

const Editor: FC<EditorProps> = ({
  className,
  background,
  title,
  description,
  progress,
  value,
  action,
  ...restProps
}) => {
  const platform = usePlatform();

  return (
    <div
      {...restProps}
      className={classNames(className, getClassName('Editor', platform))}
    >
      <div className="Editor__background">{background}</div>
      <div className="Editor__info">
        <div className="Editor__cell">
          <SimpleCell disabled description={description}>
            {title}
          </SimpleCell>
        </div>
        <Separator />
        <div className="Editor__bottom">
          <div className="Editor__before">
            <div className="Editor__progress">{progress}</div>
            <Progress value={value} />
          </div>
          <div className="Editor__action">{action}</div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
