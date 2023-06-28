import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactPlayer from 'react-player';

export default function CreateStream() {
  const [url, setUrl] = React.useState("http://51.159.156.14/hls/test_src.m3u8");

  const changeQuality = (quality : string) => {setUrl(url.split('_')[0]+quality+'.m3u8');}

  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          Watch page
        </div>
        <div>
          <form>
            <label>Enter the livestream url :
              <input
                type="text"
                value={url}
                onChange={(i) => setUrl(i.target.value)}
              />
            </label>
          </form>
        </div>
        <div>
            <button onClick={() => changeQuality('_low')}>Low</button>
            <button onClick={() => changeQuality('_mid')}>Medium</button>
            <button onClick={() => changeQuality('_high')}>High</button>
            <button onClick={() => changeQuality('_hd720')}>HD</button>
        </div>
        <div>
          <ReactPlayer url={url} playing controls config={{file:{forceHLS:true}}} />
        </div>
      </main>
    </>
  );
}
