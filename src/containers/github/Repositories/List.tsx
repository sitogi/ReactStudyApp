/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { connect } from 'react-redux';
import { jsx } from '@emotion/core';

import RepositoriesSearch, { RepositoryListProps } from 'components/github/Repositories/List';
import { Repository } from 'services/github/models';
import { GithubState } from 'reducers/github';

interface StateProps {
  repositories: Repository[];
  isLoading: boolean;
}

type EnhancedRepositoryListProps = RepositoryListProps & StateProps;

const mapStateToProps = (state: GithubState): StateProps => ({
  repositories: state.repositories,
  isLoading: state.isLoading,
});

const RepositoryListContainer: FC<EnhancedRepositoryListProps> = ({ repositories, isLoading }) => (
  <RepositoriesSearch repositories={repositories} isLoading={isLoading} />
);

export default connect(mapStateToProps)(RepositoryListContainer);
