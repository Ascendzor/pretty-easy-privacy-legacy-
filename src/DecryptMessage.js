import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import TextField from '@material-ui/core/TextField'
import LockIcon from '@material-ui/icons/Lock';
import NodeRSA from 'node-rsa'
import Markdown from 'react-markdown'
import toClipboard from './toClipboard'

const decryptMessage = ({privateKey, encryptedMessage}) => new Promise((resolve, reject) => {
  if(!privateKey) return reject()
  if(!encryptedMessage) return reject()

  const key = new NodeRSA(privateKey)
  const decryptedMessage = key.decrypt(encryptedMessage, 'utf8')
  resolve(decryptedMessage).catch(err => {
    console.log(err)
    throw err
  })
})

export default class DecryptMessage extends Component {
  constructor() {
    super()

    this.state = {
      privateKey: null,
      encryptedMessage: null,
      decryptedMessage: null
    }

    // this.state = {
    //   privateKey: `-----BEGIN RSA PRIVATE KEY----- MIIBOQIBAAJBAKN03GZ63BSzHRR+HDubybzdPI/viDzSERxqm4rhL5OU7LKRtooK HRr+ObCkzn+sxtad6Y+nGVlIM8JMdPWIF/sCAwEAAQJAWKple/mdNGVMmvclnXgO YLKpzXIjtspEmeOCaD1qr2S04l6M2YtF/5fUL0QHgYcnV+sq+zVUS6J1K/yqvisP 4QIhANtFZOhfbCrO4st98iNMCewBXJ93a1/Bb9KvPgKPmfzjAiEAvtYSGEPvbF1R r3JeZUgu9CFLlJ+kGgYPazXeKk8TPAkCIDjkLGZOO9Zvj1CVAPo/hGODhvCpH2bc 3ZKgfUpUz/NZAiA2392SJq7JDUh41703CHuf7ZcLJKCObyGt5W594gEY6QIgPSPI Soca83GpRYMc3q796Di/F3Fs6DLpObUpiYEFpAY= -----END RSA PRIVATE KEY-----`,
    //   encryptedMessage: `OnFmcomEh3uUhzSAcOouepW+gDjzsMt3Ce6tl7tW3GqYm9D3VE8eUymFX1S0x3ZpGYVru/aVYJJDzntOdPKSsQ==`,
    //   decryptedMessage: null
    // }
  }
  render() {
    const {privateKey, encryptedMessage, decryptedMessage} = this.state

    const setEncryptedMessage = encryptedMessage => this.setState({encryptedMessage})
    const setPrivateKey = privateKey => this.setState({privateKey})

    return <Paper elevation={1} className='paper'>
      <div className='title' style={{marginBottom: 20}}>
        Decrypt a Message
      </div>
      <div>
        <div style={{marginBottom: 40}}>
          <div>Enter the encrypted message into here</div>
          <div>
            <TextField
              fullWidth={true}
              id="outlined-textarea"
              label="Encrypted message goes here"
              placeholder="Encrypted message goes here"
              multiline
              margin="normal"
              variant="outlined"
              value={encryptedMessage ? encryptedMessage : ''}
              onChange={e => setEncryptedMessage(e.target.value)}
            />
          </div>
        </div>
        <div style={{marginBottom: 40}}>
          <div>Paste the private key to use for this decryption</div>
          <div style={{fontSize: 10}}>
            <TextField
              InputProps={{style: {fontSize: 10}}}
              fullWidth={true}
              id="outlined-textarea"
              label="The private key to decrypt the message"
              placeholder="The private key to encrypt the message"
              multiline
              margin="normal"
              variant="outlined"
              value={privateKey ? privateKey : ''}
              onChange={e => setPrivateKey(e.target.value)}
            />
          </div>
        </div>
        <div style={{marginBottom: 40}}>
          <div style={{marginBottom: 10}}>Click this button to create the encrypted text</div>
          <div>
            <Fab size="small" color="secondary" onClick={() => {
              decryptMessage({privateKey, encryptedMessage}).then(decryptedMessage => this.setState({decryptedMessage}))
            }}>
              <LockIcon />
            </Fab>
          </div>
        </div>
        <div>
          <div style={{textAlign: 'center'}}>The decrypted message</div>
          <div className='clipboarder' style={{backgroundColor: '#eee', borderRadius: 5, padding: 10}} onClick={e => {
            if(!decryptedMessage) return
            toClipboard({label: 'Copied encrypted message to clipboard', data: decryptedMessage})
          }}>
            {decryptedMessage ? <div style={{wordBreak: 'break-all'}}>
              {decryptedMessage}
            </div> : '-'}
          </div>
        </div>
      </div>
    </Paper>
  }
}
