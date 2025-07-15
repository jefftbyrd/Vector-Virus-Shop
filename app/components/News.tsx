// import Image from 'next/image';
// import Link from 'next/link';

export default function News() {
  return (
    <div className="pt-5">
      <h2 className="special">Latest News</h2>

      <div className="news">
        <div className="newsItems">
          <a href="/">
            <div className="item">
              <div
                className="itemImage"
                style={{ backgroundImage: `url('/news/spread.webp')` }}
              >
                <span>Tips</span>
              </div>
              <div className="itemContent">
                <h3>Innovative techniques for spreading viruses</h3>
              </div>
            </div>
          </a>
          <a href="/">
            <div className="item">
              <div
                className="itemImage"
                style={{ backgroundImage: `url('/news/hobbies.webp')` }}
              >
                <span>Trends</span>
              </div>
              <div className="itemContent">
                <h3>Virus-collecting as a hobby</h3>
                {/* <h4>Virus-collecting as a hobby</h4> */}
              </div>
            </div>
          </a>
          <a href="/">
            <div className="item">
              <div
                className="itemImage"
                style={{ backgroundImage: `url('/news/bioweapons.webp')` }}
              >
                <span>Guide</span>
              </div>
              <div className="itemContent">
                <h3>How to use our products</h3>
                {/* <h4>From education to biological warfare</h4> */}
              </div>
            </div>
          </a>
          <a href="/">
            <div className="item">
              <div
                className="itemImage"
                style={{ backgroundImage: `url('/news/kids.webp')` }}
              >
                <span>News</span>
              </div>
              <div className="itemContent">
                <h3>Kids love viruses too!</h3>
              </div>
            </div>
          </a>
          <a href="/">
            <div className="item">
              <div
                className="itemImage"
                style={{ backgroundImage: `url('/news/economy.webp')` }}
              >
                <span>Report</span>
              </div>
              <div className="itemContent">
                <h3>Ethics Report: The new virus economy</h3>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
