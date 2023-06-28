import React from 'react';

import styles from '@/styles/Home.module.css' 

//Custom type for settings
type Settings = {
  format: string,
  video: string,
  audio: string
}


const getRecorderSettings = () => {
  const settings : Settings = {format: '', video: '', audio: ''};
  if (MediaRecorder.isTypeSupported('video/mp4')) {
    settings.format = 'mp4';
    settings.video = 'h264';
    settings.audio = 'aac';
  } else {
    settings.format = 'webm';
    settings.audio = 'opus';
    settings.video = MediaRecorder.isTypeSupported('video/webm;codecs=h264') ? 'h264' : 'vp8';
  }
  return settings;
}

const getRecorderMimeType = () => {
  const settings = getRecorderSettings();
  const codecs = settings.format === 'webm' ? `;codecs="${settings.video}, ${settings.audio}"` : '';
  return `video/${settings.format}${codecs}`;
}

export default function CreateStream() {

  const canvasRef = React.useRef<HTMLCanvasElement>();
  const videoRef = React.useRef<HTMLVideoElement>();
  const requestAnimationRef = React.useRef();

  const [preview, setPreview]= React.useState(false);
  const [streaming, setStreaming] = React.useState(false);
  const [wsConnected, setWsConnected] = React.useState(false);
  const [tmp, setWsURL] = React.useState('ws://localhost:8081/rtmp/');


  const previewStream = async (): Promise<void> => {
    //GET SCREEN INPUT
    //const screenInput = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    //videoRef.current.srcObject = screenInput;
    //GET CAMERA INPUT
    const cameraInput = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = cameraInput;

    await videoRef.current.play();
    setPreview(true);
    requestAnimationRef.current = requestAnimationFrame(updateCanva);
  }

  const updateCanva = () : void => {
    if(videoRef.current?.ended || videoRef.current?.paused) return;
    canvasRef.current.height = videoRef.current?.clientHeight;
    canvasRef.current.width = videoRef.current?.clientWidth;

    const ctx = canvasRef.current?.getContext('2d');
    ctx?.drawImage(
      videoRef.current,
      0,
      0,
      videoRef.current?.clientWidth,
      videoRef.current?.clientHeight
    );
    requestAnimationRef.current = requestAnimationFrame(updateCanva);

  }

  const stopStreaming = (): void => {
    setPreview(false);
    setStreaming(false);
  }

  const startStreaming = (): void => {
    setStreaming(true);
    const settings : Settings = getRecorderSettings();
    const protocol = window.location.protocol.replace('http', 'ws');
    const wsUrl = new URL(`${protocol}//localhost:8081/rtmp`); //${window.location.host}
    console.log(wsUrl);
    wsUrl.searchParams.set('video', settings.video);
    wsUrl.searchParams.set('audio', settings.audio);
    wsUrl.searchParams.set('url', 'rtmp://78.199.86.149/live');
    wsUrl.searchParams.set('key', 'test');
    const ws = new WebSocket(wsUrl);

    ws.addEventListener('open', () => {
      setWsConnected(true);
      console.log('Webscket connected!');
      
    });

    ws.addEventListener('close', () => {
      setWsConnected(false);
      stopStreaming();
      console.log('Websocket ddisconnected');
      
    })

    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const mediaStream = canvas.captureStream(30);
    const mediaRecorder = new MediaRecorder(mediaStream,{mimeType: getRecorderMimeType(),videoBitsPerSecond: 3000000});
    
    mediaRecorder.addEventListener('dataavailable', event => {ws.send(event.data);console.log('data sent');});
    mediaRecorder.addEventListener('stop', () => {console.log('mediarecorder stop');})
    setStreaming(true);
    mediaRecorder.start(1000);
  }

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          Create stream page
          <form>
            <label>Enter the websocket url :
              <input
                type="text"
                value={tmp}
                onChange={(i) => setWsURL(i.target.value)}
              />
            </label>
          </form>
        </div>
        <video ref={videoRef} id='video'/>
        <canvas ref={canvasRef} id='canvas'></canvas>
        {preview ? 
        <>
          <button onClick={previewStream}>Change screen</button>
          <button onClick={startStreaming}>Start Streaming</button>
        </>
        :
        <button onClick={previewStream}>Preview Streaming</button>
        }
        
      </main>
    </>
  );
}
