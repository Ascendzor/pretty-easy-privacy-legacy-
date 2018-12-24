import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/Lock';
import NodeRSA from 'node-rsa'
import Markdown from 'react-markdown'

const encryptMessage = ({publicKey, message}) => new Promise((resolve, reject) => {

  if(!publicKey) return reject()
  if(!message) return reject()

  console.log({publicKey, message})
  const key = new NodeRSA(publicKey)
  const encryptedMessage = key.encrypt(message, 'base64')
  resolve(encryptedMessage)
})

const key = new NodeRSA({b: 512})
const text = 'Hello RSA!'
const encrypted = key.encrypt(text, 'base64')
console.log('encrypted: ', encrypted)
const decrypted = key.decrypt(encrypted, 'utf8')
console.log('decrypted: ', decrypted)

export default class EncryptMessage extends Component {
  constructor() {
    super()

    this.state = {
      message: null,
      publicKey: null,
      encryptedMessage: null
    }
  }
  render() {
    const {message, publicKey, encryptedMessage} = this.state

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
              onChange={e => setPublicKey(e.target.value)}
            />
          </div>
        </div>
        <div style={{marginBottom: 40}}>
          <div style={{marginBottom: 10}}>Click this button to create the encrypted text</div>
          <div>
            <Fab size="small" color="secondary" onClick={() => {
              encryptMessage({publicKey, message}).then(encryptedMessage => this.setState({encryptedMessage}))
            }}>
              <LockIcon />
            </Fab>
          </div>
        </div>
        <div style={{marginBottom: 10}}>
          <div>This is the encrypted text</div>
          <div>
            <TextField
              disabled={true}
              fullWidth={true}
              id="outlined-textarea"
              label="Encrypted message"
              placeholder="Encrypted message"
              multiline
              margin="normal"
              variant="outlined"
              onChange={e => setPublicKey(e.target.value)}
              value={encryptedMessage ? encryptedMessage : ''}
            />
          </div>
        </div>
      </div>
    </Paper>
  }
}
