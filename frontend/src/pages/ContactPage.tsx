import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Users, 
  Star,
  ArrowLeft,
  ExternalLink,
  Shield,
  Zap
} from 'lucide-react';
import ContactForm from '../components/ContactForm';
import { Contact } from '../types';

const ContactPage: React.FC = () => {
  const handleContactSuccess = (contact: Contact) => {
    console.log('Contact submitted successfully:', contact);
    // You can add additional success handling here, like analytics tracking
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Us',
      details: [
        'VAHAAN BAZAAR Headquarters',
        '123 Auto Street, Vehicle District',
        'Metro City, State 12345',
        'India'
      ],
      action: {
        text: 'Get Directions',
        link: '#',
        external: true
      }
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [
        'Customer Support: +91 98765 43210',
        'Sales Inquiries: +91 98765 43211',
        'Technical Support: +91 98765 43212',
        'Available 24/7'
      ],
      action: {
        text: 'Call Now',
        link: 'tel:+919876543210',
        external: false
      }
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [
        'General: info@vahaanbazaar.com',
        'Support: support@vahaanbazaar.com',
        'Sales: sales@vahaanbazaar.com',
        'Partnerships: partners@vahaanbazaar.com'
      ],
      action: {
        text: 'Send Email',
        link: 'mailto:info@vahaanbazaar.com',
        external: false
      }
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: 11:00 AM - 5:00 PM',
        'Online Support: 24/7'
      ],
      action: {
        text: 'Live Chat',
        link: '#',
        external: false
      }
    }
  ];

  const features = [
    {
      icon: MessageCircle,
      title: 'Instant Response',
      description: 'Get quick responses to your queries within 24 hours'
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: 'Our experienced team is here to help you find the perfect vehicle'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your information is protected with enterprise-grade security'
    },
    {
      icon: Zap,
      title: 'Fast Resolution',
      description: 'We prioritize urgent issues and resolve them quickly'
    }
  ];

  const faqs = [
    {
      question: 'How do I list my vehicle for sale?',
      answer: 'Simply visit our "Sell" page, choose between bikes or scooters, fill out the listing form with your vehicle details, and submit. Our team will review and publish your listing within 24 hours.'
    },
    {
      question: 'Is there a fee for listing vehicles?',
      answer: 'Basic listings are completely free! We offer premium listing options with additional features like featured placement and extended visibility for a small fee.'
    },
    {
      question: 'How do I contact sellers directly?',
      answer: 'Each listing includes the seller\'s contact information. You can call, email, or use WhatsApp to connect directly with the seller to arrange viewings and negotiations.'
    },
    {
      question: 'Do you provide vehicle inspection services?',
      answer: 'Yes! We offer professional vehicle inspection services to help buyers make informed decisions. Contact our support team to schedule an inspection.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We support various payment methods including bank transfers, UPI, credit/debit cards, and financing options through our partner banks.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
            <div className="h-6 w-px bg-gray-300" />
            <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Get in Touch with Us
          </h2>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Have questions about buying or selling vehicles? We're here to help you every step of the way.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span>4.8/5 Customer Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/30 px-4 py-2 rounded-full">
              <MessageCircle className="w-4 h-4" />
              <span>24/7 Support Available</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Info Grid */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{info.title}</h3>
              <div className="space-y-1 mb-4">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-sm text-gray-600">{detail}</p>
                ))}
              </div>
              <a
                href={info.action.link}
                target={info.action.external ? '_blank' : undefined}
                rel={info.action.external ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                {info.action.text}
                {info.action.external && <ExternalLink className="w-4 h-4" />}
              </a>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Support?</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing exceptional customer service that goes above and beyond your expectations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm onSuccess={handleContactSuccess} showTitle={false} />
          </div>

          {/* FAQ Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index}>
                    <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 text-center">
                  Still have questions?{' '}
                  <Link to="/help" className="text-blue-600 hover:text-blue-700 font-medium">
                    Visit our Help Center
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Buy or Sell?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied customers who trust VAHAAN BAZAAR for their vehicle needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/sell"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sell Your Vehicle
            </Link>
            <Link
              to="/browse"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              Browse Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;