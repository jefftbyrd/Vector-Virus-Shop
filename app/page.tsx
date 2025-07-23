import Featured from './components/Featured';
import News from './components/News';

export default function Home() {
  return (
    <div className="pt-[40vw] sm:pt-0">
      <Featured />
      <News />
    </div>
  );
}
