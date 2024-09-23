import CheckoutPage from '@/components/checkout/Checkout';
type CheckoutProds = {
  params: { id: string };
};
const Checkout = ({ params }: CheckoutProds) => (
  <div className="container mx-auto p-8">
    <CheckoutPage id={params.id} />
  </div>
);

export default Checkout;
