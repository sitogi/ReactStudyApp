/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from 'react';
import { jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';

const HtmlTitle: FC<{ title: string }> = ({ title = '' }) =>
  title ? (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  ) : (
    <div />
  );

export default HtmlTitle;
