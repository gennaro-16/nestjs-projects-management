export enum RoleType {
  ADMIN = 'ADMIN',
  STAGE_SERVICE = 'STAGE_SERVICE',
  PROJECT_LEADER = 'PROJECT_OWNER',
  COMMITTEE_MEMBER = 'COMMITTEE_MEMBER',
  JURY_MEMBER = 'JURY_MEMBER',
  SUPERVISOR = 'SUPERVISOR',
  MEMBER = 'MEMBER',
  LEADER = 'LEADER',
}


export type UserType = {
  id: string; // UUID as a string
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  profilePicture?: string | null;
  bio?: string | null;
  website?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  verified: boolean;
  verificationToken?: string | null;
  role: RoleType; // ✅ Updated to match Prisma Enum
};
