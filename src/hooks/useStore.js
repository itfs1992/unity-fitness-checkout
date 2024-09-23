import { create } from 'zustand';

function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  return regex.test(email.toLowerCase());
}

const useStore = create((set) => ({
  formData: {
    customer: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    items: [{ productId: 1, quantity: 1 }],
    paymentMethod: 'bank_transfer',
    totalAmount: 0,
    invoiceDetails: {
      requestInvoice: false,
      phone: '',
      name: '',
      address: ''
    }
  },
  errors: {},

  updateFormData: (field, subField, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [field]: {
          ...state.formData[field],
          [subField]: value
        }
      }
    })),

  validateField: (field, subField, value) =>
    set((state) => {
      let newErrors = { ...state.errors };
      if (
        field === 'customer' &&
        field === 'invoiceDetails' &&
        subField === 'email' &&
        !validateEmail(value)
      ) {
        newErrors[field] = { ...newErrors[field], [subField]: 'Email is invalid' };
      } else {
        if (newErrors[field]) newErrors[field][subField] = ''; // Clear the error if the validation passes
      }

      return {
        errors: newErrors
      };
    }),

  applyDiscount: (code) => {
    const validCodes = { SAVE30: 30000, ZALO30: 30000 };
    const discountValue = validCodes[code] || 0;
    if (discountValue > 0) {
      set((state) => ({
        formData: {
          ...state.formData,
          totalAmount: state.formData.totalAmount - discountValue,
          codeDiscount: discountValue
        }
      }));
    } else {
      alert('Invalid discount code');
    }
  }
}));

export default useStore;
