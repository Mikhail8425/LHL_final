import React from 'react';
import { StripeProvider } from '@stripe/stripe-react-native';

function Stripe() {
  return (
    <StripeProvider
      publishableKey="pk_test_51Or5pFF2CbXydXO2O09mNBuzYgIROr3ECD5b6os8vTxXEYAvs2hGisvy5OnJ32nUg8mjA0n2HSdqzbdk3BjLMNNj00hx2kXOAT"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      // Your app code here
    </StripeProvider>
  );
}

export default Stripe;