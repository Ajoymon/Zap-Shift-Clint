import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';

const PaymentSuccess = () => {
  const axiosSecure = useAxiosSecur();
  const [searchParams] = useSearchParams();
  const [paymentInfo, setpaymentInfo] = useState({});
  const sessionId = searchParams.get('session_id');
  console.log(sessionId);
  useEffect(() => {
    if (sessionId) {
      axiosSecure.patch(`payment-success?session_id=${sessionId}`).then(res => {
        console.log('Payment response:', res.data);
        setpaymentInfo({
          transactionId: res.data.transactionId,
          trackingId: res.data.trackingId,
        });
      });
    }
  }, [sessionId, axiosSecure]);

  return (
    <div>
      <h2 className="text-4xl text-green-600">Payment Successful!</h2>
      <p>your TransactionId: {paymentInfo.transactionId}</p>
      <p>your parcel Tracking id: {paymentInfo.trackingId}</p>
    </div>
  );
};

export default PaymentSuccess;
