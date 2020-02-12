/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useEffect, useState, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { jsx } from '@emotion/core';

import { joinRoomActions, callActions, waitCallingActions } from 'actions/calling';
import { CallingState } from 'reducers/calling';
import VideoCall from 'components/calling/VideoCall';

interface StateProps {
  isJoining: boolean;
  roomName: string;
  remoteStream?: MediaStream;
}

interface JoinRoomWithStreamParams {
  roomName: string;
  localStream: MediaStream;
}

interface DispatchProps {
  prepareCalling: () => void;
  startCall: (localStream: MediaStream, remotePeerId: string) => void;
  joinRoomWithStream: (params: JoinRoomWithStreamParams) => void;
}

type EnhancedProps = StateProps & DispatchProps;

const mapStateToProps = (state: CallingState): StateProps => ({
  isJoining: state.isJoining,
  roomName: state.roomName,
  remoteStream: state.remoteStream,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators(
    {
      prepareCalling: () => waitCallingActions.start(),
      startCall: (remotePeerId, localStream) => callActions.start(remotePeerId, localStream),
      joinRoomWithStream: params => joinRoomActions.start(params),
    },
    dispatch,
  );

const VideoCallContainer: FC<EnhancedProps> = ({
  prepareCalling,
  startCall,
  isJoining,
  joinRoomWithStream,
  remoteStream,
  roomName,
}) => {
  const [localStream, setLocalStream] = useState();

  useEffect(() => {
    prepareCalling();
    const { mediaDevices }: any = navigator; // eslint-disable-line @typescript-eslint/no-explicit-any
    mediaDevices.getDisplayMedia().then((stream: MediaStream) => {
      setLocalStream(stream);
    });
    if (isJoining) {
      joinRoomWithStream({ roomName, localStream });
    }
  }, [isJoining]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSubmit = (e: SyntheticEvent, remotePeerId: string) => {
    e.preventDefault();
    console.log('startCall yobmisuyo');
    startCall(localStream, remotePeerId);
  };

  return (
    <VideoCall
      myPeerId="MyPeerId"
      isJoining={isJoining}
      localStream={localStream}
      remoteStream={remoteStream}
      handleSubmit={handleSubmit}
    />
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCallContainer);
