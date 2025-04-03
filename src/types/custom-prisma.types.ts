import { Prisma } from '@prisma/client';

export type CustomUserUpdateInput = Prisma.UserUpdateInput & {
  resetToken?: string | null;
  resetTokenExpiry?: Date | null;
  verified?: boolean; // ✅ Allow updating verification status
  verificationToken?: string | null; // ✅ Allow setting verification token
};
