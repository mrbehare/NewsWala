import React, { Component } from 'react'
import loading from "./loading.gif"

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center ">
        <img className='my-3 rounded float-start' src={loading} alt='loading'  style={{height: 80}}/>
      </div>
    )
  }
}
