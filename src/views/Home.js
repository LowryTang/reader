import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {Grid, Row, Col, FormGroup, FormControl} from 'react-bootstrap'

import * as BookActions from '../actions/BookActions.js'
import BookList from '../components/BookList.js'
import BookOverview from '../components/BookOverview.js'

class Home extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    show: false
  }

  search = (e) => {
    if (e.keyCode === 13) {
      this.props.actions.searchBook(e.target.value);
    }
  }

  openBookOveriew = (book) => {
    console.log(book);
    this.props.actions.getBookDetailById(book._id);
    this.setState({show: true});
  }

  render() {
    const {books, selectedBook} = this.props;

    return (
      <Grid className="home">
        <Row>
          <Col>
            <FormGroup bsSize="large">
              <FormControl type="text" placeholder="输入书名或作者名" onKeyDown={this.search}/>
            </FormGroup>
          </Col>
        </Row>
        <BookList books={books} openBookOveriew={this.openBookOveriew}/>
        <BookOverview show={this.state.show} book={selectedBook}/>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    books: state.bookList.books,
    selectedBook: state.bookList.selectedBook
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
