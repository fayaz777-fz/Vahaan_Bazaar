import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import ServicePage from './pages/ServicePage';
import SupportPage from './pages/SupportPage';
import FeedbackPage from './pages/FeedbackPage';
import ContactPage from './pages/ContactPage';
import VehicleDetailsPage from './pages/VehicleDetailsPage';
import ShowroomPage from './pages/ShowroomPage';
import VahanBazarPage from './pages/VahanBazarPage';
import HomePage from './pages/HomePage';
// Second-hand vehicle pages - force refresh
import SecondHandBikesPage from './pages/SecondHandBikesPage';
import SecondHandScootersPage from './pages/SecondHandScootersPage';
import ProfilePage from './pages/ProfilePage';
import AccessoriesPage from './pages/AccessoriesPage';
import ComparePage from './pages/ComparePage';
import InsurancePage from './pages/InsurancePage';
import EmiCalculatorPage from './pages/EmiCalculatorPage';
import CompanyDetailsPage from './pages/CompanyDetailsPage';
import FollowUsPage from './pages/FollowUsPage';
import SellBikesPage from './pages/SellBikesPage';
import SellScootersPage from './pages/SellScootersPage';
import DashboardPage from './pages/DashboardPage';

// Main application component with routing
function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/service" element={<ServicePage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/vehicle-details" element={<VehicleDetailsPage />} />
          <Route path="/showroom" element={<ShowroomPage />} />
          <Route path="/explore" element={<VahanBazarPage />} />
          <Route path="/bikes" element={<SecondHandBikesPage />} />
          <Route path="/scooters" element={<SecondHandScootersPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/insurance" element={<InsurancePage />} />
          <Route path="/emi-calculator" element={<EmiCalculatorPage />} />
          <Route path="/company-details" element={<CompanyDetailsPage />} />
          <Route path="/follow-us" element={<FollowUsPage />} />
          <Route path="/sell-bikes" element={<SellBikesPage />} />
          <Route path="/sell-scooters" element={<SellScootersPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;