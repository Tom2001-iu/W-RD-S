import { useEffect } from 'react';

// Live key as requested.
const RAZORPAY_KEY_ID = 'rzp_live_RMwIkyULpkLkwP';

// Add Razorpay to the window object for TypeScript support
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface RazorpayOptions {
  amount: number;
  name: string;
  description: string;
  onSuccess?: (response: any) => void;
}

const useRazorpay = () => {
  // Effect to load the Razorpay script
  useEffect(() => {
    const scriptId = 'razorpay-checkout-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const displayRazorpay = async (options: RazorpayOptions) => {
    if (!window.Razorpay) {
      alert('Razorpay SDK not loaded. Please check your internet connection and try again.');
      return;
    }

    const paymentOptions = {
      key: RAZORPAY_KEY_ID,
      amount: options.amount * 100, // Amount is in currency subunits. e.g., cents for USD.
      currency: 'USD',
      name: options.name,
      description: options.description,
      handler: function (response: any) {
        console.log('Razorpay Response:', response);
        if (options.onSuccess) {
            options.onSuccess(response);
        } else {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        }
      },
      prefill: {
        name: 'Test User',
        email: 'test.user@example.com',
        contact: '9999999999',
      },
      notes: {
        platform: 'Monochrome Learn',
      },
      theme: {
        color: '#121212',
      },
      modal: {
        ondismiss: function() {
          console.log('Checkout form closed');
        }
      }
    };

    const rzp = new window.Razorpay(paymentOptions);
    rzp.open();
  };

  return displayRazorpay;
};

export default useRazorpay;