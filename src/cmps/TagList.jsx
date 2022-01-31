import React from 'react';
import { stationService } from '../services/station.service';
import { TagPreview } from './TagPreview';

export class TagList extends React.Component {
  state = {
    tags: [],
  };

  componentDidMount() {
    this.loadTags();
  }

  loadTags = async () => {
    try {
      const tags = await stationService.getTags();
      this.setState((prevState) => ({ ...prevState, tags }));
    } catch (err) {
      console.error('Could not get tags', err);
    }
  };
  render() {
    const { tags } = this.state;
    return (
      <section className='tag-list'>
        <div className='cards-container'>
          {tags.map((tag, idx) => {
            return <TagPreview key={idx} tag={tag} />;
          })}
        </div>
      </section>
    );
  }
}
