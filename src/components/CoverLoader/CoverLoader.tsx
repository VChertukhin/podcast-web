import React, {
  ReactNode,
  InputHTMLAttributes,
  ChangeEvent,
  Component,
  MouseEventHandler,
} from 'react';
import {
  getClassName,
  classNames,
  Tappable,
  HasPlatform,
  withPlatform,
} from '@vkontakte/vkui';
import type { HasRootRef, HasRef } from '@vkontakte/vkui/dist/types';

export interface CoverLoaderProps
  extends InputHTMLAttributes<HTMLInputElement>,
    HasRef<HTMLInputElement>,
    HasRootRef<HTMLElement>,
    HasPlatform {
  onDismiss?: MouseEventHandler<HTMLDivElement>;
  onLoadImage?: (image: string) => void;
  before?: ReactNode;
  image?: string;
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
      const reader = new FileReader();
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
      before,
      getRef,
      getRootRef,
      style,
      platform,
      onChange,
      onDismiss,
      onLoadImage,
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
          )}
          style={{ ...style }}
          getRootRef={getRootRef}
          Component="label"
        >
          <div
            className="CoverLoader__background"
            style={{ backgroundImage: `url(${value})` }}
          />
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
      </>
    );
  }
}

export default withPlatform(CoverLoader);
