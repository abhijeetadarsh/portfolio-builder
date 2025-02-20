import { User, Portfolio, Project, Certificate } from "../models/index.js";

export interface AuthContext {
  user?: User;
  portfolio?: Portfolio;
  project?: Project;
  certificate?: Certificate;
}
