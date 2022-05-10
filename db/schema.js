'use strict'

const { DataTypes, Model } = require('sequelize');

const { sequelize } = require('../db/db_connection')

class User extends Model {}
class UserSite extends Model {}
class TrustedDevice extends Model {}
class Session extends Model {}
class ApplicationIP extends Model {}
class Site extends Model {}
class Process extends Model {}
class Flag extends Model {}

User.init({
  userPrivilegeLevel: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    defaultValue: 0
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    sequelize
  }
);

Site.init({
  siteName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  siteNetworkStatus: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "down"
  },
  siteNetworkUpSince: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
    sequelize
  }
);

UserSite.init({
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  siteID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Site,
      key: 'id'
    }
  }
}, {
    sequelize
  }
);

TrustedDevice.init({
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
    sequelize
  }
);

Session.init({
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  userToken: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userTokenExpired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
}, {
    sequelize
  }
);

ApplicationIP.init({
  applicationIP: {
    type: DataTypes.STRING,
    allowNull: false
  },
  available: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  compromised: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
    sequelize
  }
);

Process.init({
  siteID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Site,
      key: 'id'
    }
  },
  processName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  processStatus: {
    type: DataTypes.STRING,
    allowNull: false
  },
  processUpSince: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
    sequelize
  }
);

Flag.init({
  userID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  siteID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Site,
      key: 'id'
    }
  },
  processID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Process,
      key: 'id'
    }
  },
  message: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
    sequelize
  }
);

module.exports = { User, Site, UserSite, TrustedDevice, Session, ApplicationIP, Process, Flag }
