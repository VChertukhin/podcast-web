import React from 'react';
import {
  Group,
  Header,
  CellButton,
  Caption,
  Div,
  List,
  Link,
  Cell,
  Input,
   platform, IOS
} from '@vkontakte/vkui';
import type { Podcast, TimeCode } from '../../types';
import { Icon24Add } from '@vkontakte/icons';
import { timeFormat } from '../../lib';
import { IMaskMixin } from 'react-imask';
import type { IMaskMixinProps } from 'react-imask';
import IMask from 'imask';
import type { InputProps } from '@vkontakte/vkui/dist/components/Input/Input';
import Icon24AddCircle from '../icons/Icon24AddCircle';

const sortingTimeCode = (a: TimeCode, b: TimeCode) => {
  return a.time - b.time;
};

interface MaskedInputProps extends InputProps, IMaskMixinProps {}

const MaskedInput = IMaskMixin<MaskedInputProps>(({ inputRef, ...props }) => (
  <Input
    {...props}
    getRef={inputRef} // bind internal input (if you use styled-components V4, use "ref" instead "innerRef")
  />
));

export interface TimeCodeEditorState {}

export interface TimeCodeEditorProps {
  podcast: Podcast;
  updatePodcast: (p: Podcast) => void;
}

export class TimeCodeEditor extends React.Component<
  TimeCodeEditorProps,
  TimeCodeEditorState
> {
  constructor(props: TimeCodeEditorProps) {
    super(props);

    this.state = {
      podcast: props.podcast,
    };

    this.setPodcast = this.setPodcast.bind(this);
  }

  setPodcast = (podcast: Partial<Podcast>): void => {
    const newPodcast = Object.assign({}, this.props.podcast, podcast);
    this.props.updatePodcast(newPodcast);
  };

  setPodcastTimeCodeName = (index: number, name: string) => {
    const newTimeCodes = [...this.props.podcast.timeCodes];
    newTimeCodes[index].name = name;
    this.setPodcast({ timeCodes: newTimeCodes });
  };

  setPodcastTimeCodeTime = (index: number, time: string) => {
    let timestamp = 0;
    const find = time.match(/([\d]{2}):([\d]{2})/);
    if (find) {
      timestamp = parseInt(find[2]) + parseInt(find[1]) * 60;

      const newTimeCodes = [...this.props.podcast.timeCodes];
      newTimeCodes[index].time = timestamp;
      this.setPodcast({ timeCodes: newTimeCodes });
    }
  };

  addPodcastTimeCode = () => {
    const newTimeCodes = [...this.props.podcast.timeCodes];
    newTimeCodes.unshift({ name: 'Название', time: 0 });
    this.setPodcast({ timeCodes: newTimeCodes });
  };

  sortPodcast = () => {
    this.setPodcast({
      timeCodes: [...this.props.podcast.timeCodes].sort(sortingTimeCode),
    });
  };

  removePodcastTimeCodeTime = (index: number) => {
    const newTimeCodes = [...this.props.podcast.timeCodes];
    newTimeCodes.splice(index, 1);
    this.setPodcast({ timeCodes: newTimeCodes });
  };

  render(): JSX.Element {
    const { podcast } = this.props;
    // const {  } = this.state;

    return (
      <Group
        header={<Header mode="secondary">Таймкоды</Header>}
        className="TimeCodeEditor"
      >
        <List>
          {podcast.timeCodes.map((timeCode, index) => (
            <Cell
              removable
              key={index}
              onRemove={() => this.removePodcastTimeCodeTime(index)}
            >
              <div className="TimeCodeEditorInput">
                <Input
                  value={timeCode.name}
                  onChange={(e) =>
                    this.setPodcastTimeCodeName(index, e.target.value)
                  }
                />
                <MaskedInput
                  mask="MM:SS"
                  blocks={{
                    MM: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 99,
                    },
                    SS: {
                      mask: IMask.MaskedRange,
                      from: 0,
                      to: 59,
                    },
                  }}
                  value={timeFormat(timeCode.time)}
                  onAccept={(value, mask) => {
                    this.setPodcastTimeCodeTime(index, value);
                  }}
                  onBlur={() => {
                    this.sortPodcast();
                    // this.setPodcastTimeCodeTime(
                    //   index,
                    //   timeFormat(timeCode.time),
                    // );
                  }}
                />
                {/* <Input
                  defaultValue={timeFormat(timeCode.time)}
                  onChange={(e) =>
                    this.setPodcastTimeCodeTime(index, e.target.value)
                  }
                /> */}
              </div>
            </Cell>
          ))}
        </List>
        <CellButton before={platform()===IOS?<Icon24AddCircle/>:<Icon24Add />} onClick={this.addPodcastTimeCode}>
          Добавить таймкод
        </CellButton>
        <Div>
          <Caption weight="regular" level="1" style={{ color: 'var(--text_secondary)' }}>
            Отметки времени с названием темы. Позволяют слушателям легче
            путешествовать по подкасту.
          </Caption>
        </Div>
      </Group>
    );
  }
}

export default TimeCodeEditor;
