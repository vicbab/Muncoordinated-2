import * as React from 'react';
import { Button, Segment, Header, List, Container } from 'semantic-ui-react';
import { CLIENT_VERSION_LINK } from './Footer';

export const KEYBOARD_SHORTCUT_LIST = (
  <List>
    <List.Item>
      <Button size="mini">
        Alt
      </Button>
      <Button size="mini">
        N
      </Button>
      Next Speaker
    </List.Item>
    <List.Item>
      <Button size="mini">
        Alt
      </Button>
      <Button size="mini">
        S
      </Button>
      Toggle Speaker Timer
    </List.Item>
    <List.Item>
      <Button size="mini">
        Alt
      </Button>
      <Button size="mini">
        C
      </Button>
      Toggle Caucus Timer
    </List.Item>
  </List>
);

export default class Help extends React.PureComponent<{}, {}> {
  gpl = ( 
    <a href="https://github.com/MaxwellBo/Muncoordinated-2/blob/master/LICENSE">
      GNU AGPLv3
    </a>
  );

  render() {
    const { gpl } = this;

    return (
      <Container text style={{ padding: '1em 0em' }}>
        <Header as="h3" attached="top">Keyboard Shortcuts</Header>
        <Segment attached="bottom">
        {KEYBOARD_SHORTCUT_LIST}
        </Segment>
        <Header as="h3" attached="top">Bug Reporting &amp; Help Requests</Header>
        <Segment attached="bottom">
          In the event that a bug or issue crops up, follow these steps:
          <br />
          <List ordered>
            <List.Item>
              Create an issue on the <a href="https://github.com/MaxwellBo/Muncoordinated-2/issues">
                Muncoordinated issue tracking page
              </a>. You can also use this for help requests regarding the apps usage
            </List.Item>
            <List.Item>
              Describe what you intended to do
            </List.Item>
            <List.Item>
              Describe what happened instead 
            </List.Item>
            <List.Item>
              List the version of the app you're using ({CLIENT_VERSION_LINK})
            </List.Item>
            <List.Item>
              List the time, date, and browser that you were using when this occured
            </List.Item>
          </List>
          <br />
          If you're at an Australian MUN, I'll see if I can push a fix within the hour.
        </Segment>
        <Header as="h3" attached="top">License</Header>
        <Segment attached="bottom">
          Muncoordinated is licensed under {gpl}
        </Segment>
      </Container>
    );
  }
}
