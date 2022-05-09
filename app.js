'use strict'

var bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const express = require('express')
const { QueryTypes } = require('sequelize');

const { sequelize } = require('./db_connection')
const { User, Site, UserSite, TrustedDevice, Session, ApplicationIP, Process, Flag } = require('./schema')
const { authMiddleware, checkApplicationStatus } = require('./middleware')

const app = express()
const port = 3000;

app.use(bodyParser.json())
app.use(cookieParser())
app.use(authMiddleware)
app.use(checkApplicationStatus)

// Get all sites associated with the authenticated user
app.get('/sites', async (req, res) => {
  const userSites = await UserSite.findAll({
    where: {
      userID: req.cookies.userID
    }
  })
  const userSitesIDs = userSites.map((userSite) => {
    return userSite.siteID
  })
  const sites = await sequelize.query(`SELECT * FROM Sites WHERE id IN (${userSitesIDs})`, { type: QueryTypes.SELECT })
  if (sites.length == 1) {
    res.send("No sites found")
  }
  res.send(sites)
})

// Get single site associated with the authenticated user
app.get('/site/:siteID', async (req, res) => {
  const userSite = await UserSite.findOne({
    where: {
      userID: req.cookies.userID,
      siteID: req.params.siteID
    }
  })
  if (userSite) {
    Site.findOne({
      where: {
        id: req.params.siteID
      }
    })
      .then(data => {
        res.send(data)
      })
      .catch( err => {
        res.send(err)
      })
  }
  else {
    res.send('Site not found')
  }

})

// Get single process from single site associated with authenticated user
app.get('/site/:siteID/process/:processID', async (req, res) => {
  const userSite = await UserSite.findOne({
    where: {
      userID: req.cookies.userID,
      siteID: req.params.siteID
    }
  })
  if (userSite) {
    console.log('usersitefound');
    Process.findOne({
      where: {
        id: req.params.processID,
        siteID: req.params.siteID
      }
    })
      .then(data => {
        if (data) {
          res.send(data)
        }
        else {
          res.send('Process not found')
        }

      })
      .catch( err => {
        res.send(err)
      })
  }
  else {
    res.send('Process not found')
  }

})

// Post message to flags table
app.post('/flag', async (req, res) => {
  const flag = await Flag.create({
     userID: req.cookies.userID,
     siteID: req.body.siteID,
     processID: req.body.processID,
     message: req.body.message
  })
  res.send('flat posted')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
