import React, { Component } from 'react';
import cx from 'classnames';
import { Paper, Menu, MenuItem } from 'material-ui';

const styles = {
  paper: {
    position: 'fixed'
  }
};

export default class Setting extends Component {

  static defaultProps = {

  }

  render() {
    return (
      <Paper style={styles.paper}>
        <Menu>
          <MenuItem primaryText={<SettingItem icon="ion-navicon-round" name="目录" onClick={this.props.openMenu} />}></MenuItem>
          <MenuItem primaryText={<SettingItem icon="ion-navicon-round" name="设置" onClick={this.props.openMenu} />}></MenuItem>
        </Menu>
      </Paper>
    )
  }
}

class SettingItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const classes = cx('ion', this.props.icon);
    return (
      <div className="menu-item" onClick={this.props.onClick}>
        <i className={classes}/>
        <div>{this.props.name}</div>
      </div>
    )
  }
}

