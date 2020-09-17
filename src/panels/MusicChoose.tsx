import React from 'react';
import {
  Avatar,
  Cell,
  List,
  PanelHeader,
  PanelHeaderBack,
  Search,
} from '@vkontakte/vkui';
import { audios } from '../types';
import type { Audio } from '../types';

interface MusicChooseState {
  search: string;
}

export interface MusicChooseProps {
  // setView: (view: string, name?: string) => void;
  // setPanel: (name: string) => void;
  goBack: () => void;
  choseAudio: (audio: Audio) => void;
}

export class MusicChoose extends React.Component<
  MusicChooseProps,
  MusicChooseState
> {
  constructor(props: MusicChooseProps) {
    super(props);

    this.state = {
      search: '',
    };
  }

  get audios() {
    const search = this.state.search.toLowerCase();
    return audios.filter(
      ({ title, artist }) =>
        title.toLowerCase().indexOf(search) > -1 ||
        artist.toLowerCase().indexOf(search) > -1,
    );
  }

  render(): JSX.Element {
    const { goBack, choseAudio } = this.props;
    // const {  } = this.state;

    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
          Выбрать музыку
        </PanelHeader>
        <Search
          value={this.state.search}
          onChange={(e) => this.setState({ search: e.target.value })}
          after={null}
        />
        {this.audios.length > 0 && (
          <List>
            {this.audios.map((audio) => (
              <Cell
                key={audio.id}
                before={<Avatar mode="image" src={audio.photoURL} />}
                description={audio.artist}
                onClick={() => choseAudio(audio)}
              >
                {audio.title}
              </Cell>
            ))}
          </List>
        )}
      </>
    );
  }
}
