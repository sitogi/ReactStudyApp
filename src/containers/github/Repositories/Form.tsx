/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, FormEvent, SyntheticEvent, useState } from 'react';
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import RepositoryForm, { RepositoryFormValues } from 'components/github/Repositories/Form';
import { searchRepositories } from 'actions/github';
import { StoreType } from 'store';

const RepositoryFormContainer: FC = () => {
  const isLoading = useSelector<StoreType, boolean>(state => state.gitHub.isLoading);
  const dispatch = useDispatch();
  const [values, setValues] = useState<RepositoryFormValues>({
    q: '',
  });

  const handleChange = (targetName: string, newValue: string, event?: SyntheticEvent) => {
    if (event) {
      event.persist();
    }

    setValues(v => ({ ...v, [targetName]: newValue }));
    const newValues = { ...values, [targetName]: newValue };

    if (!!values.q.trim() && targetName === 'sort') {
      dispatch(searchRepositories.start(newValues));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
      dispatch(searchRepositories.start(values));
    }
  };

  return (
    <RepositoryForm handleChange={handleChange} handleSubmit={handleSubmit} values={values} isLoading={isLoading} />
  );
};

export default RepositoryFormContainer;
