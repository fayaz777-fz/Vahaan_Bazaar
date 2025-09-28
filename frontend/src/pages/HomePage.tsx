import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Fuel, Gauge, Bike, Wallet, Star, ChevronRight, X, Clock } from 'lucide-react';
import Footer from '../components/Footer';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    fuelType: '',
    mileage: '',
    vehicleType: '',
    budget: ''
  });
  const [showFilters, setShowFilters] = useState({
    fuelType: false,
    mileage: false,
    vehicleType: false,
    budget: false
  });
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [currentVehicleImage, setCurrentVehicleImage] = useState(0);

  // Ad images
  const adImages = [
    'https://i.pinimg.com/originals/44/af/c4/44afc464cfaf4b68cbaf72fe21c01dfd.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/2800_opt_1/34c6fc170849383.6464e318d2868.png',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/43a60d170849383.65240262ec5f7.png',
    'https://i.pinimg.com/originals/42/ad/0c/42ad0cd760bc6d5594a93bd1bc0fab91.jpg',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/best-bike-ads-design-template-7d4b4b0a66e01f1f7a028abf96a0ce50_screen.jpg?ts=1704798253',
    'https://4.bp.blogspot.com/-2hO8ipXqEA8/Wom9dkfhN4I/AAAAAAAAB2Y/zqlDBjdj3gsA22Vn8rb218miZX5ZPnfuQCLcBGAs/w1200-h630-p-k-no-nu/PulsarDefinitelyMale.jpg'
  ];

  // Auto slide change - faster rotation (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === adImages.length - 1 ? 0 : prevSlide + 1));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [adImages.length]);

  // Reset vehicle image when a new vehicle is selected
  useEffect(() => {
    if (selectedVehicle) {
      setCurrentVehicleImage(0);
    }
  }, [selectedVehicle]);

  // Filter options
  const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
  const mileages = ['20-30 km/l', '30-40 km/l', '40-50 km/l', '50+ km/l'];
  const vehicleTypes = ['Bike', 'Scooter'];
  const budgets = ['Under ₹1 Lakh', '₹1-1.5 Lakh', '₹1.5-2 Lakh', 'Above ₹2 Lakh'];

  // Sample vehicle data - expanded to ensure at least 8 bikes and 8 scooters
  const vehicles = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      price: '₹1.77 Lakh',
      originalPrice: '₹1.95 Lakh',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      rating: 4.5,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: '₹1.5-2 Lakh',
      tags: ['Sports'],
      images: [
        'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-r15-v4-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-r15-v4-right-side-view.png'
      ],
      specs: {
        mileage: '45 km/l',
        fuelType: 'Petrol',
        tankCapacity: '10 liters',
        seating: 'Dual seat',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'LED headlights and taillights',
        speed: '0-60 km/h in 4.5 seconds',
        comfort: 'Adjustable suspension, ergonomic design',
        compatibility: 'Suitable for city commuting and short tours'
      }
    },
    {
      id: 2,
      name: 'Honda CB350RS',
      price: '₹2.05 Lakh',
      originalPrice: '₹2.20 Lakh',
      image: 'https://wallpapercave.com/wp/wp11852700.jpg',
      rating: 4.3,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: '₹1.5-2 Lakh',
      tags: ['Cruiser'],
      images: [
        'https://wallpapercave.com/wp/wp11852700.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-cb350rs-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-cb350rs-right-side-view.png'
      ],
      specs: {
        mileage: '35 km/l',
        fuelType: 'Petrol',
        tankCapacity: '15 liters',
        seating: 'Dual seat with passenger pillion',
        brakes: 'Disc brakes (Front), Drum brake (Rear)',
        lights: 'LED headlights with DRLs',
        speed: '0-60 km/h in 5.2 seconds',
        comfort: 'Comfortable riding position, wide seat',
        compatibility: 'Ideal for daily commuting and weekend rides'
      }
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      price: '₹1.84 Lakh',
      originalPrice: '₹1.95 Lakh',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      rating: 4.6,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: '₹1.5-2 Lakh',
      tags: ['Heritage'],
      images: [
        'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-classic-350-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-classic-350-right-side-view.png'
      ],
      specs: {
        mileage: '32 km/l',
        fuelType: 'Petrol',
        tankCapacity: '13.5 liters',
        seating: 'Dual seat with grab rail',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: '0-60 km/h in 6.0 seconds',
        comfort: 'Upright riding position, plush seating',
        compatibility: 'Perfect for long rides and touring'
      }
    },
    {
      id: 4,
      name: 'TVS Apache RR 310',
      price: '₹2.65 Lakh',
      originalPrice: '₹2.80 Lakh',
      image: 'https://stat.overdrive.in/wp-content/odgallery/2020/01/55304_2020_TVS-Apache-RR310_1_468x263.jpg',
      rating: 4.4,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: 'Above ₹2 Lakh',
      tags: ['Performance'],
      images: [
        'https://stat.overdrive.in/wp-content/odgallery/2020/01/55304_2020_TVS-Apache-RR310_1_468x263.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-apache-rr-310-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-apache-rr-310-right-side-view.png'
      ],
      specs: {
        mileage: '30 km/l',
        fuelType: 'Petrol',
        tankCapacity: '11 liters',
        seating: 'Dual seat with sculpted design',
        brakes: 'Disc brakes (Front & Rear) with ABS',
        lights: 'Full LED lighting system',
        speed: '0-100 km/h in 8.5 seconds',
        comfort: 'Sporty riding position, adjustable suspension',
        compatibility: 'Best for performance enthusiasts and track riding'
      }
    },
    {
      id: 5,
      name: 'Honda Activa 6G',
      price: '₹74,536',
      originalPrice: '₹80,000',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      rating: 4.4,
      type: 'Scooter',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Commuter'],
      images: [
        'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-activa-6g-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-activa-6g-right-side-view.png'
      ],
      specs: {
        mileage: '45 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.3 liters',
        seating: 'Single seat with pillion footrest',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlights and taillights',
        speed: 'Top speed of 85 km/h',
        comfort: 'Step-through design, spacious underseat storage',
        compatibility: 'Ideal for daily commuting and city travel'
      }
    },
    {
      id: 6,
      name: 'TVS Jupiter',
      price: '₹73,400',
      originalPrice: '₹78,000',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      rating: 4.3,
      type: 'Scooter',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Stylish'],
      images: [
        'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-jupiter-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-jupiter-right-side-view.png'
      ],
      specs: {
        mileage: '42 km/l',
        fuelType: 'Petrol',
        tankCapacity: '6 liters',
        seating: 'Dual seat with ample legroom',
        brakes: 'Disc brake (Front), Drum brake (Rear)',
        lights: 'LED headlight with DRLs',
        speed: 'Top speed of 90 km/h',
        comfort: 'Comfortable seating, spacious footboard',
        compatibility: 'Great for city rides and short trips'
      }
    },
    {
      id: 7,
      name: 'Ola S1',
      price: '₹99,000',
      originalPrice: '₹1.10 Lakh',
      image: 'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Ola-Electric-S1-Pro-010920211407.jpg',
      rating: 4.2,
      type: 'Scooter',
      fuel: 'Electric',
      mileage: '50+ km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Electric', 'Smart'],
      images: [
        'https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cms.haymarketindia.net/model/uploads/modelimages/Ola-Electric-S1-Pro-010920211407.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/ola-s1-pro-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/ola-s1-pro-right-side-view.png'
      ],
      specs: {
        mileage: '100+ km per charge',
        fuelType: 'Electric',
        tankCapacity: 'N/A (Battery pack)',
        seating: 'Dual seat with premium padding',
        brakes: 'Disc brakes (Front & Rear) with regenerative braking',
        lights: 'Full LED smart lighting system',
        speed: '0-40 km/h in 3.0 seconds',
        comfort: 'Smart connectivity, app-controlled features',
        compatibility: 'Perfect for eco-conscious urban commuters'
      }
    },
    {
      id: 8,
      name: 'Okaya iPraise+',
      price: '₹92,000',
      originalPrice: '₹1.00 Lakh',
      image: 'https://c.ndtvimg.com/2021-09/nmut6pmc_okaya-freedum_625x300_16_September_21.jpg',
      rating: 4.1,
      type: 'Scooter',
      fuel: 'Electric',
      mileage: '50+ km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Electric', 'Affordable'],
      images: [
        'https://c.ndtvimg.com/2021-09/nmut6pmc_okaya-freedum_625x300_16_September_21.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/okinawa-ipraise-plus-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/okinawa-ipraise-plus-right-side-view.png'
      ],
      specs: {
        mileage: '90 km per charge',
        fuelType: 'Electric',
        tankCapacity: 'N/A (Battery pack)',
        seating: 'Dual seat with comfortable padding',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlight and taillight',
        speed: 'Top speed of 25 km/h',
        comfort: 'Easy to ride, low maintenance',
        compatibility: 'Ideal for short commutes and last-mile connectivity'
      }
    },
    {
      id: 9,
      name: 'Hero Splendor Plus',
      price: '₹67,000',
      originalPrice: '₹72,000',
      image: 'https://tatasierra.in/wp-content/uploads/2025/01/New-Hero-Splendor-Plus.jpg',
      rating: 4.0,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '50+ km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Commuter', 'Value'],
      images: [
        'https://tatasierra.in/wp-content/uploads/2025/01/New-Hero-Splendor-Plus.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/hero-splendor-plus-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/hero-splendor-plus-left-side-view.png'
      ],
      specs: {
        mileage: '65 km/l',
        fuelType: 'Petrol',
        tankCapacity: '9.5 liters',
        seating: 'Dual seat with grab rail',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: 'Top speed of 95 km/h',
        comfort: 'Upright riding position, reliable engine',
        compatibility: 'Perfect for budget-conscious buyers and daily commuting'
      }
    },
    {
      id: 10,
      name: 'Bajaj Pulsar NS200',
      price: '₹1.25 Lakh',
      originalPrice: '₹1.35 Lakh',
      image: 'https://cdn1.coppel.com/images/catalog/pm/5473543-1.jpg',
      rating: 4.3,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: '₹1-1.5 Lakh',
      tags: ['Naked', 'Performance'],
      images: [
        'https://cdn1.coppel.com/images/catalog/pm/5473543-1.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/bajaj-pulsar-ns200-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/bajaj-pulsar-ns200-left-side-view.png'
      ],
      specs: {
        mileage: '35 km/l',
        fuelType: 'Petrol',
        tankCapacity: '15 liters',
        seating: 'Dual seat with sporty design',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'Full LED lighting',
        speed: '0-100 km/h in 12.5 seconds',
        comfort: 'Aggressive riding position, performance-oriented',
        compatibility: 'Great for performance enthusiasts and highway riding'
      }
    },
    {
      id: 11,
      name: 'Suzuki Access 125',
      price: '₹81,700',
      originalPrice: '₹87,000',
      image: 'https://www.financialexpress.com/wp-content/uploads/2023/07/Suzuki-Access-125-1.jpg',
      rating: 4.2,
      type: 'Scooter',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Commuter'],
      images: [
        'https://www.financialexpress.com/wp-content/uploads/2023/07/Suzuki-Access-125-1.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/suzuki-access-125-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/suzuki-access-125-left-side-view.png'
      ],
      specs: {
        mileage: '48 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.5 liters',
        seating: 'Dual seat with underseat storage',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlight and taillight',
        speed: 'Top speed of 80 km/h',
        comfort: 'Spacious footboard, easy maneuverability',
        compatibility: 'Ideal for city commuting and fuel efficiency'
      }
    },
    {
      id: 12,
      name: 'KTM Duke 200',
      price: '₹1.85 Lakh',
      originalPrice: '₹2.00 Lakh',
      image: 'https://http2.mlstatic.com/D_NQ_836910-MCO80461592664_112024-OO.webp',
      rating: 4.4,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: '₹1.5-2 Lakh',
      tags: ['Naked', 'Aggressive'],
      images: [
        'https://http2.mlstatic.com/D_NQ_836910-MCO80461592664_112024-OO.webp',
        'https://imgd.aeplcdn.com/370x208/bw/models/ktm-duke-200-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/ktm-duke-200-left-side-view.png'
      ],
      specs: {
        mileage: '32 km/l',
        fuelType: 'Petrol',
        tankCapacity: '13.5 liters',
        seating: 'Single seat with sporty design',
        brakes: 'Disc brakes (Front & Rear) with ABS',
        lights: 'Full LED lighting system',
        speed: '0-100 km/h in 9.0 seconds',
        comfort: 'Aggressive riding position, performance-focused',
        compatibility: 'Best for sport riding enthusiasts and track days'
      }
    },
    {
      id: 13,
      name: 'Yamaha FZ-S V4',
      price: '₹1.33 Lakh',
      originalPrice: '₹1.40 Lakh',
      image: 'https://bikekhoj.com/wp-content/uploads/2023/02/xyamaha-fz-s-version-4-0-1676279338.jpg.pagespeed.ic_.rrdbQUQ9BI.jpg',
      rating: 4.3,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: '₹1-1.5 Lakh',
      tags: ['Street', 'Value'],
      images: [
        'https://bikekhoj.com/wp-content/uploads/2023/02/xyamaha-fz-s-version-4-0-1676279338.jpg.pagespeed.ic_.rrdbQUQ9BI.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-fz-s-v4-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-fz-s-v4-left-side-view.png'
      ],
      specs: {
        mileage: '48 km/l',
        fuelType: 'Petrol',
        tankCapacity: '10 liters',
        seating: 'Dual seat with comfortable padding',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'LED headlights with DRLs',
        speed: '0-60 km/h in 4.8 seconds',
        comfort: 'Upright riding position, smooth engine',
        compatibility: 'Great for daily commuting and weekend rides'
      }
    },
    {
      id: 14,
      name: 'TVS NTorq 125',
      price: '₹88,000',
      originalPrice: '₹95,000',
      image: 'https://www.autobics.com/wp-content/uploads/2018/02/TVS-NTORQ-125-Rear-Left-2018.jpg',
      rating: 4.2,
      type: 'Scooter',
      fuel: 'Petrol',
      mileage: '40-50 km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Performance', 'Tech'],
      images: [
        'https://www.autobics.com/wp-content/uploads/2018/02/TVS-NTORQ-125-Rear-Left-2018.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-n-torq-125-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-n-torq-125-left-side-view.png'
      ],
      specs: {
        mileage: '45 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.8 liters',
        seating: 'Dual seat with premium finish',
        brakes: 'Disc brake (Front), Drum brake (Rear)',
        lights: 'Full LED lighting with projector headlight',
        speed: 'Top speed of 95 km/h',
        comfort: 'Sporty design, digital instrument cluster',
        compatibility: 'Ideal for tech-savvy riders and performance seekers'
      }
    },
    {
      id: 15,
      name: 'Royal Enfield Bullet 350',
      price: '₹1.55 Lakh',
      originalPrice: '₹1.65 Lakh',
      image: 'https://images.carandbike.com/cms/articles/2023/9/3209007/royal_enfield_bullet_350_military_red_carandbike_1_e933422d70.jpg',
      rating: 4.5,
      type: 'Bike',
      fuel: 'Petrol',
      mileage: '30-40 km/l',
      budget: '₹1.5-2 Lakh',
      tags: ['Heritage', 'Classic'],
      images: [
        'https://images.carandbike.com/cms/articles/2023/9/3209007/royal_enfield_bullet_350_military_red_carandbike_1_e933422d70.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-bullet-350-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-bullet-350-left-side-view.png'
      ],
      specs: {
        mileage: '35 km/l',
        fuelType: 'Petrol',
        tankCapacity: '15 liters',
        seating: 'Dual seat with classic design',
        brakes: 'Disc brake (Front), Drum brake (Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: 'Top speed of 110 km/h',
        comfort: 'Upright riding position, classic styling',
        compatibility: 'Perfect for long rides and heritage enthusiasts'
      }
    },
    {
      id: 16,
      name: 'Honda Dio',
      price: '₹72,000',
      originalPrice: '₹78,000',
      image: 'https://img.indianautosblog.com/2023/06/12/2023-honda-dio-pearl-igneous-black-cf33.jpg',
      rating: 4.1,
      type: 'Scooter',
      fuel: 'Petrol',
      mileage: '50+ km/l',
      budget: 'Under ₹1 Lakh',
      tags: ['Commuter', 'Fuel Efficient'],
      images: [
        'https://img.indianautosblog.com/2023/06/12/2023-honda-dio-pearl-igneous-black-cf33.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-dio-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-dio-left-side-view.png'
      ],
      specs: {
        mileage: '55 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.3 liters',
        seating: 'Dual seat with compact design',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlight and taillight',
        speed: 'Top speed of 85 km/h',
        comfort: 'Step-through design, lightweight',
        compatibility: 'Great for fuel-conscious commuters and city travel'
      }
    }
  ];

  const handleFilterSelect = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setShowFilters(prev => ({
      ...prev,
      [filterType]: false
    }));
  };

  const toggleFilterView = (filterType: keyof typeof showFilters) => {
    setShowFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType]
    }));
  };

  const getFilteredVehicles = () => {
    // Filter vehicles based on selected criteria strictly
    let filtered = vehicles.filter(vehicle => {
      // If a filter is selected, vehicle must match that criteria
      if (selectedFilters.fuelType && vehicle.fuel !== selectedFilters.fuelType) return false;
      if (selectedFilters.mileage && vehicle.mileage !== selectedFilters.mileage) return false;
      if (selectedFilters.vehicleType && vehicle.type !== selectedFilters.vehicleType) return false;
      if (selectedFilters.budget && vehicle.budget !== selectedFilters.budget) return false;
      return true;
    });
    
    // If we have less than 4 results and at least one filter is selected, 
    // try to relax filters one by one until we have at least 4 results
    if (filtered.length < 4 && Object.values(selectedFilters).some(filter => filter !== '')) {
      // Create a copy of selected filters to modify
      let tempFilters = { ...selectedFilters };
      const filterKeys = ['fuelType', 'mileage', 'vehicleType', 'budget'];
      
      // Try removing one filter at a time until we have at least 4 results
      for (let i = 0; i < filterKeys.length && filtered.length < 4; i++) {
        const filterToRemove = filterKeys[i];
        if (tempFilters[filterToRemove as keyof typeof tempFilters]) {
          // Remove this filter
          tempFilters = { ...tempFilters, [filterToRemove]: '' };
          
          // Re-filter with relaxed criteria
          filtered = vehicles.filter(vehicle => {
            if (tempFilters.fuelType && vehicle.fuel !== tempFilters.fuelType) return false;
            if (tempFilters.mileage && vehicle.mileage !== tempFilters.mileage) return false;
            if (tempFilters.vehicleType && vehicle.type !== tempFilters.vehicleType) return false;
            if (tempFilters.budget && vehicle.budget !== tempFilters.budget) return false;
            return true;
          });
        }
      }
    }
    
    return filtered;
  };

  const filteredVehicles = getFilteredVehicles();

  const features = [
    {
      icon: (
        <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
          <Fuel className="h-6 w-6" />
        </div>
      ),
      title: "Fuel Type",
      description: "Petrol, Diesel, Electric options",
      bgColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      filterType: "fuelType",
      options: fuelTypes
    },
    {
      icon: (
        <div className="bg-green-600 text-white rounded-full p-3 mb-2">
          <Gauge className="h-6 w-6" />
        </div>
      ),
      title: "Mileage",
      description: "Best fuel efficiency bikes",
      bgColor: "bg-gradient-to-br from-green-50 to-green-100",
      borderColor: "border-green-200",
      filterType: "mileage",
      options: mileages
    },
    {
      icon: (
        <div className="bg-purple-600 text-white rounded-full p-3 mb-2">
          <Bike className="h-6 w-6" />
        </div>
      ),
      title: "Two-Wheeler Type",
      description: "Bikes, Scooters, Sports",
      bgColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      filterType: "vehicleType",
      options: vehicleTypes
    },
    {
      icon: (
        <div className="bg-yellow-600 text-white rounded-full p-3 mb-2">
          <Wallet className="h-6 w-6" />
        </div>
      ),
      title: "Budget",
      description: "Under any budget range",
      bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      filterType: "budget",
      options: budgets
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
                VAHAAN BAZAAR
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Ads Swiper */}
        <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg h-96">
          {/* Slides */}
          {adImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Ad ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Features Section - Single Row */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Find Your Perfect Ride</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border ${feature.bgColor} ${feature.borderColor} relative`}
                onClick={() => toggleFilterView(feature.filterType as any)}
              >
                <div className="flex flex-col items-center text-center">
                  {feature.icon}
                  <h3 className="text-sm font-semibold text-gray-800">{feature.title}</h3>
                  <p className="text-xs text-gray-600 mt-1">{feature.description}</p>
                  {selectedFilters[feature.filterType as keyof typeof selectedFilters] && (
                    <p className="text-xs font-bold text-gray-800 mt-2">
                      Selected: {selectedFilters[feature.filterType as keyof typeof selectedFilters]}
                    </p>
                  )}
                </div>
                
                {/* Filter Options Dropdown */}
                {showFilters[feature.filterType as keyof typeof showFilters] && (
                  <div className="mt-4 bg-white rounded-lg shadow-lg p-3 absolute z-10 w-full left-0">
                    <h4 className="font-semibold text-gray-800 mb-2">Select {feature.title}:</h4>
                    <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
                      {feature.options.map((option: string, idx: number) => (
                        <button
                          key={idx}
                          className="text-left px-3 py-2 hover:bg-gray-100 rounded text-sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFilterSelect(feature.filterType as any, option);
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Results Section */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Recommended Vehicles</h2>
            {Object.values(selectedFilters).some(filter => filter !== '') && (
              <p className="text-gray-600">
                Showing {filteredVehicles.length} vehicles matching your selected filters
              </p>
            )}
          </div>
          
          {filteredVehicles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredVehicles.map((vehicle) => (
                <div 
                  key={vehicle.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
                >
                  {/* Vehicle Images Carousel */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={vehicle.images[0]} 
                      alt={vehicle.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Tags */}
                    <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                      {vehicle.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className={`px-2 py-1 text-xs font-bold rounded ${tag === 'Electric' ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Rating */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded flex items-center">
                      <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                      <span className="text-xs">{vehicle.rating}</span>
                    </div>
                  </div>
                  
                  {/* Vehicle Details */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-1">{vehicle.name}</h3>
                    <div className="flex items-center mb-2">
                      <span className="text-lg font-bold text-blue-600 mr-2">{vehicle.price}</span>
                      {vehicle.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{vehicle.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        <p>Type: {vehicle.type}</p>
                        <p>Fuel: {vehicle.fuel}</p>
                        <p>Mileage: {vehicle.mileage}</p>
                      </div>
                      <button 
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => navigate('/vehicle-details', { state: { vehicle } })}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : Object.values(selectedFilters).some(filter => filter !== '') ? (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">No vehicles match your selected filters. Try adjusting your filters.</p>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Select filters above to see recommended vehicles.</p>
            </div>
          )}
        </section>

        {/* All Available Vehicles Section */}
        <section className="mb-12">
          <div className="text-center mb-10 relative">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-32 border-2 border-amber-500 rounded-full opacity-30"></div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-wide relative z-10">All Available Vehicles in Showroom</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-600 to-amber-800 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Explore our premium collection of bikes and scooters, each crafted with precision and designed for excellence</p>
          </div>
          
          {/* Bikes Section */}
          <div className="mb-16">
            <div className="flex items-center mb-8 pb-3 border-b-2 border-amber-100">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl mr-5 shadow-md border border-blue-200">
                <Bike className="w-10 h-10 text-blue-700" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Premium Bikes Collection</h3>
                <p className="text-gray-600 mt-1">Discover our range of high-performance motorcycles</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {vehicles.filter(vehicle => vehicle.type === 'Bike').slice(0, 8).map((bike) => (
                <div 
                  key={bike.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
                  onClick={() => setSelectedVehicle(bike)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={bike.images[0]} 
                      alt={bike.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      {bike.tags[0]}
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-95 text-gray-800 px-3 py-1.5 rounded-full flex items-center shadow-lg">
                      <Star className="w-5 h-5 fill-current text-amber-400 mr-1" />
                      <span className="text-sm font-bold">{bike.rating}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{bike.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-blue-700">{bike.price}</span>
                        {bike.originalPrice && (
                          <span className="text-base text-gray-500 line-through ml-3">{bike.originalPrice}</span>
                        )}
                      </div>
                      <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {bike.fuel}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                      <span>{bike.mileage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scooters Section */}
          <div>
            <div className="flex items-center mb-8 pb-3 border-b-2 border-amber-100">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl mr-5 shadow-md border border-purple-200">
                <Bike className="w-10 h-10 text-purple-700" />
              </div>
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-900">Elegant Scooters Collection</h3>
                <p className="text-gray-600 mt-1">Experience comfort and style with our premium scooters</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {vehicles.filter(vehicle => vehicle.type === 'Scooter').slice(0, 8).map((scooter) => (
                <div 
                  key={scooter.id} 
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 border border-gray-100"
                  onClick={() => setSelectedVehicle(scooter)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={scooter.images[0]} 
                      alt={scooter.name} 
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
                      {scooter.tags[0]}
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-95 text-gray-800 px-3 py-1.5 rounded-full flex items-center shadow-lg">
                      <Star className="w-5 h-5 fill-current text-amber-400 mr-1" />
                      <span className="text-sm font-bold">{scooter.rating}</span>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-b from-white to-gray-50">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{scooter.name}</h3>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-2xl font-bold text-purple-700">{scooter.price}</span>
                        {scooter.originalPrice && (
                          <span className="text-base text-gray-500 line-through ml-3">{scooter.originalPrice}</span>
                        )}
                      </div>
                      <div className="bg-purple-50 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {scooter.fuel}
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Gauge className="w-4 h-4 mr-2 text-purple-500" />
                      <span>{scooter.mileage}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bank Offer Section */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Left Content */}
              <div className="md:w-1/2 p-8 text-white">
                <div className="mb-6">
                  <span className="bg-amber-400 text-gray-900 px-4 py-1 rounded-full text-sm font-bold">EXCLUSIVE OFFER</span>
                  <h2 className="text-3xl font-serif font-bold mt-4">Special Bank Financing Offer</h2>
                  <p className="mt-2 opacity-90">Get amazing deals with our partnered banks. Limited time offer!</p>
                </div>
                
                <div className="bg-white bg-opacity-20 rounded-xl p-6 mb-6">
                  <h3 className="text-2xl font-bold mb-4">TVS Jupiter</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between border-b border-white border-opacity-30 pb-2">
                      <span>Original Price</span>
                      <span className="font-bold">₹78,000</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-30 pb-2">
                      <span>Bank Offer Price</span>
                      <span className="font-bold text-amber-300">₹73,400</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-30 pb-2">
                      <span>Insurance (Free)</span>
                      <span className="font-bold text-green-300">₹0</span>
                    </div>
                    <div className="flex justify-between border-b border-white border-opacity-30 pb-2">
                      <span>Tool Kit (Free)</span>
                      <span className="font-bold text-green-300">₹0</span>
                    </div>
                    <div className="flex justify-between pt-2">
                      <span className="font-bold">Total Savings</span>
                      <span className="font-bold text-amber-300">₹4,600</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-amber-500 bg-opacity-20 rounded-xl p-4 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-6 h-6 mr-2" />
                    <span className="font-bold">Offer ends in:</span>
                  </div>
                  <div className="flex justify-center space-x-4 mt-3">
                    <div className="text-center">
                      <div className="bg-amber-500 rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold">
                        02
                      </div>
                      <span className="text-xs mt-1 block">DAYS</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-500 rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold">
                        14
                      </div>
                      <span className="text-xs mt-1 block">HRS</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-500 rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold">
                        36
                      </div>
                      <span className="text-xs mt-1 block">MIN</span>
                    </div>
                    <div className="text-center">
                      <div className="bg-amber-500 rounded-lg w-12 h-12 flex items-center justify-center text-xl font-bold">
                        22
                      </div>
                      <span className="text-xs mt-1 block">SEC</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                  onClick={() => {
                    const scooter = vehicles.find(v => v.name === 'TVS Jupiter');
                    if (scooter) setSelectedVehicle(scooter);
                  }}
                >
                  Avail This Offer Now
                </button>
              </div>
              
              {/* Right Curved Edge Scooter Display */}
              <div className="md:w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-600 to-opacity-90 z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="text-white text-center p-6">
                    <h3 className="text-2xl font-serif font-bold mb-2">TVS Jupiter</h3>
                    <p className="mb-4 opacity-90">42 km/l mileage • Petrol • 5.5L tank</p>
                    <div className="bg-amber-500 text-gray-900 px-4 py-2 rounded-full font-bold inline-block">
                      ₹73,400
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-600 to-transparent z-10"></div>
                <img 
                  src="https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg" 
                  alt="TVS Jupiter Special Offer" 
                  className="w-full h-full object-cover transform scale-110"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Vehicle Detail Showcase */}
        {selectedVehicle && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-screen overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedVehicle.name}</h2>
                  <button 
                    onClick={() => setSelectedVehicle(null)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 360 View Carousel */}
                  <div className="relative">
                    <div className="relative h-80 rounded-lg overflow-hidden mb-4">
                      <img 
                        src={selectedVehicle.images[currentVehicleImage]} 
                        alt={`${selectedVehicle.name} view ${currentVehicleImage + 1}`} 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                      {selectedVehicle.images.map((_: any, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentVehicleImage(index)}
                          className={`w-3 h-3 rounded-full ${
                            index === currentVehicleImage ? 'bg-blue-600' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setCurrentVehicleImage((prev) => (prev === 0 ? selectedVehicle.images.length - 1 : prev - 1))}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Prev
                      </button>
                      <button
                        onClick={() => setCurrentVehicleImage((prev) => (prev === selectedVehicle.images.length - 1 ? 0 : prev + 1))}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                  
                  {/* Vehicle Specifications */}
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <span className="text-2xl font-bold text-blue-600 mr-4">{selectedVehicle.price}</span>
                        {selectedVehicle.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">{selectedVehicle.originalPrice}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-5 h-5 fill-current text-yellow-400 mr-1" />
                        <span className="text-gray-700">{selectedVehicle.rating} Rating</span>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Specifications</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Mileage</span>
                        <span className="text-gray-900">{selectedVehicle.specs.mileage}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Fuel Type</span>
                        <span className="text-gray-900">{selectedVehicle.specs.fuelType}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Fuel Tank Capacity</span>
                        <span className="text-gray-900">{selectedVehicle.specs.tankCapacity}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Seating</span>
                        <span className="text-gray-900">{selectedVehicle.specs.seating}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Brakes</span>
                        <span className="text-gray-900">{selectedVehicle.specs.brakes}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Lights</span>
                        <span className="text-gray-900">{selectedVehicle.specs.lights}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Speed Raise</span>
                        <span className="text-gray-900">{selectedVehicle.specs.speed}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Comfort</span>
                        <span className="text-gray-900">{selectedVehicle.specs.comfort}</span>
                      </div>
                      <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700">Compatibility</span>
                        <span className="text-gray-900">{selectedVehicle.specs.compatibility}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Buy/Book Button */}
                <div className="mt-8">
                  <button 
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                    onClick={() => {
                      // In a real app, this would trigger a booking process
                      alert(`Booking process for ${selectedVehicle.name} initiated!`);
                      setSelectedVehicle(null);
                    }}
                  >
                    Buy/Book Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;