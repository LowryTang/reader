import React, { Component } from 'react'
import cx from 'classnames'
import BaseModal from 'react-overlays/lib/Modal'
import Transition from 'react-overlays/lib/Transition'

export default class BookOverview extends Component {
  static props = {
    book: {}
  }

  render() {
    let { book, ...props } = this.props;
    return (
      <BaseModal
        show={props.show}
        className="book-overview"
        backdropClassName="modal-backdrop"
        containerClassName="modal-open"
        transition={LeftFade}
      >
        <div className="modal" style={{display: 'block'}}>
          <div className="modal-dialog">
            <div className="book-header">
              <span>{book.title}</span>
            </div>
            <div className="book-detail">
              {book.longIntro}
            </div>
            <div className="book-chapter">
              test
              test
              test
            </div>
          </div>
        </div>
      </BaseModal>
    );
  }
}

class LeftFade extends Component {
  static props = {
    in: false,
    timeout: 300,
    unmountOnExit: false,
    transitionAppear: false
  }

  render() {
    let timeout = this.props.timeout;

    return (
      <Transition
        {...this.props}
        timeout={timeout}
        className={cx(this.props.className, 'left-fade')}
        enteredClassName="in"
        enteringClassName="in"
      >
        {this.props.children}
      </Transition>
    );
  }
}
/*
<div className="book-overview">
        <BaseModal />
      </div>
 */
