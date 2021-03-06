/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable jsx-a11y/media-has-caption */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC, useState, useEffect, useRef, SyntheticEvent } from 'react';
import { css, jsx } from '@emotion/core';
import { Helmet } from 'react-helmet';
import { Header, Segment, Button, Input, Grid, Divider, Icon, Label } from 'semantic-ui-react';

import { menuHeader } from 'components/common/heading';

const wrapper = css`
  margin: 2em 1em;
`;
const form = css`
  margin: 2em 0 4em;
  text-align: center;
`;
const input = css`
  margin: 0.5em;
  width: 30em;
`;
const videoCss = css`
  /* text-align: center; */
`;

interface VideoCallProps {
  myPeerId: string;
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  isJoining: boolean;
  handleSubmit: (e: SyntheticEvent, remotePeerId: string) => void;
  handleOnLeaveClick: () => void;
}

const VideoCall: FC<VideoCallProps> = ({
  myPeerId = 'peerIdExample',
  localStream,
  remoteStream,
  handleSubmit,
  handleOnLeaveClick,
}) => {
  const [remotePeerId, setRemotePeerId] = useState('');

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const localVideoNode: any = localVideoRef.current;
    if (localVideoNode !== null) {
      localVideoNode.srcObject = localStream;
      localVideoNode.play();
    }

    const remoteVideoNode: any = remoteVideoRef.current;
    if (remoteVideoNode !== null) {
      remoteVideoNode.srcObject = remoteStream;
      remoteVideoNode.play();
    }
  }, [localStream, remoteStream]);

  const handleChange = (value: string) => setRemotePeerId(value);

  return (
    <div>
      <Helmet>
        <title>Peer to Peer</title>
      </Helmet>
      <div css={wrapper}>
        <Header css={menuHeader} as="h2">
          Video Call
        </Header>
        <div>
          <form css={form} onSubmit={(e: SyntheticEvent) => handleSubmit(e, remotePeerId)}>
            <Input
              placeholder="Remote Peer ID"
              type="text"
              onChange={(event, data) => handleChange(data.value)}
              value={remotePeerId}
              css={input}
            />
            <Button type="submit" disabled={!remotePeerId.length} primary>
              Call
            </Button>
          </form>
          <Segment placeholder>
            <Grid columns="2" relaxed="very" stackable>
              <Grid.Column>
                <Label color="teal">My Peer ID: {myPeerId}</Label>
                <video css={videoCss} ref={localVideoRef} playsInline width="550" />
                <Button type="button" primary onClick={handleOnLeaveClick}>
                  Leave
                </Button>
              </Grid.Column>
              <Grid.Column>
                <video css={videoCss} ref={remoteVideoRef} playsInline width="550" />
              </Grid.Column>
            </Grid>
            <Divider vertical>
              <Icon name="call" />
            </Divider>
          </Segment>
        </div>
      </div>
    </div>
  );
};

export default VideoCall;
