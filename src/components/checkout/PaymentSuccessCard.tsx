import { CustomerAddressProds } from '@/types/index';
import Image from 'next/image';
import React from 'react';

interface Props {
  customer: CustomerAddressProds;
  qrCodeData: string;
}

const PaymentSuccessCard: React.FC<Props> = ({ customer, qrCodeData }) => {
  return (
    <div className="bg-white flex rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-row items-start justify-between w-full p-4">
        <div className="flex justify-start w-1/2 p-4">
          <Image src={qrCodeData} alt="QR Code" width={100} height={150} className="p-3" />
          <div className="bg-[#FFF4D9] rounded-lg p-4 text-center">
            <p className="text-sm text-gray-700 mb-2 text-left">
              Bạn có thể lưu lại mã QR Code khi đến câu lạc bộ Unity.
            </p>
            <a className="text-[#32B34A] flex gap-2 items-center">
              <svg
                width="12"
                height="14"
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_1_36897)">
                  <path
                    d="M11.261 4.66667H8.2522V0H3.7478V4.66667H0.739003L6 10.8828L11.261 4.66667ZM0 12.4505H12V14H0V12.4505Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1_36897">
                    <rect width="12" height="14" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Lưu QR code
            </a>
          </div>
        </div>
        <div className="w-1/2 p-4 pl-8">
          <h3 className="text-lg">Thông tin khách hàng</h3>
          <div className="mt-2 text-sm">
            {customer?.name && (
              <p className="mb-2">
                Họ và tên: <strong>{customer?.name}</strong>
              </p>
            )}

            {customer?.email && (
              <p className="mb-2">
                Email: <strong>{customer?.email}</strong>
              </p>
            )}

            {customer?.phone && (
              <p>
                Số điện thoại: <strong>{customer?.phone}</strong>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessCard;
