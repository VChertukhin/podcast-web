import React from 'react';
import { Panel, Root, View } from '@vkontakte/vkui';
import type {
  AppearanceSchemeType,
  UpdateConfigData,
} from '@vkontakte/vk-bridge';
import type { VKMiniAppAPI } from '@vkontakte/vk-mini-apps-api';
import { Main } from './panels/Main';
import { defaultPodcast, Podcast, Audio } from './types';
import { Creating } from './panels/Creating';
import { Preview } from './panels/Preview';
import { Edit } from './panels/Edit';
import { MusicChoose } from './panels/MusicChoose';

interface AppState {
  scheme: AppearanceSchemeType;
  activeView: string;
  activePanel: { [id: string]: string };
  popout?: React.ReactNode;
  history: Array<{ view: string; panel: string }>;

  podcast: Podcast;
  audio?: MediaElementAudioSourceNode;
  podcastDone: boolean;

  chosenMusic?: Audio;
}

export interface AppProps {
  vkAPI: VKMiniAppAPI;
}

export class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      scheme: 'bright_light',
      activeView: 'main',
      activePanel: { main: 'main' },
      popout: null,
      history: [{ view: 'main', panel: 'main' }],

      podcast: defaultPodcast,
      podcastDone: false,
    };

    this.setView = this.setView.bind(this);
    this.setPanel = this.setPanel.bind(this);
    this.setPopout = this.setPopout.bind(this);
    this.goBack = this.goBack.bind(this);
  }

  componentDidMount(): void {
    const { vkAPI } = this.props;

    vkAPI.onUpdateConfig((data: UpdateConfigData) => {
      const schemeAttribute = document.createAttribute('scheme');
      schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
      this.setState({ scheme: data.scheme });
      document.body.attributes.setNamedItem(schemeAttribute);
    });

    vkAPI.initApp();
  }

  setView(view: string, name = 'main'): void {
    const panel = { ...this.state.activePanel };
    panel[view] = name;

    const newHistory = [...this.state.history, { view: view, panel: name }];

    this.setState({
      activeView: view,
      activePanel: panel,
      history: newHistory,
    });
  }

  setPanel(name: string): void {
    const panel = { ...this.state.activePanel };
    panel[this.state.activeView] = name;

    const newHistory = [
      ...this.state.history,
      { view: this.state.activeView, panel: name },
    ];

    this.setState({ activePanel: panel, history: newHistory });
  }

  setPopout(popout: React.ReactNode): void {
    this.setState({ popout: popout });
  }

  goBack(): void {
    const newHistory = [...this.state.history];
    newHistory.pop();
    const { view, panel } = newHistory[newHistory.length - 1];

    const p = { ...this.state.activePanel };
    p[view] = panel;

    this.setState({
      activeView: view,
      activePanel: p,
      history: newHistory,
    });
  }

  render(): JSX.Element {
    const {
      activeView,
      activePanel,
      popout,
      podcast,
      podcastDone,
    } = this.state;

    return (
      <Root activeView={activeView} popout={popout}>
        <View id="main" activePanel={activePanel['main']}>
          <Panel id="main">
            <Main setPanel={this.setPanel} podcastDone={podcastDone} />
          </Panel>
          <Panel id="creating">
            <Creating
              setPanel={this.setPanel}
              setPopout={this.setPopout}
              goBack={this.goBack}
              podcast={podcast}
              updatePodcast={(p) => {
                this.setState({ podcast: p });
              }}
            />
          </Panel>
          <Panel id="edit">
            <Edit
              setPanel={this.setPanel}
              goBack={this.goBack}
              podcast={podcast}
              updatePodcast={(p) => {
                this.setState({ podcast: p });
              }}
            />
          </Panel>
          <Panel id="music-choose">
            <MusicChoose
              choseAudio={(audio: Audio) => {
                this.setState({ chosenMusic: audio });
                this.goBack();
              }}
              goBack={this.goBack}
            />
          </Panel>
          <Panel id="preview">
            <Preview
              setPanel={this.setPanel}
              goBack={this.goBack}
              podcast={podcast}
              publishPodcast={() => {
                this.setPanel('main');
                this.setState({
                  podcast: defaultPodcast,
                  podcastDone: true,
                  history: [{ view: 'main', panel: 'main' }],
                });
              }}
            />
          </Panel>
        </View>
      </Root>
    );
  }
}
