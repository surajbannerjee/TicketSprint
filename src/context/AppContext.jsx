"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const PRESET_AVATARS = [
  {
    id: "suraj",
    name: "Suraj Banerjee (VIP Pass)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "neon-cyber",
    name: "Cyber Neon Glow",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "cine-gold",
    name: "Cinematic Director",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "studio-purple",
    name: "IMAX Elite Club",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "minimalist",
    name: "Futuristic Minimal",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "indie-art",
    name: "Indie Screenwriter",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&auto=format&fit=crop&q=80",
  },
];

export const CITIES_LIST = [
  {
    name: "Kolkata, WB",
    short: "CCU",
    theatres: "28 Cinemas Available",
    distance: "Your Home Region",
    isPopular: true,
    priceRange: "₹120 - ₹550",
    avgPrice: "₹240",
    halls: [
      {
        id: "inox-south-city",
        name: "INOX South City Mall & IMAX",
        area: "Prince Anwar Shah Rd, Jadavpur",
        screens: "6 Screens (IMAX Laser)",
        ticketPrice: 320,
        priceTag: "Premium",
        priceBadge: "₹280 - ₹550",
        format: "IMAX 3D • Dolby Atmos",
      },
      {
        id: "pvr-mani-square",
        name: "PVR Mani Square",
        area: "EM Bypass, Kankurgachi",
        screens: "4 Screens (4DX & 3D)",
        ticketPrice: 240,
        priceTag: "Moderate",
        priceBadge: "₹180 - ₹380",
        format: "4DX • Dolby 7.1",
      },
      {
        id: "cinepolis-acropolis",
        name: "Cinepolis Acropolis Mall",
        area: "Rajdanga Main Rd, Kasba",
        screens: "4 Screens (VIP Recliner)",
        ticketPrice: 220,
        priceTag: "Best Value",
        priceBadge: "₹150 - ₹320",
        format: "RealD 3D • VIP",
      },
      {
        id: "priya-cinema",
        name: "Priya Cinema - Rashbehari",
        area: "Rashbehari Avenue, Kalighat",
        screens: "Heritage Single/Twin",
        ticketPrice: 120,
        priceTag: "Cheapest",
        priceBadge: "₹100 - ₹180",
        format: "Dolby Digital • Heritage",
      },
      {
        id: "star-theatre",
        name: "Star Theatre (Heritage Hall)",
        area: "Bidhan Sarani, Hatibagan",
        screens: "Classic Single Screen",
        ticketPrice: 130,
        priceTag: "Cheapest",
        priceBadge: "₹110 - ₹170",
        format: "2K Projection • Affordable",
      },
    ],
  },
  {
    name: "Howrah, WB",
    short: "HWH",
    theatres: "12 Cinemas Available",
    distance: "12 km away",
    isPopular: true,
    priceRange: "₹110 - ₹350",
    avgPrice: "₹190",
    halls: [
      {
        id: "inox-forum-rangoli",
        name: "INOX Forum Rangoli Mall",
        area: "Belur, Howrah",
        screens: "4 Screens",
        ticketPrice: 190,
        priceTag: "Moderate",
        priceBadge: "₹140 - ₹290",
        format: "Dolby Atmos • Laser",
      },
      {
        id: "miraj-cinemas-avani",
        name: "Miraj Cinemas - Avani Riverside Mall",
        area: "Shibpur, Howrah",
        screens: "4 Screens",
        ticketPrice: 170,
        priceTag: "Best Value",
        priceBadge: "₹130 - ₹260",
        format: "3D Digital • Surround",
      },
      {
        id: "shanti-cinema",
        name: "Shanti Cinema Howrah",
        area: "G.T. Road, Howrah",
        screens: "Single Screen",
        ticketPrice: 110,
        priceTag: "Cheapest",
        priceBadge: "₹90 - ₹140",
        format: "Standard 2K",
      },
    ],
  },
  {
    name: "Siliguri, WB",
    short: "IXB",
    theatres: "9 Cinemas Available",
    distance: "North Bengal Hub",
    isPopular: true,
    priceRange: "₹130 - ₹420",
    avgPrice: "₹220",
    halls: [
      {
        id: "inox-city-centre-siliguri",
        name: "INOX City Centre",
        area: "Uttorayon, Matigara",
        screens: "4 Screens",
        ticketPrice: 240,
        priceTag: "Moderate",
        priceBadge: "₹180 - ₹360",
        format: "Dolby Atmos 7.1",
      },
      {
        id: "carnival-cinemas-orbit",
        name: "Carnival Cinemas - Orbit Mall",
        area: "Sevoke Road, Siliguri",
        screens: "3 Screens",
        ticketPrice: 170,
        priceTag: "Best Value",
        priceBadge: "₹130 - ₹250",
        format: "Digital 3D",
      },
    ],
  },
  {
    name: "Durgapur, WB",
    short: "DGP",
    theatres: "8 Cinemas Available",
    distance: "Paschim Bardhaman",
    isPopular: false,
    priceRange: "₹120 - ₹340",
    avgPrice: "₹190",
    halls: [
      {
        id: "bioscope-junction-mall",
        name: "Bioscope Cinemas - Junction Mall",
        area: "City Centre, Durgapur",
        screens: "3 Screens",
        ticketPrice: 210,
        priceTag: "Moderate",
        priceBadge: "₹160 - ₹320",
        format: "Dolby Surround",
      },
      {
        id: "inox-suhatta-mall",
        name: "INOX Suhatta",
        area: "Benachity, Durgapur",
        screens: "3 Screens",
        ticketPrice: 180,
        priceTag: "Best Value",
        priceBadge: "₹130 - ₹260",
        format: "Digital Laser",
      },
    ],
  },
  {
    name: "Asansol, WB",
    short: "ASN",
    theatres: "7 Cinemas Available",
    distance: "West Bengal Industrial Belt",
    isPopular: false,
    priceRange: "₹100 - ₹320",
    avgPrice: "₹170",
    halls: [
      {
        id: "galaxy-mall-asansol",
        name: "Eylex Cinemas - Galaxy Mall",
        area: "Burnpur Road, Asansol",
        screens: "3 Screens",
        ticketPrice: 180,
        priceTag: "Moderate",
        priceBadge: "₹140 - ₹280",
        format: "Dolby Digital",
      },
      {
        id: "durga-cinema-asansol",
        name: "Durga Cinema Hall",
        area: "G.T. Road, Asansol",
        screens: "Single Screen",
        ticketPrice: 100,
        priceTag: "Cheapest",
        priceBadge: "₹80 - ₹130",
        format: "2K Projection",
      },
    ],
  },
  {
    name: "Burdwan (Bardhaman), WB",
    short: "BWN",
    theatres: "6 Cinemas Available",
    distance: "Purba Bardhaman",
    isPopular: false,
    priceRange: "₹90 - ₹280",
    avgPrice: "₹150",
    halls: [
      {
        id: "inox-burdwan-arcade",
        name: "INOX Burdwan Arcade",
        area: "Curzon Gate, Bardhaman",
        screens: "3 Screens",
        ticketPrice: 170,
        priceTag: "Moderate",
        priceBadge: "₹130 - ₹260",
        format: "Dolby 7.1",
      },
      {
        id: "chitrangada-cinema",
        name: "Chitrangada Cinema",
        area: "Station Bazar, Burdwan",
        screens: "Single Screen",
        ticketPrice: 90,
        priceTag: "Cheapest",
        priceBadge: "₹70 - ₹120",
        format: "Standard Sound",
      },
    ],
  },
  {
    name: "Kalyani, WB",
    short: "KYI",
    theatres: "5 Cinemas Available",
    distance: "Nadia District",
    isPopular: false,
    priceRange: "₹110 - ₹260",
    avgPrice: "₹160",
    halls: [
      {
        id: "pvr-kalyani-central",
        name: "PVR Kalyani Central",
        area: "Central Park, Kalyani",
        screens: "3 Screens",
        ticketPrice: 180,
        priceTag: "Moderate",
        priceBadge: "₹140 - ₹260",
        format: "Dolby Atmos",
      },
    ],
  },
  {
    name: "Mumbai, IN",
    short: "BOM",
    theatres: "48 Cinemas Available",
    distance: "Metro Hub",
    isPopular: true,
    priceRange: "₹250 - ₹1200",
    avgPrice: "₹450",
    halls: [
      {
        id: "pvr-imax-lower-parel",
        name: "PVR INOX Phoenix Palladium IMAX",
        area: "Lower Parel, Mumbai",
        screens: "7 Screens",
        ticketPrice: 650,
        priceTag: "Premium",
        priceBadge: "₹450 - ₹1200",
        format: "IMAX Laser • Atmos",
      },
    ],
  },
  {
    name: "Delhi NCR, IN",
    short: "DEL",
    theatres: "52 Cinemas Available",
    distance: "Metro Hub",
    isPopular: true,
    priceRange: "₹220 - ₹1100",
    avgPrice: "₹400",
    halls: [
      {
        id: "pvr-director-cut-vasant-kunj",
        name: "PVR Director's Cut - Ambience Mall",
        area: "Vasant Kunj, New Delhi",
        screens: "5 Screens",
        ticketPrice: 700,
        priceTag: "Premium",
        priceBadge: "₹500 - ₹1100",
        format: "Luxury Dine-In",
      },
    ],
  },
];

