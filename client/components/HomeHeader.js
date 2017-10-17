import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';

import bookService from '../services/book.js';

export default class BookItem extends Component {
  static defaultProps = {
    data: {},
    openBookOveriew: function() {}
  }

  render() {
    const { leftPart, rightPart } = this.props;
    return (
      <div className="app-header">
        <div className="wrap">
          {leftPart}
          {rightPart}
        </div>
      </div>
    );
  }
}
