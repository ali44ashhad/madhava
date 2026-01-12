import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { productDetail } from "../data/data";
import { useCart } from "../context/CartContext";
import { Star, Heart, Share2, Truck, Shield, RefreshCcw, Check, Minus, Plus, ShoppingCart, ArrowLeft } from "lucide-react";

const ProductDetails = () => {
  const { slug } = useParams();
  const product = productDetail.find(p => p.slug === slug);
  const { addToCart, cart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  if (!product) {
    return (
      <div className="pt-24 md:pt-32 min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/" className="text-[#88013C] hover:underline">Go back to home</Link>
        </div>
      </div>
    );
  }

  const isInCart = cart.some(item => item.id === product.id);
  const discountPercent = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleBuyNow = () => {
    if (!isInCart) {
      addToCart(product, quantity);
    }
    // Navigate to checkout (you can add this route later)
    alert("Redirecting to checkout...");
  };

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="pt-24 md:pt-32 min-h-screen bg-gray-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-20 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-slide-in">
          <Check size={20} />
          <span>Added to cart successfully!</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6 flex items-center gap-2">
          <Link to="/" className="hover:text-[#88013C] flex items-center gap-1">
            <ArrowLeft size={16} />
            <span>Home</span>
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-400">Product</span>
          <span className="mx-2">/</span>
          <span className="text-gray-800">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg p-4">
              <img
                src={product.images?.[selectedImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-[400px] md:h-[500px] object-contain rounded-lg"
              />
            </div>

            {/* Thumbnail Images */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImageIndex(i)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === i
                        ? "border-[#88013C] ring-2 ring-[#88013C]/20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 py-3 px-4 rounded-lg border-2 flex items-center justify-center gap-2 transition-all ${
                  isWishlisted
                    ? "bg-red-50 border-red-300 text-red-600"
                    : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                <span className="font-semibold">{isWishlisted ? "Wishlisted" : "Wishlist"}</span>
              </button>
              <button className="flex-1 py-3 px-4 rounded-lg border-2 border-gray-300 bg-white text-gray-700 hover:border-gray-400 flex items-center justify-center gap-2 transition-all">
                <Share2 size={20} />
                <span className="font-semibold">Share</span>
              </button>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="space-y-6">
            {/* Badge & Title */}
            <div>
              {product.discount && (
                <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold mb-3">
                  {product.discount}
                </span>
              )}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              {product.description && (
                <p className="text-gray-600 text-lg leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(4.8) 234 Reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4 py-4 border-y">
              <span className="text-4xl font-bold text-[#88013C]">
                ₹{product.price.toLocaleString()}
              </span>
              <span className="text-2xl text-gray-400 line-through">
                ₹{product.mrp.toLocaleString()}
              </span>
              <span className="text-lg font-semibold text-green-600">
                Save ₹{(product.mrp - product.price).toLocaleString()} ({discountPercent}%)
              </span>
            </div>

            {/* Quantity Selector */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-3 w-fit">
                <button
                  onClick={decreaseQuantity}
                  disabled={quantity === 1}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-10 h-10 text-center border-2 border-gray-300 rounded-lg font-semibold lg:text-center"
                />
                <button
                  onClick={increaseQuantity}
                  className="w-10 h-10 rounded-lg border-2 border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  isInCart
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-[#88013C] hover:bg-[#88013C]/90"
                }`}
              >
                <ShoppingCart size={20} />
                <span>{isInCart ? "Added to Cart" : "Add to Cart"}</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 px-6 rounded-lg font-bold bg-[#004d3d] text-white hover:bg-[#00362b] transition-all flex items-center justify-center gap-2"
              >
                BUY NOW
                <span className="bg-white text-black px-2 py-0.5 rounded text-xs italic">
                  GPay/Paytm
                </span>
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Product Details</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {product.material && (
                  <div>
                    <span className="font-semibold text-gray-700">Material:</span>
                    <span className="ml-2 text-gray-600">{product.material}</span>
                  </div>
                )}
                {product.dimensions && (
                  <div>
                    <span className="font-semibold text-gray-700">Dimensions:</span>
                    <span className="ml-2 text-gray-600">{product.dimensions}</span>
                  </div>
                )}
                {product.weight && (
                  <div>
                    <span className="font-semibold text-gray-700">Weight:</span>
                    <span className="ml-2 text-gray-600">{product.weight}</span>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <span className="font-semibold text-gray-700">Finish:</span>
                    <span className="ml-2 text-gray-600">{product.finish}</span>
                  </div>
                )}
                {product.washable && (
                  <div>
                    <span className="font-semibold text-gray-700">Washable:</span>
                    <span className="ml-2 text-gray-600">{product.washable}</span>
                  </div>
                )}
                {product.packageContains && (
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-gray-700">Package Contains:</span>
                    <span className="ml-2 text-gray-600">{product.packageContains}</span>
                  </div>
                )}
                {product.careInstructions && (
                  <div className="sm:col-span-2">
                    <span className="font-semibold text-gray-700">Care Instructions:</span>
                    <span className="ml-2 text-gray-600">{product.careInstructions}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <Truck className="text-[#88013C]" size={24} />
                <div>
                  <p className="font-bold text-sm">Free Delivery</p>
                  <p className="text-xs text-gray-600">On orders above ₹999</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <Shield className="text-[#88013C]" size={24} />
                <div>
                  <p className="font-bold text-sm">Secure Payment</p>
                  <p className="text-xs text-gray-600">100% Protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <RefreshCcw className="text-[#88013C]" size={24} />
                <div>
                  <p className="font-bold text-sm">Easy Returns</p>
                  <p className="text-xs text-gray-600">7 Days Return</p>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-4">Delivery Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">Delhi / NCR</p>
                  <p className="text-gray-600">{product.deliveryInfo?.delhi || "2-4 Days"}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">India</p>
                  <p className="text-gray-600">{product.deliveryInfo?.india || "3-6 Days"}</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-bold text-gray-900 mb-1">International</p>
                  <p className="text-gray-600">{product.deliveryInfo?.international || "7-14 Days"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
