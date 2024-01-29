const Alert = ({ message, alertType = 'notification' }) => {
  let alertCSS = ''
  switch (alertType) {
    case 'NOTIFICATION':
      alertCSS = 'notification'
      break
    case 'ERROR':
      alertCSS = 'error'
      break
    default:
      alertCSS = 'notification'
      break
  }

  if (alertType === 'CLEAR') {
    return null
  }

  return <div className={alertCSS}>{message}</div>
}

export default Alert
