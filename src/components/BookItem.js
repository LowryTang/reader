import React, { Component } from 'react'
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap'

export default class BookItem extends Component {
  static defaultProps = {
    data: {},
    openBookOveriew: function() {}
  }

  render() {
    const { data } = this.props;
    return (
      <Col lg={6}>
        <div className="book-item">
          <div className="cover">
            <img width="120" height="150" src={data.cover && data.cover.replace('/agent/', '')}/>
          </div>
          <div className="book-desc">
            <div className="title" onClick={this.props.openBookOveriew.bind(this, data)}>{data.title}</div>
            <div className="type">
              作者: <span>{data.author}</span>
              类型: <span>{data.cat}</span>
            </div>
            <div className="short-intro">{data.shortIntro}</div>
            <div className="last-chapter">
              最新更新: <span>{data.lastChapter}</span>
            </div>
          </div>
        </div>
      </Col>
    );
  }
}
