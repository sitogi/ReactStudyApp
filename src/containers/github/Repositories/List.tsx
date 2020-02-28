/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { jsx } from '@emotion/core';
import { useSelector } from 'react-redux';

import RepositoriesSearch from 'components/github/Repositories/List';
import { Repository } from 'services/github/models';
import { StoreType } from 'store';

const RepositoryListContainer: FC = () => {
  const repositories = useSelector<StoreType, Repository[]>(state => state.gitHub.repositories);
  const isLoading = useSelector<StoreType, boolean>(state => state.gitHub.isLoading);

  return <RepositoriesSearch repositories={repositories} isLoading={isLoading} />;
};

export default RepositoryListContainer;
