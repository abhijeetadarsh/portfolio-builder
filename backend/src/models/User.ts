import bcrypt from "bcrypt";
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/database.js";

// Define the User model class with modern Sequelize TypeScript patterns
class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare name: string | null;
  declare bio: string | null;
  declare githubUrl: string | null;
  declare linkedinUrl: string | null;
  declare twitterUrl: string | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Instance method to compare passwords
  validPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
    return password === this.password;
  }
}

// Initialize the model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    linkedinUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    twitterUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
    hooks: {
      // beforeCreate: async (user: User) => {
      //   user.password = await bcrypt.hash(user.password, 10);
      // },
      // beforeUpdate: async (user: User) => {
      //   if (user.changed("password")) {
      //     user.password = await bcrypt.hash(user.password, 10);
      //   }
      // },
    },
  }
);

export default User;
