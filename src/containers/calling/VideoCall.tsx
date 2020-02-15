/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { jsx } from '@emotion/core';

import { joinRoomActions, callActions, waitCallingActions } from 'actions/calling';
import VideoCall from 'components/calling/VideoCall';
import { StoreType } from 'store';

interface StateProps {
  isJoining: boolean;
  roomName: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
}

interface JoinRoomWithStreamParams {
  roomName: string;
  localStream: MediaStream;
}

interface DispatchProps {
  prepareCalling: () => void;
  startCall: (remotePeerId: string) => void;
  stopCall: () => void;
  joinRoomWithStream: (params: JoinRoomWithStreamParams) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: StoreType): StateProps => {
  return {
    isJoining: state.calling.isJoining,
    roomName: state.calling.roomName,
    localStream: state.calling.localStream,
    remoteStream: state.calling.remoteStream,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      prepareCalling: () => waitCallingActions.start(),
      startCall: remotePeerId => callActions.start(remotePeerId),
      stopCall: () => callActions.stop(),
      joinRoomWithStream: params => joinRoomActions.start(params),
    },
    dispatch,
  );

const VideoCallContainer: FC<EnhancedProps> = ({
  prepareCalling,
  startCall,
  isJoining,
  localStream,
  remoteStream,
  stopCall,
}) => {
  useEffect(() => {
    prepareCalling();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: SyntheticEvent, remotePeerId: string) => {
    e.preventDefault();
    startCall(remotePeerId);
  };

  const handleOnLeaveClick = () => {
    stopCall();
  };

  return (
    <VideoCall
      myPeerId="MyPeerId"
      isJoining={isJoining}
      localStream={localStream}
      remoteStream={remoteStream}
      handleSubmit={handleSubmit}
      handleOnLeaveClick={handleOnLeaveClick}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCallContainer);
