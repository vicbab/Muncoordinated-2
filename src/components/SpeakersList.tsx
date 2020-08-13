import * as React from 'react';
import firebase from 'firebase/app';
import _ from 'lodash';
import {
  Segment, Dropdown, TextArea, Input, Grid, Feed,
  Label, Form, Container
} from 'semantic-ui-react';
import { CaucusNextSpeaking } from './caucus/CaucusNextSpeaking';
import CaucusQueuer from './caucus/CaucusQueuer';
import { textAreaHandler, dropdownHandler, fieldHandler } from '../actions/handlers';
import { makeDropdownOption } from '../utils';
import { URLParameters, Dictionary } from '../types';
// import Caucus from './Caucus';
import CaucusData from './Caucus';
import { CaucusStatus, CaucusID} from './Caucus';
import { RouteComponentProps } from 'react-router';
import { Unit } from './TimerSetter';
import Timer, { TimerData } from './Timer';
import { CommitteeData, recoverMembers, recoverSettings, recoverCaucus } from './Committee';
import { SpeakerEvent, SpeakerFeedEntry } from './caucus/SpeakerFeed';

interface Props extends RouteComponentProps<URLParameters> {
}

interface State {
  timer?: TimerData;
  committee?: CommitteeData;
  committeeFref: firebase.database.Reference;
}

// export function recoverUnit(caucus?: CaucusData): Unit {
//   return caucus ? (caucus.speakerUnit || Unit.Seconds) : Unit.Seconds;
// }

export default class SpeakersList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { match } = props;

    this.state = {
      committeeFref: firebase.database().ref('caucuses')
        .child(match.params.committeeID)
        .child('timer')
    };


  }

  render() {
    // const { committeeFref } = this.state;

    // const caucus = recoverCaucus(committee, caucusID);

    return (

      <p>allo</p>
      // <Container text style={{ padding: '1em 0em' }}>
      // <p></p>
      // <CaucusQueuer
      //   caucus={caucus}
      //   members={members}
      //   caucusFref={caucusFref}
      // />
      // </Container >
    );
  }
}
