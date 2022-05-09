'use strict'

const { User, TrustedDevice, Session, ApplicationIP } = require('./schema')

// Check that stored cookies match database info for user, session, and client device
async function authMiddleware (req, res, next) {
  const user = await User.findOne({
    where: {
      id: req.cookies.userID
    }
  })
  const session = await Session.findOne({
    where: {
      userToken: req.cookies.userToken,
      userID: req.cookies.userID
    }
  })
  const trustedDevice = await TrustedDevice.findOne({
    where: {
      id: req.cookies.trustedDeviceID,
      userID: req.cookies.userID
    }
  })
  if (!user || !session || !trustedDevice) {
    res.send('authentication failed')
  }
  else {
    req.userID = req.cookies.userID
    next()
  }
}

// Check that client's stored application IP 1) exists, 2) is not compromised, and 3) is available
async function checkApplicationStatus (req, res, next) {
  console.log('ip check');
  const applicationIP = await ApplicationIP.findOne({
    where: {
      applicationIP: req.cookies.applicationIP
    }
  })
  console.log(applicationIP);
  if (!applicationIP) {
    res.send('Application instance not found')
  } else if (!applicationIP.available || applicationIP.compromised) {
    res.send('Application instance is unavailable or has been compromised')
  }
  else {
    next()
  }
}

module.exports = { authMiddleware, checkApplicationStatus }
