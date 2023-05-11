import styles from '@/styles/Home.module.css'
import React from 'react';
import ReactPlayer from 'react-player';

export default function CreateStream() {
  return (
    <>
      <main className={styles.main}>
        <div className={styles.description}>
          Watch page
        </div>
        <ReactPlayer url="http://78.199.86.149/hls/test.m3u8" playing controls />
      </main>
    </>
  );
}
