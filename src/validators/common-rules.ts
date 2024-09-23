import { messages } from '@/config/messages';
import { z } from 'zod';

export const validateEmail = z
  .string()
  .min(1, { message: messages.emailIsRequired })
  .email({ message: messages.invalidEmail });
