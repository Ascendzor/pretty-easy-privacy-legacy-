import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GenerateKeys from './GenerateKeys'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='wrapper'>
          <div className='box'>
            <GenerateKeys />
          </div>
          <div className='box'>
            Encrypt message
          </div>
          <div className='box'>
            Decrypt message
          </div>
        </div>
      </div>
    )
  }
}

export default App
