'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();
  const [paymentData, setPaymentData] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
    streetAddress: '',
    city: '',
    country: 'australia',
  });
  const [errors, setErrors] = useState({
    nameOnCard: '',
    cardNumber: '',
    cvv: '',
    expiry: '',
    streetAddress: '',
    city: '',
    country: '',
  });

  const handleChange = (field: string, value: string) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add spaces every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    return formatted.slice(0, 19); // Max 16 digits + 3 spaces
  };

  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return digits.slice(0, 2) + '/' + digits.slice(2, 4);
    }
    return digits;
  };

  const handleCardNumberChange = (value: string) => {
    const formatted = formatCardNumber(value);
    handleChange('cardNumber', formatted);
  };

  const handleExpiryChange = (value: string) => {
    const formatted = formatExpiry(value);
    handleChange('expiry', formatted);
  };

  const validateForm = () => {
    const newErrors = {
      nameOnCard: '',
      cardNumber: '',
      cvv: '',
      expiry: '',
      streetAddress: '',
      city: '',
      country: '',
    };

    if (!paymentData.nameOnCard.trim()) {
      newErrors.nameOnCard = 'Name on card is required';
    }

    const cardDigits = paymentData.cardNumber.replace(/\D/g, '');
    if (!cardDigits) {
      newErrors.cardNumber = 'Card number is required';
    } else if (cardDigits.length !== 16) {
      newErrors.cardNumber = 'Card number must be 16 digits';
    }

    if (!paymentData.cvv) {
      newErrors.cvv = 'CVV is required';
    } else if (paymentData.cvv.length !== 3) {
      newErrors.cvv = 'CVV must be 3 digits';
    }

    if (!paymentData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^\d{2}\/\d{2}$/.test(paymentData.expiry)) {
      newErrors.expiry = 'Invalid expiry format (MM/YY)';
    }

    if (!paymentData.streetAddress.trim()) {
      newErrors.streetAddress = 'Street address is required';
    }

    if (!paymentData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!paymentData.country) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    console.log('Payment data:', paymentData);
    // Process payment and complete onboarding
    localStorage.setItem('paymentCompleted', 'true');
    router.push('/auth/student/roadmap');
  };

  const getCardType = (cardNumber: string) => {
    const digits = cardNumber.replace(/\D/g, '');
    if (digits.startsWith('4')) return 'visa';
    if (digits.startsWith('5') || digits.startsWith('2')) return 'mastercard';
    return 'unknown';
  };

  const cardType = getCardType(paymentData.cardNumber);

  return (
    <div className="flex h-screen">
      {/* Left side - Form */}
      <div className="flex flex-[2] flex-col justify-between p-8 bg-white overflow-y-scroll">
        <div className="flex flex-col flex-1 max-w-md mx-auto w-full">
          {/* Go back button */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Go back
          </button>

          <div className="flex flex-col items-center justify-center flex-1">
            {/* Logo */}
            <div className="mb-8">
              <div className="w-16 h-16 bg-yellow-600 rounded-2xl flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              Pay & Start Learning
            </h1>
            <p className="text-gray-500 mb-8 text-center">
              Make your payment to unlock full access to your mentor and course materials.
            </p>

            {/* Pricing */}
            <div className="w-full p-4 bg-gray-50 rounded-lg border mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">One Time Payment</h3>
                  <p className="text-sm text-gray-600">Pay once to unlock your mentorship plan</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900">RWF 75,000</div>
                  <div className="text-sm text-gray-600">per year</div>
                </div>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleContinue} className="w-full space-y-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Card details</h3>

              {/* Name on card */}
              <div>
                <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 mb-2">
                  Name on card
                </label>
                <input
                  type="text"
                  id="nameOnCard"
                  value={paymentData.nameOnCard}
                  onChange={(e) => handleChange('nameOnCard', e.target.value)}
                  placeholder="Olivia Rhye"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                    errors.nameOnCard ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                />
                {errors.nameOnCard && <p className="mt-1 text-sm text-red-500">{errors.nameOnCard}</p>}
              </div>

              {/* Card number, CVV, Expiry */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                    Card number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="1234 1234 1234 1234"
                      className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required
                    />
                    {/* Card type icon */}
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      {cardType === 'mastercard' && (
                        <div className="flex gap-1">
                          <div className="w-4 h-4 bg-red-500 rounded-full opacity-80"></div>
                          <div className="w-4 h-4 bg-yellow-500 rounded-full opacity-80 -ml-2"></div>
                        </div>
                      )}
                      {cardType === 'visa' && (
                        <div className="text-blue-600 font-bold text-xs">VISA</div>
                      )}
                    </div>
                  </div>
                  {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={paymentData.cvv}
                    onChange={(e) => handleChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 3))}
                    placeholder="•••"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                    }`}
                    maxLength={3}
                    required
                  />
                  {errors.cvv && <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>}
                </div>
              </div>

              {/* Expiry */}
              <div className="w-32">
                <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry
                </label>
                <input
                  type="text"
                  id="expiry"
                  value={paymentData.expiry}
                  onChange={(e) => handleExpiryChange(e.target.value)}
                  placeholder="06/2024"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                    errors.expiry ? 'border-red-500' : 'border-gray-300'
                  }`}
                  maxLength={5}
                  required
                />
                {errors.expiry && <p className="mt-1 text-sm text-red-500">{errors.expiry}</p>}
              </div>

              {/* Address fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Street address
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    value={paymentData.streetAddress}
                    onChange={(e) => handleChange('streetAddress', e.target.value)}
                    placeholder="100 Smith Street"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                      errors.streetAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.streetAddress && <p className="mt-1 text-sm text-red-500">{errors.streetAddress}</p>}
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={paymentData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    placeholder="Collingwood"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent text-gray-900 placeholder:text-gray-400 ${
                      errors.city ? 'border-red-500' : 'border-gray-300'
                    }`}
                    required
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city}</p>}
                </div>
              </div>

              {/* Country */}
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                  Country
                </label>
                <select
                  id="country"
                  value={paymentData.country}
                  onChange={(e) => handleChange('country', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:border-transparent appearance-none bg-white text-gray-900 ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                >
                  <option value="">Select country</option>
                  <option value="australia">🇦🇺 Australia</option>
                  <option value="us">🇺🇸 United States</option>
                  <option value="uk">🇬🇧 United Kingdom</option>
                  <option value="canada">🇨🇦 Canada</option>
                  <option value="germany">🇩🇪 Germany</option>
                  <option value="france">🇫🇷 France</option>
                </select>
                {errors.country && <p className="mt-1 text-sm text-red-500">{errors.country}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-yellow-600 text-white py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors mt-6"
              >
                Continue
              </button>

              {/* Progress dots */}
              <div className="flex justify-center gap-2 pt-4">
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
                <div className="w-8 h-2 bg-yellow-600 rounded-full"></div>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500">
          © Dreamize 2025
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:block flex-[1] relative overflow-hidden">
        <Image
          src="/auth/login/image.png"
          alt="Underwater scene with pebbles"
          fill
          className="object-cover object-center scale-105"
          priority
          quality={100}
        />
      </div>
    </div>
  );
}