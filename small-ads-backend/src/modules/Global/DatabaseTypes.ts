/* eslint-disable camelcase */
import { CampaignStatus } from "../Campaigns/CampaignStatus";
import { CampaignLogAction } from "../CampaignLogs/CampaignLogAction";
import { UserRole } from "../Users/UserRoles";

export interface DataBaseUser {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  role: UserRole;
  archived: boolean;
}
