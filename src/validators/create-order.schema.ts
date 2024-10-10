import { messages } from '@/config/messages';
import { CountryCode, parsePhoneNumberFromString } from 'libphonenumber-js';
import { z } from 'zod';

import { validateEmail } from './common-rules';

const validatePhoneNumber = (phone: string, defaultCountry: CountryCode | undefined = 'VN') => {
  const phoneNumber = parsePhoneNumberFromString(phone, defaultCountry);
  if (!phoneNumber || !phoneNumber.isValid()) {
    return false;
  }

  return true;
};

const addressSchema = z.object({
  name: z.string().min(1, { message: messages.nameIsRequired }),
  email: validateEmail,
  phone: z
    .string({
      required_error: messages.phoneIsRequired
    })
    .min(2, { message: messages.phoneIsRequired })
    .refine((val) => validatePhoneNumber(val), { message: messages.invalidPhoneNumber }),

  address: z.string().min(1, { message: messages.addressIsRequired })
});

// form zod validation schema
export const orderFormSchema = z.object({
  customer: addressSchema,
  invoiceDetails: z
    .object({
      name: z.string().min(1, { message: messages.nameIsRequired }),
      phone: z
        .string({
          required_error: messages.phoneIsRequired
        })
        .min(2, { message: messages.phoneIsRequired })
        .refine((val) => validatePhoneNumber(val), { message: messages.invalidPhoneNumber }),
      paymentMethod: z.string().optional(),
      address: z.string().optional(),
      requestInvoice: z.boolean().optional()
    })
    .optional(),
  paymentMethod: z.string().optional()
});

// generate form types from zod validation schema
export type CreateOrderInput = z.infer<typeof orderFormSchema>;
