export function TagPreview({ tag }) {
  const { color } = tag;
  return (
    <section className='tag-preview'>
      <div className='tag-card' style={{ backgroundColor: '#' + color + 'cc' }}>
        <h3> {tag.name}</h3>
        <img src={tag.imgUrl} />
      </div>
    </section>
  );
}
