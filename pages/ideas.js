import Head from 'next/head'
import { useState } from 'react'
import styles from './index.module.css'

export default function Ideas() {
  const [result, setResult] = useState()

  async function onSubmit(event) {
    event.preventDefault()
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        )
      }

      setResult(data.result)
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel='icon' href='/dog.png' />
      </Head>

      <main className={styles.main}>
        <img src='/dog.png' className={styles.icon} />
        <h3>Ideas on steroids</h3>
        <form onSubmit={onSubmit}>
          <input type='submit' value='Generate idea' />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  )
}