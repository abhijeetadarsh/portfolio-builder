import { Model, DataTypes, InitOptions, ModelAttributes } from "sequelize";
import bcrypt from "bcrypt";

import sequelize from "../config/database.js";

// Base attributes interface
interface UserAttributes {
  readonly id: number;
  email: string;
  password: string;
  name?: string | null;
  bio?: string | null;
  githubUrl?: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
}

// Interface for creating a new user
interface UserCreationAttributes extends Omit<UserAttributes, "id" | "createdAt" | "updatedAt"> {
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Interface for user instance methods
interface UserMethods {
  validPassword(password: string): Promise<boolean>;
}

// Define the User model class
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes, UserMethods {
  declare readonly id: number;
  declare email: string;
  declare password: string;
  declare name: string | null;
  declare bio: string | null;
  declare githubUrl: string | null;
  declare linkedinUrl: string | null;
  declare twitterUrl: string | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  async validPassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}

// Model attributes configuration
const attributes: ModelAttributes<User, UserAttributes> = {
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
    validate: {
      len: [6, 100],
    },
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
    validate: {
      isUrl: true,
    },
  },
  linkedinUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  twitterUrl: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isUrl: true,
    },
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

// Model configuration options
const options: InitOptions<User> = {
  sequelize,
  tableName: "users",
  timestamps: true,
  underscored: true,
  hooks: {
    beforeCreate: async (user: User) => {
      user.password = await bcrypt.hash(user.password, 10);
    },
    beforeUpdate: async (user: User & { changed?: (field: string) => boolean }) => {
      if (user.changed?.("password")) {
        user.password = await bcrypt.hash(user.password, 10);
      }
    },
  },
};

// Initialize the model
User.init(attributes, options);

export default User;
