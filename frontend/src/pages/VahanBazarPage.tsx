import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Mail, Building2, Users, Car, Wrench } from 'lucide-react';

const VahanBazarPage = () => {
  const navigate = useNavigate();

  const companyInfo = {
    name: "Vahan Bazar Private Limited",
    tagline: "Your Trusted Partner in Construction Equipment",
    address: "No.408, 4th floor, Babu Khan Estates, Basheerbagh, Hyderabad, Telangana 500001",
    phone: "+91 8886630455",
    email: "contactus@vahaanbazar.com",
    cin: "U47912TS2023PTC172668",
    established: "2023",
    paidUpCapital: "₹1,00,000",
    services: [
      "Second-hand construction equipment sales",
      "Equipment rental services",
      "Maintenance and repair services",
      "Equipment valuation and inspection",
      "Spare parts supply"
    ],
    features: [
      {
        icon: <Car className="w-8 h-8 text-blue-600" />,
        title: "Wide Equipment Range",
        description: "From excavators to loaders, we have all types of construction machinery"
      },
      {
        icon: <Wrench className="w-8 h-8 text-green-600" />,
        title: "Maintenance Services",
        description: "Comprehensive maintenance and repair services for all equipment"
      },
      {
        icon: <Users className="w-8 h-8 text-purple-600" />,
        title: "Expert Team",
        description: "Experienced professionals with deep industry knowledge"
      },
      {
        icon: <Building2 className="w-8 h-8 text-yellow-600" />,
        title: "Reliable Partnerships",
        description: "Trusted by construction companies across Telangana"
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
                <span className="ml-1 text-gray-600">Back</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {companyInfo.name}
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{companyInfo.name}</h1>
            <p className="text-xl text-gray-600 mb-6">{companyInfo.tagline}</p>
            <div className="flex items-center justify-center text-gray-700">
              <MapPin className="w-5 h-5 mr-2" />
              <p>{companyInfo.address}</p>
            </div>
          </div>
          <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 border-2 border-dashed w-full h-64 flex items-center justify-center">
            <img 
              src="https://www.vahaanbazar.com/Images/slide/banner_2024.jpg" 
              alt="Vahan Bazar Banner" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.classList.remove('bg-gray-200', 'border-2', 'border-dashed');
                  parent.classList.add('bg-gradient-to-r', 'from-blue-600', 'to-purple-600');
                  parent.innerHTML = `
                    <div class="text-center text-white p-8">
                      <h1 class="text-3xl font-bold mb-2">Banner Image</h1>
                      <p class="text-lg">https://www.vahaanbazar.com/Images/slide/banner_2024.jpg</p>
                    </div>
                  `;
                }
              }}
            />
          </div>
        </div>

        {/* Company Information */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-semibold">Phone</p>
                  <p>{companyInfo.phone}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-semibold">Email</p>
                  <p>{companyInfo.email}</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-blue-600 mt-1 mr-3" />
                <div>
                  <p className="font-semibold">Address</p>
                  <p>{companyInfo.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-lg shadow-md p-6 lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Company Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">CIN</p>
                <p className="font-semibold">{companyInfo.cin}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Established</p>
                <p className="font-semibold">{companyInfo.established}</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600">Paid Up Capital</p>
                <p className="font-semibold">{companyInfo.paidUpCapital}</p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-3">Our Services</h3>
            <ul className="space-y-2">
              {companyInfo.services.map((service, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <span>{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Features */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyInfo.features.map((feature, index) => (
              <div key={index} className="text-center p-4 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Location</h2>
          <div className="w-full h-96 rounded-xl overflow-hidden mb-4 relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.277500554853!2d78.4844403750939!3d17.44487698341001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9a55c9d5d555%3A0x1234567890abcdef!2sVahan%20Bazar%20Private%20Limited%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vahan Bazar Location in Hyderabad, Telangana"
            ></iframe>
            <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-lg shadow-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-bold">Hyderabad</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            We are located in the heart of Hyderabad, making it convenient for our customers across Telangana to reach us.
          </p>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-700 mb-2">For more information, visit our website:</p>
            <a 
              href="https://www.vahaanbazar.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium underline"
            >
              www.vahaanbazar.com
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VahanBazarPage;