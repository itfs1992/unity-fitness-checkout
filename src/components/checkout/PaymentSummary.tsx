'use client';

import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Modal from '../shared/form/Modal';

interface PaymentSummaryProps {
  initialPrice: number;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({ initialPrice }) => {
  const { register, watch, setValue } = useFormContext();
  const termsAccepted = watch("termsAccepted", false);
  const [isTermsModalOpen, setTermsModalOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [discountApplied, setDiscountApplied] = useState(false);
 
  const handleApplyDiscount = async () => {
    if (discountCode === 'DISCOUNT10') {
      const discount = initialPrice * 0.1;
      setDiscountAmount(discount);
      setDiscountApplied(true);
      alert(
        `Mã giảm giá đã được áp dụng và bạn tiết kiệm được ${discount.toLocaleString('vi-VN')}đ!`
      );
    } else {
      alert('Mã giảm giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const finalPrice = initialPrice - discountAmount;

  const handleOpenTerms = () => {
    setTermsModalOpen(true);
  };
  const handleCloseTerms = () => {
    setTermsModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-md shadow-md mb-5">
      <h2 className="text-xl font-bold mb-4">Chi tiết thanh toán</h2>

      <div className="flex mb-4">
        <input
          type="text"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Nhập mã giảm giá"
          className="flex-grow p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleApplyDiscount}
          className="ml-2 p-2 border border-gray-400 rounded-md text-black hover:bg-gray-100"
        >
          Áp dụng
        </button>
      </div>

      {discountApplied && (
        <div className="flex justify-between">
          <span>Mã giảm giá</span>
          <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
        </div>
      )}

      <div className="flex justify-between text-xl font-bold">
        <span>Tổng thanh toán</span>
        <span>{finalPrice.toLocaleString('vi-VN')}đ</span>
      </div>

      <div className="mt-4">
        <label className="flex items-center space-x-2">
          <input type="checkbox" {...register('termsAccepted')} className="form-checkbox" />
          <span>
            Nhấn “Thanh Toán” đồng nghĩa với việc bạn đồng ý tuân thủ theo
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpenTerms();
              }}
              className="text-blue-500 cursor-pointer"
            >
              {' '}
              Điều khoản thanh toán của Unity Fitness
            </a>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={!termsAccepted}
        className="w-full bg-blue-500 text-white py-3 mt-4 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        Thanh toán
      </button>

      <Modal isOpen={isTermsModalOpen} onClose={handleCloseTerms}>
        <div className="text-lg">
          <h3 className="font-bold mb-2">Điều khoản dịch vụ của Unity Fitness</h3>
          <p>Điều khoản dịch vụ nội dung...</p>
        </div>
      </Modal>
    </div>
  );
};

export default PaymentSummary;
