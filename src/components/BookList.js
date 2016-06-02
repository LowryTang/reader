import React, { Component } from 'react'
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap'

import BookItem from './BookItem.js'

export default class BookList extends Component {
  static defaultProps = {
    books: [],
    openBookOveriew: function() {}
  }

  render() {
    const { books } = this.props;

    return (
      <Row>
        {books.map((item, i) => (<BookItem data={item} openBookOveriew={this.props.openBookOveriew} key={i}/>))}
      </Row>
    );
  }
}
