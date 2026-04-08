import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ChevronLeft, Plus, Minus, ShoppingCart, Zap } from "lucide-react";
import CircleLoader from "react-spinners/CircleLoader"
import { getStoreProductById, getStoreProductBySlug } from "../utils/storeApi";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import Products from "./Products";
import toast from 'react-hot-toast';
import { listApprovedProductReviews } from "../api/reviewApi";

/** Prefer first in-stock SKU for initial selection; fallback to first row (e.g. all OOS). */
function pickDefaultSku(skus) {
  if (!Array.isArray(skus) || skus.length === 0) return null;
  const inStock = skus.find((s) => Number(s?.stockQuantity) > 0);
  return inStock ?? skus[0];
}

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const idOrSlug = params?.id || params?.slug;
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [reviews, setReviews] = useState([]);
  const [reviewsStats, setReviewsStats] = useState({ averageRating: 0, totalReviews: 0 });
  const [reviewsLoading, setReviewsLoading] = useState(false);
  const [reviewsError, setReviewsError] = useState("");
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [expandedReviewIds, setExpandedReviewIds] = useState({});
  const [selectedSku, setSelectedSku] = useState(null);

  const isUuid = useMemo(() => {
    if (!idOrSlug) return false;
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      idOrSlug
    );
  }, [idOrSlug]);

  // Fetch single product
  useEffect(() => {
    if (!idOrSlug) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const data = isUuid
          ? await getStoreProductById(idOrSlug)
          : await getStoreProductBySlug(idOrSlug);
        setProduct(data || null);

        if (data?.skus?.length > 0) {
          setSelectedSku(pickDefaultSku(data.skus));
        }
      } catch (err) {
        console.error("Failed to load product", err);
        setError("Unable to load product details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [idOrSlug, isUuid]);

  useEffect(() => {
    setSelectedImageIndex(0);
  }, [selectedSku?.id]);

  const productId = product?.id || product?._id || null;

  const mergeUniqueReviews = (prev, next) => {
    const seen = new Set(prev.map((r) => r?.id));
    const merged = [...prev];
    for (const r of next || []) {
      if (!r?.id) continue;
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      merged.push(r);
    }
    return merged;
  };

  const formatReviewDate = (d) => {
    if (!d) return "";
    const dt = new Date(d);
    if (Number.isNaN(dt.getTime())) return "";
    return dt.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "2-digit" });
  };

  const renderStars = (value, { size = 16 } = {}) => {
    const rounded = Math.round((Number(value) || 0) * 10) / 10;
    const filledCount = Math.max(0, Math.min(5, Math.floor(rounded)));
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          const active = i <= filledCount;
          return (
            <Star
              key={i}
              size={size}
              className="shrink-0"
              color={active ? "#FFD742" : "#E5E7EB"}
              fill={active ? "#FFD742" : "transparent"}
            />
          );
        })}
      </div>
    );
  };

  const fetchReviewsPage = async (page, limit = 20) => {
    if (!productId) return null;
    const data = await listApprovedProductReviews(productId, { page, limit });
    const nextReviews = Array.isArray(data?.reviews) ? data.reviews : [];
    const nextPagination = data?.pagination || null;
    const nextStats = data?.stats || null;
    return { nextReviews, nextPagination, nextStats };
  };

  const refreshReviews = async () => {
    if (!productId) return;
    setReviewsLoading(true);
    setReviewsError("");
    try {
      const res = await fetchReviewsPage(1, 20);
      setReviews(res?.nextReviews || []);
      if (res?.nextStats) {
        setReviewsStats({
          averageRating: Number(res.nextStats.averageRating) || 0,
          totalReviews: Number(res.nextStats.totalReviews) || 0,
        });
      } else {
        const list = res?.nextReviews || [];
        const total = list.length;
        const avg = total ? list.reduce((sum, r) => sum + (Number(r?.rating) || 0), 0) / total : 0;
        setReviewsStats({ averageRating: avg, totalReviews: total });
      }
    } catch (err) {
      setReviews([]);
      setReviewsStats({ averageRating: 0, totalReviews: 0 });
      setReviewsError(err?.response?.data?.message || err?.message || "Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  const loadAllReviews = async () => {
    if (!productId) return;
    setReviewsLoading(true);
    setReviewsError("");
    try {
      let page = 1;
      const limit = 50;
      let all = [];
      let pagination = null;
      let stats = null;

      while (true) {
        const res = await fetchReviewsPage(page, limit);
        const pageReviews = res?.nextReviews || [];
        all = mergeUniqueReviews(all, pageReviews);
        pagination = res?.nextPagination || pagination;
        stats = res?.nextStats || stats;

        const total = pagination?.total;
        const totalPages = pagination?.totalPages;
        if (typeof total === "number" && all.length >= total) break;
        if (typeof totalPages === "number" && page >= totalPages) break;
        if (!pageReviews.length) break;
        page += 1;
      }

      setReviews(all);
      if (stats) {
        setReviewsStats({
          averageRating: Number(stats.averageRating) || 0,
          totalReviews: Number(stats.totalReviews) || 0,
        });
      } else {
        const total = all.length;
        const avg = total ? all.reduce((sum, r) => sum + (Number(r?.rating) || 0), 0) / total : 0;
        setReviewsStats({ averageRating: avg, totalReviews: total });
      }
    } catch (err) {
      setReviewsError(err?.response?.data?.message || err?.message || "Failed to load reviews");
    } finally {
      setReviewsLoading(false);
    }
  };

  useEffect(() => {
    setShowAllReviews(false);
    setExpandedReviewIds({});
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    refreshReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  useEffect(() => {
    if (!productId) return;
    if (!showAllReviews) return;
    loadAllReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAllReviews, productId]);

  const calculateDiscount = () => {
    if (!selectedSku?.mrp || !selectedSku?.sellingPrice) return null;
    const mrp = Number(selectedSku.mrp);
    const sp = Number(selectedSku.sellingPrice);
    if (!mrp || !sp || mrp <= sp) return null;
    const off = Math.round(((mrp - sp) / mrp) * 100);
    return `${off}% OFF`;
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      if (selectedSku?.stockQuantity && quantity < selectedSku.stockQuantity) {
        setQuantity(prev => prev + 1);
      }
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (!product || !selectedSku) return;
    if (!selectedSku.stockQuantity || selectedSku.stockQuantity <= 0) return;

    if (!isAuthenticated) {
      toast.error("Please login to use the cart.", { id: 'req-login', duration: 2000 });
      navigate('/unauthenticated');
      return;
    }

    // Prepare cart item data
    const cartItem = {
      id: product.id || product._id,
      productId: product.id || product._id,
      name: product.name,
      price: Number(selectedSku.sellingPrice),
      mrp: Number(selectedSku.mrp),
      quantity: quantity,
      imageUrl: selectedSku?.imageUrl || product.images?.[0]?.url || product.images?.[0] || "https://placehold.co/200x200?text=Product",
      image: selectedSku?.imageUrl || product.images?.[0]?.url || product.images?.[0] || "https://placehold.co/200x200?text=Product",
      sku: selectedSku,
      skuId: selectedSku.id || selectedSku._id,
      stockQuantity: selectedSku.stockQuantity,
      category: product.category?.name,
      subcategory: product.subcategory?.name,
    };

    // Add to cart using context
    addToCart(cartItem);

    // Show success toast
    toast.success("Added to cart successfully!", { id: 'success-cart', duration: 2000 });
  };

  const handleBuyNow = () => {
    if (!product || !selectedSku) return;
    if (!selectedSku.stockQuantity || selectedSku.stockQuantity <= 0) return;

    if (!isAuthenticated) {
      toast.error("Please login to use the cart.", { id: 'req-login', duration: 2000 });
      navigate('/unauthenticated');
      return;
    }

    // First add to cart
    handleAddToCart();

    // Then redirect to checkout after a brief delay
    setTimeout(() => {
      navigate('/checkout');
    }, 300);
  };

  const images = useMemo(() => {
    let skuImages = [];
    if (selectedSku?.images?.length) {
      skuImages = selectedSku.images.map(img => img.url || img.imageUrl || img);
    }

    let prodImages = [];
    if (product?.images?.length) {
      prodImages = product.images.map(img => img.url || img.imageUrl || img);
    }

    // If SKU has images, use them. Else use product images. Else placeholder
    if (skuImages.length > 0) return skuImages;
    if (prodImages.length > 0) return prodImages;

    return ["https://placehold.co/600x600?text=No+Image"];
  }, [product, selectedSku]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <CircleLoader color="#88013c" size={50} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className=" min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <p className="mt-40 text-red-500 text-sm">{error || "Product not found."}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50"
        >
          Go Back
        </button>
      </div>
    );
  }

  const discountLabel = calculateDiscount();
  const isOutOfStock = !selectedSku?.stockQuantity || selectedSku.stockQuantity <= 0;
  const displayImageIndex = Math.min(
    selectedImageIndex,
    Math.max(0, images.length - 1)
  );
  const avgRating = Number(reviewsStats?.averageRating) || 0;
  const totalReviewsCount = Number(reviewsStats?.totalReviews) || 0;
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  return (
    <>

      <div className="w-full px-4 sm:px-6 lg:px-10 pb-12">
        {/* Back + Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-500">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          <span className="mx-1">/</span>
          <span className="capitalize">
            {product.category?.name || "Category"}
          </span>
          <span className="mx-1">/</span>
          <span className="capitalize">
            {product.subcategory?.name || "Subcategory"}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
          {/* LEFT: IMAGES */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center aspect-square">
              <img
                src={images[displayImageIndex].url || images[displayImageIndex]}
                alt={product.name}
                className={`w-full h-full object-contain p-4 ${isOutOfStock ? "opacity-90" : ""}`}
              />
              {isOutOfStock && (
                <div
                  className="absolute inset-0 flex items-center justify-center bg-black/45 pointer-events-none"
                  aria-hidden
                >
                  <span className="px-5 py-2.5 rounded-xl bg-white/95 text-[#88013C] text-sm font-bold shadow-lg tracking-wide">
                    Out of stock
                  </span>
                </div>
              )}
              {discountLabel && (
                <span className="absolute top-4 left-4 bg-gradient-to-r from-green-600 to-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg z-[1]">
                  {discountLabel}
                </span>
              )}
              {product.isFeatured && (
                <span className="absolute top-4 right-4 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1 z-[1]">
                  <Star className="w-3 h-3 fill-white" />
                  Featured
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative flex-none w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${idx === displayImageIndex
                      ? "border-[#88013C] shadow-md scale-105"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <img
                      src={img.url || img}
                      alt={`thumb-${idx}`}
                      className={`w-full h-full object-cover ${isOutOfStock ? "opacity-90" : ""}`}
                    />
                    {isOutOfStock && (
                      <div
                        className="absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none"
                        aria-hidden
                      >
                        <span className="text-[9px] font-bold text-white drop-shadow-sm px-1 text-center leading-tight">
                          Out of stock
                        </span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="flex flex-col gap-6">
            {/* Title + Status Badges */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${product.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                    }`}
                >
                  {product.isActive ? "Active" : "Unavailable"}
                </span>
                {isOutOfStock && (
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                    Out of stock
                  </span>
                )}
                <span className="text-xs text-gray-400">
                  {product.category?.name} • {product.subcategory?.name}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Description */}
              <div className="border-l-4 border-[#88013C] pl-4 py-2">
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {product.description || "No description available for this item."}
                </p>
              </div>

              {/* SKU Selection View */}
              {product.skus && product.skus.length > 1 && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">Available Options</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.skus.map((sku) => {
                      // Formulate a label for the SKU button
                      const label = [sku.size, sku.color, sku.material].filter(Boolean).join(" - ") || sku.skuCode || `Option ${product.skus.indexOf(sku) + 1}`;
                      const isSelected = selectedSku?.id === sku.id;
                      const isSkuOutOfStock = !sku.stockQuantity || sku.stockQuantity <= 0;

                      return (
                        <button
                          key={sku.id}
                          onClick={() => {
                            setSelectedSku(sku);
                            setQuantity(1); // Reset quantity when variant changes
                          }}
                          className={`
                            px-4 py-2 rounded-xl text-sm font-semibold transition-all border-2
                            ${isSelected
                              ? "border-[#88013C] bg-[#88013C]/5 text-[#88013C] shadow-sm transform scale-[1.02]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"}
                            ${isSkuOutOfStock && !isSelected ? "opacity-50 line-through decoration-1" : ""}
                          `}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Price Block */}
            {selectedSku && (
              <div className="rounded-xl p-5 bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 transition-all duration-300">
                <div className="flex items-end gap-3 mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-bold text-[#88013C]">
                      ₹{selectedSku.sellingPrice}
                    </span>
                    {selectedSku.mrp && selectedSku.mrp > selectedSku.sellingPrice && (
                      <span className="text-base sm:text-lg text-gray-400 line-through">
                        ₹{selectedSku.mrp}
                      </span>
                    )}
                  </div>
                  {discountLabel && (
                    <span className="text-sm font-bold text-green-600 mb-1">
                      Save {discountLabel}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {selectedSku.festivePrice && (
                    <span className="px-2.5 py-1 rounded-full bg-pink-100 text-pink-700 font-medium">
                      Festive: ₹{selectedSku.festivePrice}
                    </span>
                  )}
                  {selectedSku.gstPercent && (
                    <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-medium">
                      GST {selectedSku.gstPercent}%
                    </span>
                  )}
                  {selectedSku.isCodAllowed && (
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 font-medium">
                      COD Available
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => handleQuantityChange("decrease")}
                    disabled={quantity <= 1}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4 text-gray-700" />
                  </button>
                  <span className="px-6 py-3 font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange("increase")}
                    disabled={isOutOfStock || (selectedSku?.stockQuantity && quantity >= selectedSku.stockQuantity)}
                    className="px-4 py-3 bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4 text-gray-700" />
                  </button>
                </div>
                {/* <span className="text-sm text-gray-500">
                  {selectedSku?.stockQuantity && selectedSku.stockQuantity > 0
                    ? `${selectedSku.stockQuantity} available`
                    : "Out of stock"}
                </span> */}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#88013C] text-[#88013C] rounded-xl font-semibold hover:bg-[#88013C] hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-[#88013C]"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={isOutOfStock}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#88013C] to-[#a0014a] text-white rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <Zap className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Product Specifications */}
            {selectedSku && (
              <div className="rounded-xl p-5 bg-white border border-gray-200 mt-2">
                <h2 className="text-base font-bold mb-4 text-gray-900">
                  Product Specifications
                </h2>
                <div className="space-y-3">
                  {[
                    { label: "SKU Code", value: selectedSku.skuCode },
                    { label: "Size", value: selectedSku.size },
                    { label: "Weight", value: selectedSku.weight },
                    { label: "Material", value: selectedSku.material },
                    { label: "Color", value: selectedSku.color },
                  ].map((spec, idx) =>
                    spec.value ? (
                      <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 px-2 transition-colors rounded">
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {spec.label}
                        </span>
                        <span className="font-medium text-gray-900 capitalize text-right ml-4">
                          {spec.value}
                        </span>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      {/* Ratings & Reviews */}
      <div className="w-full px-4 sm:px-6 lg:px-10 pb-12">
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">Ratings & Reviews</h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                Verified customer feedback (approved by admin)
              </p>
            </div>

            <div className="flex items-center gap-2">
              {renderStars(avgRating, { size: 18 })}
              <span className="text-sm font-bold text-gray-900">{avgRating ? avgRating.toFixed(1) : "0.0"}</span>
              <span className="text-sm text-gray-500">({totalReviewsCount})</span>
            </div>
          </div>

          <div className="mt-6">
            {reviewsError ? (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium">
                {reviewsError}
              </div>
            ) : null}

            {reviewsLoading ? (
              <div className="py-8 text-sm text-gray-500 animate-pulse">Loading reviews...</div>
            ) : totalReviewsCount === 0 ? (
              <div className="py-8 text-sm text-gray-600">No reviews yet.</div>
            ) : (
              <div className="space-y-4">
                {displayedReviews.map((r) => (
                  <div key={r.id} className="border border-gray-200 rounded-xl p-4 hover:bg-gray-50/40 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {renderStars(r.rating, { size: 16 })}
                        <span className="text-xs font-semibold text-gray-700">{Number(r.rating) || 0}/5</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-semibold text-gray-700">{r.customer?.name || "Customer"}</span>
                        {r.createdAt ? <span className="mx-2 text-gray-300">•</span> : null}
                        {r.createdAt ? <span>{formatReviewDate(r.createdAt)}</span> : null}
                      </div>
                    </div>

                    {r.title ? <div className="mt-2 font-semibold text-gray-900">{r.title}</div> : null}

                    {r.comment ? (
                      <div className="mt-1">
                        <div
                          className="text-sm text-gray-700 break-words whitespace-pre-wrap"
                          style={
                            expandedReviewIds?.[r.id]
                              ? undefined
                              : {
                                  display: "-webkit-box",
                                  WebkitBoxOrient: "vertical",
                                  WebkitLineClamp: 3,
                                  overflow: "hidden",
                                }
                          }
                        >
                          {r.comment}
                        </div>
                        {String(r.comment).trim().length > 180 ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedReviewIds((prev) => ({
                                ...(prev || {}),
                                [r.id]: !prev?.[r.id],
                              }))
                            }
                            className="mt-1 text-xs font-semibold text-[#88013C] hover:underline"
                          >
                            {expandedReviewIds?.[r.id] ? "Read less" : "Read more"}
                          </button>
                        ) : null}
                      </div>
                    ) : null}
                  </div>
                ))}

                {totalReviewsCount > 3 ? (
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={reviewsLoading}
                      onClick={() => setShowAllReviews((v) => !v)}
                      className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {showAllReviews ? "Show less" : "Show more"}
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>

      <Products />
    </>
  );
};

export default ProductDetails;