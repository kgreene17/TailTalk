import React, { Component } from 'react';
import ChannelList from './ChannelList';

export default class Sidebar extends Component {

  render () {
    return (
      <section className="sidebar">
        <div className="sidebar-header">
          <h3 href="#">
            <div>TailTalk</div>
            {/* <img src="https://image.shutterstock.com/image-vector/vector-cartoon-paw-print-icon-260nw-1145021825.jpg"/> */}
          </h3>
        </div>
        <ChannelList />
      </section>
    );
  }
}
