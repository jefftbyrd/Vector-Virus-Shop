// import Image from 'next/image';
// import styles from './page.module.css';
import Featured from './Featured';
// import NewArrivals from './NewArrivals';
import News from './News';

export default function Home() {
  return (
    <div className="homePage">
      <div className="start">
        <div className="text">
          <h1>Vector</h1>
          <h2>The virus shop</h2>
        </div>
        <img src="viruses/adenovirus-home.webp" alt="Vector, the virus shop" />
      </div>
      <Featured />
      <News />
      {/* <NewArrivals /> */}
    </div>
  );
}
