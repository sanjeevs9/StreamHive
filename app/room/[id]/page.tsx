'use client';

import {
  ControlBar,
  GridLayout,
  LiveKitRoom,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
} from '@livekit/components-react';

import '@livekit/components-styles';

import { useEffect, useState } from 'react';
import { Track } from 'livekit-client';
import { transcode } from 'buffer';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';

type user={
    name:string,
}

export default function Page() {
  const session=useSession();
  const router=useRouter();
const token =localStorage.getItem("token")
  const [user,setUser]=useState<user>();

 
  // TODO: get user input for room and name
  const params =useParams();
  const room=params.id;
  
  // console.log(process.env.NEXT_PUBLIC_LIVEKIT_URL)
  
  // useEffect(() => {
  //     if(session.status!=='authenticated'){
  //         return;
  //       }
        
  //       if(!room){
  //           console.log("please provide a valid roomId")
  //           return;
  //       }
  //       const name = session.data.user?.name;


         
        
  //   (async () => {
  //     try {
  //       const resp = await fetch(`/api/get-participant-token?room=${room}&username=${name}`);
  //       const data = await resp.json();
  //       setToken(data.token);
        

  //     } catch (e) {
  //       console.error(e);
  //     }
  //   })();
  // }, [session.status]);

  // if(session.status==="loading"){
  //   return <div>loading....</div>
  // }
  // if(session.status==="unauthenticated"){
  //   router.push("/api/auth/signin")
  //   return null
  // }

  if (!token) {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      // Use the default LiveKit theme for nice styles.
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      {/* Your custom component with basic video conferencing functionality. */}
      <MyVideoConference />
      {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
      <RoomAudioRenderer />
      {/* Controls for the user to start/stop audio, video, and screen
      share tracks and to leave the room. */}
      <ControlBar />
    </LiveKitRoom>
  );
}

function MyVideoConference() {
  // `useTracks` returns all camera and screen share tracks. If a user
  // joins without a published camera track, a placeholder track is returned.
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false },
  );
  // {console.log(tracks)}
  return (
    <GridLayout tracks={tracks} style={{ height: 'calc(100vh - var(--lk-control-bar-height))' }}>
        
      {/* The GridLayout accepts zero or one child. The child is used
      as a template to render all passed in tracks. */}
      <ParticipantTile />
    </GridLayout>
  );
}