import styles from '@/styles/Home.module.css' 
import { createFFmpeg } from '@ffmpeg/ffmpeg';

export default function CreateStream() {
  const ffmpeg = createFFmpeg({log: true});

  async function startStreaming(): Promise<void> {
    const stream = await navigator.mediaDevices.getDisplayMedia({ audio: true, video: true });
    const video = document.getElementById("video") as HTMLVideoElement;
    video.srcObject = stream;
    await video.play();
    await ffmpeg.load();
    ffmpeg.FS("writeFile", "screen.mp4", await fetchFile(stream));
    await ffmpeg.run("-i", "screen.mp4", "-f", "flv", "rtmp://78.199.86.149:1935/live/test");
  }
  
  function fetchFile(stream: MediaStream): Promise<Uint8Array> {
    return new Promise((resolve) => {
      const chunks: Blob[] = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: chunks[0].type });
        const reader = new FileReader();
        reader.onload = () => {
          const arrayBuffer = reader.result as ArrayBuffer;
          const uint8Array = new Uint8Array(arrayBuffer);
          resolve(uint8Array);
        };
        reader.readAsArrayBuffer(blob);
      };
      setTimeout(() => {
        mediaRecorder.stop();
      }, 10000);
      mediaRecorder.start();
    });
  }


  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          Create stream page
        </div>
        <video id='video'/>
        <button onClick={() => startStreaming()}>Start Streaming</button>
      </main>
    </>
  );
}
