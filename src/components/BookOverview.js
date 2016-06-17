import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import canUseDOM from 'dom-helpers/util/inDOM'
import events from 'dom-helpers/events'
import cx from 'classnames'
import BaseModal from 'react-overlays/lib/Modal'
import Transition from 'react-overlays/lib/Transition'

import ChaperList from './ChapterList.js'

export default class BookOverview extends Component {

  static defaultProps = {
    book: {},
    onHide: function () {}
  }

  state = {
    modalStyle: { display: 'block' }
  }

  render() {
    let { book, ...props } = this.props;
    let { detail, resources, chapters } = book;
    return (
      <BaseModal
        show={props.show}
        {...props}
        onEntering={this._onShow}
        onExited={this._onHide}
        className="book-overview"
        backdropClassName="modal-backdrop"
        containerClassName="modal-open"
        transition={LeftFade}
      >
        <div className="modal" onClick={this.handleDialogClick} style={this.state.modalStyle}>
          <div className="modal-dialog book-dialog">
            <div className="modal-content">
              <div className="book-content">
                <div className="book-header">
                  <h2>{detail.title}</h2>
                  <div>
                    <span><a>{detail.author}</a></span>|<span>{detail.minorCate}</span>|<span>{detail.wordCount}</span>
                  </div>
                </div>
                <div className="book-detail">
                  <p>{detail.longIntro}</p>
                </div>
                <div className="book-chapter">
                  <ChaperList data={chapters} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>
    );
  }

  handleDialogClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  }

  _onShow = (...args) => {
    if (this.props.onEntering) {
      this.props.onEntering(...args);
    }
  }

  _onHide = (...args) => {
    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  }
}

class LeftFade extends Component {
  static defaultProps = {
    in: false,
    timeout: 400,
    unmountOnExit: false,
    transitionAppear: false
  }

  render() {
    let timeout = this.props.timeout;

    return (
      <Transition
        {...this.props}
        timeout={timeout}
        className={cx(this.props.className, 'left-fade',)}
        enteredClassName="in"
        enteringClassName="in"
      >
        {this.props.children}
      </Transition>
    );
  }
}
