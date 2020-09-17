import React, {
  ReactNode,
  InputHTMLAttributes,
  ChangeEvent,
  Component,
  MouseEventHandler,
} from 'react';
import {
  Text,
  getClassName,
  classNames,
  Tappable,
  HasPlatform,
  withPlatform,
  ANDROID,
  IOS,
} from '@vkontakte/vkui';
import type { HasRootRef, HasRef } from '@vkontakte/vkui/dist/types';
import { Icon24Cancel, Icon24DismissOverlay } from '@vkontakte/icons';

export interface CoverLoaderProps
  extends InputHTMLAttributes<HTMLInputElement>,
    HasRef<HTMLInputElement>,
    HasRootRef<HTMLElement>,
    HasPlatform {
  /**
   * Срабатывает при клике на иконку крестика при `asideMode="dismiss"`.
   */
  onDismiss?: MouseEventHandler<HTMLDivElement>;
  onLoadImage?: (image: string) => void;
  /**
   * Изображение
   */
  title?: string;
  before?: ReactNode;
  image?: string;
  error?: boolean;
  errorText?: string;
  width?: number;
}

export interface CoverLoaderState {
  value?: string;
}

class CoverLoader extends Component<CoverLoaderProps, CoverLoaderState> {
  constructor(props: CoverLoaderProps) {
    super(props);
    this.state = {
      value: this.props.image,
    };
  }

  change = (input: ChangeEvent<HTMLInputElement>) => {
    if (input.target.files && input.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === 'string') {
          this.setState({ value: e.target.result });

          if (this.props.onLoadImage) {
            this.props.onLoadImage(e.target.result);
          }
        }
      };

      reader.readAsDataURL(input.target.files[0]);
    }
    if (this.props.onChange) {
      this.props.onChange(input);
    }
  };

  dismiss: MouseEventHandler<HTMLDivElement> = (e) => {
    this.setState({ value: undefined });

    if (this.props.onDismiss) {
      this.props.onDismiss(e);
    }
  };

  render(): JSX.Element {
    const {
      className,
      title,
      before,
      getRef,
      getRootRef,
      style,
      platform,
      onChange,
      onDismiss,
      onLoadImage,
      error,
      errorText,
      width,
      image,
      ...restProps
    } = this.props;
    const { value } = this.state;

    return (
      <>
        <Tappable
          className={classNames(
            className,
            getClassName('CoverLoader', platform),
            {
              'CoverLoader--load': !!value,
              CoverLoader__error: error,
            },
          )}
          style={{ ...style }}
          getRootRef={getRootRef}
          Component="label"
        >
          <div className="CoverLoader__background" style={{ backgroundImage: `url(${value})` }}/>
          <input
            {...restProps}
            className="CoverLoader__input"
            type="file"
            accept="image/*"
            ref={getRef}
            onChange={this.change}
          />
          <div className="CoverLoader__in">
            {before && <div className="CoverLoader__before">{before}</div>}
          </div>
        </Tappable>
        {error && (
          <Text weight="regular" className="CoverLoader__error_text">
            {errorText}
          </Text>
        )}
      </>
    );
  }
}

export default withPlatform(CoverLoader);
