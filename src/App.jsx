import React, { useState } from 'react';
import { ChefHat, ShoppingCart, User, Search, Menu, X, Star, Clock, Flame, Heart, CheckCircle, ArrowRight, Package, Truck, UtensilsCrossed, Leaf, Award, Users, TrendingUp, Mail, Phone, MapPin, Plus, Minus, Facebook, Instagram, MessageCircle, Youtube, Eye, EyeOff, Calendar, CreditCard, Settings, LogOut, History } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const navigation = [
    { name: 'Homepage', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Menu', id: 'menu' },
    { name: 'How It Works', id: 'how-it-works' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'Contact', id: 'contact' }
  ];

  const meals = [
    { 
      id: 1, 
      name: 'Spicy Jhol Momo Kit', 
      category: 'Nepali', 
      time: 30, 
      difficulty: 'Easy', 
      calories: 420, 
      price: 450, 
      image: '🥟', 
      rating: 4.9, 
      reviews: 456, 
      description: 'Steamed dumplings with spicy soup - includes pre-made dumplings, soup base, and spices', 
      protein: 28, 
      carbs: 45, 
      fat: 15, 
      badge: 'Popular',
      ingredients: ['Chicken/Veg filling (pre-mixed)', 'Momo wrappers', 'Soup base powder', 'Spice blend', 'Fresh coriander', 'Recipe card']
    },
    { 
      id: 2, 
      name: 'Dal Bhat Power Kit', 
      category: 'Nepali', 
      time: 35, 
      difficulty: 'Easy', 
      calories: 520, 
      price: 380, 
      image: '🍛', 
      rating: 4.8, 
      reviews: 623, 
      description: 'Complete Nepali meal - lentils, rice, curry, and pickle with measured ingredients', 
      protein: 18, 
      carbs: 78, 
      fat: 12, 
      badge: 'Best Seller',
      ingredients: ['Measured dal', 'Premium rice', 'Curry spice mix', 'Pre-cut vegetables', 'Pickle', 'Recipe card']
    },
    { 
      id: 3, 
      name: 'Newari Khaja Set', 
      category: 'Newari', 
      time: 40, 
      difficulty: 'Medium', 
      calories: 580, 
      price: 550, 
      image: '🍢', 
      rating: 4.9, 
      reviews: 289, 
      description: 'Traditional Newari snack platter - choila, bhuttan, and beaten rice', 
      protein: 32, 
      carbs: 42, 
      fat: 28, 
      badge: 'New',
      ingredients: ['Marinated meat', 'Bhuttan', 'Beaten rice', 'Spice mix', 'Achar ingredients', 'Recipe card']
    },
    { 
      id: 4, 
      name: 'Thakali Thali Kit', 
      category: 'Thakali', 
      time: 45, 
      difficulty: 'Medium', 
      calories: 610, 
      price: 620, 
      image: '🥘', 
      rating: 4.9, 
      reviews: 378, 
      description: 'Famous Mustang cuisine - complete thali with measured portions', 
      protein: 35, 
      carbs: 68, 
      fat: 22, 
      badge: 'Chef Special',
      ingredients: ['Meat curry base', 'Dal', 'Rice', 'Gundruk', 'Ghee packet', 'Recipe card']
    },
    { 
      id: 5, 
      name: 'Chicken Choila Kit', 
      category: 'Newari', 
      time: 25, 
      difficulty: 'Easy', 
      calories: 380, 
      price: 480, 
      image: '🍗', 
      rating: 4.8, 
      reviews: 412, 
      description: 'Spiced grilled chicken with Newari flavors - pre-marinated and ready to grill', 
      protein: 38, 
      carbs: 18, 
      fat: 22, 
      badge: '',
      ingredients: ['Pre-marinated chicken', 'Spice blend', 'Beaten rice', 'Onions & herbs', 'Mustard oil', 'Recipe card']
    },
    { 
      id: 6, 
      name: 'Tibetan Thukpa Kit', 
      category: 'Tibetan', 
      time: 20, 
      difficulty: 'Easy', 
      calories: 420, 
      price: 340, 
      image: '🍜', 
      rating: 4.7, 
      reviews: 298, 
      description: 'Hearty noodle soup with fresh vegetables and broth concentrate', 
      protein: 24, 
      carbs: 52, 
      fat: 14, 
      badge: '',
      ingredients: ['Fresh noodles', 'Soup concentrate', 'Pre-cut vegetables', 'Meat/tofu', 'Seasonings', 'Recipe card']
    },
    { 
      id: 7, 
      name: 'Mutton Sekuwa Kit', 
      category: 'BBQ', 
      time: 35, 
      difficulty: 'Medium', 
      calories: 520, 
      price: 680, 
      image: '🍖', 
      rating: 4.9, 
      reviews: 345, 
      description: 'Traditional grilled mutton skewers - pre-marinated and ready to cook', 
      protein: 42, 
      carbs: 12, 
      fat: 32, 
      badge: 'Premium',
      ingredients: ['Pre-marinated mutton', 'Skewers', 'Chutney mix', 'Onion & tomato', 'Spice powder', 'Recipe card']
    },
    { 
      id: 8, 
      name: 'Vegetable Pulao Kit', 
      category: 'Healthy', 
      time: 25, 
      difficulty: 'Easy', 
      calories: 390, 
      price: 320, 
      image: '🍚', 
      rating: 4.6, 
      reviews: 267, 
      description: 'Fragrant rice with seasonal vegetables and aromatic spices', 
      protein: 12, 
      carbs: 62, 
      fat: 10, 
      badge: '',
      ingredients: ['Basmati rice', 'Pre-cut vegetables', 'Whole spices', 'Ghee packet', 'Raita mix', 'Recipe card']
    },
  ];

  const testimonials = [
    { 
      name: 'Sujan Shrestha', 
      role: 'Software Engineer', 
      rating: 5, 
      text: 'OneServe has made my life so much easier. Living alone, I can now enjoy authentic Nepali food without any waste!', 
      image: '👨',
      location: 'Kathmandu'
    },
    { 
      name: 'Anita Gurung', 
      role: 'Business Owner', 
      rating: 5, 
      text: 'Saves both time and money. No more wasted ingredients, and I always get fresh meals delivered to my door.', 
      image: '👩',
      location: 'Pokhara'
    },
    { 
      name: 'Rajesh Tamang', 
      role: 'Doctor', 
      rating: 5, 
      text: 'Perfect for my busy schedule. Nutritious meals that I can cook quickly with zero hassle.', 
      image: '👨‍⚕️',
      location: 'Lalitpur'
    }
  ];

  const categories = ['All', 'Nepali', 'Newari', 'Thakali', 'Tibetan', 'BBQ', 'Healthy'];

  const addToCart = (meal) => {
    const existingItem = cartItems.find(item => item.id === meal.id);
    if (existingItem) {
      setCartItems(cartItems.map(item => 
        item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...meal, quantity: 1 }]);
    }
    setCartOpen(true);
  };

  const updateQuantity = (id, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(Boolean));
  };

  const toggleFavorite = (mealId) => {
    setFavorites(prev => 
      prev.includes(mealId) ? prev.filter(id => id !== mealId) : [...prev, mealId]
    );
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Header Component
  const Header = () => (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-white" size={28} />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">OneServe</span>
              <div className="text-xs text-orange-600 font-semibold">Nepal</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-medium transition-all text-sm uppercase tracking-wide ${
                  currentPage === item.id
                    ? 'text-orange-600 border-b-2 border-orange-600 pb-1'
                    : 'text-gray-700 hover:text-orange-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="text-gray-700" size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartItems.length}
                </span>
              )}
            </button>
            <button 
              onClick={() => setCurrentPage(isLoggedIn ? 'profile' : 'login')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User className="text-gray-700" size={22} />
            </button>
            {!isLoggedIn && (
              <button 
                onClick={() => setCurrentPage('login')}
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              >
                Sign Up
              </button>
            )}
            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${
                    currentPage === item.id
                      ? 'bg-orange-50 text-orange-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );

  // Shopping Cart Sidebar
  const ShoppingCartSidebar = () => (
    <>
      {cartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setCartOpen(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      setCurrentPage('menu');
                    }}
                    className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-orange-600 font-bold mb-2">NPR {item.price}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-orange-500"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-orange-500"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-200 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal:</span>
                    <span className="font-semibold">NPR {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery:</span>
                    <span className="font-semibold text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between items-center text-xl pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-orange-600">NPR {cartTotal}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                  Checkout
                </button>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );

  // Meal Detail Modal
  const MealDetailModal = () => {
    if (!selectedMeal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedMeal(null)}>
        <div className="bg-white rounded-3xl max-w-4xl w-full my-8" onClick={(e) => e.stopPropagation()}>
          <div className="relative">
            <button
              onClick={() => setSelectedMeal(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 shadow-lg"
            >
              <X size={24} />
            </button>
            <div className="h-80 bg-gradient-to-br from-orange-200 to-orange-300 rounded-t-3xl flex items-center justify-center text-9xl relative">
              {selectedMeal.image}
              {selectedMeal.badge && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold">
                  {selectedMeal.badge}
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">{selectedMeal.name}</h2>
                <p className="text-gray-600 text-lg">{selectedMeal.description}</p>
              </div>
              <div className="text-right ml-6">
                <div className="text-3xl font-bold text-orange-600 mb-2">NPR {selectedMeal.price}</div>
                <div className="flex items-center gap-1 justify-end">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="font-bold text-gray-900">{selectedMeal.rating}</span>
                  <span className="text-gray-600">({selectedMeal.reviews})</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Clock className="mx-auto mb-2 text-orange-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.time} mins</div>
                <div className="text-sm text-gray-600">Cooking time</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Flame className="mx-auto mb-2 text-orange-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.calories} cal</div>
                <div className="text-sm text-gray-600">Per serving</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-4 text-center">
                <Award className="mx-auto mb-2 text-orange-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.difficulty}</div>
                <div className="text-sm text-gray-600">Difficulty</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">Nutrition Information</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.protein}g</div>
                  <div className="text-sm text-gray-600">Protein</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.carbs}g</div>
                  <div className="text-sm text-gray-600">Carbs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.fat}g</div>
                  <div className="text-sm text-gray-600">Fat</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.calories}</div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">What's Included in Your Kit</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {selectedMeal.ingredients.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0" size={18} />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  addToCart(selectedMeal);
                  setSelectedMeal(null);
                }}
                className="flex-1 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                Add to Cart - NPR {selectedMeal.price}
              </button>
              <button
                onClick={() => toggleFavorite(selectedMeal.id)}
                className="px-6 py-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Heart
                  className={favorites.includes(selectedMeal.id) ? 'text-orange-500 fill-orange-500' : 'text-gray-400'}
                  size={24}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Home Page
  const HomePage = () => (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-gray-700">🎉 40% OFF on First Order</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                We provide healthy
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  food for your family
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Cook authentic Nepali meals at home with our perfectly portioned meal kits. Fresh ingredients, easy recipes, zero waste.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('menu')}
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  Browse Menu
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-lg hover:shadow-xl border-2 border-gray-200 transition-all duration-300">
                  Watch Video
                </button>
              </div>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=300&fit=crop" alt="Meal 1" className="rounded-2xl shadow-xl w-full h-48 object-cover" />
                  <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop" alt="Meal 2" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                </div>
                <div className="space-y-4 pt-12">
                  <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop" alt="Meal 3" className="rounded-2xl shadow-xl w-full h-64 object-cover" />
                  <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=300&fit=crop" alt="Meal 4" className="rounded-2xl shadow-xl w-full h-48 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">We offer different services for you</h2>
            <p className="text-xl text-gray-600">Smart way to cook for one</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '📦', title: 'Zero Waste', desc: 'Perfectly measured portions' },
              { icon: '⏰', title: 'Save Time', desc: 'No shopping, no measuring' },
              { icon: '👨‍🍳', title: 'Chef Recipes', desc: 'Restaurant-quality taste' },
              { icon: '🌱', title: 'Local Ingredients', desc: 'Fresh Nepali organic produce' }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 border border-gray-100 text-center">
                <div className="text-6xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Little Information Section */}
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=700&fit=crop" 
                alt="Cooking" 
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    15+
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Years of</div>
                    <div className="text-orange-600 font-semibold">Experience</div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">A little information for our valuable guests</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                At OneServe Nepal, we believe everyone deserves to enjoy authentic Nepali home cooking, even when cooking for one. Our mission is to eliminate food waste while bringing the rich flavors of Nepal to your kitchen.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Each meal kit contains pre-portioned, fresh ingredients paired with step-by-step recipe cards developed by professional chefs. No more buying bulk ingredients that go to waste - just perfect portions for delicious, single-serving meals.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-orange-500 mb-2">20K+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="text-3xl font-bold text-orange-500 mb-2">50K+</div>
                  <div className="text-gray-600">Meals Delivered</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Customers Say */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What our customers say</h2>
            <p className="text-xl text-gray-600">Real experiences from our community</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-orange-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-orange-600">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 italic leading-relaxed">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Meals */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Browse Our Menu</h2>
            <p className="text-xl text-gray-600">Chef-selected delicious recipes this week</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {meals.slice(0, 8).map((meal) => (
              <div key={meal.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-7xl">
                  {meal.image}
                  {meal.badge && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs font-bold">
                      {meal.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(meal.id)}
                    className="absolute top-3 left-3 w-9 h-9 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={favorites.includes(meal.id) ? 'text-orange-500 fill-orange-500' : 'text-gray-400'}
                      size={18}
                    />
                  </button>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={14} />
                      <span className="font-bold text-gray-900 text-sm">{meal.rating}</span>
                    </div>
                    <span className="text-gray-400 text-xs">({meal.reviews})</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{meal.description}</p>
                  
                  <div className="flex items-center gap-3 text-xs text-gray-600 mb-4 pb-3 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {meal.time}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={14} /> {meal.calories}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">NPR {meal.price}</span>
                    <button
                      onClick={() => addToCart(meal)}
                      className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('menu')}
              className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:shadow-xl border-2 border-orange-600 transition-all duration-300"
            >
              View Full Menu
            </button>
          </div>
        </div>
      </section>

      {/* Our Blog Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Blog & Articles</h2>
            <p className="text-xl text-gray-600">Latest recipes, tips, and cooking guides</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
                date: 'Nov 15, 2024',
                title: '10 Essential Nepali Spices Every Kitchen Needs',
                excerpt: 'Discover the authentic spices that make Nepali cuisine so flavorful and aromatic...'
              },
              {
                image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&h=300&fit=crop',
                date: 'Nov 12, 2024',
                title: 'How to Perfect Your Momo Making Skills',
                excerpt: 'Master the art of making delicious momos with our step-by-step guide...'
              },
              {
                image: 'https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?w=400&h=300&fit=crop',
                date: 'Nov 10, 2024',
                title: 'Zero Waste Cooking: Tips for Single Servings',
                excerpt: 'Learn how to reduce food waste while cooking delicious meals for one...'
              }
            ].map((article, idx) => (
              <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-white rounded-full text-sm font-semibold text-gray-700">
                    {article.date}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <button className="text-orange-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Read More <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to start your cooking journey?</h2>
          <p className="text-xl text-orange-100 mb-8">Join thousands of happy customers cooking delicious Nepali meals at home</p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="px-10 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );

  // Menu Page
  const MenuPage = () => {
    const filteredMeals = activeCategory === 'All' 
      ? meals 
      : meals.filter(meal => meal.category === activeCategory);

    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Our Menu</h1>
            <p className="text-xl text-gray-600">New recipes added every week</p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMeals.map((meal) => (
              <div key={meal.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className="relative h-56 bg-gradient-to-br from-orange-200 to-orange-300 flex items-center justify-center text-8xl">
                  {meal.image}
                  {meal.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-xs font-bold">
                      {meal.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(meal.id)}
                    className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={favorites.includes(meal.id) ? 'text-orange-500 fill-orange-500' : 'text-gray-400'}
                      size={20}
                    />
                  </button>
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-white rounded-full text-xs font-semibold text-gray-700">
                    {meal.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-bold text-gray-900">{meal.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{meal.reviews} reviews</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {meal.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={16} /> {meal.calories} cal
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-orange-600">NPR {meal.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMeal(meal)}
                        className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => addToCart(meal)}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // How It Works Page
  const HowItWorksPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">How It Works</h1>
          <p className="text-xl text-gray-600">From our kitchen to yours in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center group">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-6xl">📋</span>
            </div>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">1</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Choose Your Meals</h3>
            <p className="text-gray-600 leading-relaxed">
              Browse our menu and select from authentic Nepali recipes. Each meal kit serves one person perfectly.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-6xl">📦</span>
            </div>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">2</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Your Kit Delivered</h3>
            <p className="text-gray-600 leading-relaxed">
              Receive pre-portioned ingredients and step-by-step recipe cards delivered fresh to your door.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <span className="text-6xl">👨‍🍳</span>
            </div>
            <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">3</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cook & Enjoy</h3>
            <p className="text-gray-600 leading-relaxed">
              Follow our easy recipes to create restaurant-quality Nepali meals in your own kitchen.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">What's Inside Your Kit?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: '🥬', title: 'Fresh Vegetables', desc: 'Locally sourced, pre-washed and chopped' },
              { icon: '🥄', title: 'Measured Spices', desc: 'Authentic spice blends in perfect portions' },
              { icon: '🍚', title: 'Quality Grains', desc: 'Premium rice, lentils, and flours' },
              { icon: '📖', title: 'Recipe Card', desc: 'Step-by-step cooking instructions' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 text-center hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Cook With OneServe?</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-8">
            {[
              'No grocery shopping needed',
              'Zero food waste - exact portions',
              'Learn authentic Nepali cooking',
              'Restaurant-quality at home',
              'Flexible delivery schedule',
              'Save time and money'
            ].map((benefit, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-orange-50 p-4 rounded-xl">
                <CheckCircle className="text-orange-500 flex-shrink-0" size={24} />
                <span className="text-gray-700 font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Pricing Page
  const PricingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Simple Pricing</h1>
          <p className="text-xl text-gray-600">Choose the plan that works for you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              name: 'Starter',
              price: 'NPR 1,599',
              period: 'per meal',
              meals: '3 meals/week',
              features: ['Pre-portioned ingredients', 'Recipe cards included', 'Free delivery', 'Cancel anytime'],
              popular: false
            },
            {
              name: 'Popular',
              price: 'NPR 1,499',
              period: 'per meal',
              meals: '5 meals/week',
              features: ['Pre-portioned ingredients', 'Recipe cards included', 'Free delivery', 'Priority support', '10% savings'],
              popular: true
            },
            {
              name: 'Premium',
              price: 'NPR 1,399',
              period: 'per meal',
              meals: '7 meals/week',
              features: ['Pre-portioned ingredients', 'Recipe cards included', 'Free delivery', 'Priority support', '15% savings', 'Exclusive recipes'],
              popular: false
            }
          ].map((plan, idx) => (
            <div key={idx} className={`relative bg-white rounded-3xl p-8 ${plan.popular ? 'ring-4 ring-orange-500 shadow-2xl transform scale-105' : 'shadow-lg'}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-sm">
                  Most Popular
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-orange-500 mb-2">{plan.price}</div>
                <div className="text-gray-600">{plan.period}</div>
                <div className="mt-4 px-4 py-2 bg-orange-50 rounded-full text-orange-600 font-semibold inline-block">
                  {plan.meals}
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-center gap-3">
                    <CheckCircle className="text-orange-500 flex-shrink-0" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-xl font-bold transition-all ${
                plan.popular 
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-xl' 
                  : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
              }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: 'Can I skip a week?', a: 'Yes! You can pause or skip deliveries anytime from your account.' },
              { q: 'What areas do you deliver to?', a: 'We currently deliver to Kathmandu, Lalitpur, Bhaktapur, Pokhara, and Biratnagar.' },
              { q: 'How long do ingredients stay fresh?', a: 'All ingredients are fresh and should be cooked within 3-4 days of delivery.' },
              { q: 'Can I customize my meals?', a: 'Yes! You can choose your meals each week from our rotating menu.' }
            ].map((faq, idx) => (
              <div key={idx} className="bg-orange-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 flex items-start gap-2">
                  <span className="text-orange-500">Q:</span> {faq.q}
                </h3>
                <p className="text-gray-700 ml-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // About Page  
  const AboutPage = () => (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold text-gray-900 mb-6">About OneServe Nepal</h1>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                We're on a mission to make authentic Nepali home cooking accessible to everyone, especially those cooking for one.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded in 2024, OneServe Nepal was born from a simple observation: cooking authentic Nepali meals for one person often means buying ingredients in bulk, leading to waste and frustration. We changed that.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Our meal kits provide pre-portioned, fresh ingredients paired with chef-tested recipes, empowering you to create restaurant-quality Nepali dishes in your own kitchen—no waste, no hassle.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=600&fit=crop" 
                alt="About OneServe" 
                className="rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🌱', title: 'Sustainability', desc: 'Committed to zero waste and eco-friendly practices' },
              { icon: '🇳🇵', title: 'Authenticity', desc: 'Traditional Nepali flavors in every recipe' },
              { icon: '💚', title: 'Local Support', desc: 'Supporting Nepali farmers and producers' },
              { icon: '👨‍🍳', title: 'Quality', desc: 'Fresh ingredients and tested recipes' }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl">
                <div className="text-6xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Our Impact</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: '50,000+', label: 'Meals Delivered' },
              { number: '20,000+', label: 'Happy Customers' },
              { number: '85%', label: 'Food Waste Reduced' },
              { number: '100+', label: 'Local Farmers Supported' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center p-8 bg-white rounded-2xl shadow-lg">
                <div className="text-4xl font-bold text-orange-500 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Join Our Journey</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Whether you're a busy professional, a student, or someone who loves cooking but hates food waste, OneServe is here to make your life easier and more delicious.
          </p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            Start Cooking Today
          </button>
        </div>
      </section>
    </div>
  );

  // Contact Page
  const ContactPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Get In Touch</h1>
          <p className="text-xl text-gray-600">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea
                  rows={5}
                  placeholder="Tell us how we can help..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold hover:shadow-xl transition-all">
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-2xl">
                  <MapPin className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Office Address</h3>
                    <p className="text-gray-600">Darbarmarg, Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-2xl">
                  <Phone className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+977 01-4234567</p>
                    <p className="text-gray-600">+977 9801234567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 bg-orange-50 p-6 rounded-2xl">
                  <Mail className="text-orange-500 flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">hello@oneserve.com.np</p>
                    <p className="text-gray-600">support@oneserve.com.np</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Delivery Areas</h3>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <CheckCircle className="text-orange-500" size={18} />
                  Kathmandu Valley
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="text-orange-500" size={18} />
                  Pokhara
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="text-orange-500" size={18} />
                  Biratnagar
                </p>
                <p className="text-sm text-gray-600 mt-4">
                  More cities coming soon! Subscribe to our newsletter to stay updated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Login/Signup Page
  const LoginSignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OneServe Nepal</h1>
          <p className="text-gray-600">Start your cooking journey</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
              />
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {authMode === 'login' && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button type="button" className="text-orange-600 hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded" />
                <span className="text-sm text-gray-600">
                  I agree to the <button type="button" className="text-orange-600 hover:underline">Terms & Conditions</button>
                </span>
              </div>
            )}

            <button
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setCurrentPage('profile');
              }}
              className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              {authMode === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <Facebook className="text-blue-600" size={20} />
                <span className="font-semibold text-gray-700">Facebook</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                <MessageCircle className="text-green-600" size={20} />
                <span className="font-semibold text-gray-700">WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            {authMode === 'login' ? "Don't have an account?" : 'Already have an account?'}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-orange-600 font-semibold hover:underline"
            >
              {authMode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );

  // Profile/Dashboard Page
  const ProfilePage = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Sujan Shrestha</h1>
              <p className="text-gray-600">sujan@email.com</p>
              <div className="flex gap-2 mt-2">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold">Premium Member</span>
              </div>
            </div>
            <button 
              onClick={() => {
                setIsLoggedIn(false);
                setCurrentPage('home');
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 flex items-center gap-2"
            >
              <LogOut size={18} /> Logout
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
            <Calendar className="mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">47</div>
            <div className="text-orange-100">Total Orders</div>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
            <Heart className="mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">{favorites.length}</div>
            <div className="text-green-100">Favorite Meals</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
            <Award className="mb-4" size={32} />
            <div className="text-3xl font-bold mb-2">5 meals/week</div>
            <div className="text-blue-100">Current Plan</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Orders</h2>
            <div className="space-y-4">
              {[
                { id: '#12345', date: 'Nov 18, 2024', status: 'Delivered', amount: 1499 },
                { id: '#12344', date: 'Nov 11, 2024', status: 'Delivered', amount: 1499 },
                { id: '#12343', date: 'Nov 4, 2024', status: 'Delivered', amount: 1499 }
              ].map((order, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <div className="font-bold text-gray-900">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">NPR {order.amount}</div>
                    <div className="text-sm text-green-600">{order.status}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 bg-orange-50 text-orange-600 rounded-xl font-semibold hover:bg-orange-100">
              View All Orders
            </button>
          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Favorites</h2>
            <div className="space-y-4">
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">No favorites yet</p>
                  <button 
                    onClick={() => setCurrentPage('menu')}
                    className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full font-semibold hover:bg-orange-600"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                meals.filter(m => favorites.includes(m.id)).slice(0, 3).map((meal) => (
                  <div key={meal.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-200 to-orange-300 rounded-lg flex items-center justify-center text-3xl">
                      {meal.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{meal.name}</h3>
                      <p className="text-sm text-orange-600 font-semibold">NPR {meal.price}</p>
                    </div>
                    <button 
                      onClick={() => addToCart(meal)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600"
                    >
                      Add
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Footer Component
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                <ChefHat className="text-white" size={20} />
              </div>
              <div>
                <span className="text-xl font-bold">OneServe</span>
                <div className="text-xs text-orange-400">Nepal</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Perfectly portioned meal kits for one. Fresh, delicious, and zero waste.
            </p>
            <div className="flex gap-4">
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Facebook size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Instagram size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <MessageCircle size={20} />
              </button>
              <button className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors">
                <Youtube size={20} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors">About Us</button></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors">Contact</button></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Delivery Info</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Returns</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Payment Methods</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <div>💳 eSewa</div>
              <div>💳 Khalti</div>
              <div>💳 IME Pay</div>
              <div>📦 Cash on Delivery</div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 OneServe Nepal. All rights reserved.</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );

  // Render Page Function
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'menu':
        return <MenuPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'pricing':
        return <PricingPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginSignupPage />;
      case 'profile':
        return isLoggedIn ? <ProfilePage /> : <LoginSignupPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ShoppingCartSidebar />
      <MealDetailModal />
      {renderPage()}
      <Footer />
    </div>
  );
};

export default App;