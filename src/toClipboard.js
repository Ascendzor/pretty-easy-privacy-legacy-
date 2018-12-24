import toClipboard from 'copy-text-to-clipboard'

export default ({label, data}) => {
  console.log('clicked')
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
