'use strict'

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "password",
});

connection.query(
  `CREATE DATABASE IF NOT EXISTS purplebarnowl`,
  function (err, results) {
    if (!err) {
      console.log(results);
      main()
    }
    else {
      console.log(err);
    }
  }
);

connection.end();

function main() {
  const { sequelize } = require('./db_connection')
  const { User, Site, UserSite, TrustedDevice, Session, ApplicationIP, Process, Flag } = require('./schema');

  (async () => {
    try {
      await sequelize.sync({ force: true });
      console.log("All models were synchronized successfully.");
      loadData();
    } catch (error) {
      console.error('Unable to sync models:', error);
    }
  })();

  async function loadData() {
    await User.create({ userPrivilegeLevel: 0, userName: "Tom" })
    await User.create({ userPrivilegeLevel: 1, userName: "Jane" })
    await User.create({ userPrivilegeLevel: 2, userName: "Robin" })

    await Site.create({ siteName: "Northwest Region", siteNetworkStatus: "up", siteNetworkUpSince: "2022-05-09 18:37:41" })
    await Site.create({ siteName: "Southeast Region", siteNetworkStatus: "up", siteNetworkUpSince: "2022-05-09 18:37:41"})
    await Site.create({ siteName: "Raw Production Factory", siteNetworkStatus: "up", siteNetworkUpSince: "2022-05-09 18:37:41"})
    await Site.create({ siteName: "Refinement Factory", siteNetworkStatus: "down", siteNetworkUpSince: "2022-05-09 18:43:34"})

    await UserSite.create({ userID: 3, siteID: 1 })
    await UserSite.create({ userID: 3, siteID: 2 })
    await UserSite.create({ userID: 2, siteID: 3 })
    await UserSite.create({ userID: 2, siteID: 4 })

    await TrustedDevice.create({ userID: 1})
    await TrustedDevice.create({ userID: 2})
    await TrustedDevice.create({ userID: 3})
    await TrustedDevice.create({ userID: 3})

    await Session.create({ userID: 2, userToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MjEyMjIxNCwiaWF0IjoxNjUyMTIyMjE0fQ.NfpVhFwOUn4xcwrB_KlAStiDlM18bZe_wZETWUpiI4k", userTokenExpired: false})
    await Session.create({ userID: 3, userToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MjEyMjI2MCwiaWF0IjoxNjUyMTIyMjYwfQ.sscGtbdYUokedn06ZkntkMpqdzc9srUvksOsftZ8EzE", userTokenExpired: true})
    await Session.create({ userID: 3, userToken: "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY1MjEyMjI4OSwiaWF0IjoxNjUyMTIyMjg5fQ.tPgpIqBynQDfvK56hFxihQExoT-XkT3wgIqFTmBqOeg", userTokenExpired: false})

    await ApplicationIP.create({ applicationIP: "999.99.99.9", available: true, compromised: false})
    await ApplicationIP.create({ applicationIP: "999.99.98.8", available: false, compromised: true})
    await ApplicationIP.create({ applicationIP: "999.99.97.7", available: false, compromised: false})
    await ApplicationIP.create({ applicationIP: "999.99.96.6", available: true, compromised: false})

    await Process.create({ siteID: 1, processName: "Critical Process: Codename Snowy Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 1, processName: "Important Process: Codename Barred Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 2, processName: "Critical Process: Great-horned Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 2, processName: "Important Process: Northern Saw-whet Owl", processStatus: "down", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 3, processName: "Critical Process: Burrowing Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 3, processName: "Important Process: Screech Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 4, processName: "Critical Process: Great Grey Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
    await Process.create({ siteID: 4, processName: "Important Process: Short-eared Owl", processStatus: "up", processUpSince: "2022-05-09 18:43:34"})
  }

}
