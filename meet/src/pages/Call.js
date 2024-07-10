import React, { useState, useRef } from 'react';
import {useNavigate} from 'react-router-dom';

const Call = () => {
  const navigate = useNavigate();
  // controls if media input is on or off
  const [playing, setPlaying] = useState(false);

  // controls the current stream value
  const [stream, setStream] = useState(null);
  
  // controls if audio/video is on or off (seperately from each other)
  const [audio, setAudio] = useState(true);
  const [video, setVideo] = useState(true);

  // controls the video DOM element
  const webcamVideo = useRef();

  // get the user's media stream
  const startStream = async () => {
      let newStream = await navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true,
        })
        .then((newStream) => {
          webcamVideo.current.srcObject = newStream;
          setStream(newStream);
        });

      setPlaying(true);
  };

  // stops the user's media stream
  const stopStream = () => {
      stream.getTracks().forEach((track) => track.stop());

      setPlaying(false);
  };
  
  // enable/disable audio tracks in the media stream
  const toggleAudio = () => {
      setAudio(!audio);
      stream.getAudioTracks()[0].enabled = audio;
  };

  // enable/disable video tracks in the media stream
  const toggleVideo = () => {
      setVideo(!video);
      stream.getVideoTracks()[0].enabled = !video;
  };

  return (
    <>
      <div class="flex flex-row space-x-2 fixed left-4 top-4">
        <button
            class="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={() => {navigate("/")}}>
          Sair
        </button>
        <>
          <h1>Call ID: {sessionStorage.getItem("callId")}</h1>
          <h1>Username: {sessionStorage.getItem("userName")}</h1>
        </>
      </div>
      <div className="container">
        <video class="fixed bottom-4 right-4 max-w-64" ref={webcamVideo} autoPlay playsInline></video>
        <div class="flex flex-row space-x-4 mx-4 fixed bottom-4">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
            onClick={playing ? stopStream : startStream}>
              Iniciar webcam
          </button>
          {playing ?
            <>
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={toggleAudio}>Habilitar Som</button>
              <button class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5" onClick={toggleVideo}>Habilitar Video</button>
            </>
            :
            null
          }
        </div>
      </div>
    </>
  );
}

export default Call;