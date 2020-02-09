/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router';
import { Sidebar, Item, Menu, Icon } from 'semantic-ui-react';

const SideMenu: FC = () => {
  const history = useHistory();

  return (
    <Sidebar as={Menu} animation="overlay" direction="left" inverted vertical visible width="thin" icon="labeled">
      <Item as="a" onClick={() => history.push('/')}>
        <Icon name="home" /> HOME
      </Item>
      <Item as="a" onClick={() => history.push('/github')}>
        <Icon name="github" /> GitHub API
      </Item>
      <Item as="a" onClick={() => history.push('/todo')}>
        <Icon name="list" /> TODO List
      </Item>
      <Item as="a" onClick={() => history.push('/chat')}>
        <Icon name="comments outline" /> Chat App
      </Item>
      <Item as="a" onClick={() => history.push('/videoCall')}>
        <Icon name="video" /> Video call
      </Item>
      <Item as="a" onClick={() => history.push('/todo')}>
        <Icon name="calendar outline" /> Calender
      </Item>
      <Item as="a" onClick={() => history.push('/chat')}>
        <Icon name="clock outline" /> World Time
      </Item>
      <Item as="a" onClick={() => history.push('/logout')}>
        <Icon name="log out" /> Logout
      </Item>
    </Sidebar>
  );
};

export default SideMenu;
