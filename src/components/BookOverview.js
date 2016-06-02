import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import canUseDOM from 'dom-helpers/util/inDOM'
import events from 'dom-helpers/events'
import cx from 'classnames'
import BaseModal from 'react-overlays/lib/Modal'
import Transition from 'react-overlays/lib/Transition'

export default class BookOverview extends Component {

  static defaultProps = {
    book: {},
    onHide: function () {
    }
  }

  state = {
    modalStyle: {
      display: 'block'
    }
  }

  render() {
    let { book, ...props } = this.props;
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
            <div className="modal-content book-content">
              <div className="book-header">
                <span>{book.title}</span>
              </div>
              <div className="book-detail">
                {book.longIntro}
              </div>
              <div className="book-chapter">

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

  handleWindowResize() {
    this.setState(this._getStyles());
  }

  _onShow = (...args) => {
    events.on(window, 'resize', this.handleWindowResize);

    // this.setState(
    //   this._getStyles()
    // );

    if (this.props.onEntering) {
      this.props.onEntering(...args);
    }
  }

  _onHide = (...args) => {
    events.off(window, 'resize', this.handleWindowResize);

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  }

  _getStyles() {
    if (!canUseDOM) {
      return {};
    }

    // let node = ReactDOM.findDOMNode(this._modal);
    // let doc = ownerDocument(node);

    // let scrollHt = node.scrollHeight;
    // let bodyIsOverflowing = isOverflowing(ReactDOM.findDOMNode(this.props.container || doc.body));
    // let modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    // return {
    //   modalStyles: {
    //     paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
    //     paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
    //   }
    // };
  }
}

class LeftFade extends Component {
  static defaultProps = {
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
        className={cx(this.props.className, 'left-fade',)}
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
