import type { NextPage } from 'next'
import Head from 'next/head'
import Header from './component/Header'
import Footer from './component/Footer'
import MyApp from './_app'
import App from './App'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>household_accounts</title>
        <meta name="description" content="練習で作った家計簿アプリです" />
      </Head>
      <Header />
      <App />
      <Footer />
    </>
  )
}

export default Home
