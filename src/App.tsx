import React from 'react';
import { Panel, Root, View } from '@vkontakte/vkui';
import type {
  AppearanceSchemeType,
  GroupInfo,
  UpdateConfigData,
  UserInfo,
} from '@vkontakte/vk-bridge';
import type { VKMiniAppAPI } from '@vkontakte/vk-mini-apps-api';
import { Main } from './panels/Main';
import { defaultPodcast, Podcast } from './types';
import { Creating } from './panels/Creating';
import { Preview } from './panels/Preview';
import { Edit } from './panels/Edit';

interface AppState {
  scheme: AppearanceSchemeType;
  activeView: string;
  activePanel: { [id: string]: string };
  popout?: React.ReactNode;
  history: Array<{ view: string; panel: string }>;

  userInfo: UserInfo;
  groupInfo: GroupInfo;

  podcast: Podcast;
  audio?: MediaElementAudioSourceNode;
  podcastDone: boolean;
}

export interface AppProps {
  vkAPI: VKMiniAppAPI;
  mobile: boolean;
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

      userInfo: {
        id: 117253521,
        first_name: 'Даниил',
        last_name: 'Суворов',
        sex: 2,
        city: {
          id: 22,
          title: 'Архангельск',
        },
        country: {
          id: 1,
          title: 'Россия',
        },
        timezone: 3,
        photo_100: 'https://sun9-8.us...M1CV8SrIA&ava=1',
        photo_200: 'https://sun9-8.us...eMXx9VGsc&ava=1',
      },
      groupInfo: {
        id: 76982440,
        name: '«Медуза»',
        screen_name: 'meduzaproject',
        is_closed: 0,
        type: 'page',
        is_member: 1,
        description: 'Все, что вам нужно от новостей.',
        photo_50: 'https://sun9-10.u...grqzJFw18&ava=1',
        photo_100: 'https://sun9-10.u...3y9Rgqq-o&ava=1',
        photo_200: 'https://sun9-10.u...76tdsKND4&ava=1',
      },

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

    vkAPI.getUserInfo().then((user) => {
      this.setState({ userInfo: user });
    });

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
    const { vkAPI } = this.props;
    const {
      activeView,
      activePanel,
      popout,
      groupInfo,
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
          <Panel id="music-chose"></Panel>
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
