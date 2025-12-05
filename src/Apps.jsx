import React, { useState } from 'react';
import { ChefHat, ShoppingCart, User, Search, Menu, X, Star, Clock, Flame, Heart, CheckCircle, ArrowRight, Play, Package, Truck, UtensilsCrossed, Leaf, Award, Users, TrendingUp, Mail, Phone, MapPin, Plus, Minus, Facebook, Instagram, MessageCircle, Youtube, Eye, EyeOff, Calendar, CreditCard, Settings, LogOut, History } from 'lucide-react';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [activeCategory, setActiveCategory] = useState('सबै');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const navigation = [
    { name: 'गृहपृष्ठ', id: 'home' },
    { name: 'मेनु', id: 'menu' },
    { name: 'यसो काम गर्छ', id: 'how-it-works' },
    { name: 'मूल्य', id: 'pricing' },
    { name: 'हाम्रो बारे', id: 'about' },
    { name: 'सम्पर्क', id: 'contact' }
  ];

  const meals = [
    { 
      id: 1, 
      name: 'मसालेदार मोमो', 
      nameEn: 'Spicy Jhol Momo',
      category: 'Nepali', 
      time: 30, 
      difficulty: 'सजिलो', 
      calories: 420, 
      price: 450, 
      image: '🥟', 
      rating: 4.9, 
      reviews: 456, 
      description: 'स्वादिलो झोल मोमोमा मसालेदार चटनी सहित', 
      protein: 28, 
      carbs: 45, 
      fat: 15, 
      badge: 'लोकप्रिय',
      ingredients: ['chicken', 'मैदा', 'प्याज', 'लसुन', 'अदुवा', 'झोल सस']
    },
    { 
      id: 2, 
      name: 'दाल भात तरकारी सेट', 
      nameEn: 'Dal Bhat Tarkari Set',
      category: 'Nepali', 
      time: 25, 
      difficulty: 'सजिलो', 
      calories: 520, 
      price: 380, 
      image: '🍛', 
      rating: 4.8, 
      reviews: 623, 
      description: 'नेपाली खानाको आत्मा - ताजा तरकारी संग', 
      protein: 18, 
      carbs: 78, 
      fat: 12, 
      badge: 'सबैभन्दा रोजिएको',
      ingredients: ['दाल', 'चामल', 'आलु', 'काउली', 'गाजर', 'अचार']
    },
    { 
      id: 3, 
      name: 'न्यूवारी खाजा सेट', 
      nameEn: 'Newari Khaja Set',
      category: 'Newari', 
      time: 35, 
      difficulty: 'मध्यम', 
      calories: 580, 
      price: 550, 
      image: '🍢', 
      rating: 4.9, 
      reviews: 289, 
      description: 'परम्परागत न्यूवारी स्वाद - चोइला, भटमास संग', 
      protein: 32, 
      carbs: 42, 
      fat: 28, 
      badge: 'नयाँ',
      ingredients: ['चोइला', 'भटमास', 'चिउरा', 'आलु सन्धेको']
    },
    { 
      id: 4, 
      name: 'थकाली थाली', 
      nameEn: 'Thakali Thali',
      category: 'Thakali', 
      time: 30, 
      difficulty: 'मध्यम', 
      calories: 610, 
      price: 620, 
      image: '🥘', 
      rating: 4.9, 
      reviews: 378, 
      description: 'मुस्ताङको प्रसिद्ध थकाली खाना - पूर्ण थाली', 
      protein: 35, 
      carbs: 68, 
      fat: 22, 
      badge: 'लोकप्रिय',
      ingredients: ['मासु', 'दाल', 'भात', 'गुन्द्रुक', 'अचार']
    },
    { 
      id: 5, 
      name: 'चिकेन चोइला', 
      nameEn: 'Chicken Choila',
      category: 'Newari', 
      time: 25, 
      difficulty: 'सजिलो', 
      calories: 380, 
      price: 480, 
      image: '🍗', 
      rating: 4.8, 
      reviews: 412, 
      description: 'स्वादिलो मसालेदार चिकेन चोइला बीटेन दाल संग', 
      protein: 38, 
      carbs: 18, 
      fat: 22, 
      badge: '',
      ingredients: ['chicken', 'प्याज', 'लसुन', 'मसाला', 'तेल']
    },
    { 
      id: 6, 
      name: 'तिब्बती थुक्पा', 
      nameEn: 'Tibetan Thukpa',
      category: 'Tibetan', 
      time: 20, 
      difficulty: 'सजिलो', 
      calories: 420, 
      price: 340, 
      image: '🍜', 
      rating: 4.7, 
      reviews: 298, 
      description: 'न्यानो तातो थुक्पा ताजा तरकारी संग', 
      protein: 24, 
      carbs: 52, 
      fat: 14, 
      badge: '',
      ingredients: ['नूडल्स', 'तरकारी', 'chicken', 'सूप']
    },
    { 
      id: 7, 
      name: 'मटन सेकुवा', 
      nameEn: 'Mutton Sekuwa',
      category: 'Nepali', 
      time: 35, 
      difficulty: 'मध्यम', 
      calories: 520, 
      price: 680, 
      image: '🍖', 
      rating: 4.9, 
      reviews: 345, 
      description: 'परम्परागत नेपाली सेकुवा मसालेदार चटनी संग', 
      protein: 42, 
      carbs: 12, 
      fat: 32, 
      badge: 'नयाँ',
      ingredients: ['खसी मासु', 'मसाला', 'तेल', 'चटनी']
    },
    { 
      id: 8, 
      name: 'तरकारी पुलाव', 
      nameEn: 'Vegetable Pulao',
      category: 'Healthy', 
      time: 22, 
      difficulty: 'सजिलो', 
      calories: 390, 
      price: 320, 
      image: '🍚', 
      rating: 4.6, 
      reviews: 267, 
      description: 'स्वस्थकर तरकारी पुलाव रायता संग', 
      protein: 12, 
      carbs: 62, 
      fat: 10, 
      badge: '',
      ingredients: ['चामल', 'मटर', 'गाजर', 'प्याज', 'मसाला']
    },
  ];

  const testimonials = [
    { 
      name: 'सुजन श्रेष्ठ', 
      role: 'सफ्टवेयर इन्जिनियर', 
      rating: 5, 
      text: 'OneServe ले मेरो जीवन सजिलो बनाएको छ। एक्लै बस्दा पनि स्वादिलो नेपाली खाना खान पाउँदा खुसी लाग्छ।', 
      image: '👨',
      location: 'Kathmandu'
    },
    { 
      name: 'अनिता गुरुङ', 
      role: 'व्यापारी', 
      rating: 5, 
      text: 'समय र पैसा दुबै बचत हुन्छ। सामाग्री बर्बाद हुँदैन र सधैं ताजा खाना मिल्छ।', 
      image: '👩',
      location: 'Pokhara'
    },
    { 
      name: 'राजेश तामाङ', 
      role: 'डाक्टर', 
      rating: 5, 
      text: 'व्यस्त दिनचर्यामा पोषणयुक्त खाना खान OneServe एकदम राम्रो विकल्प हो।', 
      image: '👨‍⚕️',
      location: 'Lalitpur'
    }
  ];

  const categories = ['सबै', 'Nepali', 'Newari', 'Thakali', 'Tibetan', 'Healthy'];

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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-white" size={28} />
            </div>
            <div>
              <span className="text-2xl font-bold text-gray-900">OneServe</span>
              <div className="text-xs text-red-600 font-semibold">नेपाल</div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`font-semibold transition-all ${
                  currentPage === item.id
                    ? 'text-red-600 border-b-2 border-red-600'
                    : 'text-gray-700 hover:text-red-600'
                }`}
              >
                {item.name}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Search className="text-gray-700" size={22} />
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart className="text-gray-700" size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
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
                className="hidden md:block px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-semibold hover:shadow-xl transition-all duration-300"
              >
                साइन अप
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
                      ? 'bg-red-50 text-red-600'
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
              <h2 className="text-2xl font-bold text-gray-900">तपाईंको कार्ट</h2>
              <button onClick={() => setCartOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500 text-lg">तपाईंको कार्ट खाली छ</p>
                  <button 
                    onClick={() => {
                      setCartOpen(false);
                      setCurrentPage('menu');
                    }}
                    className="mt-6 px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700"
                  >
                    मेनु हेर्नुहोस्
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
                      <div className="w-20 h-20 bg-gradient-to-br from-red-200 to-orange-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                        {item.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                        <p className="text-red-600 font-bold mb-2">रू {item.price}</p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-red-600"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center hover:border-red-600"
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
                    <span>उप-जम्मा:</span>
                    <span className="font-semibold">रू {cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>डेलिभरी चार्ज:</span>
                    <span className="font-semibold text-green-600">नि:शुल्क</span>
                  </div>
                  <div className="flex justify-between items-center text-xl pt-2 border-t border-gray-200">
                    <span className="font-bold text-gray-900">जम्मा:</span>
                    <span className="font-bold text-red-600">रू {cartTotal}</span>
                  </div>
                </div>
                <button className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all">
                  चेकआउट गर्नुहोस्
                </button>
                <button 
                  onClick={() => setCartOpen(false)}
                  className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200"
                >
                  किनमेल जारी राख्नुहोस्
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
            <div className="h-80 bg-gradient-to-br from-red-200 to-orange-200 rounded-t-3xl flex items-center justify-center text-9xl relative">
              {selectedMeal.image}
              {selectedMeal.badge && (
                <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold">
                  {selectedMeal.badge}
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">{selectedMeal.name}</h2>
                <p className="text-lg text-gray-500 mb-2">{selectedMeal.nameEn}</p>
                <p className="text-gray-600 text-lg">{selectedMeal.description}</p>
              </div>
              <div className="text-right ml-6">
                <div className="text-3xl font-bold text-red-600 mb-2">रू {selectedMeal.price}</div>
                <div className="flex items-center gap-1 justify-end">
                  <Star className="text-yellow-400 fill-yellow-400" size={20} />
                  <span className="font-bold text-gray-900">{selectedMeal.rating}</span>
                  <span className="text-gray-600">({selectedMeal.reviews})</span>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <Clock className="mx-auto mb-2 text-red-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.time} मिनेट</div>
                <div className="text-sm text-gray-600">पकाउने समय</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <Flame className="mx-auto mb-2 text-red-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.calories} cal</div>
                <div className="text-sm text-gray-600">प्रति सर्भिङ</div>
              </div>
              <div className="bg-red-50 rounded-xl p-4 text-center">
                <Award className="mx-auto mb-2 text-red-600" size={24} />
                <div className="font-bold text-gray-900">{selectedMeal.difficulty}</div>
                <div className="text-sm text-gray-600">कठिनाई स्तर</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">पोषण जानकारी</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.protein}g</div>
                  <div className="text-sm text-gray-600">प्रोटिन</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.carbs}g</div>
                  <div className="text-sm text-gray-600">कार्बोहाइड्रेट</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.fat}g</div>
                  <div className="text-sm text-gray-600">बोसो</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">{selectedMeal.calories}</div>
                  <div className="text-sm text-gray-600">क्यालोरी</div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-900 text-lg mb-4">सामाग्री समावेश छ</h3>
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
                className="flex-1 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                कार्टमा थप्नुहोस् - रू {selectedMeal.price}
              </button>
              <button
                onClick={() => toggleFavorite(selectedMeal.id)}
                className="px-6 py-4 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Heart
                  className={favorites.includes(selectedMeal.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}
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
    <div className="min-h-screen">
      <section className="relative bg-gradient-to-br from-red-50 via-white to-orange-50 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-semibold text-gray-700">🎉 पहिलो अर्डरमा ४०% छुट</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                एक व्यक्तिका लागि
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-600">
                  परफेक्ट नेपाली खाना
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                फोहोर फाल्ने चिन्ता नगरी, ताजा र पोषणयुक्त नेपाली खाना घरमै। सबै सामाग्री एकदम सही मात्रामा।
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setCurrentPage('menu')}
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                >
                  मेनु हेर्नुहोस् <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 rounded-full font-bold text-lg hover:shadow-xl border-2 border-gray-200 transition-all duration-300 flex items-center gap-2">
                  <Play size={20} /> भिडियो हेर्नुहोस्
                </button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 fill-yellow-400" size={28} />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">4.9/5</div>
                    <div className="text-sm text-gray-600">३,५००+ समीक्षा</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="text-red-600" size={28} />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">२०,०००+</div>
                    <div className="text-sm text-gray-600">खुसी ग्राहक</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-500">
                <div className="text-9xl mb-4 text-center">📦</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">तपाईंको परफेक्ट किट</h3>
                <p className="text-gray-600 text-center mb-6">सबै कुरा मापिएको, केही पनि बर्बाद नहुने</p>
                <div className="space-y-3">
                  {['सही मात्रामा सामाग्री', 'स्टेप-बाई-स्टेप रेसिपी', 'ताजा र गुणस्तरीय', 'घरमै डेलिभरी'].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3 bg-red-50 p-3 rounded-lg">
                      <CheckCircle className="text-red-600 flex-shrink-0" size={20} />
                      <span className="text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">OneServe Nepal किन रोज्ने?</h2>
            <p className="text-xl text-gray-600">एक्लै खानाको लागि स्मार्ट तरिका</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'जिरो वेस्ट', desc: 'चाहिने जति मात्र, सही मात्रामा', color: 'from-red-600 to-red-700' },
              { icon: Clock, title: 'समय बचत', desc: 'न किनमेल, न मापन', color: 'from-orange-600 to-orange-700' },
              { icon: UtensilsCrossed, title: 'शेफ रेसिपी', desc: 'रेस्टुरेन्ट जस्तो स्वाद', color: 'from-red-600 to-red-700' },
              { icon: Leaf, title: 'स्थानीय सामाग्री', desc: 'नेपाली जैविक तरकारी', color: 'from-green-600 to-green-700' }
            ].map((feature, idx) => (
              <div key={idx} className="group bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">यो हप्ताका विशेष खाना</h2>
            <p className="text-xl text-gray-600">शेफले छानिएका स्वादिलो रेसिपी</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {meals.slice(0, 6).map((meal) => (
              <div key={meal.id} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-56 bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center text-8xl">
                  {meal.image}
                  {meal.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs font-bold">
                      {meal.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(meal.id)}
                    className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={favorites.includes(meal.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}
                      size={20}
                    />
                  </button>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-bold text-gray-900">{meal.rating}</span>
                    </div>
                    <span className="text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{meal.reviews} समीक्षा</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {meal.time} मि
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={16} /> {meal.calories} cal
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">रू {meal.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMeal(meal)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                      >
                        विवरण
                      </button>
                      <button
                        onClick={() => addToCart(meal)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        थप्नुहोस्
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => setCurrentPage('menu')}
              className="px-8 py-4 bg-white text-red-600 rounded-full font-bold text-lg hover:shadow-xl border-2 border-red-600 transition-all duration-300"
            >
              पूर्ण मेनु हेर्नुहोस्
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-red-600 to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { icon: TrendingUp, number: '५०,०००+', label: 'खाना डेलिभर गरियो' },
              { icon: Users, number: '२०,०००+', label: 'खुसी ग्राहक' },
              { icon: Star, number: '4.9/5', label: 'औसत रेटिङ' },
              { icon: Leaf, number: '१००%', label: 'जिरो वेस्ट' }
            ].map((stat, idx) => (
              <div key={idx} className="space-y-4">
                <stat.icon className="mx-auto" size={48} />
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-red-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">हाम्रा ग्राहकहरूले के भन्छन्</h2>
            <p className="text-xl text-gray-600">वास्तविक अनुभव</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-200 to-orange-200 rounded-full flex items-center justify-center text-3xl">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-xs text-red-600">{testimonial.location}</div>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-yellow-400" size={16} />
                  ))}
                </div>
                <p className="text-gray-700 italic">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">विशेष अफरहरू पाउनुहोस्</h2>
          <p className="text-xl text-gray-600 mb-8">रेसिपी, टिप्स र विशेष छुटका लागि हाम्रो न्यूजलेटर सब्सक्राइब गर्नुहोस्</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="आफ्नो इमेल हाल्नुहोस्"
              className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:border-red-600 focus:outline-none"
            />
            <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold hover:shadow-xl transition-all">
              सब्सक्राइब
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  // Menu Page
  const MenuPage = () => {
    const filteredMeals = activeCategory === 'सबै' 
      ? meals 
      : meals.filter(meal => meal.category === activeCategory);

    return (
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">हाम्रो मेनु</h1>
            <p className="text-xl text-gray-600">प्रत्येक हप्ता नयाँ रेसिपी थपिन्छ</p>
          </div>

          <div className="mb-8">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all ${
                    activeCategory === category
                      ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg'
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
                <div className="relative h-56 bg-gradient-to-br from-red-200 to-orange-200 flex items-center justify-center text-8xl">
                  {meal.image}
                  {meal.badge && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full text-xs font-bold">
                      {meal.badge}
                    </div>
                  )}
                  <button
                    onClick={() => toggleFavorite(meal.id)}
                    className="absolute top-4 left-4 w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                  >
                    <Heart
                      className={favorites.includes(meal.id) ? 'text-red-500 fill-red-500' : 'text-gray-400'}
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
                    <span className="text-sm text-gray-600">{meal.reviews} समीक्षा</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">{meal.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{meal.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-1">
                      <Clock size={16} /> {meal.time} मि
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame size={16} /> {meal.calories} cal
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">रू {meal.price}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedMeal(meal)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                      >
                        विवरण
                      </button>
                      <button
                        onClick={() => addToCart(meal)}
                        className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        थप्नुहोस्
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

  // Login/Signup Page
  const LoginSignupPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-700 rounded-xl flex items-center justify-center shadow-lg">
              <ChefHat className="text-white" size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">OneServe Nepal</h1>
          <p className="text-gray-600">तपाईंको खाना यात्रा सुरु गर्नुहोस्</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setAuthMode('login')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              लगइन
            </button>
            <button
              onClick={() => setAuthMode('signup')}
              className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              साइन अप
            </button>
          </div>

          <form className="space-y-5">
            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">पूरा नाम</label>
                <input
                  type="text"
                  placeholder="तपाईंको नाम"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">इमेल ठेगाना</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
              />
            </div>

            {authMode === 'signup' && (
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">फोन नम्बर</label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">पासवर्ड</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
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
                  <span className="text-gray-600">मलाई सम्झनुहोस्</span>
                </label>
                <button type="button" className="text-red-600 hover:underline">
                  पासवर्ड बिर्सनुभयो?
                </button>
              </div>
            )}

            {authMode === 'signup' && (
              <div className="flex items-start gap-2">
                <input type="checkbox" className="mt-1 rounded" />
                <span className="text-sm text-gray-600">
                  म <button type="button" className="text-red-600 hover:underline">सर्तहरू र सर्तहरू</button> स्वीकार गर्दछु
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
              className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
            >
              {authMode === 'login' ? 'लगइन गर्नुहोस्' : 'साइन अप गर्नुहोस्'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">वा</span>
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
            {authMode === 'login' ? 'खाता छैन?' : 'पहिले नै खाता छ?'}
            <button
              onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
              className="ml-2 text-red-600 font-semibold hover:underline"
            >
              {authMode === 'login' ? 'साइन अप गर्नुहोस्' : 'लगइन गर्नुहोस्'}
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
            <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">सुजन श्रेष्ठ</h1>
              <p className="text-gray-600">sujan.shrestha@email.com</p>
              <p className="text-sm text-gray-500">+977 98XXXXXXXX</p>
            </div>
            <button className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors">
              प्रोफाइल सम्पादन गर्नुहोस्
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-2">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-50 text-red-600 font-semibold">
                <User size={20} />
                <span>मेरो प्रोफाइल</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-colors">
                <History size={20} />
                <span>अर्डर इतिहास</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-colors">
                <Heart size={20} />
                <span>मनपर्ने</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-colors">
                <MapPin size={20} />
                <span>ठेगाना</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-colors">
                <CreditCard size={20} />
                <span>भुक्तानी विधि</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 text-gray-700 font-semibold transition-colors">
                <Settings size={20} />
                <span>सेटिङ्गहरू</span>
              </button>
              <button
                onClick={() => {
                  setIsLoggedIn(false);
                  setCurrentPage('home');
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 text-red-600 font-semibold transition-colors"
              >
                <LogOut size={20} />
                <span>लगआउट</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-8">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Package className="text-red-600" size={32} />
                  <span className="text-3xl font-bold text-gray-900">१५</span>
                </div>
                <p className="text-gray-600 font-semibold">कुल अर्डर</p>
              </div>
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <CheckCircle className="text-green-600" size={32} />
                  <span className="text-3xl font-bold text-gray-900">१२</span>
                </div>
                <p className="text-gray-600 font-semibold">पूरा भयो</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <Award className="text-blue-600" size={32} />
                  <span className="text-3xl font-bold text-gray-900">५६७</span>
                </div>
                <p className="text-gray-600 font-semibold">प्वाइन्टहरू</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">हालको सब्सक्रिप्शन</h2>
              <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Popular Plan</h3>
                    <p className="text-red-100">५ खाना/हप्ता</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">रू ५,९९५</div>
                    <p className="text-red-100">/हप्ता</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-red-100">
                  <Calendar size={16} />
                  <span>अर्को डेलिभरी: २०२५ मंसिर १५</span>
                </div>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors">
                  प्लान परिवर्तन गर्नुहोस्
                </button>
                <button className="flex-1 py-3 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition-colors">
                  यो हप्ता स्किप गर्नुहोस्
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">हालको अर्डरहरू</h2>
              <div className="space-y-4">
                {[
                  { id: '#ORD-२०२५-००१५', status: 'डेलिभरीमा', date: '२०२५ मंसिर १२', items: '३ आइटमहरू', total: 'रू १,३५०' },
                  { id: '#ORD-२०२५-००१४', status: 'तयारीमा', date: '२०२५ मंसिर ०८', items: '५ आइटमहरू', total: 'रू २,२५०' }
                ].map((order, idx) => (
                  <div key={idx} className="border-2 border-gray-100 rounded-xl p-6 hover:border-red-200 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{order.id}</h3>
                        <p className="text-sm text-gray-600">{order.date}</p>
                      </div>
                      <div className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                        {order.status}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-gray-600">
                        <span>{order.items}</span>
                        <span className="mx-2">•</span>
                        <span className="font-bold text-gray-900">{order.total}</span>
                      </div>
                      <button className="px-6 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors">
                        विवरण हेर्नुहोस्
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">मनपर्ने खानाहरू</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {meals.filter(meal => favorites.includes(meal.id)).slice(0, 4).map((meal) => (
                  <div key={meal.id} className="flex gap-4 border-2 border-gray-100 rounded-xl p-4 hover:border-red-200 transition-colors">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-200 to-orange-200 rounded-lg flex items-center justify-center text-4xl flex-shrink-0">
                      {meal.image}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-1">{meal.name}</h3>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="text-yellow-400 fill-yellow-400" size={14} />
                        <span className="text-sm font-semibold">{meal.rating}</span>
                      </div>
                      <p className="text-red-600 font-bold">रू {meal.price}</p>
                    </div>
                    <button
                      onClick={() => addToCart(meal)}
                      className="self-center px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                    >
                      थप्नुहोस्
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // How It Works, Pricing, About, Contact Pages (continued from earlier)
  const HowItWorksPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">OneServe Nepal यसो काम गर्छ</h1>
          <p className="text-xl text-gray-600">तीन सरल चरणमा स्वादिलो खाना</p>
        </div>

        <div className="space-y-32">
          {[
            {
              step: '०१',
              title: 'आफ्नो खाना छान्नुहोस्',
              desc: 'हाम्रो साप्ताहिक मेनुमा शेफले बनाएका रेसिपीहरू ब्राउज गर्नुहोस्। आफ्नो मनपर्ने छान्नुहोस् वा हामीले छानेका खानाहरूबाट चयन गर्नुहोस्।',
              features: ['प्रत्येक हप्ता ३०+ नयाँ रेसिपी', 'आहार आवश्यकता अनुसार फिल्टर', 'आफ्नो प्राथमिकता सेट गर्नुहोस्', 'जुनसुकै बेला स्किप वा पज गर्नुहोस्'],
              icon: '🍽️'
            },
            {
              step: '०२',
              title: 'हामी तयारी र डेलिभर गर्छौं',
              desc: 'हाम्रो टोलीले प्रत्येक सामाग्रीलाई सावधानीपूर्वक मापन र प्याक गर्छ। ताजा सामाग्रीहरू इको-फ्रेन्डली प्याकेजिङमा आइपुग्छन्।',
              features: ['सही मात्रामा मापन', 'वातावरण मैत्री प्याकेजिङ', 'लचिलो डेलिभरी समय', '१००% गुणस्तर ग्यारेन्टी'],
              icon: '📦'
            },
            {
              step: '०३',
              title: 'पकाउनुहोस् र मज्जा लिनुहोस्',
              desc: 'हाम्रो सरल स्टेप-बाई-स्टेप रेसिपी कार्डहरू फलो गर्नुहोस्। ३० मिनेट भन्दा कममा आफ्नै भान्सामा रेस्टुरेन्ट जस्तो खाना बनाउनुहोस्।',
              features: ['सरल निर्देशन', 'भिडियो ट्युटोरियल उपलब्ध', 'शेफ टिप्स समावेश', 'जिरो वेस्ट कुकिङ'],
              icon: '👨‍🍳'
            }
          ].map((step, idx) => (
            <div key={idx} className={`grid lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="inline-block px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-lg mb-6">
                  चरण {step.step}
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">{step.title}</h2>
                <p className="text-lg text-gray-600 mb-8">{step.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {step.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2">
                      <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className={`relative ${idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-12 flex items-center justify-center h-96 shadow-xl hover:shadow-2xl transition-all">
                  <div className="text-9xl">{step.icon}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-white rounded-3xl shadow-xl p-12 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">सुरु गर्न तयार हुनुहुन्छ?</h3>
          <p className="text-lg text-gray-600 mb-8">हजारौं खुसी ग्राहकहरूसँग सामेल हुनुहोस्</p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full font-bold text-lg hover:shadow-xl transition-all"
          >
            हाम्रो मेनु हेर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );

  // Pricing Page
  const PricingPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">सरल र पारदर्शी मूल्य</h1>
          <p className="text-xl text-gray-600">आफ्नो जीवनशैली अनुसार प्लान छान्नुहोस्</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { 
              name: 'Starter', 
              meals: '३ खाना/हप्ता', 
              price: '1,599', 
              features: ['३ सिंगल-सर्भ खानाहरू', 'रू 1,500 माथि नि:शुल्क डेलिभरी', 'जुनसुकै बेला रद्द गर्नुहोस्', '३०+ रेसिपीमा पहुँच', 'इमेल समर्थन'], 
              popular: false 
            },
            { 
              name: 'Popular', 
              meals: '५ खाना/हप्ता', 
              price: '1,499', 
              features: ['५ सिंगल-सर्भ खानाहरू', 'सधैं नि:शुल्क डेलिभरी', 'जुनसुकै बेला रद्द गर्नुहोस्', 'प्राथमिकता समर्थन', 'विशेष रेसिपीहरू', 'नयाँ खानाको प्रारम्भिक पहुँच'], 
              popular: true 
            },
            { 
              name: 'Premium', 
              meals: '७ खाना/हप्ता', 
              price: '1,399', 
              features: ['७ सिंगल-सर्भ खानाहरू', 'सधैं नि:शुल्क डेलिभरी', 'जुनसुकै बेला रद्द गर्नुहोस्', '२४/७ शेफ समर्थन', 'सबै विशेष रेसिपीहरू', 'कस्टम खाना योजना', 'VIP कार्यक्रम पहुँच'], 
              popular: false 
            }
          ].map((plan, idx) => (
            <div key={idx} className={`relative bg-white rounded-3xl shadow-xl p-8 ${plan.popular ? 'ring-4 ring-red-600 transform scale-105' : ''}`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-1 rounded-full text-sm font-bold shadow-lg">
                  सबैभन्दा लोकप्रिय
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.meals}</p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">रू {plan.price}</span>
                  <span className="text-gray-600">/खाना</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <CheckCircle className="text-red-600 flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                plan.popular 
                  ? 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-2xl' 
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                सुरु गर्नुहोस्
              </button>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">बारम्बार सोधिने प्रश्नहरू</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            {[
              { q: 'के म हप्ता स्किप गर्न वा रद्द गर्न सक्छु?', a: 'हो! तपाईंलाई कुनै पनि समय हप्ता स्किप गर्न वा रद्द गर्न पूर्ण लचकता छ, कुनै पेनाल्टी वा शुल्क बिना।' },
              { q: 'डेलिभरी कसरी काम गर्छ?', a: 'हामी इको-फ्रेन्डली इन्सुलेटेड प्याकेजिङमा तपाईंको ढोकासम्म डेलिभर गर्छौं। साइन अपको समयमा आफ्नो मनपर्ने डेलिभरी दिन छान्नुहोस्।' },
              { q: 'के अंश साँच्चै एक व्यक्तिको लागि हो?', a: 'निश्चित रूपमा! प्रत्येक सामाग्री पोषणविद्को दिशानिर्देश अनुसार एकल सर्भिङको लागि सही मात्रामा मापन गरिएको छ।' },
              { q: 'यदि मसँग आहार प्रतिबन्ध छ भने के हुन्छ?', a: 'हाम्रो मेनुमा शाकाहारी, शुद्ध शाकाहारी, ग्लुटेन-फ्री, डेयरी-फ्री र अन्य विकल्पहरू छन्। आफ्नो प्राथमिकता अनुसार फिल्टर गर्नुहोस्!' },
              { q: 'सामाग्रीहरू कत्तिको ताजा छन्?', a: 'हामी सम्भव भएसम्म स्थानीय रूपमा स्रोत गर्छौं र तयारीको ४८ घण्टा भित्र डेलिभर गर्छौं। १००% ताजापन ग्यारेन्टी।' }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-6 last:border-0">
                <h4 className="font-bold text-gray-900 mb-2 text-lg">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // About & Contact pages...
  const AboutPage = () => (
    <div className="min-h-screen bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">हाम्रो कथा</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            एक व्यक्तिका लागि खाना पकाउनु एउटा रमाइलो अनुभव बनाउँदै, कम्प्रोमाइज होइन
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl h-96 flex items-center justify-center text-9xl shadow-xl">
            🌟
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">किन हामीले OneServe सुरु गर्यौं</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              एक्लै बस्नेहरूको रूपमा, हामी थोक सामाग्रीहरू किन्न र त्यसलाई बिगार्ने वा दिनौं सम्म उही खाना खानमा थाकेका थियौं। हामीलाई थाहा थियो राम्रो तरिका हुनुपर्छ।
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              OneServe यो विश्वासबाट जन्मियो कि एक व्यक्तिको लागि खाना पकाउनु परिवारको लागि जत्तिकै रमाइलो र सुविधाजनक हुनुपर्छ। प्रत्येक खाना परफेक्ट हुन योग्य छ।
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">हाम्रा मूल मूल्यहरू</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: '🌱', title: 'दिगोपना', desc: 'हामी जिरो वेस्ट र इको-फ्रेन्डली, पुन: प्रयोज्य प्याकेजिङ प्रति प्रतिबद्ध छौं' },
              { icon: '❤️', title: 'गुणस्तर', desc: 'भरपर्दो स्थानीय आपूर्तिकर्ताहरूबाट मात्र ताजा सामाग्रीहरू हाम्रो किटहरूमा आउँछन्' },
              { icon: '🎯', title: 'परिशुद्धता', desc: 'निरन्तर, स्वादिलो परिणामहरूको लागि प्रत्येक सामाग्री परफेक्ट रूपमा मापन गरिएको' }
            ].map((value, idx) => (
              <div key={idx} className="text-center">
                <div className="text-7xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center bg-gradient-to-r from-red-600 to-red-700 rounded-3xl p-16 text-white">
          <h2 className="text-4xl font-bold mb-6">हाम्रो बढ्दो समुदायमा सामेल हुनुहोस्</h2>
          <p className="text-xl text-red-100 mb-8">आज OneServe परिवारको हिस्सा बन्नुहोस्</p>
          <button 
            onClick={() => setCurrentPage('menu')}
            className="px-10 py-4 bg-white text-red-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all"
          >
            अहिले सुरु गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">सम्पर्कमा रहनुहोस्</h1>
          <p className="text-xl text-gray-600">हामी तपाईंबाट सुन्न चाहन्छौं</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">सम्पर्क जानकारी</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">इमेल</h3>
                    <p className="text-gray-600">support@oneserve.com.np</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">फोन</h3>
                    <p className="text-gray-600">+977-1-5970000</p>
                    <p className="text-gray-600">+977-9801234567 (WhatsApp)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">ठेगाना</h3>
                    <p className="text-gray-600">दरबारमार्ग, काठमाडौं</p>
                    <p className="text-gray-600">नेपाल</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="text-red-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">समय</h3>
                    <p className="text-gray-600">आइतबार-शुक्रबार: बिहान ९ - बेलुका ६</p>
                    <p className="text-gray-600">शनिबार: बिहान १० - दिउँसो ४</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">सहयोग चाहिन्छ?</h3>
              <p className="text-gray-700 mb-4">सामान्य प्रश्नहरूको द्रुत उत्तरको लागि हाम्रो FAQ खण्ड जाँच गर्नुहोस्।</p>
              <button className="px-6 py-3 bg-white text-red-600 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                FAQ हेर्नुहोस्
              </button>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">हामीलाई फलो गर्नुहोस्</h3>
              <div className="flex gap-4">
                <button className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                  <Facebook className="text-blue-600" size={24} />
                </button>
                <button className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center hover:bg-pink-200 transition-colors">
                  <Instagram className="text-pink-600" size={24} />
                </button>
                <button className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center hover:bg-green-200 transition-colors">
                  <MessageCircle className="text-green-600" size={24} />
                </button>
                <button className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center hover:bg-red-200 transition-colors">
                  <Youtube className="text-red-600" size={24} />
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">हामीलाई सन्देश पठाउनुहोस्</h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">नाम</label>
                <input
                  type="text"
                  placeholder="तपाईंको नाम"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">इमेल</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">फोन नम्बर</label>
                <input
                  type="tel"
                  placeholder="98XXXXXXXX"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">विषय</label>
                <input
                  type="text"
                  placeholder="हामी कसरी मद्दत गर्न सक्छौं?"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">सन्देश</label>
                <textarea
                  rows="5"
                  placeholder="हामीलाई थप बताउनुहोस्..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-600 focus:outline-none transition-colors resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl font-bold text-lg hover:shadow-xl transition-all"
              >
                सन्देश पठाउनुहोस्
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">हामी डेलिभर गर्ने क्षेत्रहरू</h2>
          <div className="grid md:grid-cols-5 gap-6 text-center">
            {['काठमाडौं', 'ललितपुर', 'भक्तपुर', 'पोखरा', 'विराटनगर'].map((city, idx) => (
              <div key={idx} className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4">
                <MapPin className="mx-auto mb-2 text-red-600" size={32} />
                <p className="font-semibold text-gray-900">{city}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Footer
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center">
                <ChefHat className="text-white" size={24} />
              </div>
              <div>
                <span className="text-xl font-bold">OneServe</span>
                <div className="text-xs text-red-400">नेपाल</div>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              एक व्यक्तिको लागि परफेक्ट रूपमा मापिएको खाना। ताजा, स्वादिलो, र जिरो वेस्ट।
            </p>
            <div className="flex gap-3">
              {[Facebook, Instagram, MessageCircle, Youtube].map((Icon, idx) => (
                <button key={idx} className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">कम्पनी</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('about')} className="text-gray-400 hover:text-white transition-colors">हाम्रो बारे</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">करियर</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">ब्लग</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">प्रेस</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">समर्थन</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setCurrentPage('contact')} className="text-gray-400 hover:text-white transition-colors">सम्पर्क</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">FAQ</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">डेलिभरी जानकारी</button></li>
              <li><button className="text-gray-400 hover:text-white transition-colors">फिर्ता</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">भुक्तानी विधि</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={20} />
                <span>eSewa</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={20} />
                <span>Khalti</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <CreditCard size={20} />
                <span>IME Pay</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Package size={20} />
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2025 OneServe Nepal। सबै अधिकार सुरक्षित।</p>
          <div className="flex gap-6 text-sm text-gray-400">
            <button className="hover:text-white transition-colors">गोपनीयता नीति</button>
            <button className="hover:text-white transition-colors">सेवाका सर्तहरू</button>
            <button className="hover:text-white transition-colors">कुकी नीति</button>
          </div>
        </div>
      </div>
    </footer>
  );

  // Main render
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
        return <ProfilePage />;
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