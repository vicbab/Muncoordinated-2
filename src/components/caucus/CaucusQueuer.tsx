import * as React from 'react';
import firebase from 'firebase/app';
import { MemberData } from '../Member';
import { CaucusData, recoverDuration, recoverUnit, recoverQueue } from '../Caucus';
import { MemberOption } from '../../constants';
import { Segment, Button, Form, DropdownProps, Label } from 'semantic-ui-react';
import { TimerSetter, Unit } from '../TimerSetter';
import { SpeakerEvent, Stance } from '..//caucus/SpeakerFeed';
import { checkboxHandler, validatedNumberFieldHandler, dropdownHandler } from '../../actions/handlers';
import { membersToOptions } from '../../utils';
import { Dictionary } from '../../types';
import { SpeakerFeed } from './SpeakerFeed';
import { CaucusNextSpeaking } from '..//caucus/CaucusNextSpeaking'
import _ from 'lodash';
import { useObjectVal } from 'react-firebase-hooks/database';

interface Props {
  caucus?: CaucusData;
  members?: Dictionary<string, MemberData>;
  caucusFref: firebase.database.Reference;
}

export default function CaucusQueuer(props: Props) {
  const { members, caucus, caucusFref } = props;
  const [queueMember, setQueueMember] = React.useState<MemberOption | undefined>(undefined);

  const setStance = (stance: Stance) => () => {
    const { caucus } = props;
    const duration = Number(recoverDuration(caucus));
    const q = recoverQueue(caucus);

    let skips = false;



    if (duration && queueMember) {
      const newEvent: SpeakerEvent = {
        who: queueMember.text,
        stance: stance,
        duration: recoverUnit(caucus) === Unit.Minutes ? duration * 60 : duration,
      };

      try {
        for (let [key, value] of Object.entries(q!)) {
          if(value.who == newEvent.who){
            skips=true;
          }
        }
      } catch (error) {
        skips = false;
      }


      if (!skips){
        props.caucusFref.child('queue').push().set(newEvent);
      }
    }
  }

  const setMember = (event: React.SyntheticEvent<HTMLElement>, data: DropdownProps): void => {
    const { members } = props;
    const memberOptions = membersToOptions(members);

    setQueueMember(memberOptions.filter(c => c.value === data.value)[0]);
  }

  const memberOptions = membersToOptions(members);
  const duration = recoverDuration(caucus);
  const disableButtons = !queueMember || !duration;

  return (
    <Segment textAlign="center">
      <Label attached="top left" size="large">Queue</Label>
      <Form>
        <Form.Dropdown
          icon="search"
          value={queueMember ? queueMember.value : undefined}
          search
          selection
          loading={!caucus}
          error={!queueMember}
          onChange={setMember}
          options={memberOptions}
        />
        <TimerSetter
          loading={!caucus}
          unitValue={recoverUnit(caucus)}
          placeholder="Speaking time"
          durationValue={duration ? duration.toString() : undefined}
          onDurationChange={validatedNumberFieldHandler(caucusFref, 'speakerDuration')}
          onUnitChange={dropdownHandler(caucusFref, 'speakerUnit')}
        />
        <Form.Checkbox
          label="Delegates can queue"
          indeterminate={!caucus}
          toggle
          checked={caucus ? (caucus.queueIsPublic || false) : false} // zoo wee mama
          onChange={checkboxHandler<CaucusData>(caucusFref, 'queueIsPublic')}
        />
        <Button.Group size="large" fluid>
          <Button
            disabled={disableButtons}
            content="Add to queue"
            onClick={setStance(Stance.Neutral)}
          />
        </Button.Group>
      </Form>
    </Segment>
  );
}
