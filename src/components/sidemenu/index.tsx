/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC } from 'react';
import { jsx } from '@emotion/core';
import { useHistory } from 'react-router';
import { Sidebar, Item } from 'semantic-ui-react';

const SideMenu: FC = () => {
  const history = useHistory();

  return (
    <Sidebar animation="push" direction="left" icon="labeled" inverted vertical visible menu>
      <Item as="a" onClick={() => history.push('/')}>
        HOME
      </Item>
      <Item as="a" onClick={() => history.push('/github')}>
        GitHub API
      </Item>
      <Item as="a" onClick={() => history.push('/todo')}>
        TODO List
      </Item>
      <Item as="a" onClick={() => history.push('/chat')}>
        Chat App
      </Item>
      <Item as="a" onClick={() => history.push('/logout')}>
        Logout
      </Item>
    </Sidebar>
  );
};

export default SideMenu;
