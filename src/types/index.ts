export interface CustomerAddressProds {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}

export interface CustomerInfoProps {
  type: string;
  title: string;
  className?: string;
}

export interface InvoiceDetailsProds {
  requestInvoice?: boolean;
  taxCode?: string;
  name?: string;
  phone?: string;
  address?: string;
  paymentMethod?: string;
}

export interface OrderDataProds {
  id?: string;
  orderId?: string | undefined;
  product?: ProductItemProds;
  customer?: CustomerAddressProds;
  items?: OrderItem[];
  paymentMethod?: string | null | undefined;
  totalAmount?: number;
  invoiceDetails?: InvoiceDetailsProds;
  orderCode?: string;
  qrCodeData?: string;
  idempotencyKey?: string;
  paymentUrl?: string | null | undefined;
}

export interface OrderDataResProds {
  orderId?: string;
  product?: ProductItemSingleProds;
  customer?: CustomerAddressProds;
  totalAmount?: number;
  paymentMethod?: string;
  invoiceRequested?: boolean;
  status?: string;
  qrCodeData?: string;
}

export interface ProductItemSingleProds {
  id: string;
  membershipType: string;
  location: string;
  duration: string;
  price: number;
  imageUrl: string;
}

export interface ResponseCheckoutProds {
  paymentUrl?: string;
  status?: string;
}

export interface OrderItem {
  id: string;
  membershipType: string;
  location: string;
  duration: string;
  price: number;
  imageUrl: string;
}

export interface Discount {
  id?: string; // Optional if you're using it only sometimes
  label: string;
  amount: number;
}

export interface ProductItemProds {
  productItem: {
    id: string;
    membershipType: string;
    location: string;
    duration: string;
    price: number;
    imageUrl: string;
  };
}
