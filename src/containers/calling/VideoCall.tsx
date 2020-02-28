/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useEffect, SyntheticEvent } from 'react';
import { jsx } from '@emotion/core';
import { useSelector, useDispatch } from 'react-redux';

import { callActions, waitCallingActions } from 'actions/calling';
import VideoCall from 'components/calling/VideoCall';
import { StoreType } from 'store';
import { CallingState } from 'reducers/calling';

const VideoCallContainer: FC = () => {
  const callingState = useSelector<StoreType, CallingState>(state => state.calling);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(waitCallingActions.start());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: SyntheticEvent, remotePeerId: string) => {
    e.preventDefault();
    dispatch(callActions.start(remotePeerId));
  };

  return (
    <VideoCall
      myPeerId={callingState.peerId}
      isJoining={callingState.isJoining}
      localStream={callingState.localStream}
      remoteStream={callingState.remoteStream}
      handleSubmit={handleSubmit}
      handleOnLeaveClick={() => dispatch(callActions.stop())}
    />
  );
};

export default VideoCallContainer;
