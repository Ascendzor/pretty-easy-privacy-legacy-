import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GenerateKeys from './GenerateKeys'
import EncryptMessage from './EncryptMessage'

class App extends Component {
  constructor() {
    super()

    this.state = {
      keypair: null
    }
  }
  render() {
    const {keypair} = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className='wrapper'>
          <div className='box'>
            <GenerateKeys
              setKeypair={keypair => this.setState({keypair})}
              keypair={keypair}
            />
          </div>
          <div className='box'>
            <EncryptMessage />
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
