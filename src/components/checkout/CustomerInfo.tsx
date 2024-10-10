'use client';

import { CustomerInfoProps } from '@/types/index';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from 'rizzui';

interface FormValues {
  [key: string]: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ type, title, className = '' }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext<FormValues>();

  const getErrorMessage = (field: keyof FormValues[string]) => errors[type]?.[field]?.message ?? '';

  return (
    <div className={`p-6 bg-white rounded-md shadow-md mb-5 ${className}`}>
      <h2 className="text-xl font-bold mb-4">{title || 'Thông tin khách hàng'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 2xl:grid-cols-4 gap-4 text-gray-950">
        <Input
          label="Họ và tên"
          placeholder="VD: Nguyễn Văn A"
          {...register(`${type}.name`)}
          error={getErrorMessage('name')}
        />
        <Input
          label="Email"
          placeholder="VD: @Unityfitness.com"
          {...register(`${type}.email`)}
          error={getErrorMessage('email')}
        />
        <Input
          label="Số điện thoại"
          placeholder="VD: 0987654321"
          {...register(`${type}.phone`)}
          error={getErrorMessage('phone')}
        />
        <Input
          label="Điạ chỉ"
          placeholder="VD: 123 Đường ABC, Quận XYZ, TP. HCM"
          {...register(`${type}.address`)}
          error={getErrorMessage('address')}
        />
      </div>
    </div>
  );
};

export default CustomerInfo;
