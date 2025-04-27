import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Clock, Users, Map, Check, AlertCircle, X, Menu, User, Settings, Moon, Sun, BookOpen } from 'lucide-react';

// Generate lots of mock room data for pagination demo
const generateMockRooms = () => {
  // Sample real meeting room image URLs
  const roomImages = [
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1517502884422-41eaead166d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1516705346105-d4977acd904d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1572025442646-866d16c84a54?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80'
  ];
  
  const baseRooms = [
    {
      roomId: 'R001',
      roomName: 'Room Alpha',
      seats: 8,
      building: 'Main Building',
      floor: '1',
      area: 'East Wing',
      pictureURL: roomImages[0],
      accessType: 'General Access',
      bookingType: 'Standard',
      requiresApproval: false,
      facilities: ['Projector', 'Whiteboard', 'Video Conferencing'],
      description: 'Bright corner room with natural lighting and modern amenities. Perfect for small team discussions and brainstorming sessions. Includes adjustable standing desks.'
    },
    {
      roomId: 'R002',
      roomName: 'Room Beta',
      seats: 12,
      building: 'Main Building',
      floor: '2',
      area: 'West Wing',
      pictureURL: roomImages[1],
      accessType: 'Restricted (Approval)',
      bookingType: 'Standard',
      requiresApproval: true,
      facilities: ['Projector', 'Whiteboard', 'Smart TV'],
      description: 'Spacious meeting room with premium furniture and sound-dampening panels. Designed for client presentations and team reviews. Offers panoramic views of the campus.'
    },
    {
      roomId: 'RVIP1',
      roomName: 'VIP Lounge',
      seats: 6,
      building: 'Executive Building',
      floor: '5',
      area: 'South Wing',
      pictureURL: roomImages[2],
      accessType: 'Restricted (Approval)',
      bookingType: 'Standard',
      requiresApproval: true,
      facilities: ['Projector', 'Video Conferencing', 'Catering Service'],
      description: 'Exclusive meeting space with high-end furnishings and catering options. Reserved for executive meetings and special guests. Features custom climate control and privacy glass.'
    },
    {
      roomId: 'RAUD1',
      roomName: 'Auditorium',
      seats: 100,
      building: 'Conference Center',
      floor: 'G',
      area: 'Main Hall',
      pictureURL: roomImages[3],
      accessType: 'Special (Approval)',
      bookingType: 'Special',
      requiresApproval: true,
      facilities: ['Projector', 'Sound System', 'Stage', 'Video Recording'],
      description: 'Large-scale presentation venue with stadium seating and professional AV equipment. Ideal for company-wide meetings and public events. Includes backstage preparation area.'
    }
  ];
  
  // Generate many rooms for pagination demo (100+ rooms)
  const allRooms = [...baseRooms];
  
  const buildings = ['Main Building', 'Executive Building', 'Conference Center', 'Innovation Hub', 'Research Center'];
  const areas = ['North Wing', 'South Wing', 'East Wing', 'West Wing', 'Central Area'];
  const facilityOptions = [
    ['Projector', 'Whiteboard'], 
    ['Smart TV', 'Video Conferencing'], 
    ['Projector', 'Whiteboard', 'Smart TV'], 
    ['Whiteboard', 'Catering Service'], 
    ['Projector', 'Sound System', 'Smart TV'],
    ['Video Conferencing', 'Whiteboard', 'Catering Service']
  ];
  const accessTypes = ['General Access', 'Restricted (Approval)', 'Special (Approval)'];
  const bookingTypes = ['Standard', 'Special'];
  
  // Sample room descriptions to randomly assign
  const roomDescriptions = [
    'Modern meeting space with ergonomic furniture and collaborative tools. Features sound-absorbing walls and adjustable lighting. Suitable for productive team meetings.',
    'Intimate discussion room with comfortable seating and minimalist design. Perfect for one-on-one meetings and interviews. Offers good acoustic privacy.',
    'Versatile room with modular furniture that can be rearranged. Equipped with state-of-the-art presentation technology. Ideal for workshops and training sessions.',
    'Bright corner space with floor-to-ceiling windows providing natural light. Features collaborative digital whiteboard technology. Great for creative sessions.',
    'Professional meeting room with elegant décor and executive furniture. Includes refreshment station and coat closet. Suitable for client meetings and board discussions.',
    'Casual brainstorming space with bean bags and standing desks. Walls are writable whiteboard surfaces. Designed to foster creativity and innovation.',
    'Formal presentation room with tiered seating and integrated AV system. Includes speaker podium and audience microphones. Perfect for departmental presentations.',
    'Multi-purpose room with flexible layout options and movable partitions. Can accommodate various meeting styles and group sizes. Features built-in charging stations.',
    'Technology-focused space with immersive video conferencing setup. Multiple displays allow for content sharing and remote collaboration. Ideal for global team meetings.',
    'Quiet thinking space with minimalist design and noise-cancelling features. Limited digital distractions with focused work environment. Best for strategic planning sessions.'
  ];
  
  // Generate additional 120 rooms
  for (let i = 1; i <= 120; i++) {
    const building = buildings[Math.floor(Math.random() * buildings.length)];
    const area = areas[Math.floor(Math.random() * areas.length)];
    const facilities = facilityOptions[Math.floor(Math.random() * facilityOptions.length)];
    const accessType = accessTypes[Math.floor(Math.random() * accessTypes.length)];
    const bookingType = accessType === 'Special (Approval)' ? 'Special' : bookingTypes[Math.floor(Math.random() * bookingTypes.length)];
    const requiresApproval = accessType !== 'General Access';
    const description = roomDescriptions[Math.floor(Math.random() * roomDescriptions.length)];
    // Use a random image from our collection for variety
    const randomImage = roomImages[Math.floor(Math.random() * roomImages.length)];
    
    allRooms.push({
      roomId: `R${(i + 10).toString().padStart(3, '0')}`,
      roomName: `Room ${String.fromCharCode(65 + (i % 26))}${Math.floor(i / 26) + 1}`,
      seats: Math.floor(Math.random() * 20) + 4,
      building,
      floor: `${Math.floor(Math.random() * 5) + 1}`,
      area,
      pictureURL: randomImage,
      accessType,
      bookingType,
      requiresApproval,
      facilities,
      description
    });
  }
  
  return allRooms;
};

