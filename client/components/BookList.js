import React, { Component } from 'react'
import shallowCampare from 'react-addons-shallow-compare';
import events from 'dom-helpers/events';
import {GridList, GridTile} from 'material-ui/GridList';
import BookItem from './BookItem.js'
import Loading from './Loading.js'

export default class BookList extends Component {

  static defaultProps = {
    books: [],
    openBookOveriew: function() {},
    loadMore: function() {},
    isLoading: false,
    column: 2,
    offset: 500
  }

  state = {
    loading: false
  }

  onScroll = (e) => {
    let sHeight = document.body.scrollHeight;
    let wHeight = document.documentElement.clientHeight;
    let currentHeight = document.body.scrollTop;

    if (!this.state.loading && sHeight - wHeight - currentHeight < this.props.offset) {
      this.setState({ loading: true });
      this.props.loadMore();
    }
  }

  onResize = (e) => {
    let width = document.body.clientWidth;
    if (width < 768) {
      this.state.column !== 1 && this.setState({column: 1});
    } else {
      this.state.column !== 2 && this.setState({column: 2});
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCampare(this, nextProps, nextState);
  }

  componentWillReceiveProps(np) {
    if (np.isLoading === false) {
      this.setState({ loading: false });
    }
  }

  componentDidMount = () => {
    events.on(window, 'scroll', this.onScroll);
    events.on(window, 'resize', this.onResize);
  }

  componentWillUnmount = () => {
    events.off(window, 'scroll', this.onScroll);
    events.off(window, 'resize', this.onResize);
  }

  render() {
    const { books, isLoading } = this.props;
    let content = [];
    let loading;
    if (books.length) {
      content = books.map((item, i) => (
        <BookItem data={item} openBookOveriew={this.props.openBookOveriew} key={i}/>
      ));
    }
    if (isLoading) {
      loading = (<Loading />);
    }
    return (
      <div className="list-wrap">
        <GridList
          cols={this.state.column}
          cellHeight={180}
        >
          {content}
        </GridList>
        {loading}
      </div>

    );
  }
}
