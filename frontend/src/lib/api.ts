// API configuration
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";

// Helper function to get auth token
const getAuthToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('accessToken');
  }
  return null;
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

// Marketplace API
export const marketplaceAPI = {
  // Get all items
  getItems: async (filters?: { category?: string; condition?: string; minPrice?: number; maxPrice?: number }) => {
    const params = new URLSearchParams();
    if (filters?.category) params.append('category', filters.category);
    if (filters?.condition) params.append('condition', filters.condition);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    
    const response = await fetch(`${API_URL}/marketplace/items?${params}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Create new item
  createItem: async (itemData: {
    title: string;
    price: number;
    category: string;
    condition: string;
    description?: string;
  }) => {
    const response = await fetch(`${API_URL}/marketplace/items`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(itemData)
    });
    return response.json();
  },

  // Get user's items
  getMyItems: async () => {
    const response = await fetch(`${API_URL}/marketplace/my-items`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Delete item
  deleteItem: async (itemId: string) => {
    const response = await fetch(`${API_URL}/marketplace/items/${itemId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Get comments for an item
  getComments: async (itemId: string) => {
    const response = await fetch(`${API_URL}/marketplace/items/${itemId}/comments`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Add a comment to an item
  addComment: async (itemId: string, text: string) => {
    const response = await fetch(`${API_URL}/marketplace/items/${itemId}/comments`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ text })
    });
    return response.json();
  },

  // Delete a comment
  deleteComment: async (commentId: number) => {
    const response = await fetch(`${API_URL}/marketplace/comments/${commentId}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

// Auth API
export const authAPI = {
  // Get user profile
  getProfile: async () => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Update user profile
  updateProfile: async (profileData: {
    name?: string;
    phoneNumber?: string;
    department?: string;
  }) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return response.json();
  },

  // Logout
  logout: async () => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
    const response = await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ refreshToken })
    });
    
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
    
    return response.json();
  }
};

// Mentorship API
export const mentorshipAPI = {
  // Get all mentors/users
  getMentors: async (filters?: { search?: string; department?: string; year?: string }) => {
    const params = new URLSearchParams();
    if (filters?.search) params.append('search', filters.search);
    if (filters?.department) params.append('department', filters.department);
    if (filters?.year) params.append('year', filters.year);
    
    const response = await fetch(`${API_URL}/mentorship/mentors?${params}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Send connection request
  sendConnectionRequest: async (mentorId: number) => {
    const response = await fetch(`${API_URL}/mentorship/connect`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ mentorId })
    });
    return response.json();
  },

  // Get connection requests (notifications)
  getConnectionRequests: async (type: 'received' | 'sent' = 'received') => {
    const response = await fetch(`${API_URL}/mentorship/requests?type=${type}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Respond to connection request
  respondToRequest: async (requestId: number, action: 'accept' | 'reject') => {
    const response = await fetch(`${API_URL}/mentorship/requests/${requestId}/respond`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ action })
    });
    return response.json();
  },

  // Get user profile by ID
  getUserProfile: async (userId: number) => {
    const response = await fetch(`${API_URL}/mentorship/profile/${userId}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Get connected users (accepted connections)
  getConnectedUsers: async () => {
    const response = await fetch(`${API_URL}/mentorship/connected`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Check if current user is a mentor
  checkMentorStatus: async () => {
    const response = await fetch(`${API_URL}/mentorship/mentor-status`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Become a mentor
  becomeMentor: async (expertiseArea?: string) => {
    const response = await fetch(`${API_URL}/mentorship/become-mentor`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ expertiseArea })
    });
    return response.json();
  }
};

// Chat API
export const chatAPI = {
  // Get messages between two users
  getMessages: async (otherUserId: number) => {
    const response = await fetch(`${API_URL}/chat/messages/${otherUserId}`, {
      headers: getAuthHeaders()
    });
    return response.json();
  },

  // Send a message
  sendMessage: async (receiverId: number, content: string) => {
    const response = await fetch(`${API_URL}/chat/messages`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ receiverId, content })
    });
    return response.json();
  },

  // Mark messages as read
  markAsRead: async (senderId: number) => {
    const response = await fetch(`${API_URL}/chat/messages/read`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({ senderId })
    });
    return response.json();
  },

  // Get conversations
  getConversations: async () => {
    const response = await fetch(`${API_URL}/chat/conversations`, {
      headers: getAuthHeaders()
    });
    return response.json();
  }
};

export { API_URL };
