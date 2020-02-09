/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { jsx } from '@emotion/core';
import { Segment, Header, Icon, List } from 'semantic-ui-react';

const Home: FC = () => (
  <div>
    <Segment placeholder>
      <Header icon>
        <Icon name="react" />
        React (Create React App), Redux, Redux-Saga, TypeScript による学習用アプリです。
      </Header>
      <Segment.Inline>
        <List divided relaxed>
          <List.Item>
            <List.Icon name="github" size="large" verticalAlign="middle" />
            <List.Content>
              <List.Header as="a" href="https://github.com/sitogi/ReactStudyApp">
                sitogi/ReactStudyApp
              </List.Header>
            </List.Content>
          </List.Item>
        </List>
      </Segment.Inline>
    </Segment>
  </div>
);

export default Home;