// Generate the mock rooms
const mockRooms = generateMockRooms();

// Available time slots
const availableTimeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00'
];

// Duration options - Standard rooms
const standardDurations = [
  { value: 30, label: '30 minutes' },
  { value: 45, label: '45 minutes' },
  { value: 60, label: '1 hour' },
  { value: 90, label: '1 hour 30 minutes' },
  { value: 120, label: '2 hours' }
];

// Duration options - Special rooms
const specialDurations = [
  { value: 240, label: 'Half-day (4 hours)' },
  { value: 480, label: 'Full-day (8 hours)' }
];

const locations = ['Main Building', 'Executive Building', 'Conference Center', 'Innovation Hub', 'Research Center'];
const facilities = ['Projector', 'Whiteboard', 'Video Conferencing', 'Smart TV', 'Sound System', 'Catering Service', 'Stage', 'Video Recording'];

const MeetingRoomBookingPage = () => {
  // States for the booking process
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:00');
  const [selectedDuration, setSelectedDuration] = useState(standardDurations[0].value);
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingStatus, setBookingStatus] = useState(null); // 'confirmed', 'pending', 'error'
  
  // States for filtering
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  
  // States for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  
  // States for dark mode and menu
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Calculate filtered rooms
  const filteredRooms = mockRooms.filter(room => {
    // Search query
    if (searchQuery && !room.roomName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Location filter
    if (selectedLocation && room.building !== selectedLocation) {
      return false;
    }
    
    // Facilities filter
    if (selectedFacilities.length > 0) {
      const hasFacilities = selectedFacilities.every(facility => 
        room.facilities.includes(facility)
      );
      if (!hasFacilities) return false;
    }
    
    return true;
  });
  
  // Calculate pagination data
  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstRoom, indexOfLastRoom);
  
  // Update total pages when filtered rooms change
  useEffect(() => {
    setTotalPages(Math.ceil(filteredRooms.length / roomsPerPage));
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [filteredRooms.length, roomsPerPage]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Toggle menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle booking submission
  const handleBookingSubmit = () => {
    // Calculate end time
    const startTime = selectedTimeSlot;
    
    // In a real app, you would make API calls to check availability and create the booking
    
    // Determine if selected room requires approval
    if (selectedRoom.requiresApproval) {
      setBookingStatus('pending');
    } else {
      setBookingStatus('confirmed');
    }
    
    // Scroll to top to show confirmation
    window.scrollTo(0, 0);
  };

  // Reset booking process
  const resetBooking = () => {
    setSelectedRoom(null);
    setSelectedTimeSlot('09:00');
    setSelectedDuration(standardDurations[0].value);
    setBookingNotes('');
    setBookingStatus(null);
  };

  // Toggle facility selection
  const toggleFacility = (facility) => {
    if (selectedFacilities.includes(facility)) {
      setSelectedFacilities(selectedFacilities.filter(f => f !== facility));
    } else {
      setSelectedFacilities([...selectedFacilities, facility]);
    }
  };

  return (
    <div className={darkMode ? "min-h-screen bg-gray-900 text-white" : "min-h-screen bg-gray-50 text-gray-900"}>
      {/* Header */}
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Meeting Room Booking System</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="hover:text-gray-300 flex items-center space-x-1">
              <BookOpen className="w-5 h-5" />
              <span>Book Meeting</span>
            </button>
            <button className="hover:text-gray-300 flex items-center space-x-1">
              <Calendar className="w-5 h-5" />
              <span>Book Meeting Room</span>
            </button>
            <div className="relative group">
              <button className="hover:text-gray-300 flex items-center space-x-1">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-900 rounded-md shadow-lg py-1 invisible group-hover:visible">
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button className="block w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Preferences
                </button>
              </div>
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-700">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-4">
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-700">
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-700">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 border-t border-gray-700 pt-4">
            <nav className="flex flex-col space-y-3">
              <button className="hover:text-gray-300 flex items-center space-x-2 py-2">
                <BookOpen className="w-5 h-5" />
                <span>Book Meeting</span>
              </button>
              <button className="hover:text-gray-300 flex items-center space-x-2 py-2">
                <Calendar className="w-5 h-5" />
                <span>Book Meeting Room</span>
              </button>
              <div className="border-t border-gray-700 pt-2">
                <p className="text-sm text-gray-400 mb-2">Settings</p>
                <button className="hover:text-gray-300 flex items-center space-x-2 py-2 pl-2">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
                <button className="hover:text-gray-300 flex items-center space-x-2 py-2 pl-2">
                  <Settings className="w-5 h-5" />
                  <span>Preferences</span>
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <div className="container mx-auto p-4">
        {/* Booking Confirmation/Status */}
        {bookingStatus && (
          <div className={bookingStatus === 'confirmed' ? "mb-6 p-4 rounded-lg bg-green-100 border border-green-400" : "mb-6 p-4 rounded-lg bg-yellow-100 border border-yellow-400"}>
            <div className="flex items-start">
              {bookingStatus === 'confirmed' ? (
                <Check className="w-6 h-6 text-green-500 mr-2 mt-1" />
              ) : (
                <AlertCircle className="w-6 h-6 text-yellow-500 mr-2 mt-1" />
              )}
              <div>
                <h2 className="text-lg font-semibold">
                  {bookingStatus === 'confirmed' ? 'Booking Confirmed!' : 'Booking Request Submitted'}
                </h2>
                <p className="mt-1">
                  {bookingStatus === 'confirmed' 
                    ? `Your booking for ${selectedRoom?.roomName} on ${selectedDate} at ${selectedTimeSlot} has been confirmed.` 
                    : `Your booking request for ${selectedRoom?.roomName} on ${selectedDate} at ${selectedTimeSlot} has been submitted and is pending approval. You will be notified once it's approved.`}
                </p>
                <button 
                  onClick={resetBooking}
                  className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Book Another Room
                </button>
              </div>
            </div>
          </div>
        )}

        {!bookingStatus && (
          <>
            {/* Search and Filter */}
            <div className={darkMode ? "mb-6 bg-gray-800 p-4 rounded-lg shadow" : "mb-6 bg-white p-4 rounded-lg shadow"}>
              <div className="flex flex-col space-y-4">
                {/* Search Bar */}
                <div className="w-full relative">
                  <input
                    type="text"
                    placeholder="Search for rooms..."
                    className={darkMode 
                      ? "w-full pl-10 pr-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                      : "w-full pl-10 pr-4 py-2 border rounded-lg bg-white border-gray-300"
                    }
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                </div>
                
                {/* Date and Location in Same Row */}
                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
                  {/* Location Dropdown - First */}
                  <div className="md:w-1/2">
                    <select 
                      className={darkMode 
                        ? "w-full p-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                        : "w-full p-2 border rounded-lg bg-white border-gray-300"
                      }
                      value={selectedLocation}
                      onChange={(e) => setSelectedLocation(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {locations.map(location => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Date Picker - Second */}
                  <div className="md:w-1/2">
                    <input 
                      type="date" 
                      className={darkMode 
                        ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                        : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                      }
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    />
                  </div>
                </div>
                
                {/* Filter Button - At Bottom */}
                <div>
                  <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={darkMode 
                      ? "w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg" 
                      : "w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg"
                    }
                  >
                    <Filter className="w-5 h-5" />
                    <span>{showFilters ? 'Hide Filters' : 'More Filters'}</span>
                  </button>
                </div>
              </div>

              {/* Filter options */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div>
                    <h3 className="font-medium mb-2">Facilities</h3>
                    <div className="flex flex-wrap gap-2">
                      {facilities.map(facility => (
                        <button
                          key={facility}
                          onClick={() => toggleFacility(facility)}
                          className={selectedFacilities.includes(facility)
                            ? "px-3 py-1 text-sm rounded-full bg-black text-white"
                            : "px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }
                        >
                          {facility}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Room Selection or Booking Form */}
            {!selectedRoom ? (
              /* Room Listings */
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredRooms.length > 0 ? (
                    currentRooms.map(room => (
                      <div 
                        key={room.roomId} 
                        className={darkMode 
                          ? "bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer" 
                          : "bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
                        }
                        onClick={() => setSelectedRoom(room)}
                      >
                        <img 
                          src={room.pictureURL} 
                          alt={room.roomName} 
                          className="w-full h-40 object-cover" 
                        />
                        <div className={darkMode ? "p-4 text-gray-200" : "p-4"}>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-lg">{room.roomName}</h3>
                            <span className={room.accessType.includes('Restricted') || room.accessType.includes('Special')
                              ? "text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800"
                              : "text-xs px-2 py-1 rounded bg-green-100 text-green-800"
                            }>
                              {room.accessType}
                            </span>
                          </div>
                          
                          <div className={darkMode ? "mt-2 space-y-2 text-sm text-gray-300" : "mt-2 space-y-2 text-sm text-gray-600"}>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>Capacity: {room.seats}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Map className="w-4 h-4" />
                              <span>{room.building}, Floor {room.floor}, {room.area}</span>
                              <a 
                                href="#" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(`https://maps.google.com?q=${room.building}`, '_blank');
                                }}
                                className={darkMode ? "text-blue-400 hover:underline ml-1" : "text-blue-600 hover:underline ml-1"}
                              >
                                View Map
                              </a>
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="text-sm font-medium">Facilities:</h4>
                            <div className="mt-1 flex flex-wrap gap-1">
                              {room.facilities.map(facility => (
                                <span key={facility} className={darkMode 
                                  ? "text-xs bg-gray-700 px-2 py-1 rounded" 
                                  : "text-xs bg-gray-100 px-2 py-1 rounded"
                                }>
                                  {facility}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-3">
                            <h4 className="text-sm font-medium">Description:</h4>
                            <p className={darkMode ? "text-xs text-gray-300 mt-1" : "text-xs text-gray-600 mt-1"}>
                              {room.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={darkMode 
                      ? "col-span-full p-8 text-center text-gray-300" 
                      : "col-span-full p-8 text-center text-gray-500"
                    }>
                      No rooms match your search criteria. Try adjusting your filters.
                    </div>
                  )}
                </div>
                
                {/* Pagination Controls */}
                {filteredRooms.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className={currentPage === 1 
                          ? (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-800 text-gray-500 cursor-not-allowed" 
                            : "px-3 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed"
                          )
                          : (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-700 hover:bg-gray-600" 
                            : "px-3 py-1 rounded border bg-white hover:bg-gray-50"
                          )
                        }
                      >
                        First
                      </button>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={currentPage === 1 
                          ? (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-800 text-gray-500 cursor-not-allowed" 
                            : "px-3 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed"
                          )
                          : (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-700 hover:bg-gray-600" 
                            : "px-3 py-1 rounded border bg-white hover:bg-gray-50"
                          )
                        }
                      >
                        Previous
                      </button>
                      
                      <div className="px-4 py-1">
                        <span className="font-medium">{currentPage}</span>
                        <span className={darkMode ? "text-gray-400" : "text-gray-500"}> of {totalPages}</span>
                      </div>
                      
                      <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={currentPage === totalPages 
                          ? (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-800 text-gray-500 cursor-not-allowed" 
                            : "px-3 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed"
                          )
                          : (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-700 hover:bg-gray-600" 
                            : "px-3 py-1 rounded border bg-white hover:bg-gray-50"
                          )
                        }
                      >
                        Next
                      </button>
                      
                      <button 
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                        className={currentPage === totalPages 
                          ? (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-800 text-gray-500 cursor-not-allowed" 
                            : "px-3 py-1 rounded border bg-gray-100 text-gray-400 cursor-not-allowed"
                          )
                          : (darkMode 
                            ? "px-3 py-1 rounded border bg-gray-700 hover:bg-gray-600" 
                            : "px-3 py-1 rounded border bg-white hover:bg-gray-50"
                          )
                        }
                      >
                        Last
                      </button>
                    </div>
                  </div>
                )}
                
                {/* Results per page control */}
                {filteredRooms.length > roomsPerPage && (
                  <div className={darkMode ? "mt-4 text-center text-sm text-gray-400" : "mt-4 text-center text-sm text-gray-600"}>
                    <span>Show </span>
                    <select 
                      className={darkMode 
                        ? "px-2 py-1 border rounded bg-gray-700 border-gray-600 text-white" 
                        : "px-2 py-1 border rounded bg-white border-gray-300"
                      }
                      value={roomsPerPage}
                      onChange={(e) => setRoomsPerPage(Number(e.target.value))}
                    >
                      <option value="9">9</option>
                      <option value="18">18</option>
                      <option value="36">36</option>
                      <option value="72">72</option>
                    </select>
                    <span> rooms per page</span>
                  </div>
                )}
              </>
            ) : (
              /* Booking Form */
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <div className={darkMode ? "bg-gray-800 rounded-lg overflow-hidden shadow" : "bg-white rounded-lg overflow-hidden shadow"}>
                    <img 
                      src={selectedRoom.pictureURL} 
                      alt={selectedRoom.roomName} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className={darkMode ? "p-4 text-gray-200" : "p-4"}>
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-lg">{selectedRoom.roomName}</h3>
                        <button 
                          onClick={() => setSelectedRoom(null)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className={darkMode ? "mt-2 space-y-2 text-sm text-gray-300" : "mt-2 space-y-2 text-sm text-gray-600"}>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          <span>Capacity: {selectedRoom.seats}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Map className="w-4 h-4" />
                          <span>{selectedRoom.building}, Floor {selectedRoom.floor}, {selectedRoom.area}</span>
                          <a 
                            href="#" 
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://maps.google.com?q=${selectedRoom.building}`, '_blank');
                            }}
                            className={darkMode ? "text-blue-400 hover:underline ml-1" : "text-blue-600 hover:underline ml-1"}
                          >
                            View Map
                          </a>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium">Facilities:</h4>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {selectedRoom.facilities.map(facility => (
                            <span key={facility} className={darkMode ? "text-xs bg-gray-700 px-2 py-1 rounded" : "text-xs bg-gray-100 px-2 py-1 rounded"}>
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-sm font-medium">Description:</h4>
                        <p className={darkMode ? "text-xs text-gray-300 mt-1" : "text-xs text-gray-600 mt-1"}>
                          {selectedRoom.description}
                        </p>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t">
                        <div className={selectedRoom.requiresApproval ? "text-sm text-yellow-600" : "text-sm text-green-600"}>
                          {selectedRoom.requiresApproval 
                            ? 'This room requires approval before booking is confirmed.' 
                            : 'This room is available for instant booking.'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className={darkMode ? "md:col-span-2 bg-gray-800 rounded-lg shadow p-6" : "md:col-span-2 bg-white rounded-lg shadow p-6"}>
                  <h2 className="text-xl font-semibold mb-4">Book {selectedRoom.roomName}</h2>
                  
                  <div className="space-y-6">
                    {/* Date and Location in same row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={darkMode ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                          Date
                        </label>
                        <input 
                          type="date" 
                          className={darkMode 
                            ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                            : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                          }
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className={darkMode ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                          Location
                        </label>
                        <input 
                          type="text" 
                          className={darkMode 
                            ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                            : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                          }
                          value={`${selectedRoom.building}, Floor ${selectedRoom.floor}, ${selectedRoom.area}`}
                          readOnly
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className={darkMode ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                          Start Time
                        </label>
                        <select 
                          className={darkMode 
                            ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                            : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                          }
                          value={selectedTimeSlot}
                          onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        >
                          {availableTimeSlots.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className={darkMode ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                          Duration
                        </label>
                        <select 
                          className={darkMode 
                            ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                            : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                          }
                          value={selectedDuration}
                          onChange={(e) => setSelectedDuration(Number(e.target.value))}
                        >
                          {(selectedRoom.bookingType === 'Standard' ? standardDurations : specialDurations).map(duration => (
                            <option key={duration.value} value={duration.value}>{duration.label}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className={darkMode ? "block text-sm font-medium text-gray-300 mb-1" : "block text-sm font-medium text-gray-700 mb-1"}>
                        Notes (Optional)
                      </label>
                      <textarea 
                        className={darkMode 
                          ? "w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-600 text-white" 
                          : "w-full px-4 py-2 border rounded-lg bg-white border-gray-300"
                        }
                        rows="3"
                        placeholder="Add any special requirements or notes for your booking"
                        value={bookingNotes}
                        onChange={(e) => setBookingNotes(e.target.value)}
                      ></textarea>
                    </div>
                    
                    <div className="pt-4">
                      <button 
                        onClick={handleBookingSubmit}
                        className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                      >
                        {selectedRoom.requiresApproval ? 'Submit Booking Request' : 'Confirm Booking'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MeetingRoomBookingPage;