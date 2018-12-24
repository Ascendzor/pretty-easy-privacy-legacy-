import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import GenerateKeys from './GenerateKeys'
import EncryptMessage from './EncryptMessage'
import DecryptMessage from './DecryptMessage'
import 'react-joyride/'
import Joyride from 'react-joyride'
// import joyrideSteps from './joyrideSteps'

window.toastr.options = {
  progressBar: true
}

const joyrideSteps = [
  {
    content: <div>
      <h2 style={{marginBottom: 10}}>Welcome!</h2>
      <div>This is is a tutorial on how to use pretty-easy-privacy</div>
    </div>,
    placement: 'center',
    disableBeacon: true,
    target: 'body'
  },
  {
    content: <div>
      <div>This technology is called <span style={{fontStyle: 'italic'}}>assymetric encryption</span></div>
      <div><a href='https://en.wikipedia.org/wiki/Public-key_cryptography'>wikipedia</a></div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 800}}
  }
]

// const joyrideSteps = [
//   {
//     content: <h2>Lets start the tour!</h2>,
//     placement: "center",
//     disableBeacon: true,
//     styles: {
//       options: {
//         zIndex: 10000
//       }
//     },
//     locale: { skip: "wow!" },
//     target: "body"
//   }
// ]

class App extends Component {
  constructor() {
    super()

    this.state = {
      keypair: null,
      doingTutorial: false
    }

    this.joyride = React.createRef()
  }
  componentDidMount() {
    this.setState({ doingTutorial: true })
  }
  render() {
    const {keypair, doingTutorial} = this.state

    // continuous
    // scrollToFirstStep
    // showProgress
    // showSkipButton


    return (
      <div className="App">
        <header className="App-header">
          Pretty Easy Privacy
        </header>
        <Joyride
          ref={this.joyride}
          steps={joyrideSteps}
          run={doingTutorial}
          callback={e => {
            const { action, index, type } = e
          }}
          debug={true}
          continuous
          scrollToFirstStep
          showProgress
          showSkipButton
        />
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
            <DecryptMessage />
          </div>
        </div>
      </div>
    )
  }
}

export default App
