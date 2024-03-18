# limonovp-mode

limonovp-mode is a Node.js module that provides a set of utility functions for interacting with the Stellar blockchain. This module includes functions for retrieving account information and sending payments.

## Installation

To install Stellar Utils, use npm: `npm install limonovp-mode`

## Usage
```javascript
const { getAccountInfo, sendPayment } = require('stellar-utils');

// Get account information
getAccountInfo('PUBLIC_KEY')
  .then(account => {
    console.log('Account Information:', account);
  })
  .catch(error => {
    console.error('Error:', error);
  });

// Send payment
sendPayment('SECRET_KEY', 'DESTINATION_PUBLIC_KEY', '10')
  .then(result => {
    console.log('Payment sent successfully:', result);
  })
  .catch(error => {
    console.error('Error:', error);
  });
```

