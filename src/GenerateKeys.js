import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Fab from '@material-ui/core/Fab'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import NodeRSA from 'node-rsa'
import Markdown from 'react-markdown'

export default class GenerateKeys extends Component {
  render() {
    const {keypair, setKeypair} = this.props
    const generateKeys = () => {
      setKeypair(new NodeRSA({b: 512}))
    }

    return <Paper elevation={1} className='paper'>
      <div className='title' style={{marginBottom: 20}}>
        Keypair Generator
      </div>
      <div style={{marginBottom: 20}}>
        <div style={{marginBottom: 10}}>Click this button to generate a new keypair</div>
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