const INITIAL_WISHLIST = [
  {
    id: "dune-part-two",
    title: "Dune: Part Two",
    posterImage:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDCoeHMNXe-VR_JMaytIg02crQ0qN9q2-QeMwwNmpvj6zn7RZVzoP70YITMc9x7rDxGkTqlO5R6QEsA8E71z7rfMOYaPycQuLATpvxc0cQvLNzPDTPisVZySFUCJ4eagz0zrFUjXWIIfW1MUA7s2FmAeBomNrQfMiELm57wowUpgKBwd-HFAQefOyVfftA6r6y2Vnr2n7cRUbFd1GLYzqD2zV_xsi49AOoKENFV7qWS",
    format: "IMAX 70mm",
    rating: "95%",
    duration: "2h 46m",
    genre: "Sci-Fi • Adventure",
    link: "/movies/dune-part-two",
  },
  {
    id: "neon-velocity",
    title: "Neon Velocity",
    posterImage:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?w=600&auto=format&fit=crop&q=80",
    format: "4DX",
    rating: "91%",
    duration: "2h 10m",
    genre: "Action • Cyberpunk",
    link: "/movies/dune-part-two",
  },
  {
    id: "valkyrie-eclipse",
    title: "Valkyrie: Eclipse",
    posterImage:
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80",
    format: "Dolby Atmos",
    rating: "92%",
    duration: "2h 15m",
    genre: "Epic Fantasy",
    link: "/movies/dune-part-two",
  },
];

