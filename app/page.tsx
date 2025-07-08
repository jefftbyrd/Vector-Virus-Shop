// import Image from 'next/image';
// import styles from './page.module.css';
import Featured from './components/Featured';
// import NewArrivals from './NewArrivals';
import News from './components/News';

export default function Home() {
  return (
    <div className="">
      <div className="giantVector">
        <h1>Vector</h1>
        <h2>The virus shop</h2>
        <img src="viruses/adenovirus-home.webp" alt="Vector, the virus shop" />
      </div>
      <Featured />
      <News />
    </div>
  );
}
