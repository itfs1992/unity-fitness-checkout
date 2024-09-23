'use client';

import Image from 'next/image';
import React from 'react';
import { Control, Controller, FieldValues, useFormContext } from 'react-hook-form';

interface PaymentOption {
  id: string;
  label: string;
  icon: string;
}

interface PaymentMethodItemProps {
  method: PaymentOption;
  control: Control<FieldValues>;
}

const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({ method, control }) => {
  return (
    <Controller
      name="paymentMethod"
      control={control}
      defaultValue="payos" // Set default method to 'payos'
      render={({ field: { onChange, value } }) => (
        <div
          onClick={() => onChange(method.id)}
          className={`flex items-center justify-between border rounded-md p-4 cursor-pointer mb-2 ${
            value === method.id ? 'border-black' : 'border-gray-300'
          }`}
        >
          <div className="flex items-center">
            <Image
              src={method.icon}
              alt={`${method.label} Icon`}
              width={32}
              height={32}
              className="w-8 h-8 mr-3"
            />
            <span>{method.label}</span>
          </div>
          <input
            type="radio"
            name="payment_method"
            value={method.id}
            onChange={() => onChange(method.id)}
            checked={value === method.id}
            className="form-radio"
          />
        </div>
      )}
    />
  );
};

const PaymentMethod = () => {
  const paymentMethods: PaymentOption[] = [
    { id: 'momo', label: 'Momo', icon: '/icons/momo.svg' },
    { id: 'vnpay', label: 'VN Pay', icon: '/icons/vnpay.svg' },
    { id: 'payos', label: 'Chuyển khoản ngân hàng', icon: '/icons/qr-code.svg' }, // Default method
    { id: 'zalopay', label: 'Zalo Pay', icon: '/icons/zalopay.svg' },
    { id: 'visa_mastercard', label: 'Thẻ visa/mastercard', icon: '/icons/visa-mastercard.svg' },
    { id: 'viettel_pay', label: 'Viettel pay', icon: '/icons/viettelpay.svg' }
  ];

  const { control } = useFormContext();

  return (
    <div className="p-6 bg-white rounded-md shadow-md mb-5">
      <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 text-gray-950">
        {paymentMethods.map((method) => (
          <PaymentMethodItem key={method.id} method={method} control={control} />
        ))}
      </div>
    </div>
  );
};

export default PaymentMethod;
