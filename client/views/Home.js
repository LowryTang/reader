import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as BookActions from '../actions/BookActions.js';
import BookList from '../components/BookList.js';
import BookOverview from '../components/BookOverview.js';
import SearchBar from '../components/SearchBar.js';
import HomeHeader from '../components/HomeHeader';

class Home extends Component {

  state = {
    show: false
  }

  search = (e) => {
    if (e.keyCode === 13) {
      this.props.actions.searchBook(e.target.value, 0);
    }
  }

  searchBook = (keyword, page) => {
    if (!keyword) {
      keyword = this.props.search.keyword;
    }
    this.props.actions.searchBook(keyword, this.props.search.page);
  }

  openBookOverview = (book) => {
    this.props.actions.getBookDetailById(book._id);
    this.props.actions.getBookChapters(book._id);
    this.setState({
      show: true
    });
  }

  onRequestChange = (show) => {
    this.setState({
      show
    });
  }

  goToReadPage = (book) => {
    this.props.history.push();
  }

  render() {
    const { search, selectedBook } = this.props;
    const books = search.books;
    const searchBar = (<SearchBar placeholder="输入书名或作者名" onKeyDown={this.search} />);
    const title = (<div className="logo-title">小说阅读</div>);
    return (
      <div className="home">
        <HomeHeader rightPart={searchBar} leftPart={title}/>
        <div className="container">
          <BookList books={books} isLoading={search.isLoading} openBookOveriew={this.openBookOverview} loadMore={this.searchBook}/>
          <BookOverview show={this.state.show} onRequestChange={this.onRequestChange} book={selectedBook} goToReadPage={this.goToReadPage}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    selectedBook: state.selectedBook
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(BookActions, dispatch)
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

