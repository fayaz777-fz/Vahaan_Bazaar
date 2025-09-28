const axios = require('axios');

// Contact API Testing Script
// This script tests all the contact endpoints to ensure they work properly

const API_BASE_URL = 'http://localhost:5000/api';

class ContactAPITester {
  constructor() {
    this.baseURL = `${API_BASE_URL}/contacts`;
    this.testResults = [];
    this.createdContactId = null;
  }

  // Helper method to log test results
  logResult(testName, success, message, data = null) {
    const result = {
      test: testName,
      success,
      message,
      data,
      timestamp: new Date().toISOString()
    };
    this.testResults.push(result);
    console.log(`${success ? '✅' : '❌'} ${testName}: ${message}`);
    if (data) {
      console.log('   Data:', JSON.stringify(data, null, 2));
    }
  }

  // Test contact creation (POST /api/contacts)
  async testCreateContact() {
    try {
      const contactData = {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+91 9876543210',
        subject: 'Test Contact Message',
        message: 'This is a test message to verify the contact API is working properly.',
        category: 'general',
        priority: 'medium',
        source: 'website'
      };

      const response = await axios.post(this.baseURL, contactData);
      
      if (response.status === 201 && response.data.success) {
        this.createdContactId = response.data.data._id;
        this.logResult(
          'Create Contact',
          true,
          'Contact created successfully',
          { id: this.createdContactId, name: response.data.data.name }
        );
        return true;
      } else {
        this.logResult('Create Contact', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Create Contact',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test getting all contacts (GET /api/contacts)
  async testGetAllContacts() {
    try {
      const response = await axios.get(this.baseURL);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Get All Contacts',
          true,
          `Retrieved ${response.data.data.length} contacts`,
          { count: response.data.data.length }
        );
        return true;
      } else {
        this.logResult('Get All Contacts', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Get All Contacts',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test getting contact statistics (GET /api/contacts/stats)
  async testGetContactStats() {
    try {
      const response = await axios.get(`${this.baseURL}/stats`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Get Contact Statistics',
          true,
          'Statistics retrieved successfully',
          {
            total: response.data.data.total,
            new: response.data.data.new,
            pending: response.data.data.pendingContacts
          }
        );
        return true;
      } else {
        this.logResult('Get Contact Statistics', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Get Contact Statistics',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test getting single contact (GET /api/contacts/:id)
  async testGetSingleContact() {
    if (!this.createdContactId) {
      this.logResult('Get Single Contact', false, 'No contact ID available for testing');
      return false;
    }

    try {
      const response = await axios.get(`${this.baseURL}/${this.createdContactId}`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Get Single Contact',
          true,
          'Contact retrieved successfully',
          { id: response.data.data._id, name: response.data.data.name }
        );
        return true;
      } else {
        this.logResult('Get Single Contact', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Get Single Contact',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test updating contact status (PATCH /api/contacts/:id/status)
  async testUpdateContactStatus() {
    if (!this.createdContactId) {
      this.logResult('Update Contact Status', false, 'No contact ID available for testing');
      return false;
    }

    try {
      const statusData = {
        status: 'in-progress',
        responseMessage: 'We have received your message and are working on it.',
        respondedBy: 'API Test Script'
      };

      const response = await axios.patch(
        `${this.baseURL}/${this.createdContactId}/status`,
        statusData
      );
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Update Contact Status',
          true,
          'Contact status updated successfully',
          { status: response.data.data.status }
        );
        return true;
      } else {
        this.logResult('Update Contact Status', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Update Contact Status',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test adding tags to contact (PATCH /api/contacts/:id/tags)
  async testAddContactTag() {
    if (!this.createdContactId) {
      this.logResult('Add Contact Tag', false, 'No contact ID available for testing');
      return false;
    }

    try {
      const tagData = {
        action: 'add',
        tag: 'api-test'
      };

      const response = await axios.patch(
        `${this.baseURL}/${this.createdContactId}/tags`,
        tagData
      );
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Add Contact Tag',
          true,
          'Tag added successfully',
          { tags: response.data.data.tags }
        );
        return true;
      } else {
        this.logResult('Add Contact Tag', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Add Contact Tag',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test getting contacts by category (GET /api/contacts/category/:category)
  async testGetContactsByCategory() {
    try {
      const response = await axios.get(`${this.baseURL}/category/general`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Get Contacts by Category',
          true,
          `Retrieved ${response.data.data.length} general category contacts`,
          { count: response.data.data.length }
        );
        return true;
      } else {
        this.logResult('Get Contacts by Category', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Get Contacts by Category',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test searching contacts (GET /api/contacts?search=)
  async testSearchContacts() {
    try {
      const response = await axios.get(`${this.baseURL}?search=test`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Search Contacts',
          true,
          `Found ${response.data.data.length} contacts matching 'test'`,
          { count: response.data.data.length }
        );
        return true;
      } else {
        this.logResult('Search Contacts', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Search Contacts',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Test filtering contacts by status (GET /api/contacts?status=)
  async testFilterContactsByStatus() {
    try {
      const response = await axios.get(`${this.baseURL}?status=new`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Filter Contacts by Status',
          true,
          `Found ${response.data.data.length} new contacts`,
          { count: response.data.data.length }
        );
        return true;
      } else {
        this.logResult('Filter Contacts by Status', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Filter Contacts by Status',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Clean up - delete the test contact
  async testDeleteContact() {
    if (!this.createdContactId) {
      this.logResult('Delete Contact', false, 'No contact ID available for testing');
      return false;
    }

    try {
      const response = await axios.delete(`${this.baseURL}/${this.createdContactId}`);
      
      if (response.status === 200 && response.data.success) {
        this.logResult(
          'Delete Contact',
          true,
          'Contact deleted successfully',
          { id: this.createdContactId }
        );
        return true;
      } else {
        this.logResult('Delete Contact', false, 'Unexpected response format');
        return false;
      }
    } catch (error) {
      this.logResult(
        'Delete Contact',
        false,
        `Failed: ${error.response?.data?.message || error.message}`
      );
      return false;
    }
  }

  // Run all tests
  async runAllTests() {
    console.log('🚀 Starting Contact API Tests...\n');
    console.log(`📡 API Base URL: ${this.baseURL}\n`);

    const tests = [
      () => this.testCreateContact(),
      () => this.testGetAllContacts(),
      () => this.testGetContactStats(),
      () => this.testGetSingleContact(),
      () => this.testUpdateContactStatus(),
      () => this.testAddContactTag(),
      () => this.testGetContactsByCategory(),
      () => this.testSearchContacts(),
      () => this.testFilterContactsByStatus(),
      () => this.testDeleteContact()
    ];

    let passedTests = 0;
    let totalTests = tests.length;

    for (const test of tests) {
      const result = await test();
      if (result) passedTests++;
      console.log(''); // Add spacing between tests
    }

    // Print summary
    console.log('📊 Test Summary:');
    console.log(`✅ Passed: ${passedTests}/${totalTests}`);
    console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
    console.log(`📈 Success Rate: ${((passedTests / totalTests) * 100).toFixed(1)}%`);

    if (passedTests === totalTests) {
      console.log('\n🎉 All tests passed! Contact API is working correctly.');
    } else {
      console.log('\n⚠️  Some tests failed. Please check the server and try again.');
    }

    return {
      total: totalTests,
      passed: passedTests,
      failed: totalTests - passedTests,
      successRate: (passedTests / totalTests) * 100,
      results: this.testResults
    };
  }
}

// Run the tests
async function main() {
  const tester = new ContactAPITester();
  
  try {
    const results = await tester.runAllTests();
    
    // Optionally save results to file
    const fs = require('fs');
    const resultsFile = `contact-api-test-results-${Date.now()}.json`;
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`\n📁 Detailed results saved to: ${resultsFile}`);
    
  } catch (error) {
    console.error('🚨 Test execution failed:', error.message);
    process.exit(1);
  }
}

// Check if we're being run directly
if (require.main === module) {
  main();
}

module.exports = { ContactAPITester };