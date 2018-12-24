import toClipboard from 'copy-text-to-clipboard/dist'

export default ({label, data}) => {
  console.log('clicked')
  console.log({label, data})
  toClipboard(data)
  window.toastr.info(label)

  // toast('🦄 - ' + label, {
  //   position: "top-right",
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true
  // })
}
