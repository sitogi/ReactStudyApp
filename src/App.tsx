/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { Route, Switch, useHistory } from 'react-router';
import { Menu, Sidebar, Segment } from 'semantic-ui-react';

import pages from 'pages';
import Home from 'components/Home';
import Companies from 'components/Companies';
import CompanyMembers from 'containers/Companies/Members';
import RepositorySearch from 'components/Repositories/Search';

const baseCss = css`
  height: 100vh;
`;

const mainView = css`
  margin: auto;
  max-width: 1000px;
`;

const appHeader = css`
  background-color: #222;
  color: white;
  margin-bottom: 4em;
  padding: 20px;
  text-align: center;
`;
const title = 'GitHub API デモアプリ';

const VerticalSidebar: FC = () => {
  const history = useHistory();

  return (
    <Sidebar as={Menu} animation="push" direction="left" icon="labeled" inverted vertical visible width="thin">
      <Menu.Item as="a" onClick={() => history.push('/')}>
        Home
      </Menu.Item>
      <Menu.Item as="a" onClick={() => history.push('/settings')}>
        Settings
      </Menu.Item>
      <Menu.Item as="a" onClick={() => history.push('/account')}>
        Account
      </Menu.Item>
      <Menu.Item as="a" onClick={() => history.push('/support')}>
        Support
      </Menu.Item>
      <Menu.Item as="a" onClick={() => history.push('/logout')}>
        Logout
      </Menu.Item>
    </Sidebar>
  );
};

const App: FC = () => (
  <div css={baseCss}>
    <Sidebar.Pushable as={Segment}>
      <VerticalSidebar />

      <Sidebar.Pusher>
        <Segment basic>
          <div css={mainView}>
            <Helmet htmlAttributes={{ lang: 'ja' }}>
              <title>{title}</title>
            </Helmet>

            <header css={appHeader}>
              <h1>{title}</h1>
            </header>
            <Switch>
              <Route path="/" component={Home} exact />
              <Route path={pages.companies.members.path} component={CompanyMembers} />
              <Route path={pages.companies.index.path} component={Companies} />
              <Route path={pages.repositories.search.path} component={RepositorySearch} />
            </Switch>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

export default App;
