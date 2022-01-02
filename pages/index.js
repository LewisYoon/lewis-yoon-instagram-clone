import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";
import logo from "../images/logo.svg";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {/* header */}
      <Header />

      {/* feed */}
      <Feed />

      {/* modal */}
      <Modal />
    </div>
  );
}
