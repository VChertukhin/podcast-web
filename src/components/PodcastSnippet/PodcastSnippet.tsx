import React, { HTMLAttributes } from 'react';
import {
  Button,
  classNames,
  getClassName,
  HasPlatform,
  IOS,
  platform,
  Progress,
  withPlatform,
} from '@vkontakte/vkui';
import type { Podcast } from '../../types';
import { Icon16Play, Icon24FavoriteOutline } from '@vkontakte/icons';
import { timeFormat } from '../../lib';
import { Icon24PlayCircle } from '../icons';
import type { HasRef, HasRootRef } from '@vkontakte/vkui/dist/types';

export interface PodcastSnippetProps
  extends HTMLAttributes<HTMLDivElement>,
    HasRef<HTMLInputElement>,
    HasRootRef<HTMLElement>,
    HasPlatform {
  podcast: Podcast;
}

export class PodcastSnippet extends React.Component<PodcastSnippetProps> {
  constructor(props: PodcastSnippetProps) {
    super(props);

    this.state = {};
  }

  render(): JSX.Element {
    const { podcast, platform, className, ...restProps } = this.props;

    return (
      <div
        className={classNames(
          getClassName('PodcastSnippet', platform),
          className,
        )}
        {...restProps}
      >
        <div
          className="PodcastSnippet__cover"
          style={{ backgroundImage: `url(${podcast.image})` }}
        ></div>
        <div className="PodcastSnippet__info">
          <div className="PodcastSnippet__favorite">
            <Icon24FavoriteOutline />
          </div>
          <div className="PodcastSnippet__name">{podcast.name}</div>
          <div className="PodcastSnippet__sub">
            {podcast.author} · {timeFormat(podcast.originalDuration)}
          </div>
          {platform === IOS ? (
            <div>
              <Icon24PlayCircle fill="#fff" />
              <Progress value={0} />
              <div className="PodcastSnippet__duration">-00:00</div>
            </div>
          ) : (
            <Button before={<Icon16Play />} size="m" mode="overlay_primary">
              СЛУШАТЬ
            </Button>
          )}
        </div>
      </div>
    );
  }
}

export default withPlatform(PodcastSnippet);
