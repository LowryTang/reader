import React, { Component } from 'react'
import ChaperItem from './ChaperItem.js'

export default class ChaperList extends Component {
  static defaultProps = {
    data: {}
  }

  render() {
    const { data } = this.props;
    if (data.chapters && data.chapters.length) {
      let chapters = data.chapters;
      return (
        <div>
          <h4>章节列表</h4>
          <ul className="list-inline">
            {chapters.map((item, index) => {
              return (<ChaperItem item={item} key={index}/>);
            })}
          </ul>
        </div>
      );
    };
    return (
      <div>Loading...</div>
    );
  }
}
