import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'

const inter = Inter({subsets: ['latin']})

export default function Home() {
  return (
    <>
      <Head>
        <title>POC OctoCast</title>
        <meta name="description" content="POC for octocast streaming"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <div>
            <a
              href="https://www.octo.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              By{' '}
              <Image
                src="/octo-logo.png"
                alt="Octo Logo"
                className={styles.octoLogo}
                width={120}
                height={40}
                priority
              />
            </a>
          </div>
        </div>

        <div className={styles.title}>
          <h1 className={inter.className}>Welcome to OctoCast</h1>
        </div>

        <div className={styles.center}>
          <Link
            href="/create/"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Go Live <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Create a new stream.
            </p>
          </Link>


          <Link
            href="/watch/"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Watch Stream <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Connect to the current stream.
            </p>
          </Link>
        </div>
      </main>
    </>
  )
}
