/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { useParams } from 'react-router';
import { jsx } from '@emotion/core';

import CompanyMembers, { CompanyMembersProps } from 'components/Companies/Members';
import { User } from 'services/github/models';
import { GithubState } from 'reducer';
import { getMembers, GetMembersParams } from 'actions/github';

interface StateProps {
  users: User[];
  isLoading?: boolean;
}

interface DispatchProps {
  getMembersStart: (params: GetMembersParams) => void;
}

type EnhancedCompanyMembersProps = CompanyMembersProps & StateProps & DispatchProps;

const mapStateToProps = (state: GithubState): StateProps => ({
  users: state.users,
  isLoading: state.isLoading,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      getMembersStart: params => getMembers.start(params),
    },
    dispatch,
  );

const CompanyMembersContainer: FC<EnhancedCompanyMembersProps> = ({ users, isLoading, getMembersStart }) => {
  const { companyName } = useParams<{ companyName: string }>();

  useEffect(() => {
    getMembersStart({ companyName });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <CompanyMembers companyName={companyName} users={users} isLoading={isLoading} />;
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyMembersContainer);
