import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import events from 'dom-helpers/events'
import cx from 'classnames'
import { Drawer, Chip } from 'material-ui';

import ChaperList from './ChapterList.js'

const styles = {
  chip: {
    margin: 4,
  },
  author: {
    margin: 4,
    marginLeft: 0
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};

export default class BookOverview extends Component {

  static defaultProps = {
    book: {},
    width: 0,
    onRequestChange: () => {}
  }

  state = {
    modalStyle: { display: 'block' }
  }

  onResize = () => {
    let width = document && document.body.clientWidth * 0.8;
    this.setState({ width });
  }

  componentWillMount() {
    this.onResize();
  }

  componentDidMount = () => {
    events.on(window, 'resize', this.onResize);
  }

  componentWillUnmount = () => {
    events.off(window, 'resize', this.onResize);
  }

  handleClose = () => this.setState({open: false})

  onRequestChange = (...args) => {
    this.props.onRequestChange(...args);
  }

  render() {
    let { book, ...props } = this.props;
    let { detail, resources, chapters } = book;
    return (
      <Drawer
        className="book-overview"
        docked={false}
        width={this.state.width}
        open={props.show}
        openSecondary={true}
        onRequestChange={this.onRequestChange}
      >
        <div className="book-dialog">
          <div className="book-content">
            <div className="book-header">
              <h2>{detail.title}</h2>
              <div style={styles.wrapper}>
                <Chip style={styles.author}>{detail.author}</Chip><Chip style={styles.chip}>{detail.minorCate}</Chip><Chip style={styles.chip}>{detail.wordCount}</Chip>
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
      </Drawer>
    );
    // return (
    //   <BaseModal
    //     show={props.show}
    //     {...props}
    //     onEntering={this._onShow}
    //     onExited={this._onHide}
    //     className="book-overview"
    //     backdropClassName="modal-backdrop"
    //     containerClassName="modal-open"
    //     transition={LeftFade}
    //   >
    //     <div className="modal" onClick={this.handleDialogClick} style={this.state.modalStyle}>
    //       <div className="modal-dialog book-dialog">
    //         <div className="modal-content">
    //           <div className="book-content">
    //             <div className="book-header">
    //               <h2>{detail.title}</h2>
    //               <div>
    //                 <span><a>{detail.author}</a></span>|<span>{detail.minorCate}</span>|<span>{detail.wordCount}</span>
    //               </div>
    //             </div>
    //             <div className="book-detail">
    //               <p>{detail.longIntro}</p>
    //             </div>
    //             <div className="book-chapter">
    //               <ChaperList data={chapters} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </BaseModal>
    // );
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
