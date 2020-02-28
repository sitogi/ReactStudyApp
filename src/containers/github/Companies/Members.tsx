/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router';
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import CompanyMembers, { CompanyMembersProps } from 'components/github/Companies/Members';
import { getMembers } from 'actions/github';
import { StoreType } from 'store';
import { GithubState } from 'reducers/github';

const CompanyMembersContainer: FC<CompanyMembersProps> = () => {
  const { companyName } = useParams<{ companyName: string }>();
  const gitHubState = useSelector<StoreType, GithubState>(state => state.gitHub);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMembers.start({ companyName }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <CompanyMembers companyName={companyName} users={gitHubState.users} isLoading={gitHubState.isLoading} />;
};

export default CompanyMembersContainer;
