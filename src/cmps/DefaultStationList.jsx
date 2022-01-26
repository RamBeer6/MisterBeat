import { StationPreview } from '../cmps/StationPreview';

export function DefaultStationList({ stations }) {
  stations.sort((s1, s2) => s2.likedByUsers?.length - s1.likedByUsers?.length);

  return (
    <section className='default-station-list'>
      <div className='section-station'>
        <div className='section-head'>
          <h2>Popular new releases</h2>
          <a>SEE ALL</a>
        </div>
        <div className='section-content'>
          {stations.map((station) => (
            <StationPreview key={station._id} station={station} />
          ))}
        </div>
        <a className='switchLeft sliderButton'> &lt; </a>
        <a className='switchRight sliderButton'> &gt; </a>
      </div>
    </section>
  );
}
