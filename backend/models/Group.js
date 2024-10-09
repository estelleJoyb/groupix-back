const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");

const Group = sequelize.define("Group", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const GroupMembers = sequelize.define("GroupMembers", {});

Group.belongsToMany(User, { through: GroupMembers });
User.belongsToMany(Group, { through: GroupMembers });

module.exports = { Group, GroupMembers };
