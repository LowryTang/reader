import React, { Component } from 'react'
import { AutoAffix } from 'react-overlays'
import { Glyphicon } from 'react-bootstrap'

export default class Setting extends Component {

  static defaultProps = {

  }

  render() {

    return (
      <div className="setting">
        <AutoAffix viewportOffsetTop={15}>
          <div className="read-menu">
            <div className="menu-item">
              <Glyphicon glyph="list-alt"/>
              <div>目录</div>
            </div>
            <div className="menu-item">
              <Glyphicon glyph="cog"/>
              <div>设置</div>
            </div>
          </div>
        </AutoAffix>
      </div>
    );
  }
}
