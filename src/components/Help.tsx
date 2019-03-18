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
      GNU GPLv3
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
          In the event that a bug/issue crops up, follow these steps:
          <br />
          <List ordered>
            <List.Item>
              Write to our official support email<a href="mailto:support@simunglobal.org">
                support@simunglobal.org
              </a>. You can also use this for help requests regarding the apps usage
            </List.Item>
            <List.Item>
              Describe what you intended to do
            </List.Item>
            <List.Item>
              Describe what happened instead 
            </List.Item>
            <List.Item>
              List the browser you are using, if possible
            </List.Item>
            <List.Item>
              List the time, date, and browser that you were using when this occured
            </List.Item>
          </List>
        </Segment>
        <Header as="h3" attached="top">License</Header>
        <Segment attached="bottom">
          This customized version of MUNcoordinated is hosted for the exclusive use at the South Indian Model United Nations under the {gpl}. The original project by Max Bo is available on Github.
        </Segment>
      </Container>
    );
  }
}
