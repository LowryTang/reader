import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import events from 'dom-helpers/events'

import * as BookActions from '../actions/BookActions.js'
import BookReader from '../components/BookReader.js'

class ReadPage extends Component {

  state = {
    show: false,
    current: 0
  }

  getChapterContent = () => {
    const chapter = this.props.selectedBook.chapters.chapters[this.state.current];
    const url = chapter.link;
    this.props.actions.getChapterContent(url);
  }

  getCurrentChapter = () => {
    const book = this.props.selectedBook;
    if (book.chapters && book.chapters.chapters) {
      return book.chapters.chapters[this.state.current];
    }
  }

  onKeyDown = (e) => {
    let current = null;
    if (e.keyCode == 39) {
      current = this.state.current + 1;
    } else if (e.keyCode == 37 && this.state.current > 0) {
      current = this.state.current - 1;
    }
    if (current !== null) {
      this.setState({current}, this.getChapterContent);
    }
  }

  componentWillMount = () => {
    this.getChapterContent();
  }

  componentWillUnmount = () => {
    events.off(window, 'keydown', this.onKeyDown);
  }

  componentDidMount = () => {
    events.on(window, 'keydown', this.onKeyDown);
  }

  render() {
    const { chapters, chapterContent } = this.props.selectedBook;
    const chapter = this.getCurrentChapter();
    // const chapter = chapters.chapters[0];
    return (
      <div onKeyDown={this.onKeyDown} className="read-page">
        <BookReader content={chapterContent} chapter={chapter} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
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
)(ReadPage);
