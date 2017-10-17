import React, { Component } from 'react'
import { Link } from 'react-router'

export default class ChaperItem extends Component {
  static defaultProps = {
    item: {}
  }

  render() {
    const { item } = this.props;
    return (
      <li><Link to="reader">{item.title}</Link></li>
    );
  }
}
