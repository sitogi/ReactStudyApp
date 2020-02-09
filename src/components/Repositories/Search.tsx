/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { css, jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { Header } from 'semantic-ui-react';

import RepositoryForm from 'containers/Repositories/Form';
import RepositoryList from 'containers/Repositories/List';
import pages from 'pages';
import { menuHeader } from 'components/common/heading';

const wrapper = css`
  margin: 2em 1em;
`;

const RepositorySearch: FC = () => (
  <div>
    <Helmet>
      <title>{pages.repositories.search.title}</title>
    </Helmet>
    <div css={wrapper}>
      <Header css={menuHeader} as="h2">
        {pages.repositories.search.title}
      </Header>
      <RepositoryForm />
      <RepositoryList />
    </div>
  </div>
);

export default RepositorySearch;