const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "M-Ticket Gate Pass Active",
    message: "Dune: Part Two doors open at 07:15 PM at INOX South City Mall (IMAX Laser).",
    time: "10 mins ago",
    read: false,
    category: "ticket",
    actionLink: "/confirmation",
    actionText: "Open Pass",
  },
  {
    id: "notif-2",
    title: "Flash SprintPromo: ₹150 OFF",
    message: "Use code KOLKATA50 for ₹150 instant discount on tickets across West Bengal.",
    time: "1 hour ago",
    read: false,
    category: "promo",
    actionLink: "/offers",
    actionText: "View Offers",
  },
  {
    id: "notif-3",
    title: "Upcoming Drop: Arijit Singh Live in Kolkata",
    message: "Tickets unlock in 48 hours for Eco Park Kolkata.",
    time: "Yesterday",
    read: true,
    category: "drop",
    actionLink: "/events",
    actionText: "Explore Event",
  },
];

export function AppProvider({ children }) {
  // 1. Auth State - Default configured to Suraj Banerjee (Standard User)
  const [user, setUser] = useState({
    name: "Suraj Banerjee",
    email: "surajbanerjee255@gmail.com",
    avatar: PRESET_AVATARS[0].url,
    isVip: false, // Standard User by default
  });
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // 2. Location State - Default to Kolkata, WB
  const [currentCity, setCurrentCity] = useState("Kolkata, WB");
  const [selectedHall, setSelectedHall] = useState(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  // 3. Wishlist State
  const [wishlist, setWishlist] = useState(INITIAL_WISHLIST);

  // 4. Notifications State
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);

  // Load persisted state on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("ticketsprint_user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }

      const savedCity = localStorage.getItem("ticketsprint_city");
      if (savedCity) {
        setCurrentCity(savedCity);
      }

      const savedHall = localStorage.getItem("ticketsprint_hall");
      if (savedHall) {
        setSelectedHall(JSON.parse(savedHall));
      }

      const savedWishlist = localStorage.getItem("ticketsprint_wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }

      const savedNotifs = localStorage.getItem("ticketsprint_notifs");
      if (savedNotifs) {
        setNotifications(JSON.parse(savedNotifs));
      }
    } catch (e) {
      console.warn("Storage not accessible:", e);
    }
  }, []);

  // Sync state helpers
  const login = (userData) => {
    const fullUser = {
      name: userData.name || "Suraj Banerjee",
      email: userData.email || "surajbanerjee255@gmail.com",
      avatar: userData.avatar || PRESET_AVATARS[0].url,
      isVip: Boolean(userData.isVip),
    };
    setUser(fullUser);
    try {
      localStorage.setItem("ticketsprint_user", JSON.stringify(fullUser));
    } catch (e) {}
    setIsLoginModalOpen(false);

    if (pendingAction && typeof pendingAction === "function") {
      pendingAction();
      setPendingAction(null);
    }
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("ticketsprint_user");
    } catch (e) {}
  };

  const updateProfile = ({ name, avatar }) => {
    if (!user) return;
    const updated = {
      ...user,
      name: name || user.name,
      avatar: avatar || user.avatar,
    };
    setUser(updated);
    try {
      localStorage.setItem("ticketsprint_user", JSON.stringify(updated));
    } catch (e) {}
  };

  const openLoginModal = (onSuccessAction = null) => {
    if (onSuccessAction && typeof onSuccessAction === "function") {
      setPendingAction(() => onSuccessAction);
    }
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
    setPendingAction(null);
  };

  const setCity = (cityName) => {
    setCurrentCity(cityName);
    try {
      localStorage.setItem("ticketsprint_city", cityName);
    } catch (e) {}
  };

  const setHall = (hallObj) => {
    setSelectedHall(hallObj);
    try {
      localStorage.setItem("ticketsprint_hall", JSON.stringify(hallObj));
    } catch (e) {}
  };

  const openLocationModal = () => setIsLocationModalOpen(true);
  const closeLocationModal = () => setIsLocationModalOpen(false);

  const toggleWishlist = (movie) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === movie.id);
      let updated;
      if (exists) {
        updated = prev.filter((item) => item.id !== movie.id);
      } else {
        updated = [movie, ...prev];
      }
      try {
        localStorage.setItem("ticketsprint_wishlist", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const isInWishlist = (movieId) => {
    return wishlist.some((item) => item.id === movieId);
  };

  const removeFromWishlist = (movieId) => {
    setWishlist((prev) => {
      const updated = prev.filter((item) => item.id !== movieId);
      try {
        localStorage.setItem("ticketsprint_wishlist", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((n) => ({ ...n, read: true }));
      try {
        localStorage.setItem("ticketsprint_notifs", JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const openNotificationDrawer = () => setIsNotificationDrawerOpen(true);
  const closeNotificationDrawer = () => setIsNotificationDrawerOpen(false);

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        updateProfile,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,

        currentCity,
        setCity,
        selectedHall,
        setHall,
        isLocationModalOpen,
        openLocationModal,
        closeLocationModal,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,

        notifications,
        unreadCount,
        markAllAsRead,
        isNotificationDrawerOpen,
        openNotificationDrawer,
        closeNotificationDrawer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
