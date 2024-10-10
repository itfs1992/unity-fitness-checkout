'use client';
import { CreateOrderInput, orderFormSchema } from '@/validators/create-order.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { toast } from 'react-toastify';
import { postOrder } from 'src/api/order';
import { productData } from 'src/data/products-data';

import CustomerInfo from '@/components/checkout/CustomerInfo';
import InvoiceDetails from '@/components/checkout/InvoiceDetails';
import PaymentMethod from '@/components/checkout/PaymentMethod';
import PaymentSummary from '@/components/checkout/PaymentSummary';
import ProductItem from '@/components/checkout/ProductItem';

interface CheckoutPageProps {
  id?: string;
}

const CheckoutPage = ({ id }: CheckoutPageProps) => {
  const router = useRouter();
  const methods = useForm<CreateOrderInput>({
    mode: 'onChange',
    resolver: zodResolver(orderFormSchema),
    defaultValues: { paymentMethod: 'payos' }
  });

  const productItem = productData.find((item) => item.id === id);
  const [finalPrice] = useState<number>(productItem ? productItem.price : 0);
  const [idempotencyKey, setIdempotencyKey] = useState<string>('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedKey = sessionStorage.getItem('idempotencyKey');
    if (storedKey) {
      setIdempotencyKey(storedKey);
    } else {
      const newKey = crypto.randomUUID();
      sessionStorage.setItem('idempotencyKey', newKey);
      setIdempotencyKey(newKey);
    }
  }, []);
  if (!productItem) {
    toast.error('Sản phẩm không tồn tại');

    return <div>Sản phẩm không tồn tại</div>;
  }

  const handleOrderSubmission = async (formData: CreateOrderInput) => {
    if (loading) return;
    setLoading(true);
    const orderData = {
      idempotencyKey: idempotencyKey,
      customer: formData.customer,
      items: [productItem],
      paymentMethod: formData.paymentMethod,
      totalAmount: finalPrice,
      invoiceDetails: formData.invoiceDetails
    };

    toast.success('Order processing...');

    try {
      const result = await postOrder(orderData);
      if (result?.paymentUrl) {
        sessionStorage.removeItem('idempotencyKey');
        router.push(result.paymentUrl);
      } else {
        throw new Error('Failed to process payment URL.');
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Tạo đơn hàng thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleOrderSubmission)} className="flex flex-col">
          <ProductItem {...productItem} />
          <CustomerInfo type="customer" title="Thông tin khách hàng" />
          <PaymentMethod />
          <InvoiceDetails type="invoiceDetails" title="Thông tin liên hệ và xuất hóa đơn" />
          <PaymentSummary initialPrice={finalPrice} />
        </form>
      </FormProvider>
    </div>
  );
};

export default CheckoutPage;
