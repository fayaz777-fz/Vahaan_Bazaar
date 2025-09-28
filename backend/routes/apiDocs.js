// backend/routes/apiDocs.js

const express = require('express');
const router = express.Router();

// API Documentation endpoint
router.get('/', (req, res) => {
  const apiDocs = {
    title: 'VAHAAN BAZAAR API Documentation',
    version: '1.0.0',
    description: 'Complete API documentation for VAHAAN BAZAAR vehicle marketplace platform',
    baseUrl: `http://localhost:${process.env.PORT || 5000}/api`,
    
    endpoints: {
      // Authentication endpoints
      auth: {
        signup: {
          method: 'POST',
          path: '/auth/signup',
          description: 'Register a new user',
          body: {
            name: 'string (required)',
            email: 'string (required)',
            password: 'string (required, min 6 chars with special char)',
            phone: 'string (optional)',
            gender: 'string (optional: male|female|other)'
          },
          response: {
            message: 'string',
            data: {
              token: 'string',
              user: 'User object'
            }
          }
        },
        login: {
          method: 'POST',
          path: '/auth/login',
          description: 'Login user',
          body: {
            email: 'string (required)',
            password: 'string (required)'
          },
          response: {
            message: 'string',
            data: {
              token: 'string',
              user: 'User object'
            }
          }
        },
        profile: {
          method: 'GET',
          path: '/auth/profile',
          description: 'Get user profile (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          },
          response: {
            message: 'string',
            data: {
              user: 'User object'
            }
          }
        }
      },
      
      // Vehicle endpoints
      vehicles: {
        getAll: {
          method: 'GET',
          path: '/vehicles',
          description: 'Get all vehicles with filtering',
          query: {
            page: 'number (default: 1)',
            limit: 'number (default: 12)',
            type: 'string (bike|scooter|car)',
            condition: 'string (new|used|certified-pre-owned)',
            brand: 'string',
            model: 'string',
            minPrice: 'number',
            maxPrice: 'number',
            fuelType: 'string (petrol|diesel|electric|hybrid|cng)',
            transmission: 'string (manual|automatic|cvt)',
            location: 'string',
            sort: 'string (default: createdAt)',
            order: 'string (asc|desc, default: desc)',
            search: 'string'
          }
        },
        getOne: {
          method: 'GET',
          path: '/vehicles/:id',
          description: 'Get single vehicle by ID'
        },
        create: {
          method: 'POST',
          path: '/vehicles',
          description: 'Create new vehicle listing (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          }
        },
        update: {
          method: 'PUT',
          path: '/vehicles/:id',
          description: 'Update vehicle listing (requires auth & ownership)'
        },
        delete: {
          method: 'DELETE',
          path: '/vehicles/:id',
          description: 'Delete vehicle listing (requires auth & ownership)'
        }
      },
      
      // Service endpoints
      services: {
        createRequest: {
          method: 'POST',
          path: '/services/request',
          description: 'Create service request (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          },
          body: {
            serviceType: 'string (insurance|loan|service|roadside-assistance|warranty)',
            contactInfo: {
              name: 'string (required)',
              phone: 'string (required)',
              email: 'string (required)',
              address: 'object (optional)'
            },
            vehicleDetails: 'object (optional)',
            serviceDetails: 'object (optional)'
          }
        },
        getMyRequests: {
          method: 'GET',
          path: '/services/my-requests',
          description: 'Get user service requests (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          }
        },
        getTypes: {
          method: 'GET',
          path: '/services/types',
          description: 'Get available service types'
        },
        calculateEMI: {
          method: 'POST',
          path: '/services/emi-calculator',
          description: 'Calculate EMI for loan',
          body: {
            principal: 'number (required)',
            rate: 'number (required)',
            tenure: 'number (required)'
          }
        }
      },
      
      // Feedback endpoints
      feedback: {
        create: {
          method: 'POST',
          path: '/feedback',
          description: 'Submit feedback (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          },
          body: {
            type: 'string (general|bug-report|feature-request|complaint|suggestion)',
            subject: 'string (required)',
            message: 'string (required)',
            rating: 'number (1-5, optional)',
            isAnonymous: 'boolean (default: false)'
          }
        },
        getMyFeedback: {
          method: 'GET',
          path: '/feedback/my-feedback',
          description: 'Get user feedback (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          }
        },
        getTypes: {
          method: 'GET',
          path: '/feedback/meta/types',
          description: 'Get feedback types'
        }
      },
      
      // Review endpoints
      reviews: {
        getVehicleReviews: {
          method: 'GET',
          path: '/reviews/vehicle/:vehicleId',
          description: 'Get reviews for a vehicle'
        },
        create: {
          method: 'POST',
          path: '/reviews',
          description: 'Create review (requires auth)',
          headers: {
            Authorization: 'Bearer {token}'
          }
        }
      }
    },
    
    // Error responses
    errorResponses: {
      400: {
        description: 'Bad Request',
        example: {
          message: 'Validation error',
          errors: ['Field is required']
        }
      },
      401: {
        description: 'Unauthorized',
        example: {
          message: 'Access denied. No token provided.'
        }
      },
      403: {
        description: 'Forbidden',
        example: {
          message: 'Not authorized to access this resource'
        }
      },
      404: {
        description: 'Not Found',
        example: {
          message: 'Resource not found'
        }
      },
      500: {
        description: 'Internal Server Error',
        example: {
          message: 'Internal server error'
        }
      }
    },
    
    // Data models
    models: {
      User: {
        _id: 'ObjectId',
        name: 'string',
        email: 'string',
        phone: 'string (optional)',
        gender: 'string (optional)',
        createdAt: 'Date',
        updatedAt: 'Date'
      },
      Vehicle: {
        _id: 'ObjectId',
        name: 'string',
        brand: 'string',
        model: 'string',
        year: 'number',
        price: 'number',
        type: 'string',
        condition: 'string',
        fuelType: 'string',
        transmission: 'string',
        engineCapacity: 'number',
        mileage: 'number',
        images: 'array of strings',
        description: 'string',
        seller: 'ObjectId (User)',
        createdAt: 'Date',
        updatedAt: 'Date'
      }
    }
  };
  
  res.json(apiDocs);
});

module.exports = router;