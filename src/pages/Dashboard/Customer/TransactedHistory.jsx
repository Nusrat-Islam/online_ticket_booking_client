const TransactedHistory = ({ payment }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition">
      <td className="py-3 px-4">{payment.transactionId?.id}</td>

      <td className="py-3 px-4 font-medium">
        ${payment.amount}
      </td>

      <td className="py-3 px-4">
        {payment.title}
      </td>

      <td className="py-3 px-4">
        {new Date(payment.paymentDate).toLocaleString()}
      </td>
    </tr>
  );
};

export default TransactedHistory;
