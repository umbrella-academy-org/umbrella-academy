'use client';

export default function WalletHeader() {
  return (
    <div className="mb-6 animate-fade-in">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
        My Wallet 💰
      </h1>
      <p className="text-sm sm:text-base text-gray-600">
        Track your earnings, manage withdrawals, and view payment history.
      </p>
    </div>
  );
}