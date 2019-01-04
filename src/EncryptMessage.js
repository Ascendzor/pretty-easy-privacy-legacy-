import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/Lock';
import NodeRSA from 'node-rsa'
import Markdown from 'react-markdown'
import toClipboard from './toClipboard'

const encryptMessage = ({publicKey, message}) => new Promise((resolve, reject) => {

  if(!publicKey) return reject()
  if(!message) return reject()

  const key = new NodeRSA(publicKey)
  const encryptedMessage = key.encrypt(message, 'base64')
  resolve(encryptedMessage)
})

export default class EncryptMessage extends Component {
  constructor() {
    super()

    this.state = {
      message: null,
      publicKey: null,
      encryptedMessage: null
    }

    // this.state = {
    //   message: `hello`,
    //   publicKey: `-----BEGIN PUBLIC KEY----- MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKN03GZ63BSzHRR+HDubybzdPI/viDzS ERxqm4rhL5OU7LKRtooKHRr+ObCkzn+sxtad6Y+nGVlIM8JMdPWIF/sCAwEAAQ== -----END PUBLIC KEY-----`,
    //   encryptedMessage: `nlt0ak2dqgus1ExcoY1cBrkSUrMtO16LMItzCO3vD1jCqjyLxIWUBHcS5iRQKTKMoQmE4wbgslKbF47kl2JJDA==`
    // }
  }
  render() {
    const {message, publicKey, encryptedMessage} = this.state
    const {disabled} = this.props

    const setMessage = message => this.setState({message})
    const setPublicKey = publicKey => this.setState({publicKey})

    return <Paper elevation={1} className='paper'>
      <div className='title' style={{marginBottom: 20}}>
        Encrypt a Message
      </div>
      <div>
        <div style={{marginBottom: 40}}>
          <div>Enter your message into here</div>
          <div>
            <TextField
              fullWidth={true}
              id="outlined-textarea"
              label="Your message to be encrypted"
              placeholder="Your message to be encrypted"
              multiline
              margin="normal"
              variant="outlined"
              value={message ? message : ''}
              onChange={e => setMessage(e.target.value)}
            />
          </div>
        </div>
        <div style={{marginBottom: 40}}>
          <div>Paste the public key to use for this encryption</div>
          <div style={{fontSize: 10}}>
            <TextField
              InputProps={{style: {fontSize: 10}}}
              fullWidth={true}
              id="outlined-textarea"
              label="The public key to encrypt the message with"
              placeholder="The public key to encrypt the message with"
              multiline
              margin="normal"
              variant="outlined"
              value={publicKey ? publicKey : ''}
              onChange={e => setPublicKey(e.target.value)}
            />
          </div>
        </div>
        <div style={{marginBottom: 40}}>
          <div style={{marginBottom: 10}}>Click this button to create the encrypted text</div>
          <div>
            <Fab size="small" color="secondary"  disabled={disabled} onClick={() => {
              encryptMessage({publicKey, message}).then(encryptedMessage => this.setState({encryptedMessage}))
            }}>
              <LockIcon />
            </Fab>
          </div>
        </div>
        <div>
          <div style={{textAlign: 'center'}}>The encrypted message</div>
          <div className='clipboarder' style={{backgroundColor: '#eee', borderRadius: 5, padding: 10}} onClick={e => {
            if(!encryptedMessage) return
            toClipboard({label: 'Copied encrypted message to clipboard', data: encryptedMessage})
          }}>
            {encryptedMessage ? <div style={{wordBreak: 'break-all'}}>
              {encryptedMessage}
            </div> : '-'}
          </div>
        </div>
      </div>
    </Paper>
  }
}
