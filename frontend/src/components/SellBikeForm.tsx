import { useState } from 'react';
import { ArrowLeft, Upload, Bike as BikeIcon, Calendar, Gauge, DollarSign, FileText, Fuel, Zap } from 'lucide-react';
import apiService from '../services/api';

interface SellBikeFormProps {
  onBack: () => void;
  onSubmit?: (formData: BikeFormData) => void;
}

interface BikeFormData {
  name: string;
  brand: string;
  daysUsed: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | '';
  mileage: string;
  presentPrice: string;
  pastPrice: string;
  license: string;
  type: 'Petrol' | 'Electric' | '';
  year: string;
  engineCapacity: string;
  batteryCapacity: string;
  topSpeed: string;
}

// Type for backend submission
interface BikeSubmissionData {
  name: string;
  brand: string;
  daysUsed: number;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  mileage: number;
  presentPrice: number;
  pastPrice: number;
  license: string;
  type: 'Petrol' | 'Electric';
  year: number;
  engineCapacity?: string;
  batteryCapacity?: string;
  topSpeed: number;
  images?: string[];
  sellerName?: string;
  sellerEmail?: string;
  sellerPhone?: string;
  whatsapp?: string;
}

export default function SellBikeForm({ onBack, onSubmit }: SellBikeFormProps) {
  const [formData, setFormData] = useState<BikeFormData>({
    name: '',
    brand: '',
    daysUsed: '',
    condition: '',
    mileage: '',
    presentPrice: '',
    pastPrice: '',
    license: '',
    type: '',
    year: '',
    engineCapacity: '',
    batteryCapacity: '',
    topSpeed: ''
  });

  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: string[] = [];
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          if (event.target?.result) {
            newImages.push(event.target.result as string);
            if (newImages.length === files.length) {
              setImages(prev => [...prev, ...newImages]);
            }
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // Validate required fields
      if (!formData.type || !formData.condition) {
        throw new Error('Please fill in all required fields');
      }

      // Prepare the data for submission
      const submissionData: BikeSubmissionData = {
        name: formData.name,
        brand: formData.brand,
        daysUsed: parseInt(formData.daysUsed),
        condition: formData.condition as 'Excellent' | 'Good' | 'Fair' | 'Poor',
        mileage: parseFloat(formData.mileage),
        presentPrice: parseFloat(formData.presentPrice),
        pastPrice: parseFloat(formData.pastPrice),
        license: formData.license,
        type: formData.type as 'Petrol' | 'Electric',
        year: parseInt(formData.year),
        topSpeed: parseFloat(formData.topSpeed),
        images,
        sellerName: 'Current User', // This should come from user context
        sellerEmail: 'user@example.com', // This should come from user context
        sellerPhone: '1234567890', // This should come from user context
        whatsapp: '1234567890' // Optional
      };

      // Add engine or battery capacity based on type
      if (formData.type === 'Petrol' && formData.engineCapacity) {
        submissionData.engineCapacity = formData.engineCapacity;
      }
      if (formData.type === 'Electric' && formData.batteryCapacity) {
        submissionData.batteryCapacity = formData.batteryCapacity;
      }

      const response = await apiService.createBikeListing(submissionData as any);
      
      console.log('Bike listed successfully:', response.data);
      setSubmitSuccess(true);
      
      if (onSubmit) {
        onSubmit(formData);
      } else {
        // Show success message
        alert('Your bike has been listed successfully!');
        setTimeout(() => {
          onBack();
        }, 2000);
      }
    } catch (error: any) {
      console.error('Error submitting bike listing:', error);
      setSubmitError(error.message || 'Failed to submit bike listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-600 rounded-lg">
                <BikeIcon className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Sell Your Bike</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Form */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">List Your Bike for Sale</h2>
            <p className="text-gray-600">Fill in the details below to create your bike listing</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Bike Photos *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto text-gray-400 mb-4" size={48} />
                <div className="mb-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                      Choose Photos
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500">Upload up to 10 photos of your bike</p>
              </div>
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Bike ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <BikeIcon size={20} />
                Basic Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bike Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Royal Enfield Classic 350"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand *
                  </label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Royal Enfield"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Purchase *
                  </label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="2000"
                    max="2025"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="2023"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bike Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Type</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Usage & Condition */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar size={20} />
                Usage & Condition
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Days Used *
                  </label>
                  <input
                    type="number"
                    name="daysUsed"
                    value={formData.daysUsed}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="365"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Condition *
                  </label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Condition</option>
                    <option value="Excellent">Excellent</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mileage (km/l) *
                  </label>
                  <input
                    type="number"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="35"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Top Speed (km/h) *
                  </label>
                  <input
                    type="number"
                    name="topSpeed"
                    value={formData.topSpeed}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="120"
                  />
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign size={20} />
                Pricing
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Present Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="presentPrice"
                    value={formData.presentPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="180000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Purchase Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="pastPrice"
                    value={formData.pastPrice}
                    onChange={handleInputChange}
                    required
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="220000"
                  />
                </div>
              </div>
            </div>

            {/* Legal & Technical */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText size={20} />
                Legal & Technical Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    License Number *
                  </label>
                  <input
                    type="text"
                    name="license"
                    value={formData.license}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="UP32AB1234"
                  />
                </div>
                {formData.type === 'Petrol' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Engine Capacity
                    </label>
                    <input
                      type="text"
                      name="engineCapacity"
                      value={formData.engineCapacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="349cc"
                    />
                  </div>
                )}
                {formData.type === 'Electric' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Battery Capacity
                    </label>
                    <input
                      type="text"
                      name="batteryCapacity"
                      value={formData.batteryCapacity}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="2.9 kWh"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Error */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800">{submitError}</p>
              </div>
            )}

            {/* Submit Success */}
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800">Your bike has been listed successfully!</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex gap-4 pt-6">
              <button
                type="button"
                onClick={onBack}
                disabled={isSubmitting}
                className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Listing...
                  </>
                ) : (
                  'List My Bike'
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}