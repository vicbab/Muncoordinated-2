import * as React from 'react';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import Committee, { CommitteeData } from './Committee';
import { RouteComponentProps } from 'react-router';
import { Table, Flag, Container } from 'semantic-ui-react';
import { MemberData, MemberID, parseFlagName } from './Member';
import { CaucusID, CaucusData } from './Caucus';
import { URLParameters, Dictionary } from '../types';
import Loading from './Loading';
import { SpeakerEvent } from './caucus/SpeakerFeed';
import { hhmmss } from './Timer';
import { ResolutionData, ResolutionID } from './Resolution';
import { AmendmentData } from './Amendment';
import { MotionID, MotionData } from './Motions';

interface Props extends RouteComponentProps<URLParameters> {
}

interface MemberStats {
  duration: number;
  times: number;
  motionProposals: number;
  amendmentProposals: number;
}

interface State {
  committee?: CommitteeData;
  committeeFref: firebase.database.Reference;
}

export default class Stats extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const { match } = props;

    this.state = {
      committeeFref: firebase
        .database()
        .ref('committees')
        .child(match.params.committeeID)
    };
  }

  firebaseCallback = (committee: firebase.database.DataSnapshot | null) => {
    if (committee) {
      this.setState({ committee: committee.val() });
    }
  }

  componentDidMount() {
    this.state.committeeFref.on('value', this.firebaseCallback);
  }

  componentWillUnmount() {
    this.state.committeeFref.off('value', this.firebaseCallback);
  }

  memberStats(committee: CommitteeData, memberID: MemberID, member: MemberData): MemberStats {
    const caucuses = committee.caucuses || {} as Dictionary<CaucusID, CaucusData>;

    let times = 0;
    let duration = 0;
    let motionProposals= 0;
    let amendmentProposals = 0;

    Object.keys(caucuses).forEach(cid => {
      const caucus: CaucusData = caucuses[cid];

      const history = caucus.history || {} as Dictionary<string, SpeakerEvent>;

      Object.keys(history).map(hid => history[hid]).forEach((speakerEvent: SpeakerEvent) => {
        if (speakerEvent.who === member.name) { // I fucked up and used name in SpeakerEvent, not MemberID
          times += 1;
          duration += speakerEvent.duration;
        }
      }
      );
    });

    const motions = committee.motions || {} as Dictionary<MotionID, MotionData>;

    Object.keys(motions).forEach(mid => {
      const motion: MotionData = motions[mid];

      if (motion.proposer === member.name) {
        motionProposals += 1
      }
    });

    const resolutions = committee.resolutions || {} as Dictionary<ResolutionID, ResolutionData>;

    Object.keys(resolutions).forEach(rid => {
      const resolution: ResolutionData = resolutions[rid];

      const amendments = resolution.amendments || {} as Dictionary<AmendmentData, AmendmentData>;

      Object.keys(amendments).map(aid => amendments[aid]).forEach((amendment: AmendmentData) => {
        if (amendment.proposer === member.name) { // I fucked up and used name in SpeakerEvent, not MemberID
          amendmentProposals += 1;
        }
      }
      );
    });

    return { times, duration, motionProposals, amendmentProposals };
  }

  renderCommittee = (committee: CommitteeData) => {
    const { memberStats } = this;

    const members = committee.members || {} as Dictionary<MemberID, MemberData>;

    const rows = _.sortBy(
      Object.keys(members),
      (mid) => memberStats(committee, mid, members[mid]).times
    ).reverse().map(mid => {
      const member = members[mid];
      const stats = memberStats(committee, mid, member);

      return (
        <Table.Row key={mid} >
          <Table.Cell>
            <Flag name={parseFlagName(member.name)} />
            {member.name}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {stats.times}
          </Table.Cell>
          <Table.Cell textAlign="right">
            {hhmmss(stats.duration)}
          </Table.Cell>
        </Table.Row>
      );
    });

    return (
      <Container text style={{ padding: '1em 0em' }}>
        <Table compact celled definition>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell textAlign="right">Times Spoken</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Total Speaking Time</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {rows}
          </Table.Body>
        </Table>
      </Container>
    );
  }

  render() {
    const { committee } = this.state;

    if (committee) {
      return this.renderCommittee(committee);
    } else {
      return <Loading />;
    }
  }
}
