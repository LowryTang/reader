import React, { Component } from 'react'
import Setting from './Setting.js'

export default class BookReader extends Component {

  static defaultProps = {
    chapter: {},
    content: ""
  }

  render() {
    let { chapter, content } = this.props;
    content = content.split("\n");

    return (
      <div>
        <div className="chapter-container">
          <Setting />
          <div className="chapter-title">{chapter.title}</div>
          <div className="chapter-content">
            {content.map((item, i) => {
              return (<p key={i}>{item}</p>);
            })}
          </div>
        </div>
      </div>
    );
  }
}
