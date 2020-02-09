/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { Route, Switch } from 'react-router';
import { Sidebar, Segment } from 'semantic-ui-react';

import pages from 'pages';
import Home from 'components/home';
import SideMenu from 'components/sidemenu';
import GitHubHome from 'components/github';
import Companies from 'components/github/Companies';
import RepositorySearch from 'components/github/Repositories/Search';
import CompanyMembers from 'containers/github/Companies/Members';

const baseCss = css`
  height: 100vh;
`;

const mainView = css`
  margin: auto;
  max-width: 1200px;
`;

const appHeader = css`
  background-color: #222;
  color: white;
  margin-bottom: 4em;
  padding: 20px;
  text-align: center;
`;
const title = 'App for React Study';

const App: FC = () => (
  <div css={baseCss}>
    <Sidebar.Pushable as={Segment}>
      <SideMenu />

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
              <Route exact path="/" component={Home} />
              <Route exact path="/github" component={GitHubHome} />
              <Route path={pages.gitHubCompanies.members.path} component={CompanyMembers} />
              <Route path={pages.gitHubCompanies.index.path} component={Companies} />
              <Route path={pages.gitHubRepositories.search.path} component={RepositorySearch} />
            </Switch>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);

export default App;
