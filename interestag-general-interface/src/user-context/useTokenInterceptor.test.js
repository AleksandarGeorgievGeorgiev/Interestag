import React from 'react';
import axios from 'axios';

import { useTokenInterceptor } from './useTokenInterceptor';

test('interceptor returns error', () => {
  const { attach } = useTokenInterceptor();
  const baseUrl = 'http://192.168.0.101:8000';

  axios.post(baseUrl)
    .then((res) => {
      console.log('res', res);
    }).catch((error) => {
      console.log('err', error);
    });
});
