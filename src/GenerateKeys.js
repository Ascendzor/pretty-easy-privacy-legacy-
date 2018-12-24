import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Fab from '@material-ui/core/Fab'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import NodeRSA from 'node-rsa'
import Markdown from 'react-markdown'

const key = new NodeRSA({b: 512})
const text = 'Hello RSA!'
const encrypted = key.encrypt(text, 'base64')
console.log('encrypted: ', encrypted)
const decrypted = key.decrypt(encrypted, 'utf8')
console.log('decrypted: ', decrypted)

export default class GenerateKeys extends Component {
  constructor() {
    super()

    this.state = {
      keypair: null
    }
  }
  render() {
    const {keypair} = this.state
    const generateKeys = () => {
      this.setState({keypair: new NodeRSA({b: 512})})
    }

    return <Paper elevation={1} className='paper'>
      <div className='title'>
        Keypair Generator
      </div>
      <div>
        <Fab size="small" color="secondary" onClick={generateKeys}>
          <VpnKeyIcon />
        </Fab>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: 15, fontSize: 10, height: 400}}>
        <div>
          <div style={{textAlign: 'center'}}>Private Key</div>
          <div style={{backgroundColor: '#eee', borderRadius: 5, padding: 10}}>
            {keypair && <div style={{wordBreak: 'break-all'}}>
              {keypair.exportKey('private')}
            </div>}
          </div>
        </div>
        <div>
          <div style={{textAlign: 'center'}}>Public Key</div>
          <div style={{backgroundColor: '#eee', borderRadius: 5, padding: 10}}>
            {keypair && <div style={{wordBreak: 'break-all'}}>
              {keypair.exportKey('public')}
            </div>}
          </div>
        </div>
      </div>
    </Paper>
  }
}
