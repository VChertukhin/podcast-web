import React, { ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  Div,
  FixedLayout,
  FormLayout,
  Input,
  PanelHeader,
  PanelHeaderBack,
  Placeholder,
  Separator,
  Textarea,
  File,
  SimpleCell,
  Caption,
  ActionSheet,
  ActionSheetItem,
} from '@vkontakte/vkui';
import {
  Icon24Chevron,
  Icon28PodcastOutline,
  Icon56GalleryOutline,
} from '@vkontakte/icons';
import { descriptionPodcastAccess, namePodcastAccess, Podcast } from '../types';
import CoverLoader from '../components/CoverLoader/CoverLoader';
import { timeFormat } from '../lib';

interface CreatingState {
  podcast: Podcast;
}

export interface CreatingProps {
  // setView: (view: string, name?: string) => void;
  setPanel: (name: string) => void;
  setPopout: (popout?: React.ReactNode) => void;
  goBack: () => void;

  podcast: Podcast;
  updatePodcast: (p: Podcast) => void;
}

export class Creating extends React.Component<CreatingProps, CreatingState> {
  constructor(props: CreatingProps) {
    super(props);

    this.state = {
      podcast: props.podcast,
    };

    this.openAccess = this.openAccess.bind(this);
    this.change = this.change.bind(this);
  }

  get isValid() {
    const { podcast } = this.state;
    return [
      podcast.image,
      podcast.name,
      podcast.description,
      podcast.audioSource,
    ].every((e) => e);
  }

  setPodcast = (podcast: Partial<Podcast>): void => {
    const newPodcast = Object.assign({}, this.state.podcast, podcast);
    this.setState({ podcast: newPodcast });
  };

  change = (input: ChangeEvent<HTMLInputElement>) => {
    if (input.target.files && input.target.files[0]) {
      const originalAudioName = input.target.files[0].name;

      const reader = new FileReader();
      reader.onload = (e) => {
        const audio = document.createElement('audio');
        if (e.target && typeof e.target.result === 'string') {
          audio.src = e.target.result;
          audio.onloadedmetadata = () => {
            this.setPodcast({ originalDuration: audio.duration });
          };
          const context = new window.AudioContext();
          const source = context.createMediaElementSource(audio);
          this.setPodcast({
            audioComponent: audio,
            audioSource: source,
            originalAudioName: originalAudioName,
          });
        }
      };

      const audioFile = input.target.files[0];
      reader.readAsDataURL(audioFile);
      this.setPodcast({ audioFile });
    }
  };

  openAccess() {
    this.props.setPopout(
      <ActionSheet
        onClose={() => this.props.setPopout(null)}
        iosCloseItem={
          <ActionSheetItem autoclose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        // @ts-ignore
        toggleRef={React.createRef()}
      >
        <ActionSheetItem
          autoclose
          onClick={() => this.setPodcast({ access: 'all' })}
        >
          {namePodcastAccess['all']}
        </ActionSheetItem>
        <ActionSheetItem
          autoclose
          onClick={() => this.setPodcast({ access: 'admins-only' })}
        >
          {namePodcastAccess['admins-only']}
        </ActionSheetItem>
      </ActionSheet>,
    );
  }

  render(): JSX.Element {
    const { setPanel, goBack, updatePodcast } = this.props;
    const { podcast } = this.state;

    return (
      <>
        <PanelHeader left={<PanelHeaderBack onClick={() => goBack()} />}>
          Новый подкаст
        </PanelHeader>
        <FormLayout>
          <FormLayout className="FormLayoutRow">
            <CoverLoader
              image={podcast.image}
              onLoadImage={(image) => this.setPodcast({ image: image })}
              before={<Icon56GalleryOutline width={32} height={32} />}
            />
            <Input
              top="Название"
              placeholder="Введите название подкаста"
              value={podcast.name}
              onChange={(e) => this.setPodcast({ name: e.target.value })}
            />
          </FormLayout>
          <Textarea
            top="Описание подкаста"
            placeholder=""
            value={podcast.description}
            onChange={(e) => this.setPodcast({ description: e.target.value })}
          />
        </FormLayout>
        {podcast.audioSource ? (
          <>
            <label>
              <SimpleCell
                style={{ cursor: 'pointer' }}
                disabled
                before={
                  <div className="PodcastIcon">
                    <Icon28PodcastOutline />
                  </div>
                }
                after={
                  <div style={{ color: 'var(--text_secondary)' }}>
                    {timeFormat(podcast.originalDuration)}
                  </div>
                }
              >
                {podcast.originalAudioName}
              </SimpleCell>
              <input
                className="LoadFile"
                type="file"
                accept="audio/*"
                onChange={this.change}
              />
            </label>
            <Div>
              <Caption
                level="1"
                weight="regular"
                style={{ color: 'var(--text_secondary)' }}
              >
                Вы можете добавить таймкоды и скорректировать подкаст в режиме
                редактирования
              </Caption>
            </Div>
            <Div>
              <Button
                stretched
                size="l"
                mode="outline"
                onClick={() => {
                  updatePodcast(podcast);
                  setPanel('edit');
                }}
              >
                Редактировать аудиозапись
              </Button>
            </Div>
          </>
        ) : (
          <Placeholder
            header="Загрузите ваш подкаст"
            action={
              <File
                controlSize="m"
                mode="outline"
                accept="audio/*"
                onChange={this.change}
              >
                Загрузить файл
              </File>
            }
          >
            Выберите готовый аудиофайл из
            <br />
            вашего телефона и добавьте его
          </Placeholder>
        )}
        <Separator />
        <FormLayout>
          <Checkbox
            style={{ margin: '-12px 0px', padding: '12px 0px' }}
            checked={podcast.explicitContent}
            onChange={(e) =>
              this.setPodcast({ explicitContent: e.target.checked })
            }
          >
            Ненормативный контент
          </Checkbox>
          <Checkbox
            style={{ margin: '-12px 0px', padding: '12px 0px' }}
            checked={podcast.notExport}
            onChange={(e) => this.setPodcast({ notExport: e.target.checked })}
          >
            Исключить эпизод из экспорта
          </Checkbox>
          <Checkbox
            style={{ margin: '-12px 0px', padding: '12px 0px' }}
            checked={podcast.trailer}
            onChange={(e) => this.setPodcast({ trailer: e.target.checked })}
          >
            Трейлер подкаста
          </Checkbox>
        </FormLayout>
        <SimpleCell
          style={{ marginTop: 14 }}
          after={<Icon24Chevron />}
          description={namePodcastAccess[podcast.access]}
          onClick={this.openAccess}
        >
          Кому доступен данный подкаст
        </SimpleCell>
        <Div
          style={{
            paddingTop: 4,
            paddingBottom: 24,
            color: 'var(--icon_tertiary)',
          }}
        >
          <Caption level="1" weight="regular">
            {descriptionPodcastAccess[podcast.access]}
          </Caption>
        </Div>
        <div style={{ height: 68 }} />
        <FixedLayout filled vertical="bottom">
          <Div>
            <Button
              stretched
              size="l"
              disabled={!this.isValid}
              onClick={() => {
                updatePodcast(podcast);
                setPanel('preview');
              }}
            >
              Далее
            </Button>
          </Div>
        </FixedLayout>
      </>
    );
  }
}
