"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const PRESET_AVATARS = [
  {
    id: "alex",
    name: "Alex (Default VIP)",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "jordan",
    name: "Jordan (Cyber Neon)",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "taylor",
    name: "Taylor (Studio Glow)",
    url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "marcus",
    name: "Marcus (Cinematic Dark)",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "sam",
    name: "Sam (Futuristic Minimal)",
    url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&auto=format&fit=crop&q=80",
  },
  {
    id: "elena",
    name: "Elena (Indie Director)",
    url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&auto=format&fit=crop&q=80",
  },
];

export const CITIES_LIST = [
  {
    name: "San Francisco, CA",
    short: "SF",
    theatres: "16 Theatres",
    distance: "Current GPS Location",
    isPopular: true,
  },
  {
    name: "New York, NY",
    short: "NYC",
    theatres: "34 Theatres",
    distance: "2,570 miles away",
    isPopular: true,
  },
  {
    name: "Los Angeles, CA",
    short: "LA",
    theatres: "28 Theatres",
    distance: "380 miles away",
    isPopular: true,
  },
  {
    name: "Chicago, IL",
    short: "CHI",
    theatres: "21 Theatres",
    distance: "1,850 miles away",
    isPopular: true,
  },
  {
    name: "Austin, TX",
    short: "ATX",
    theatres: "12 Theatres",
    distance: "1,500 miles away",
    isPopular: false,
  },
  {
    name: "London, UK",
    short: "LDN",
    theatres: "40 Theatres",
    distance: "5,350 miles away",
    isPopular: true,
  },
  {
    name: "Mumbai, IN",
    short: "BOM",
    theatres: "48 Theatres",
    distance: "8,400 miles away",
    isPopular: true,
  },
  {
    name: "Tokyo, JP",
    short: "TYO",
    theatres: "32 Theatres",
    distance: "5,150 miles away",
    isPopular: false,
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
    message: "Dune: Part Two doors open at 07:15 PM at AMC Metreon 16 (Auditorium 1).",
    time: "10 mins ago",
    read: false,
    category: "ticket",
    actionLink: "/confirmation",
    actionText: "View Pass",
  },
  {
    id: "notif-2",
    title: "Flash Promo Applied: CHASE5",
    message: "You have $5 off applied to your next IMAX ticket booking.",
    time: "1 hour ago",
    read: false,
    category: "promo",
    actionLink: "/offers",
    actionText: "View Offers",
  },
  {
    id: "notif-3",
    title: "Upcoming Drop: Starlight World Tour",
    message: "Tickets unlock in 48 hours for Chase Center San Francisco.",
    time: "Yesterday",
    read: true,
    category: "drop",
    actionLink: "/events",
    actionText: "Explore Event",
  },
];

export function AppProvider({ children }) {
  // 1. Auth State
  const [user, setUser] = useState(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // 2. Location State
  const [currentCity, setCurrentCity] = useState("San Francisco, CA");
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
      name: userData.name || "Alex",
      email: userData.email || "alex.rivera@example.com",
      avatar: userData.avatar || PRESET_AVATARS[0].url,
      isVip: userData.isVip !== undefined ? userData.isVip : true,
    };
    setUser(fullUser);
    try {
      localStorage.setItem("ticketsprint_user", JSON.stringify(fullUser));
    } catch (e) {}
    setIsLoginModalOpen(false);

    // Execute pending action (e.g. redirect to seat booking) if any
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

  const openLoginModal = (callbackOnSuccess = null) => {
    if (callbackOnSuccess) {
      setPendingAction(() => callbackOnSuccess);
    } else {
      setPendingAction(null);
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
    setIsLocationModalOpen(false);
  };

  // Wishlist toggle
  const toggleWishlist = (movieItem) => {
    if (!movieItem || !movieItem.id) return;
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === movieItem.id);
      let updated;
      if (exists) {
        updated = prev.filter((item) => item.id !== movieItem.id);
      } else {
        updated = [
          ...prev,
          {
            id: movieItem.id,
            title: movieItem.title || "Untitled Feature",
            posterImage:
              movieItem.posterImage ||
              "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80",
            format: movieItem.format || "IMAX",
            rating: movieItem.rating || "94%",
            duration: movieItem.duration || "2h 30m",
            genre: movieItem.languages || movieItem.genre || "Action • Sci-Fi",
            link: movieItem.link || `/movies/${movieItem.id}`,
          },
        ];
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

  // Notification helpers
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
        isLocationModalOpen,
        setIsLocationModalOpen,
        openLocationModal: () => setIsLocationModalOpen(true),
        closeLocationModal: () => setIsLocationModalOpen(false),
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        notifications,
        markAllAsRead,
        unreadCount,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        openNotificationDrawer: () => setIsNotificationDrawerOpen(true),
        closeNotificationDrawer: () => setIsNotificationDrawerOpen(false),
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
