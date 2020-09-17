import React from 'react';
import {
  Button,
  Panel,
  PanelHeader,
  Placeholder,
  Root,
  View,
} from '@vkontakte/vkui';
import {
  Icon56CheckCircleOutline,
  Icon56AddCircleOutline,
} from '@vkontakte/icons';

export interface MainProps {
  // setView: (view: string, name?: string) => void;
  setPanel: (name: string) => void;
  // goBack: () => void;

  podcastDone: boolean;
}

export class Main extends React.Component<MainProps> {
  constructor(props: MainProps) {
    super(props);

    this.state = {};
  }

  render(): JSX.Element {
    const { setPanel, podcastDone } = this.props;
    // const {  } = this.state;

    return (
      <Placeholder
        style={{ background: 'transparent' }}
        icon={
          podcastDone ? (
            <Icon56CheckCircleOutline fill="var(--accent)" />
          ) : (
            <Icon56AddCircleOutline />
          )
        }
        header={podcastDone ? 'Подкаст добавлен' : 'Добавьте первый подкаст'}
        action={
          <Button size="m" onClick={() => setPanel('creating')}>
            Добавить подкаст
          </Button>
        }
        stretched
      >
        {podcastDone ? (
          <>
            Раскажите своим подписчикам
            <br />
            о новом подкасте, чтобы получить
            <br />
            больше слушателей.
          </>
        ) : (
          <>
            Добавляйте, редактируйте и делитесь
            <br />
            подкастами вашего сообщества.
          </>
        )}
      </Placeholder>
    );
  }
}
