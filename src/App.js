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
window.jQuery = window.$

const joyrideSteps = [
  {
    content: <div>
      <h1 style={{marginBottom: 30}}>Tutorial</h1>
      <div style={{marginBottom: 0}}>Welcome to Pretty Easy Privacy</div>
    </div>,
    placement: 'center',
    disableBeacon: true,
    target: 'body'
  },
  {
    content: <div>
      <div>Pretty Easy Privacy is a simple tool that was created to teach people about assymetric encryption.</div>
      <div style={{marginTop: 20}}>{`There is only one new concept you will need to understand.`}</div>
    </div>,
    placement: 'center',
    disableBeacon: true,
    target: 'body'
  },
  {
    content: <div>
      <h2>The keypair</h2>
      <div style={{marginBottom: 10}}>
        <div>The <span style={{fontWeight: 'bold'}}>keypair</span> consists of two keys: <span style={{fontWeight: 'bold'}}>publicKey</span> & <span style={{fontWeight: 'bold'}}>privateKey</span></div>
      </div>
      <div style={{marginBottom: 10}}>
        These two keys are mathematically related, such that a message may be encrypted using the <span style={{fontWeight: 'bold'}}>publicKey</span>, and then that encrypted message may be decrypted using the <span style={{fontWeight: 'bold'}}>privateKey</span>.
      </div>
      <div>
        On the next page, there will be a description of the tools pretty easy privacy gives you.
      </div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 800}}
  },
  {
    content: <div>
      <div>Pretty Easy Privacy provides three basic tools</div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 400}}
  },
  {
    content: <div>
      <h2>Keypair Generator</h2>
      <div>A tool to create public+private keys.</div>
    </div>,
    placement: 'right',
    target: '.generateKeys',
    styles: {options: {width: 400}}
  },
  {
    content: <div>
      <h2>Encrypt a Message</h2>
      <div>A tool that given a publicKey and a message, will generate an encrypted message.</div>
    </div>,
    placement: 'right',
    target: '.encryptMessage',
    styles: {options: {width: 400}}
  },
  {
    content: <div>
      <h2>Decrypt a Message</h2>
      <div>A tool that given an encrypted message and a privateKey, will decrypt the encrypted message.</div>
    </div>,
    placement: 'right',
    target: '.decryptMessage',
    styles: {options: {width: 400}}
  },
  {
    content: <div>
      <div>With these tools you are able to encrypt and decrypt messages, assuring no one in between the recipient and sender can read or alter the message.</div>
      <div>Next is an example of how.</div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 400}}
  },
  {
    content: <div>
      <h2>Example</h2>
      <div>Suppose Alice wanted to write a private message to bob.</div>
      <div>Alice will take Bobs <span style={{fontWeight: 'bold'}}>PublicKey</span>, and then use that to encrypt her message.</div>
      <div>Alice will then have an encrypted message, that Bob can decrypt.</div>
      <div>Alice sends Bob that encrypted message.</div>
      <div>Bob still has his <span style={{fontWeight: 'bold'}}>PrivateKey</span>, so Bob can decrypt the message.</div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 800}}
  }
  ,
  {
    content: <div>
      <h2>How is this possible?</h2>
      <div>{`It's a technique called assymetric cryptography.`} <a href='https://en.wikipedia.org/wiki/Public-key_cryptography' target='_blank' >{`Here's a link to the wikipedia.`}</a></div>
      <div>{`I don't really understand how it works, just looks like a bunch of magical mumbo mathematical jumbo to me`}</div>
      <h3>¯\_(ツ)_/¯</h3>
      <div>Give it a go</div>
    </div>,
    placement: 'center',
    target: '.App-header',
    styles: {options: {width: 620}}
  }
]

class App extends Component {
  constructor() {
    super()

    this.state = {
      keypair: null,
      doingTutorial: false,
      tutorialStepIndex: 9
    }

    this.joyride = React.createRef()
  }
  componentDidMount() {
    this.setState({ doingTutorial: true })
  }
  render() {
    const {keypair, doingTutorial, tutorialStepIndex} = this.state


    return (
      <div className="App">
        <div className="App-header" style={{width: '100%'}}>
          Pretty Easy Privacy
          <div
            className='tutorialButton'
            style={{position: 'absolute', right: 20, color: 'rgb(255, 0, 68)', fontWeight: 'bold'}}
            onClick={() => this.setState({doingTutorial: true})}
          >
            Tutorial
          </div>
        </div>
        <Joyride
          ref={this.joyride}
          steps={joyrideSteps}
          run={doingTutorial}
          stepIndex={tutorialStepIndex}
          continuous
          hideBackButton={false}
          callback={e => {
            const { action, index, status, type } = e
            console.log({action, index, status, type})

            if(action === 'next' &&  type === 'step:after') this.setState({tutorialStepIndex: tutorialStepIndex+1})
            if(action === 'next' &&  type === 'tour:end') this.setState({doingTutorial: false, tutorialStepIndex: 0})
            if(action === 'prev' &&  type === 'step:after') this.setState({tutorialStepIndex: tutorialStepIndex-1})
            if(['close'].includes(action) && type === 'step:after') this.setState({doingTutorial: false, tutorialStepIndex: 0})
          }}
          debug={true}
          styles={{
            buttonNext: {
              position: 'absolute',
              right: 10,
              bottom: 10
            },
            buttonBack: {
              position: 'absolute',
              right: 90,
              bottom: 10
            }
          }}
          showProgress
          disableOverlayClose={false}
        />
        <div className='wrapper'>
          <div className='box generateKeys'>
            <GenerateKeys
              setKeypair={keypair => this.setState({keypair})}
              keypair={keypair}
            />
          </div>
          <div className='box encryptMessage'>
            <EncryptMessage />
          </div>
          <div className='box decryptMessage'>
            <DecryptMessage />
          </div>
        </div>
      </div>
    )
  }
}

export default App
