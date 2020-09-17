import React from 'react';
import {
  Button,
  Div,
  FixedLayout,
  PanelHeader,
  PanelHeaderBack,
  Separator,
  Text,
  Header,
  Card,
  Link,
  Group,
} from '@vkontakte/vkui';
import { Icon16Play } from '@vkontakte/icons';
import type { Podcast } from '../types';
import AudioEditor from '../components/AudioEditor';
import { timeFormat } from '../lib';
import TimeCodeEditor from '../components/TimeCodeEditor/TimeCodeEditor';

interface EditState {
  highlightErrors: boolean;
  podcast: Podcast;
}

export interface EditProps {
  // setView: (view: string, name?: string) => void;
  setPanel: (name: string) => void;
  goBack: () => void;

  podcast: Podcast;
  updatePodcast: (p: Podcast) => void;
}

export class Edit extends React.Component<EditProps, EditState> {
  constructor(props: EditProps) {
    super(props);

    this.state = {
      highlightErrors: false,
      podcast: props.podcast,
    };

    this.setPodcast = this.setPodcast.bind(this);
  }

  isValid = () => {
    const { podcast } = this.state;
    return [podcast.image, podcast.name, podcast.description].every((e) => e);
  };

  setPodcast = (podcast: Partial<Podcast>): void => {
    const newPodcast = Object.assign({}, this.state.podcast, podcast);
    this.setState({ podcast: newPodcast });
  };

  render(): JSX.Element {
    const { goBack, podcast, updatePodcast } = this.props;
    // const {  } = this.state;

    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
          Редактирование
        </PanelHeader>
        <AudioEditor podcast={podcast} />
        <TimeCodeEditor podcast={podcast} updatePodcast={updatePodcast} />
      </>
    );
  }
}
