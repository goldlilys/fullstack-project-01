'use strict';

module.exports = function(account) {
  account.validatesUniquenessOf('cust_name', {
    message: 'customer name is not unique'
  });
  account.validatesInclusionOf('account_type', {
    in: ['federal', 'enterprise', 'commercial'],
    message: 'not a valid account type'
  });
};
