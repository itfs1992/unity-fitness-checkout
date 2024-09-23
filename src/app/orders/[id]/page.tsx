import { fetchOrderDetails } from 'src/api/order';
import { productData } from 'src/data/products-data';

import PaymentSuccessCard from '@/components/checkout/PaymentSuccessCard';
import ProductItem from '@/components/checkout/ProductItem';

type OrderDetailPageProps = {
  params: { id: string };
  searchParams: {
    code: string;
    status: string;
    cancel: string;
  };
};

export default async function OrderDetailPage({ params, searchParams }: OrderDetailPageProps) {
  const orderDetails = await fetchOrderDetails(params.id);
  if (!orderDetails) {
    return <p>Không tìm thấy chi tiết đơn hàng.</p>;
  }
  const { status } = searchParams;
  const { customer, qrCodeData, product } = orderDetails;
  const productItem = productData.find((item) => item.id === product?.id);
  if (!productItem || productItem.id === undefined) {
    return <p>Product information is missing or incomplete.</p>;
  }

  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      <div className="col-span-3 text-center py-2">
        {(status === 'PAID' || orderDetails.status == 'paid') && (
          <div>
            <svg
              className="w-12 h-12 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="66"
              height="66"
              viewBox="0 0 66 66"
              fill="none"
            >
              <g clipPath="url(#clip0_1_36876)">
                <path
                  d="M47.1075 24.1725C47.2175 24.2825 47.3137 24.42 47.3962 24.585C47.4787 24.75 47.52 24.915 47.52 25.08C47.52 25.245 47.4787 25.41 47.3962 25.575C47.3137 25.74 47.2175 25.8775 47.1075 25.9875L28.6275 44.4675C28.5175 44.5775 28.38 44.6737 28.215 44.7562C28.05 44.8387 27.885 44.88 27.72 44.88C27.555 44.88 27.39 44.8387 27.225 44.7562C27.06 44.6737 26.9225 44.5775 26.8125 44.4675L18.8925 36.5475C18.7825 36.4375 18.6863 36.3 18.6037 36.135C18.5212 35.97 18.48 35.805 18.48 35.64C18.48 35.255 18.6037 34.9388 18.8512 34.6912C19.0988 34.4437 19.415 34.32 19.8 34.32C19.965 34.32 20.13 34.3612 20.295 34.4437C20.46 34.5262 20.5975 34.6225 20.7075 34.7325L27.72 41.6625L45.2925 24.1725C45.4025 24.0625 45.54 23.9663 45.705 23.8837C45.87 23.8013 46.035 23.76 46.2 23.76C46.365 23.76 46.53 23.8013 46.695 23.8837C46.86 23.9663 46.9975 24.0625 47.1075 24.1725ZM66 33C66 37.565 65.1475 41.855 63.4425 45.87C61.6825 49.885 59.3175 53.3775 56.3475 56.3475C53.3775 59.3175 49.885 61.6825 45.87 63.4425C41.855 65.1475 37.565 66 33 66C28.435 66 24.145 65.1475 20.13 63.4425C16.115 61.6825 12.6225 59.3175 9.6525 56.3475C6.68248 53.3775 4.31751 49.885 2.5575 45.87C0.85249 41.855 0 37.565 0 33C0 28.435 0.85249 24.145 2.5575 20.13C4.31751 16.115 6.68248 12.6225 9.6525 9.6525C12.6225 6.68248 16.115 4.31751 20.13 2.5575C24.145 0.85249 28.435 0 33 0C37.565 0 41.855 0.87999 45.87 2.64C49.83 4.34501 53.3087 6.69623 56.3062 9.69375C59.3038 12.6913 61.655 16.17 63.36 20.13C65.12 24.145 66 28.435 66 33ZM63.36 33C63.36 28.82 62.5625 24.8875 60.9675 21.2025C59.3725 17.5175 57.2 14.3 54.45 11.55C51.7 8.79999 48.4825 6.62751 44.7975 5.0325C41.1125 3.43749 37.18 2.64 33 2.64C28.82 2.64 24.8875 3.43749 21.2025 5.0325C17.5175 6.62751 14.3 8.79999 11.55 11.55C8.79999 14.3 6.62751 17.5175 5.0325 21.2025C3.43749 24.8875 2.64 28.82 2.64 33C2.64 37.18 3.43749 41.1125 5.0325 44.7975C6.62751 48.4825 8.79999 51.7 11.55 54.45C14.3 57.2 17.5175 59.3725 21.2025 60.9675C24.8875 62.5625 28.82 63.36 33 63.36C37.18 63.36 41.1125 62.5625 44.7975 60.9675C48.4825 59.3725 51.7 57.2 54.45 54.45C57.2 51.7 59.3725 48.4825 60.9675 44.7975C62.5625 41.1125 63.36 37.18 63.36 33Z"
                  fill="#32B34A"
                />
              </g>
              <defs>
                <clipPath id="clip0_1_36876">
                  <rect width="66" height="66" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <h2 className="text-xl font-semibold text-[#32B34A]">THANH TOÁN THÀNH CÔNG</h2>
          </div>
        )}
      </div>
      <div className="col-span-3">
        <div className="max-w-4xl mx-auto ">
          <ProductItem {...productItem} />
          {customer && qrCodeData && (
            <PaymentSuccessCard customer={customer} qrCodeData={qrCodeData} />
          )}
        </div>
      </div>
    </div>
  );
}
