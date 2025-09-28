import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Star, ChevronRight, Heart, Home as HomeIcon, Bike, Settings, User, GitCompare, Shield, CheckCircle, Calculator, CreditCard, Wallet, Building2 } from 'lucide-react';
import Footer from '../components/Footer';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  category?: string;
  specs?: {
    mileage: string;
    fuelType: string;
    tankCapacity: string;
    seating: string;
    brakes: string;
    lights: string;
    speed: string;
    comfort: string;
    compatibility: string;
  };
  usedKms?: string;
  yearsUsed?: string;
  condition?: string;
}

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [compareVehicles, setCompareVehicles] = useState<any[]>([]);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', active: true },
    { name: 'New Bikes', active: false },
    { name: 'New Scooters', active: false },
    { name: 'Reviews', active: false }
  ];

  const navButtons = [
    { name: 'Service', path: '/service' },
    { name: 'Support Us', path: '/support' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' }
  ];

  const verticalNavItems = [
    { name: 'Home', icon: 'HomeAs', path: '/home' },
    { name: 'Second Hand Bikes', icon: 'Motorbike', path: '/bikes' },
    { name: 'Second Hand Scooters', icon: 'Scooter', path: '/scooters' },
    { name: 'Accessories', icon: 'Settings', path: '/accessories' },
    { name: 'Insurance', icon: 'Shield', path: '/insurance' },
    { name: 'EMI Calculator', icon: 'Calculator', path: '/emi-calculator' }
  ];

  const dropdownItems = [
    { name: 'Profile', icon: User },
    { name: 'Details', icon: Building2 },
    { name: 'Compare', icon: GitCompare },
    { name: 'Sell Bikes', icon: Bike },
    { name: 'Sell Scooters', icon: Bike },
    { name: 'Logout', icon: User }
  ];

  const brands = [
    { name: 'HONDA', logo: 'https://www.freeiconspng.com/uploads/honda-motorcycles-logo-11.png' },
    { name: 'HERO', logo: 'https://motorcycle-logos.com/wp-content/uploads/2016/11/Hero-logo.png' },
    { name: 'ROYAL ENFIELD', logo: 'https://car-logos.b-cdn.net/wp-content/uploads/2023/04/royal-enfield-logo-2014-present-scaled.webp' },
    { name: 'TVS', logo: 'https://static.vecteezy.com/system/resources/previews/020/336/393/original/tvs-logo-tvs-icon-transparent-png-free-vector.jpg' },
    { name: 'BAJAJ', logo: 'https://listcarbrands.com/wp-content/uploads/2023/01/Bajaj-Emblem.png' },
    { name: 'YAMAHA', logo: 'https://car-logos.net/wp-content/uploads/2023/04/yamaha-logo-1998-present-scaled.webp' },
    { name: 'SUZUKI', logo: 'https://www.pngmart.com/files/17/Maruti-Suzuki-Logo-PNG-Clipart.png' },
    { name: 'KAWASAKI', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Kawasaki-Symbol.png' }
  ];

  const featuredBikes = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      price: '₹1.77 Lakh',
      originalPrice: '₹1.85 Lakh',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      rating: 4.5,
      category: 'popular',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '10 liters',
      engine: '155cc, Liquid Cooled, 4-Stroke, SOHC, 4-Valve, Blue Core',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: '6-Speed Manual',
      launchDate: '2023-01-15',
      topSpeed: '110 km/h',
      acceleration: '5.2 seconds',
      power: '18.4 bhp @ 10,000 rpm',
      torque: '14.1 Nm @ 7,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '145 kg',
      length: '1990 mm',
      width: '680 mm',
      height: '1110 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Adjustable suspension, ergonomic design',
      compatibility: 'Suitable for city commuting and short tours',
      usedKms: '5,200 km',
      yearsUsed: '1.2 years',
      condition: 'Excellent',
      toolKit: 'Available',
      damages: 'Minor scratch on front mudguard',
      complaints: 'No major issues',
      estimatedLife: '8-10 years',
      salesCount: '1250',
      reviews: '420',
      offers: 'Free first service, 5% discount on accessories'
    },
    {
      id: 2,
      name: 'Honda CB350RS',
      price: '₹2.05 Lakh',
      originalPrice: '₹2.15 Lakh',
      image: 'https://wallpapercave.com/wp/wp11852700.jpg',
      rating: 4.3,
      category: 'popular',
      mileage: '38 km/l',
      fuelType: 'Petrol',
      tankCapacity: '12 liters',
      engine: '348.36cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front), Drum brake (Rear)',
      transmission: '5-Speed Manual',
      launchDate: '2022-05-20',
      topSpeed: '120 km/h',
      acceleration: '6.8 seconds',
      power: '21.02 bhp @ 5,500 rpm',
      torque: '30 Nm @ 3,000 rpm',
      seatingCapacity: 'Dual seat with passenger pillion',
      weight: '185 kg',
      length: '2170 mm',
      width: '780 mm',
      height: '1100 mm',
      lights: 'LED headlights with DRLs',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Ideal for daily commuting and weekend rides',
      usedKms: '8,700 km',
      yearsUsed: '2.1 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on right side panel',
      complaints: 'Minor engine noise',
      estimatedLife: '10-12 years',
      salesCount: '980',
      reviews: '356',
      offers: '2 free services, 3% discount on insurance'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      price: '₹1.84 Lakh',
      originalPrice: '₹1.95 Lakh',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      rating: 4.6,
      category: 'popular',
      mileage: '32 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13.5 liters',
      engine: '349cc, Air-Oil Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: '5-Speed Manual',
      launchDate: '2021-08-10',
      topSpeed: '115 km/h',
      acceleration: '7.0 seconds',
      power: '20.2 bhp @ 6,100 rpm',
      torque: '27 Nm @ 4,000 rpm',
      seatingCapacity: 'Dual seat with grab rail',
      weight: '195 kg',
      length: '2145 mm',
      width: '820 mm',
      height: '1115 mm',
      lights: 'Halogen headlight, LED taillight',
      comfort: 'Upright riding position, plush seating',
      compatibility: 'Perfect for long rides and touring',
      usedKms: '12,400 km',
      yearsUsed: '3.5 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on left side panel',
      complaints: 'Minor clutch wear',
      estimatedLife: '12-15 years',
      salesCount: '2100',
      reviews: '780',
      offers: 'Extended warranty, 5% discount on parts'
    },
    {
      id: 4,
      name: 'Kawasaki Ninja ZX-10R',
      price: '₹14.99 Lakh',
      originalPrice: '₹15.50 Lakh',
      image: 'https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg',
      rating: 4.8,
      category: 'upcoming',
      mileage: '15 km/l',
      fuelType: 'Petrol',
      tankCapacity: '17 liters',
      engine: '998cc, Liquid Cooled, 4-Stroke, Inline-4, DOHC',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-11-01',
      topSpeed: '299 km/h',
      acceleration: '2.8 seconds',
      power: '197 bhp @ 13,200 rpm',
      torque: '112.5 Nm @ 11,400 rpm',
      seatingCapacity: 'Single seat with sporty design',
      weight: '205 kg',
      length: '2050 mm',
      width: '710 mm',
      height: '1130 mm',
      lights: 'Full LED lighting system',
      comfort: 'Aggressive riding position, performance-focused',
      compatibility: 'Best for sport riding enthusiasts and track days',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 2 years warranty'
    },
    {
      id: 5,
      name: 'TVS Apache RR 310',
      price: '₹2.65 Lakh',
      originalPrice: '₹2.80 Lakh',
      image: 'https://stat.overdrive.in/wp-content/odgallery/2020/01/55304_2020_TVS-Apache-RR310_1_468x263.jpg',
      rating: 4.4,
      category: 'upcoming',
      mileage: '30 km/l',
      fuelType: 'Petrol',
      tankCapacity: '11 liters',
      engine: '312.2cc, Liquid Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear) with Dual Channel ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-09-15',
      topSpeed: '165 km/h',
      acceleration: '4.5 seconds',
      power: '34 bhp @ 9,700 rpm',
      torque: '27.3 Nm @ 7,700 rpm',
      seatingCapacity: 'Dual seat',
      weight: '174 kg',
      length: '2025 mm',
      width: '790 mm',
      height: '1095 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Adjustable suspension, sporty ergonomics',
      compatibility: 'Suitable for city and highway riding',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free accessories kit, 3 years warranty'
    },
    {
      id: 6,
      name: 'Bajaj Dominar 400',
      price: '₹2.27 Lakh',
      originalPrice: '₹2.40 Lakh',
      image: 'https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-dominar-400-rear-3-quarter-view.jpg',
      rating: 4.2,
      category: 'upcoming',
      mileage: '28 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13 liters',
      engine: '373.3cc, Liquid Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-07-22',
      topSpeed: '155 km/h',
      acceleration: '5.1 seconds',
      power: '39.4 bhp @ 8,800 rpm',
      torque: '35 Nm @ 6,500 rpm',
      seatingCapacity: 'Dual seat with grab rail',
      weight: '195 kg',
      length: '2170 mm',
      width: '820 mm',
      height: '1120 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Upright riding position, wide handlebar',
      compatibility: 'Perfect for touring and long rides',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free first service, 2 years warranty'
    },
    {
      id: 7,
      name: 'Yamaha MT-15 V2',
      price: '₹1.67 Lakh',
      originalPrice: '₹1.75 Lakh',
      image: 'https://www.thrustzone.com/wp-content/uploads/2023/02/MT15-Metallic-Black-3-QTR-scaled.jpg',
      rating: 4.5,
      category: 'upcoming',
      mileage: '42 km/l',
      fuelType: 'Petrol',
      tankCapacity: '10 liters',
      engine: '155cc, Liquid Cooled, 4-Stroke, SOHC, 4-Valve, Blue Core',
      brakes: 'Disc brakes (Front & Rear) with Single Channel ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-03-10',
      topSpeed: '108 km/h',
      acceleration: '5.3 seconds',
      power: '18.4 bhp @ 10,000 rpm',
      torque: '14.1 Nm @ 7,500 rpm',
      seatingCapacity: 'Single seat',
      weight: '141 kg',
      length: '1985 mm',
      width: '780 mm',
      height: '1080 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Aggressive riding position, adjustable suspension',
      compatibility: 'Best for city riding and occasional touring',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 2 years warranty'
    },
    {
      id: 8,
      name: 'KTM Duke 390',
      price: '₹3.10 Lakh',
      originalPrice: '₹3.25 Lakh',
      image: 'https://wallpapers.com/images/hd/ktm-duke-390-motorbike-x7j6jipstdi70t51.jpg',
      rating: 4.6,
      category: 'upcoming',
      mileage: '28 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13.4 liters',
      engine: '390cc, Liquid Cooled, 4-Stroke, Single Cylinder',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-12-05',
      topSpeed: '165 km/h',
      acceleration: '4.8 seconds',
      power: '43.5 bhp @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      seatingCapacity: 'Single seat',
      weight: '172 kg',
      length: '2055 mm',
      width: '830 mm',
      height: '1105 mm',
      lights: 'Full LED lighting system',
      comfort: 'Aggressive riding position, adjustable suspension',
      compatibility: 'Best for sport riding enthusiasts',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 3 years warranty'
    },
    {
      id: 9,
      name: 'Suzuki Hayabusa',
      price: '₹17.05 Lakh',
      originalPrice: '₹17.80 Lakh',
      image: 'https://news.webike.net/wp-content/uploads/2023/07/0704newsimg_01_resulte.webp',
      rating: 4.7,
      category: 'upcoming',
      mileage: '12 km/l',
      fuelType: 'Petrol',
      tankCapacity: '20 liters',
      engine: '1340cc, Liquid Cooled, 4-Stroke, Inline-4, DOHC',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-10-18',
      topSpeed: '300+ km/h',
      acceleration: '2.5 seconds',
      power: '184 bhp @ 9,800 rpm',
      torque: '151 Nm @ 7,000 rpm',
      seatingCapacity: 'Dual seat',
      weight: '265 kg',
      length: '2180 mm',
      width: '740 mm',
      height: '1150 mm',
      lights: 'Full LED lighting system',
      comfort: 'Touring-focused ergonomics, adjustable windscreen',
      compatibility: 'Best for long-distance touring and high-speed riding',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '12-15 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free premium accessories, 3 years warranty'
    }
  ];

  const scooters = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      price: '₹74,536',
      originalPrice: '₹78,000',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      rating: 4.4,
      category: 'popular',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.3 liters',
      engine: '109.51cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Drum brake (Front & Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2022-03-12',
      topSpeed: '85 km/h',
      acceleration: '8.5 seconds',
      power: '8.03 bhp @ 7,500 rpm',
      torque: '9.3 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '107 kg',
      length: '1833 mm',
      width: '696 mm',
      height: '1156 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for daily commuting and city rides',
      usedKms: '15,800 km',
      yearsUsed: '2.8 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on front panel',
      complaints: 'Minor clutch plate wear',
      estimatedLife: '10-12 years',
      salesCount: '3500',
      reviews: '1250',
      offers: 'Free first service, 5% discount on insurance'
    },
    {
      id: 2,
      name: 'TVS Jupiter',
      price: '₹73,400',
      originalPrice: '₹76,500',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      rating: 4.3,
      category: 'popular',
      mileage: '42 km/l',
      fuelType: 'Petrol',
      tankCapacity: '6 liters',
      engine: '109.7cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2021-11-05',
      topSpeed: '88 km/h',
      acceleration: '8.2 seconds',
      power: '8.0 bhp @ 7,500 rpm',
      torque: '8.8 Nm @ 3,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '109 kg',
      length: '1840 mm',
      width: '695 mm',
      height: '1160 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Ideal for city commuting and short trips',
      usedKms: '18,200 km',
      yearsUsed: '3.2 years',
      condition: 'Fair',
      toolKit: 'Available',
      damages: 'Scratch on side panel',
      complaints: 'Minor engine noise',
      estimatedLife: '10-12 years',
      salesCount: '2800',
      reviews: '980',
      offers: 'Free first service, 3% discount on accessories'
    },
    {
      id: 3,
      name: 'Suzuki Access 125',
      price: '₹81,700',
      originalPrice: '₹85,000',
      image: 'https://i.ytimg.com/vi/gruWVWAI5XU/maxresdefault.jpg',
      rating: 4.2,
      category: 'popular',
      mileage: '48 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.5 liters',
      engine: '124cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2020-09-18',
      topSpeed: '90 km/h',
      acceleration: '8.0 seconds',
      power: '8.7 bhp @ 7,000 rpm',
      torque: '10.1 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '105 kg',
      length: '1820 mm',
      width: '690 mm',
      height: '1150 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for daily commuting and city rides',
      usedKms: '22,500 km',
      yearsUsed: '4.1 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Minor scratch on front panel',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: '3200',
      reviews: '1100',
      offers: 'Free first service, 5% discount on insurance'
    },
    {
      id: 4,
      name: 'Ola S1 Pro',
      price: '₹1.15 Lakh',
      originalPrice: '₹1.25 Lakh',
      image: 'https://www.autobics.com/wp-content/uploads/2023/08/2023-Ola-S1-Pro-Matwhite.jpg',
      rating: 4.5,
      category: 'upcoming',
      mileage: '120 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '8000W Hub Motor, 3.97kWh Battery',
      brakes: 'Disc brakes (Front & Rear) with Regenerative Braking',
      transmission: 'Automatic',
      launchDate: '2023-11-20',
      topSpeed: '110 km/h',
      acceleration: '3.5 seconds',
      power: '8000W',
      torque: '85 Nm',
      seatingCapacity: 'Dual seat',
      weight: '115 kg',
      length: '1850 mm',
      width: '700 mm',
      height: '1160 mm',
      lights: 'Full LED lighting system',
      comfort: 'Smart features, comfortable ergonomics',
      compatibility: 'Best for city commuting and tech-savvy riders',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 3 years warranty'
    },
    {
      id: 5,
      name: 'Okaya iPraise+ Plus',
      price: '₹98,000',
      originalPrice: '₹1.05 Lakh',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/AD/YV/OK/155488885/okaya-classiq-100-plus-electric-scooty-1000x1000.jpg',
      rating: 4.2,
      category: 'upcoming',
      mileage: '100 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '1000W Hub Motor, 3.2kWh Battery',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'Automatic',
      launchDate: '2023-08-15',
      topSpeed: '75 km/h',
      acceleration: '6.2 seconds',
      power: '1000W',
      torque: '60 Nm',
      seatingCapacity: 'Dual seat',
      weight: '95 kg',
      length: '1780 mm',
      width: '680 mm',
      height: '1140 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for short city commutes',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 6,
      name: 'Hero Electric Flash',
      price: '₹95,000',
      originalPrice: '₹1.00 Lakh',
      image: 'https://emobilityplus.com/wp-content/uploads/2023/02/Metalic-GREY.webp',
      rating: 4.1,
      category: 'upcoming',
      mileage: '95 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '800W Hub Motor, 2.8kWh Battery',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'Automatic',
      launchDate: '2023-07-10',
      topSpeed: '70 km/h',
      acceleration: '6.5 seconds',
      power: '800W',
      torque: '55 Nm',
      seatingCapacity: 'Dual seat',
      weight: '92 kg',
      length: '1750 mm',
      width: '670 mm',
      height: '1130 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Best for short city rides and college students',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 7,
      name: 'Ather 450X',
      price: '₹1.05 Lakh',
      originalPrice: '₹1.15 Lakh',
      image: 'https://cdni.autocarindia.com/ExtraImages/20200107014805_Ather-450-image.jpg',
      rating: 4.6,
      category: 'upcoming',
      mileage: '130 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '6000W Hub Motor, 2.92kWh Battery',
      brakes: 'Disc brakes (Front & Rear) with Regenerative Braking',
      transmission: 'Automatic',
      launchDate: '2023-10-25',
      topSpeed: '80 km/h',
      acceleration: '4.2 seconds',
      power: '6000W',
      torque: '70 Nm',
      seatingCapacity: 'Dual seat',
      weight: '108 kg',
      length: '1830 mm',
      width: '690 mm',
      height: '1150 mm',
      lights: 'Full LED lighting system with DRLs',
      comfort: 'Smart features, premium ergonomics',
      compatibility: 'Best for tech-savvy urban riders',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 3 years warranty'
    },
    {
      id: 8,
      name: 'Okinawa iPraise+',
      price: '₹92,000',
      originalPrice: '₹98,000',
      image: 'https://evehiclesdb.com/wp-content/uploads/2022/10/Okinawa_iPraise_Electric_Scooter-4.jpg',
      rating: 4.3,
      category: 'upcoming',
      mileage: '90 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '800W Hub Motor, 2.5kWh Battery',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'Automatic',
      launchDate: '2023-09-05',
      topSpeed: '65 km/h',
      acceleration: '6.8 seconds',
      power: '800W',
      torque: '50 Nm',
      seatingCapacity: 'Dual seat',
      weight: '90 kg',
      length: '1740 mm',
      width: '660 mm',
      height: '1120 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for short city commutes',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 9,
      name: 'TVS NTorq 125',
      price: '₹85,000',
      originalPrice: '₹90,000',
      image: 'https://images.news18.com/ibnlive/uploads/2020/10/1603193346_tvs-ntorq-125-stealth-black.png',
      rating: 4.4,
      category: 'upcoming',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.8 liters',
      engine: '124.8cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2023-06-30',
      topSpeed: '95 km/h',
      acceleration: '7.5 seconds',
      power: '9.0 bhp @ 7,500 rpm',
      torque: '10.5 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '110 kg',
      length: '1850 mm',
      width: '700 mm',
      height: '1160 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Best for city commuting and short trips',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free first service, 3 years warranty'
    }
  ];

  // Helper function to filter vehicles based on search term and category
  const getFilteredVehicles = (vehicles: Vehicle[], category: string) => {
    if (!searchTerm) {
      return vehicles.filter(vehicle => vehicle.category === category);
    }
    
    return vehicles.filter(vehicle => 
      vehicle.category === category && 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle search action
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Filter all vehicles (both bikes and scooters) that match the search term
      const matchingBikes = featuredBikes.filter(bike => 
        bike.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchingScooters = scooters.filter(scooter => 
        scooter.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // If we have matching vehicles, we could show them in a dedicated search results section
      // For now, the filtering is applied directly to the existing sections
    }
  };

  // Add vehicle to comparison
  const addToCompare = (vehicle: any) => {
    if (!compareVehicles.some(v => v.id === vehicle.id) && compareVehicles.length < 4) {
      setCompareVehicles([...compareVehicles, vehicle]);
    }
  };

  // Remove vehicle from comparison
  const removeFromCompare = (id: number) => {
    setCompareVehicles(compareVehicles.filter(vehicle => vehicle.id !== id));
  };

  // Navigate to compare page with selected vehicles
  const goToCompare = () => {
    navigate('/compare', { state: { vehicles: compareVehicles } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left - Menu and Logo */}
            <div className="flex items-center space-x-4">
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                
                {/* Dropdown Content */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      {dropdownItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (item.name === 'Profile') {
                              // Navigate to profile page
                              navigate('/profile');
                            } else if (item.name === 'Details') {
                              // Navigate to company details page
                              navigate('/company-details');
                            } else if (item.name === 'Compare') {
                              // Navigate to compare page
                              goToCompare();
                            } else if (item.name === 'Logout') {
                              // Navigate to login page
                              navigate('/');
                            }
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                          {item.name === 'Compare' && compareVehicles.length > 0 && (
                            <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              {compareVehicles.length}
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                VAHAAN BAZAAR
              </motion.h1>
            </div>

            {/* Right - Navigation Buttons */}
            <nav className="hidden md:flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/follow-us')}
                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-200 font-medium"
              >
                FOLLOW US
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 font-medium"
              >
                EXPLORE MORE
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/showrooms')}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium"
              >
                SHOWROOMS
              </motion.button>
              {navButtons.map((button) => (
                <motion.button
                  key={button.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(button.path)}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  {button.name}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
</original_code>```

```
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Star, ChevronRight, Heart, Home as HomeIcon, Bike, Settings, User, GitCompare, Shield, CheckCircle, Calculator, CreditCard, Wallet, Building2 } from 'lucide-react';
import Footer from '../components/Footer';

interface Vehicle {
  id: number;
  name: string;
  price: string;
  image: string;
  rating: number;
  category?: string;
  specs?: {
    mileage: string;
    fuelType: string;
    tankCapacity: string;
    seating: string;
    brakes: string;
    lights: string;
    speed: string;
    comfort: string;
    compatibility: string;
  };
  usedKms?: string;
  yearsUsed?: string;
  condition?: string;
}

const MainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [compareVehicles, setCompareVehicles] = useState<any[]>([]);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', active: true },
    { name: 'New Bikes', active: false },
    { name: 'New Scooters', active: false },
    { name: 'Reviews', active: false }
  ];

  const navButtons = [
    { name: 'Service', path: '/service' },
    { name: 'Support Us', path: '/support' },
    { name: 'Feedback', path: '/feedback' },
    { name: 'Contact', path: '/contact' }
  ];

  const verticalNavItems = [
    { name: 'Home', icon: 'HomeAs', path: '/home' },
    { name: 'Second Hand Bikes', icon: 'Motorbike', path: '/bikes' },
    { name: 'Second Hand Scooters', icon: 'Scooter', path: '/scooters' },
    { name: 'Accessories', icon: 'Settings', path: '/accessories' },
    { name: 'Insurance', icon: 'Shield', path: '/insurance' },
    { name: 'EMI Calculator', icon: 'Calculator', path: '/emi-calculator' }
  ];

  const dropdownItems = [
    { name: 'Profile', icon: User },
    { name: 'Details', icon: Building2 },
    { name: 'Compare', icon: GitCompare },
    { name: 'Sell Bikes', icon: Bike },
    { name: 'Sell Scooters', icon: Bike },
    { name: 'Logout', icon: User }
  ];

  const brands = [
    { name: 'HONDA', logo: 'https://www.freeiconspng.com/uploads/honda-motorcycles-logo-11.png' },
    { name: 'HERO', logo: 'https://motorcycle-logos.com/wp-content/uploads/2016/11/Hero-logo.png' },
    { name: 'ROYAL ENFIELD', logo: 'https://car-logos.b-cdn.net/wp-content/uploads/2023/04/royal-enfield-logo-2014-present-scaled.webp' },
    { name: 'TVS', logo: 'https://static.vecteezy.com/system/resources/previews/020/336/393/original/tvs-logo-tvs-icon-transparent-png-free-vector.jpg' },
    { name: 'BAJAJ', logo: 'https://listcarbrands.com/wp-content/uploads/2023/01/Bajaj-Emblem.png' },
    { name: 'YAMAHA', logo: 'https://car-logos.net/wp-content/uploads/2023/04/yamaha-logo-1998-present-scaled.webp' },
    { name: 'SUZUKI', logo: 'https://www.pngmart.com/files/17/Maruti-Suzuki-Logo-PNG-Clipart.png' },
    { name: 'KAWASAKI', logo: 'https://logos-world.net/wp-content/uploads/2020/09/Kawasaki-Symbol.png' }
  ];

  const featuredBikes = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      price: '₹1.77 Lakh',
      originalPrice: '₹1.85 Lakh',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      rating: 4.5,
      category: 'popular',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '10 liters',
      engine: '155cc, Liquid Cooled, 4-Stroke, SOHC, 4-Valve, Blue Core',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: '6-Speed Manual',
      launchDate: '2023-01-15',
      topSpeed: '110 km/h',
      acceleration: '5.2 seconds',
      power: '18.4 bhp @ 10,000 rpm',
      torque: '14.1 Nm @ 7,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '145 kg',
      length: '1990 mm',
      width: '680 mm',
      height: '1110 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Adjustable suspension, ergonomic design',
      compatibility: 'Suitable for city commuting and short tours',
      usedKms: '5,200 km',
      yearsUsed: '1.2 years',
      condition: 'Excellent',
      toolKit: 'Available',
      damages: 'Minor scratch on front mudguard',
      complaints: 'No major issues',
      estimatedLife: '8-10 years',
      salesCount: '1250',
      reviews: '420',
      offers: 'Free first service, 5% discount on accessories'
    },
    {
      id: 2,
      name: 'Honda CB350RS',
      price: '₹2.05 Lakh',
      originalPrice: '₹2.15 Lakh',
      image: 'https://wallpapercave.com/wp/wp11852700.jpg',
      rating: 4.3,
      category: 'popular',
      mileage: '38 km/l',
      fuelType: 'Petrol',
      tankCapacity: '12 liters',
      engine: '348.36cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front), Drum brake (Rear)',
      transmission: '5-Speed Manual',
      launchDate: '2022-05-20',
      topSpeed: '120 km/h',
      acceleration: '6.8 seconds',
      power: '21.02 bhp @ 5,500 rpm',
      torque: '30 Nm @ 3,000 rpm',
      seatingCapacity: 'Dual seat with passenger pillion',
      weight: '185 kg',
      length: '2170 mm',
      width: '780 mm',
      height: '1100 mm',
      lights: 'LED headlights with DRLs',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Ideal for daily commuting and weekend rides',
      usedKms: '8,700 km',
      yearsUsed: '2.1 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on right side panel',
      complaints: 'Minor engine noise',
      estimatedLife: '10-12 years',
      salesCount: '980',
      reviews: '356',
      offers: '2 free services, 3% discount on insurance'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      price: '₹1.84 Lakh',
      originalPrice: '₹1.95 Lakh',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      rating: 4.6,
      category: 'popular',
      mileage: '32 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13.5 liters',
      engine: '349cc, Air-Oil Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: '5-Speed Manual',
      launchDate: '2021-08-10',
      topSpeed: '115 km/h',
      acceleration: '7.0 seconds',
      power: '20.2 bhp @ 6,100 rpm',
      torque: '27 Nm @ 4,000 rpm',
      seatingCapacity: 'Dual seat with grab rail',
      weight: '195 kg',
      length: '2145 mm',
      width: '820 mm',
      height: '1115 mm',
      lights: 'Halogen headlight, LED taillight',
      comfort: 'Upright riding position, plush seating',
      compatibility: 'Perfect for long rides and touring',
      usedKms: '12,400 km',
      yearsUsed: '3.5 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on left side panel',
      complaints: 'Minor clutch wear',
      estimatedLife: '12-15 years',
      salesCount: '2100',
      reviews: '780',
      offers: 'Extended warranty, 5% discount on parts'
    },
    {
      id: 4,
      name: 'Kawasaki Ninja ZX-10R',
      price: '₹14.99 Lakh',
      originalPrice: '₹15.50 Lakh',
      image: 'https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg',
      rating: 4.8,
      category: 'upcoming',
      mileage: '15 km/l',
      fuelType: 'Petrol',
      tankCapacity: '17 liters',
      engine: '998cc, Liquid Cooled, 4-Stroke, Inline-4, DOHC',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-11-01',
      topSpeed: '299 km/h',
      acceleration: '2.8 seconds',
      power: '197 bhp @ 13,200 rpm',
      torque: '112.5 Nm @ 11,400 rpm',
      seatingCapacity: 'Single seat with sporty design',
      weight: '205 kg',
      length: '2050 mm',
      width: '710 mm',
      height: '1130 mm',
      lights: 'Full LED lighting system',
      comfort: 'Aggressive riding position, performance-focused',
      compatibility: 'Best for sport riding enthusiasts and track days',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 2 years warranty'
    },
    {
      id: 5,
      name: 'TVS Apache RR 310',
      price: '₹2.65 Lakh',
      originalPrice: '₹2.80 Lakh',
      image: 'https://stat.overdrive.in/wp-content/odgallery/2020/01/55304_2020_TVS-Apache-RR310_1_468x263.jpg',
      rating: 4.4,
      category: 'upcoming',
      mileage: '30 km/l',
      fuelType: 'Petrol',
      tankCapacity: '11 liters',
      engine: '312.2cc, Liquid Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear) with Dual Channel ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-09-15',
      topSpeed: '165 km/h',
      acceleration: '4.5 seconds',
      power: '34 bhp @ 9,700 rpm',
      torque: '27.3 Nm @ 7,700 rpm',
      seatingCapacity: 'Dual seat',
      weight: '174 kg',
      length: '2025 mm',
      width: '790 mm',
      height: '1095 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Adjustable suspension, sporty ergonomics',
      compatibility: 'Suitable for city and highway riding',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free accessories kit, 3 years warranty'
    },
    {
      id: 6,
      name: 'Bajaj Dominar 400',
      price: '₹2.27 Lakh',
      originalPrice: '₹2.40 Lakh',
      image: 'https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-dominar-400-rear-3-quarter-view.jpg',
      rating: 4.2,
      category: 'upcoming',
      mileage: '28 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13 liters',
      engine: '373.3cc, Liquid Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-07-22',
      topSpeed: '155 km/h',
      acceleration: '5.1 seconds',
      power: '39.4 bhp @ 8,800 rpm',
      torque: '35 Nm @ 6,500 rpm',
      seatingCapacity: 'Dual seat with grab rail',
      weight: '195 kg',
      length: '2170 mm',
      width: '820 mm',
      height: '1120 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Upright riding position, wide handlebar',
      compatibility: 'Perfect for touring and long rides',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free first service, 2 years warranty'
    },
    {
      id: 7,
      name: 'Yamaha MT-15 V2',
      price: '₹1.67 Lakh',
      originalPrice: '₹1.75 Lakh',
      image: 'https://www.thrustzone.com/wp-content/uploads/2023/02/MT15-Metallic-Black-3-QTR-scaled.jpg',
      rating: 4.5,
      category: 'upcoming',
      mileage: '42 km/l',
      fuelType: 'Petrol',
      tankCapacity: '10 liters',
      engine: '155cc, Liquid Cooled, 4-Stroke, SOHC, 4-Valve, Blue Core',
      brakes: 'Disc brakes (Front & Rear) with Single Channel ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-03-10',
      topSpeed: '108 km/h',
      acceleration: '5.3 seconds',
      power: '18.4 bhp @ 10,000 rpm',
      torque: '14.1 Nm @ 7,500 rpm',
      seatingCapacity: 'Single seat',
      weight: '141 kg',
      length: '1985 mm',
      width: '780 mm',
      height: '1080 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Aggressive riding position, adjustable suspension',
      compatibility: 'Best for city riding and occasional touring',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 2 years warranty'
    },
    {
      id: 8,
      name: 'KTM Duke 390',
      price: '₹3.10 Lakh',
      originalPrice: '₹3.25 Lakh',
      image: 'https://wallpapers.com/images/hd/ktm-duke-390-motorbike-x7j6jipstdi70t51.jpg',
      rating: 4.6,
      category: 'upcoming',
      mileage: '28 km/l',
      fuelType: 'Petrol',
      tankCapacity: '13.4 liters',
      engine: '390cc, Liquid Cooled, 4-Stroke, Single Cylinder',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-12-05',
      topSpeed: '165 km/h',
      acceleration: '4.8 seconds',
      power: '43.5 bhp @ 9,000 rpm',
      torque: '37 Nm @ 7,000 rpm',
      seatingCapacity: 'Single seat',
      weight: '172 kg',
      length: '2055 mm',
      width: '830 mm',
      height: '1105 mm',
      lights: 'Full LED lighting system',
      comfort: 'Aggressive riding position, adjustable suspension',
      compatibility: 'Best for sport riding enthusiasts',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free riding gear, 3 years warranty'
    },
    {
      id: 9,
      name: 'Suzuki Hayabusa',
      price: '₹17.05 Lakh',
      originalPrice: '₹17.80 Lakh',
      image: 'https://news.webike.net/wp-content/uploads/2023/07/0704newsimg_01_resulte.webp',
      rating: 4.7,
      category: 'upcoming',
      mileage: '12 km/l',
      fuelType: 'Petrol',
      tankCapacity: '20 liters',
      engine: '1340cc, Liquid Cooled, 4-Stroke, Inline-4, DOHC',
      brakes: 'Disc brakes (Front & Rear) with ABS',
      transmission: '6-Speed Manual',
      launchDate: '2023-10-18',
      topSpeed: '300+ km/h',
      acceleration: '2.5 seconds',
      power: '184 bhp @ 9,800 rpm',
      torque: '151 Nm @ 7,000 rpm',
      seatingCapacity: 'Dual seat',
      weight: '265 kg',
      length: '2180 mm',
      width: '740 mm',
      height: '1150 mm',
      lights: 'Full LED lighting system',
      comfort: 'Touring-focused ergonomics, adjustable windscreen',
      compatibility: 'Best for long-distance touring and high-speed riding',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '12-15 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free premium accessories, 3 years warranty'
    }
  ];

  const scooters = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      price: '₹74,536',
      originalPrice: '₹78,000',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      rating: 4.4,
      category: 'popular',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.3 liters',
      engine: '109.51cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Drum brake (Front & Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2022-03-12',
      topSpeed: '85 km/h',
      acceleration: '8.5 seconds',
      power: '8.03 bhp @ 7,500 rpm',
      torque: '9.3 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '107 kg',
      length: '1833 mm',
      width: '696 mm',
      height: '1156 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for daily commuting and city rides',
      usedKms: '15,800 km',
      yearsUsed: '2.8 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Scratch on front panel',
      complaints: 'Minor clutch plate wear',
      estimatedLife: '10-12 years',
      salesCount: '3500',
      reviews: '1250',
      offers: 'Free first service, 5% discount on insurance'
    },
    {
      id: 2,
      name: 'TVS Jupiter',
      price: '₹73,400',
      originalPrice: '₹76,500',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      rating: 4.3,
      category: 'popular',
      mileage: '42 km/l',
      fuelType: 'Petrol',
      tankCapacity: '6 liters',
      engine: '109.7cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2021-11-05',
      topSpeed: '88 km/h',
      acceleration: '8.2 seconds',
      power: '8.0 bhp @ 7,500 rpm',
      torque: '8.8 Nm @ 3,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '109 kg',
      length: '1840 mm',
      width: '695 mm',
      height: '1160 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Ideal for city commuting and short trips',
      usedKms: '18,200 km',
      yearsUsed: '3.2 years',
      condition: 'Fair',
      toolKit: 'Available',
      damages: 'Scratch on side panel',
      complaints: 'Minor engine noise',
      estimatedLife: '10-12 years',
      salesCount: '2800',
      reviews: '980',
      offers: 'Free first service, 3% discount on accessories'
    },
    {
      id: 3,
      name: 'Suzuki Access 125',
      price: '₹81,700',
      originalPrice: '₹85,000',
      image: 'https://i.ytimg.com/vi/gruWVWAI5XU/maxresdefault.jpg',
      rating: 4.2,
      category: 'popular',
      mileage: '48 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.5 liters',
      engine: '124cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2020-09-18',
      topSpeed: '90 km/h',
      acceleration: '8.0 seconds',
      power: '8.7 bhp @ 7,000 rpm',
      torque: '10.1 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '105 kg',
      length: '1820 mm',
      width: '690 mm',
      height: '1150 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for daily commuting and city rides',
      usedKms: '22,500 km',
      yearsUsed: '4.1 years',
      condition: 'Good',
      toolKit: 'Available',
      damages: 'Minor scratch on front panel',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: '3200',
      reviews: '1100',
      offers: 'Free first service, 5% discount on insurance'
    },
    {
      id: 4,
      name: 'Ola S1 Pro',
      price: '₹1.15 Lakh',
      originalPrice: '₹1.25 Lakh',
      image: 'https://www.autobics.com/wp-content/uploads/2023/08/2023-Ola-S1-Pro-Matwhite.jpg',
      rating: 4.5,
      category: 'upcoming',
      mileage: '120 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '8000W Hub Motor, 3.97kWh Battery',
      brakes: 'Disc brakes (Front & Rear) with Regenerative Braking',
      transmission: 'Automatic',
      launchDate: '2023-11-20',
      topSpeed: '110 km/h',
      acceleration: '3.5 seconds',
      power: '8000W',
      torque: '85 Nm',
      seatingCapacity: 'Dual seat',
      weight: '115 kg',
      length: '1850 mm',
      width: '700 mm',
      height: '1160 mm',
      lights: 'Full LED lighting system',
      comfort: 'Smart features, comfortable ergonomics',
      compatibility: 'Best for city commuting and tech-savvy riders',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 3 years warranty'
    },
    {
      id: 5,
      name: 'Okaya iPraise+ Plus',
      price: '₹98,000',
      originalPrice: '₹1.05 Lakh',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/AD/YV/OK/155488885/okaya-classiq-100-plus-electric-scooty-1000x1000.jpg',
      rating: 4.2,
      category: 'upcoming',
      mileage: '100 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '1000W Hub Motor, 3.2kWh Battery',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'Automatic',
      launchDate: '2023-08-15',
      topSpeed: '75 km/h',
      acceleration: '6.2 seconds',
      power: '1000W',
      torque: '60 Nm',
      seatingCapacity: 'Dual seat',
      weight: '95 kg',
      length: '1780 mm',
      width: '680 mm',
      height: '1140 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for short city commutes',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 6,
      name: 'Hero Electric Flash',
      price: '₹95,000',
      originalPrice: '₹1.00 Lakh',
      image: 'https://emobilityplus.com/wp-content/uploads/2023/02/Metalic-GREY.webp',
      rating: 4.1,
      category: 'upcoming',
      mileage: '95 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '800W Hub Motor, 2.8kWh Battery',
      brakes: 'Disc brake (Front), Drum brake (Rear)',
      transmission: 'Automatic',
      launchDate: '2023-07-10',
      topSpeed: '70 km/h',
      acceleration: '6.5 seconds',
      power: '800W',
      torque: '55 Nm',
      seatingCapacity: 'Dual seat',
      weight: '92 kg',
      length: '1750 mm',
      width: '670 mm',
      height: '1130 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Best for short city rides and college students',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 7,
      name: 'Ather 450X',
      price: '₹1.05 Lakh',
      originalPrice: '₹1.15 Lakh',
      image: 'https://cdni.autocarindia.com/ExtraImages/20200107014805_Ather-450-image.jpg',
      rating: 4.6,
      category: 'upcoming',
      mileage: '130 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '6000W Hub Motor, 2.92kWh Battery',
      brakes: 'Disc brakes (Front & Rear) with Regenerative Braking',
      transmission: 'Automatic',
      launchDate: '2023-10-25',
      topSpeed: '80 km/h',
      acceleration: '4.2 seconds',
      power: '6000W',
      torque: '70 Nm',
      seatingCapacity: 'Dual seat',
      weight: '108 kg',
      length: '1830 mm',
      width: '690 mm',
      height: '1150 mm',
      lights: 'Full LED lighting system with DRLs',
      comfort: 'Smart features, premium ergonomics',
      compatibility: 'Best for tech-savvy urban riders',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 3 years warranty'
    },
    {
      id: 8,
      name: 'Okinawa iPraise+',
      price: '₹92,000',
      originalPrice: '₹98,000',
      image: 'https://evehiclesdb.com/wp-content/uploads/2022/10/Okinawa_iPraise_Electric_Scooter-4.jpg',
      rating: 4.3,
      category: 'upcoming',
      mileage: '90 km/charge',
      fuelType: 'Electric',
      tankCapacity: 'N/A',
      engine: '800W Hub Motor, 2.5kWh Battery',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'Automatic',
      launchDate: '2023-09-05',
      topSpeed: '65 km/h',
      acceleration: '6.8 seconds',
      power: '800W',
      torque: '50 Nm',
      seatingCapacity: 'Dual seat',
      weight: '90 kg',
      length: '1740 mm',
      width: '660 mm',
      height: '1120 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, spacious footboard',
      compatibility: 'Perfect for short city commutes',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '8-10 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free home charging station, 2 years warranty'
    },
    {
      id: 9,
      name: 'TVS NTorq 125',
      price: '₹85,000',
      originalPrice: '₹90,000',
      image: 'https://images.news18.com/ibnlive/uploads/2020/10/1603193346_tvs-ntorq-125-stealth-black.png',
      rating: 4.4,
      category: 'upcoming',
      mileage: '45 km/l',
      fuelType: 'Petrol',
      tankCapacity: '5.8 liters',
      engine: '124.8cc, Air Cooled, 4-Stroke, SI Engine',
      brakes: 'Disc brakes (Front & Rear)',
      transmission: 'CVT Automatic',
      launchDate: '2023-06-30',
      topSpeed: '95 km/h',
      acceleration: '7.5 seconds',
      power: '9.0 bhp @ 7,500 rpm',
      torque: '10.5 Nm @ 5,500 rpm',
      seatingCapacity: 'Dual seat',
      weight: '110 kg',
      length: '1850 mm',
      width: '700 mm',
      height: '1160 mm',
      lights: 'LED headlights and taillights',
      comfort: 'Comfortable riding position, wide seat',
      compatibility: 'Best for city commuting and short trips',
      usedKms: 'N/A',
      yearsUsed: 'New Launch',
      condition: 'Brand New',
      toolKit: 'Available',
      damages: 'None',
      complaints: 'None',
      estimatedLife: '10-12 years',
      salesCount: 'N/A',
      reviews: 'N/A',
      offers: 'Free first service, 3 years warranty'
    }
  ];

  // Helper function to filter vehicles based on search term and category
  const getFilteredVehicles = (vehicles: Vehicle[], category: string) => {
    if (!searchTerm) {
      return vehicles.filter(vehicle => vehicle.category === category);
    }
    
    return vehicles.filter(vehicle => 
      vehicle.category === category && 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Handle search action
  const handleSearch = () => {
    if (searchTerm.trim()) {
      // Filter all vehicles (both bikes and scooters) that match the search term
      const matchingBikes = featuredBikes.filter(bike => 
        bike.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      const matchingScooters = scooters.filter(scooter => 
        scooter.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      // If we have matching vehicles, we could show them in a dedicated search results section
      // For now, the filtering is applied directly to the existing sections
    }
  };

  // Add vehicle to comparison
  const addToCompare = (vehicle: any) => {
    if (!compareVehicles.some(v => v.id === vehicle.id) && compareVehicles.length < 4) {
      setCompareVehicles([...compareVehicles, vehicle]);
    }
  };

  // Remove vehicle from comparison
  const removeFromCompare = (id: number) => {
    setCompareVehicles(compareVehicles.filter(vehicle => vehicle.id !== id));
  };

  // Navigate to compare page with selected vehicles
  const goToCompare = () => {
    navigate('/compare', { state: { vehicles: compareVehicles } });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left - Menu and Logo */}
            <div className="flex items-center space-x-4">
              {/* Dropdown Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
                >
                  <Menu className="w-6 h-6 text-gray-600" />
                </button>
                
                {/* Dropdown Content */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                    >
                      {dropdownItems.map((item, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (item.name === 'Profile') {
                              // Navigate to profile page
                              navigate('/profile');
                            } else if (item.name === 'Details') {
                              // Navigate to company details page
                              navigate('/company-details');
                            } else if (item.name === 'Compare') {
                              // Navigate to compare page
                              goToCompare();
                            } else if (item.name === 'Logout') {
                              // Navigate to login page
                              navigate('/');
                            }
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 w-full text-left"
                        >
                          <item.icon className="w-4 h-4 mr-2" />
                          {item.name}
                          {item.name === 'Compare' && compareVehicles.length > 0 && (
                            <span className="ml-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                              {compareVehicles.length}
                            </span>
                          )}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                VAHAAN BAZAAR
              </motion.h1>
            </div>

            {/* Right - Navigation Buttons */}
            <nav className="hidden md:flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/follow-us')}
                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-all duration-200 font-medium"
              >
                FOLLOW US
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/explore')}
                className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-200 font-medium"
              >
                EXPLORE MORE
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/showrooms')}
                className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg transition-all duration-200 font-medium"
              >
                SHOWROOMS
              </motion.button>
              {navButtons.map((button) => (
                <motion.button
                  key={button.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(button.path)}
                  className="px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                >
                  {button.name}
                </motion.button>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:left-0 lg:top-16 lg:h-full lg:w-0 lg:bg-white lg:z-40">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                item.active 
                  ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                  : 'hover:bg-gray-50 text-gray-700'
              }`}
            >
              {item.name}
            </button>
          ))}
        </nav>
      </div>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">Dashboard</h2>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <nav className="p-4 space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.name}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors duration-200 ${
                      item.active 
                        ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-500' 
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="lg:ml-0 pt-4 pb-6 flex-grow">
        <div className="max-w-8xl mx-auto px-4">
          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative h-80 rounded-lg overflow-hidden shadow-md mb-6"
          >
            <img
              src="https://i.pinimg.com/originals/2c/11/1b/2c111b80f3d6bc7e2dd2179c7cec52d0.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Find Your Perfect Ride</h2>
                <p className="text-xl">Discover the latest bikes and scooters</p>
              </div>
            </div>
          </motion.div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">Search Bikes & Scooters</h3>
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for bikes, scooters, or brands..."
                className="w-full pl-12 pr-32 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="absolute right-2 top-2 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
                onClick={handleSearch}
              >
                Search
              </motion.button>
            </div>
          </motion.div>

          {/* Horizontal Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <div className="flex justify-between">
              {verticalNavItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center p-3 rounded-lg hover:bg-blue-50 transition-all duration-200 group flex-1 mx-2"
                >
                  {item.icon === 'HomeAs' && <HomeIcon className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  {item.icon === 'Motorbike' && <Bike className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  {item.icon === 'Scooter' && <Bike className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  {item.icon === 'Settings' && <Settings className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  {item.icon === 'Shield' && <Shield className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  {item.icon === 'Calculator' && <Calculator className="w-6 h-6 mb-2 text-gray-700 group-hover:text-blue-600" />}
                  <span className="text-sm font-medium text-gray-700 group-hover:text-blue-600">
                    {item.name}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Featured Bikes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Bikes</h3>
            
            {/* Bikes Grid - Only Popular or Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredVehicles(featuredBikes, 'popular').map((bike) => (
                <motion.div
                  key={bike.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                  onClick={() => navigate('/vehicle-details', { state: { vehicle: bike } })}
                >
                  {/* Compare indicator */}
                  {compareVehicles.some(v => v.id === bike.id) && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10">
                      <GitCompare className="w-3 h-3" />
                    </div>
                  )}
                  
                  <div className="relative">
                    <img
                      src={bike.image}
                      alt={bike.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{bike.name}</h4>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{bike.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">{bike.price}</span>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-500 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (compareVehicles.some(v => v.id === bike.id)) {
                              removeFromCompare(bike.id);
                            } else {
                              addToCompare(bike);
                            }
                          }}
                        >
                          <GitCompare className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Featured Scooters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Featured Scooters</h3>
            
            {/* Scooters Grid - Only Popular or Search Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getFilteredVehicles(scooters, 'popular').map((scooter) => (
                <motion.div
                  key={scooter.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative"
                  onClick={() => navigate('/vehicle-details', { state: { vehicle: scooter } })}
                >
                  {/* Compare indicator */}
                  {compareVehicles.some(v => v.id === scooter.id) && (
                    <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10">
                      <GitCompare className="w-3 h-3" />
                    </div>
                  )}
                  
                  <div className="relative">
                    <img
                      src={scooter.image}
                      alt={scooter.name}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{scooter.name}</h4>
                    <div className="flex items-center mb-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm text-gray-600">{scooter.rating}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xl font-bold text-blue-600">{scooter.price}</span>
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-500 hover:text-blue-600"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (compareVehicles.some(v => v.id === scooter.id)) {
                              removeFromCompare(scooter.id);
                            } else {
                              addToCompare(scooter);
                            }
                          }}
                        >
                          <GitCompare className="w-5 h-5" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-500 hover:text-blue-600"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Tag */}
          <div className="flex justify-center mb-6">
            <div className="bg-blue-600 text-white font-bold py-2 px-6 rounded-full shadow-lg">
              UPCOMINGS
            </div>
          </div>

          {/* Upcoming Bikes Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Bikes</h3>
            
            {/* Upcoming Bikes Scrollable Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max">
                {getFilteredVehicles(featuredBikes, 'upcoming').map((bike) => (
                  <motion.div
                    key={bike.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-64 flex-shrink-0 relative"
                    onClick={() => navigate('/vehicle-details', { state: { vehicle: bike } })}
                  >
                    {/* Compare indicator */}
                    {compareVehicles.some(v => v.id === bike.id) && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10">
                        <GitCompare className="w-3 h-3" />
                      </div>
                    )}
                    
                    <div className="relative">
                      <img
                        src={bike.image}
                        alt={bike.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Upcoming
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{bike.name}</h4>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{bike.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">{bike.price}</span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-500 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (compareVehicles.some(v => v.id === bike.id)) {
                                removeFromCompare(bike.id);
                              } else {
                                addToCompare(bike);
                              }
                            }}
                          >
                            <GitCompare className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Upcoming Scooters Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-6"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Upcoming Scooters</h3>
            
            {/* Upcoming Scooters Scrollable Container */}
            <div className="overflow-x-auto pb-4">
              <div className="flex space-x-6 min-w-max">
                {getFilteredVehicles(scooters, 'upcoming').map((scooter) => (
                  <motion.div
                    key={scooter.id}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-64 flex-shrink-0 relative"
                    onClick={() => navigate('/vehicle-details', { state: { vehicle: scooter } })}
                  >
                    {/* Compare indicator */}
                    {compareVehicles.some(v => v.id === scooter.id) && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center z-10">
                        <GitCompare className="w-3 h-3" />
                      </div>
                    )}
                    
                    <div className="relative">
                      <img
                        src={scooter.image}
                        alt={scooter.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2 bg-purple-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Upcoming
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">{scooter.name}</h4>
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm text-gray-600">{scooter.rating}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xl font-bold text-blue-600">{scooter.price}</span>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-500 hover:text-blue-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (compareVehicles.some(v => v.id === scooter.id)) {
                                removeFromCompare(scooter.id);
                              } else {
                                addToCompare(scooter);
                              }
                            }}
                          >
                            <GitCompare className="w-5 h-5" />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Browse Bikes by Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Browse Bikes by Brand</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {brands.map((brand) => (
                <motion.div
                  key={brand.name}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-12 mx-auto mb-3 object-contain"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const nextSibling = target.nextElementSibling as HTMLElement | null;
                      if (nextSibling) {
                        nextSibling.style.display = 'flex';
                      }
                    }}
                  />
                  <div 
                    className="w-16 h-12 mx-auto mb-3 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-sm hidden"
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <h4 className="text-xs font-semibold text-gray-800">{brand.name}</h4>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Insurance Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Insurance Services</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/insurance')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All Plans
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <div className="flex items-center mb-2">
                  <Shield className="w-6 h-6 text-blue-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Comprehensive Cover</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Protection against accidents, theft, and natural calamities</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/insurance')}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  Learn More
                </motion.button>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <div className="flex items-center mb-2">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Quick Claims</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Fast and hassle-free claim process with minimal documentation</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/insurance')}
                  className="text-green-600 hover:text-green-800 text-sm font-medium"
                >
                  Learn More
                </motion.button>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <div className="flex items-center mb-2">
                  <Star className="w-6 h-6 text-purple-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">24/7 Support</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Round-the-clock assistance for all your insurance needs</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/insurance')}
                  className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* EMI Calculator Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">EMI Calculator</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/emi-calculator')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                Calculate EMI
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                <div className="flex items-center mb-2">
                  <Calculator className="w-6 h-6 text-indigo-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Easy Calculation</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Calculate your monthly payments with our simple EMI calculator</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/emi-calculator')}
                  className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                >
                  Calculate Now
                </motion.button>
              </div>
              <div className="bg-gradient-to-r from-teal-50 to-teal-100 rounded-lg p-4 border border-teal-200">
                <div className="flex items-center mb-2">
                  <CreditCard className="w-6 h-6 text-teal-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Multiple Options</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Choose from various financing options and banks</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/emi-calculator')}
                  className="text-teal-600 hover:text-teal-800 text-sm font-medium"
                >
                  Explore Options
                </motion.button>
              </div>
              <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-4 border border-amber-200">
                <div className="flex items-center mb-2">
                  <Wallet className="w-6 h-6 text-amber-600 mr-2" />
                  <h4 className="font-semibold text-gray-800">Spot Purchase</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Avail exclusive discounts with direct purchase</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/emi-calculator')}
                  className="text-amber-600 hover:text-amber-800 text-sm font-medium"
                >
                  Check Offers
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Vehicle Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.8 }}
            className="bg-white rounded-lg shadow-md p-4 mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Popular Vehicles</h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/showroom')}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                View All Vehicles
                <ChevronRight className="w-4 h-4 ml-1" />
              </motion.button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {[
                {
                  id: 1,
                  name: 'Yamaha R15 V4',
                  image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
                  price: '₹1.77 Lakh'
                },
                {
                  id: 2,
                  name: 'Honda Activa 6G',
                  image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
                  price: '₹74,536'
                },
                {
                  id: 3,
                  name: 'Royal Enfield Classic 350',
                  image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
                  price: '₹1.84 Lakh'
                },
                {
                  id: 4,
                  name: 'TVS Jupiter',
                  image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
                  price: '₹73,400'
                },
                {
                  id: 5,
                  name: 'Kawasaki Ninja ZX-10R',
                  image: 'https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg',
                  price: '₹14.99 Lakh'
                },
                {
                  id: 6,
                  name: 'Ola S1 Pro',
                  image: 'https://www.autobics.com/wp-content/uploads/2023/08/2023-Ola-S1-Pro-Matwhite.jpg',
                  price: '₹1.15 Lakh'
                }
              ].map((vehicle) => (
                <motion.div
                  key={vehicle.id}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/showroom')}
                >
                  <div className="relative h-24">
                    <img 
                      src={vehicle.image} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="text-xs font-semibold text-gray-800 truncate">{vehicle.name}</h4>
                    <p className="text-xs font-bold text-blue-600">{vehicle.price}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;