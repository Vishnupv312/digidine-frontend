export default function CancellationAndRefund() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">
        Cancellation and Refund Policy
      </h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Subscription Cancellations
      </h2>
      <p className="mb-4">
        Cancel anytime via dashboard. Access remains until end of billing cycle.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Refunds</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Monthly plans: Non-refundable.</li>
        <li>Annual plans: Refundable within 14 days of purchase.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. Custom Services</h2>
      <p className="mb-4">
        No refunds for custom design, setup, or domain services after
        initiation.
      </p>
      <p>For billing issues, contact billing@digidine.in.</p>
    </div>
  );
}
