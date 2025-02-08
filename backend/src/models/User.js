const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/database");

const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const hash = bcrypt.hashSync(value, 10);
        this.setDataValue("password", hash);
      },
    },
    name: DataTypes.STRING,
    bio: DataTypes.TEXT,
    githubUrl: DataTypes.STRING,
    linkedinUrl: DataTypes.STRING,
    twitterUrl: DataTypes.STRING,
  },
  {
    timestamps: true,
    hooks: {
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          const hash = await bcrypt.hash(user.password, 10);
          user.password = hash;
        }
      },
    },
  }
);

// Add method to compare passwords
User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = User;
