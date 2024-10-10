'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { FaChevronRight } from 'react-icons/fa';
import { Input } from 'rizzui';

interface InvoiceDetailsProps {
  type: string;
  title: string;
  className?: string;
}

const InvoiceDetails: React.FC<InvoiceDetailsProps> = ({ type, title, className = '' }) => {
  const { watch, setValue } = useFormContext();

  const [isFormVisible, setIsFormVisible] = useState(true);
  const requestInvoice = watch(`${type}.requestInvoice`);

  const toggleFormVisibility = () => setIsFormVisible((prev) => !prev);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(`${type}.requestInvoice`, event.target.checked);
  };

  return (
    <div className={`p-6 bg-white rounded-md shadow-md mb-5 ${className}`}>
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggleFormVisibility}
      >
        <h2 className="text-xl font-bold">{title}</h2>
        <FaChevronRight
          className={`transition-transform duration-300 ${isFormVisible ? 'rotate-90' : ''}`}
        />
      </div>
      {isFormVisible && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 2xl:grid-cols-4 gap-4 text-gray-950">
            <FormInput
              label="Tên hội viên"
              placeholder="VD: Nguyễn Văn A"
              type={type}
              field="name"
            />
            <FormInput
              label="Số điện thoại"
              placeholder="VD: 0987654321"
              type={type}
              field="phone"
            />
            <FormInput
              label="Địa chỉ thanh toán"
              placeholder="VD: 123 Đường ABC, Quận XYZ, TP. HCM"
              type={type}
              field="address"
            />
            <FormInput
              label="Phương thức thanh toán"
              placeholder="VD: Thẻ visa/mastercard"
              type={type}
              disabled={true}
              field="paymentMethod"
            />
            <Checkbox
              label="Yêu cầu xuất hoá đơn đỏ"
              type={type}
              checked={requestInvoice}
              onChange={handleCheckboxChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface FormInputProps {
  label: string;
  placeholder: string;
  type: string;
  field: string;
  disabled?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({ label, placeholder, type, field, disabled }) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  // @ts-expect-error: Suppressing error for potentially undefined errors object
  const errorMessage = errors?.[type]?.[field]?.message;

  return (
    <Input
      label={label}
      placeholder={placeholder}
      disabled={disabled}
      {...register(`${type}.${field}`)}
      error={errorMessage as string | undefined}
    />
  );
};

interface CheckboxProps {
  label: string;
  type: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, type, checked, onChange }) => (
  <div className="flex items-center mb-4">
    <input
      type="checkbox"
      id={`${type}-invoice`}
      name={`${type}.requestInvoice`}
      checked={checked}
      onChange={onChange}
      className="form-checkbox"
    />
    <label htmlFor={`${type}-invoice`} className="ml-2 text-sm text-gray-600">
      {label}
    </label>
  </div>
);

export default InvoiceDetails;
