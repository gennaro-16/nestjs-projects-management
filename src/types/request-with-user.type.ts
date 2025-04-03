import { Request } from 'express';
import { User } from '@prisma/client';

export interface RequestWithUser extends Request {
  user: User; // ✅ Prisma's User type already includes `id`, no need to redefine it
}
