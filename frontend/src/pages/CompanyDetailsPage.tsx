import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, MapPin, Phone, Mail, Building2, Users, Car, Wrench, Award, Shield, Clock, CheckCircle } from 'lucide-react';

const CompanyDetailsPage = () => {
  const navigate = useNavigate();

  const companyInfo = {
    name: "Vahan Bazar Private Limited",
    tagline: "Your Trusted Partner in Two-Wheeler Sales & Services",
    address: "No.408, 4th floor, Babu Khan Estates, Basheerbagh, Hyderabad, Telangana 500001",
    phone: "+91 8886630455",
    email: "contactus@vahaanbazar.com",
    cin: "U47912TS2023PTC172668",
    established: "2023",
    paidUpCapital: "₹1,00,000",
    services: [
      "New and Second-hand Bike Sales",
      "New and Second-hand Scooter Sales",
      "Vehicle Insurance Services",
      "EMI & Financing Options",
      "Vehicle Accessories & Spare Parts",
      "Maintenance and Repair Services",
      "Vehicle Valuation and Inspection",
      "Test Ride Facilities"
    ],
    features: [
      {
        icon: <Car className="w-8 h-8 text-blue-600" />,
        title: "Wide Vehicle Range",
        description: "From commuter bikes to premium sports bikes, we have all types of two-wheelers"
      },
      {
        icon: <Wrench className="w-8 h-8 text-green-600" />,
        title: "Maintenance Services",
        description: "Comprehensive maintenance and repair services for all vehicle types"
      },
      {
        icon: <Users className="w-8 h-8 text-purple-600" />,
        title: "Expert Team",
        description: "Experienced professionals with deep industry knowledge"
      },
      {
        icon: <Shield className="w-8 h-8 text-yellow-600" />,
        title: "Quality Assurance",
        description: "All vehicles go through rigorous quality checks before delivery"
      }
    ],
    stats: [
      {
        value: "1000+",
        label: "Vehicles Sold"
      },
      {
        value: "500+",
        label: "Happy Customers"
      },
      {
        value: "50+",
        label: "Brands Available"
      },
      {
        value: "24/7",
        label: "Support"
      }
    ]
  };

  const teamMembers = [
    {
      name: "Rajesh Kumar",
      position: "Founder & CEO",
      experience: "15+ years in automotive industry",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Priya Sharma",
      position: "Sales Director",
      experience: "10+ years in vehicle sales",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
    },
    {
      name: "Amit Patel",
      position: "Service Manager",
      experience: "12+ years in vehicle maintenance",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=200&h=200&q=80"
    }
  ];

  // Professional information about Vahan Bazaar's societal contributions
  const societalContributions = [
    {
      title: "Skill Development Programs",
      description: "We conduct regular training programs for youth in the automotive sector, providing hands-on experience with modern vehicle technologies and maintenance practices."
    },
    {
      title: "Women Empowerment Initiative",
      description: "Our platform actively promotes women's participation in the automotive industry by offering specialized training and employment opportunities."
    },
    {
      title: "Environmental Sustainability",
      description: "We promote eco-friendly transportation solutions and support the adoption of electric vehicles to reduce carbon emissions in urban areas."
    },
    {
      title: "Community Road Safety Campaigns",
      description: "We organize awareness programs on road safety, responsible riding, and vehicle maintenance to reduce accidents and promote safer communities."
    },
    {
      title: "Support for Local Businesses",
      description: "Our platform connects local service providers, spare parts suppliers, and repair workshops, fostering economic growth in the automotive ecosystem."
    },
    {
      title: "Affordable Mobility Solutions",
      description: "We work towards making reliable transportation accessible to all economic segments through our diverse range of quality pre-owned vehicles."
    }
  ];

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

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {companyInfo.stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
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
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
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

        {/* Societal Contributions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Commitment to Society</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {societalContributions.map((contribution, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200">
                <h3 className="text-lg font-semibold text-blue-600 mb-3">{contribution.title}</h3>
                <p className="text-gray-600">{contribution.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 border-4 border-blue-100">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                <p className="text-blue-600 mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.experience}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Website Link */}
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
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
      </main>
    </div>
  );
};

export default CompanyDetailsPage;