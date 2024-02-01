import { useSelector } from 'react-redux'

const Alert = ({ message, type = 'NOTIFICATION' }) => {
  const alertMessage = useSelector((state) => state.alert[0].message)
  const alertType = useSelector((state) => state.alert[0].type)

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

  return <div className={alertCSS}>{alertMessage}</div>
}

export default Alert
