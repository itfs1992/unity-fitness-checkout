'use client';

import { ProductItemSingleProds } from '@/types/index'; // Di chuyển import của '@/types/index' lên trên
import Image from 'next/image';

const ProductItem: React.FC<ProductItemSingleProds> = ({
  imageUrl,
  membershipType,
  location,
  duration,
  price
}) => {
  const formattedPrice = price?.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });

  return (
    <div className="p-6 bg-white rounded-md shadow-md mb-5">
      <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>

      <div className="flex">
        {/* Hình ảnh thẻ thành viên */}
        <div className="w-24 h-32 mr-4">
          <Image
            src={imageUrl}
            alt={`${membershipType} Membership Card`}
            className="object-cover rounded"
            width={96}
            height={128}
            layout="fixed"
            priority
          />
        </div>

        {/* Chi tiết đơn hàng */}
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold">{membershipType}</h3>

          <div className="text-blue-500 text-sm">
            Cơ sở: {location}
            {/* <BranchSelector initialBranch={location} /> */}
          </div>

          <p className="text-gray-500 text-sm">Thời gian: {duration}</p>
          <p className="text-lg font-bold mt-2">{formattedPrice}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
