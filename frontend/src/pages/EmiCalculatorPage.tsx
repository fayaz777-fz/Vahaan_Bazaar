import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Calculator, Calendar, CreditCard, Wallet, Percent, TrendingUp, CheckCircle, FileText, Loader2 } from 'lucide-react';
import apiService from '../services/api';
import { EMICalculation, ApiError } from '../types';

const EmiCalculatorPage = () => {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(24);
  const [downPayment, setDownPayment] = useState(20000);
  const [processingFee, setProcessingFee] = useState(1000);
  const [emiCalculation, setEmiCalculation] = useState<EMICalculation | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationError, setCalculationError] = useState('');

  // Sample vehicles for showcase
  const vehicles = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      price: 177000,
      category: 'Bike'
    },
    {
      id: 2,
      name: 'Honda Activa 6G',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      price: 74536,
      category: 'Scooter'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      price: 184000,
      category: 'Bike'
    },
    {
      id: 4,
      name: 'TVS Jupiter',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      price: 73400,
      category: 'Scooter'
    }
  ];

  // Calculate EMI using backend API
  const calculateEMI = async () => {
    setIsCalculating(true);
    setCalculationError('');
    
    try {
      const principal = loanAmount - downPayment;
      const response = await apiService.calculateEMI({
        principal,
        rate: interestRate,
        tenure: loanTenure
      });
      
      setEmiCalculation(response.data);
    } catch (error) {
      console.error('Failed to calculate EMI:', error);
      const apiError = error as ApiError;
      setCalculationError(apiError.message || 'Failed to calculate EMI. Please try again.');
      
      // Fallback to local calculation
      const principal = loanAmount - downPayment;
      const ratePerMonth = interestRate / 12 / 100;
      
      let emi;
      if (ratePerMonth === 0) {
        emi = principal / loanTenure;
      } else {
        emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, loanTenure) / 
              (Math.pow(1 + ratePerMonth, loanTenure) - 1);
      }
      
      const totalAmount = emi * loanTenure;
      const totalInterest = totalAmount - principal;
      
      setEmiCalculation({
        emi: Math.round(emi),
        totalAmount: Math.round(totalAmount),
        totalInterest: Math.round(totalInterest),
        principal,
        rate: interestRate,
        tenure: loanTenure
      });
    } finally {
      setIsCalculating(false);
    }
  };

  // Auto-calculate when values change
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      calculateEMI();
    }, 500); // Debounce API calls
    
    return () => clearTimeout(timeoutId);
  }, [loanAmount, interestRate, loanTenure, downPayment]);

  // Get calculated values
  const emi = emiCalculation?.emi || 0;
  const totalInterest = emiCalculation?.totalInterest || 0;
  const totalPayment = (emi * loanTenure) + downPayment + processingFee;

  // EMI breakdown data for chart
  const emiBreakdown = [
    { name: 'Principal', value: loanAmount - downPayment, color: '#4F46E5' },
    { name: 'Interest', value: totalInterest, color: '#F97316' },
    { name: 'Processing Fee', value: processingFee, color: '#10B981' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="ml-1">Back</span>
              </button>
              <h1 className="text-3xl font-bold">VAHAAN BAZAAR - EMI CALCULATOR</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 mb-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">Plan Your Purchase with Easy EMI</h2>
            <p className="text-xl mb-6">
              Calculate your monthly payments and find the best financing options for your dream bike or scooter.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* EMI Calculator */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">EMI Calculator</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicle Price (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={loanAmount}
                      onChange={(e) => setLoanAmount(Number(e.target.value))}
                      className="pl-8 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Down Payment (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="pl-8 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interest Rate (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      %
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Loan Tenure (Months)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={loanTenure}
                      onChange={(e) => setLoanTenure(Number(e.target.value))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
                      months
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Fee (₹)
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                      ₹
                    </span>
                    <input
                      type="number"
                      value={processingFee}
                      onChange={(e) => setProcessingFee(Number(e.target.value))}
                      className="pl-8 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              
              {/* EMI Results */}
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <h4 className="text-xl font-bold text-gray-800 mb-4">EMI Breakdown</h4>
                
                {calculationError && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm mb-4">
                    {calculationError}
                  </div>
                )}
                
                {isCalculating ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                    <span className="ml-2 text-gray-600">Calculating EMI...</span>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-blue-600">₹{emi.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Monthly EMI</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-orange-600">₹{totalInterest.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Interest</div>
                      </div>
                      <div className="bg-white p-4 rounded-lg shadow">
                        <div className="text-2xl font-bold text-green-600">₹{totalPayment.toLocaleString()}</div>
                        <div className="text-sm text-gray-600">Total Payment</div>
                      </div>
                    </div>
                    
                    {/* EMI Visualization */}
                    <div className="mb-6">
                      <h5 className="font-semibold text-gray-800 mb-2">Payment Breakdown</h5>
                      <div className="flex h-8 rounded-lg overflow-hidden">
                        {emiBreakdown.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-center text-xs text-white font-medium"
                            style={{
                              width: `${(item.value / (loanAmount - downPayment + totalInterest + processingFee)) * 100}%`,
                              backgroundColor: item.color
                            }}
                          >
                            {item.name}
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        {emiBreakdown.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div
                              className="w-3 h-3 mr-1 rounded-full"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <span>{item.name}: ₹{item.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                <button 
                  className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 px-4 rounded-lg hover:from-green-600 hover:to-green-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCalculating || !emi}
                >
                  {isCalculating ? 'Calculating...' : 'Apply for Loan'}
                </button>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Payment Methods</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200">
                  <div className="flex items-center mb-3">
                    <CreditCard className="w-8 h-8 text-blue-600 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Bank Loan</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Get financing through our partnered banks with competitive interest rates.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Instant approval
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Flexible tenure
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Minimal documentation
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors duration-200">
                  <div className="flex items-center mb-3">
                    <Wallet className="w-8 h-8 text-green-600 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Spot Purchase</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Buy your vehicle outright with cash and get exclusive discounts.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      5% cash discount
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Free accessories worth ₹5,000
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Extended warranty
                    </li>
                  </ul>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition-colors duration-200">
                  <div className="flex items-center mb-3">
                    <TrendingUp className="w-8 h-8 text-purple-600 mr-2" />
                    <h4 className="text-lg font-semibold text-gray-800">Zero Interest EMI</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Special financing options with no interest charges for select models.
                  </p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600">
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      No interest charges
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      No processing fees
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      Limited period offer
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Vehicle Selection */}
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Select Your Vehicle</h3>
              
              <div className="space-y-4">
                {vehicles.map((vehicle) => (
                  <div 
                    key={vehicle.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition-colors duration-200 cursor-pointer"
                    onClick={() => setLoanAmount(vehicle.price)}
                  >
                    <div className="flex items-center">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold text-gray-800">{vehicle.name}</h4>
                        <p className="text-blue-600 font-bold">₹{vehicle.price.toLocaleString()}</p>
                        <span className="text-xs text-gray-500">{vehicle.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Loan Details Summary */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold text-gray-800 mb-3">Loan Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Vehicle Price</span>
                    <span className="font-medium">₹{loanAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment</span>
                    <span className="font-medium">₹{downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium">₹{(loanAmount - downPayment).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium">{interestRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Tenure</span>
                    <span className="font-medium">{loanTenure} months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-medium">₹{processingFee.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between font-bold">
                      <span>Total Payment</span>
                      <span>₹{totalPayment.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-center text-gray-800 mb-8">Why Choose Our Financing?</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Percent className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Competitive Rates</h4>
              <p className="text-gray-600">Best interest rates from top financial institutions</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Transparent Process</h4>
              <p className="text-gray-600">No hidden charges or surprise fees</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Quick Approval</h4>
              <p className="text-gray-600">Get loan approval in just 24 hours</p>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-yellow-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">Minimal Documentation</h4>
              <p className="text-gray-600">Simple paperwork with digital verification</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EmiCalculatorPage;