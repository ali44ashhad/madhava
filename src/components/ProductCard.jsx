import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

/**
 * Single product card – used across the site. No Add to Cart / Buy Now.
 * Data from backend: featuredImageUrl or images[0].url, minPrice/maxPrice or skus[0].sellingPrice/mrp, etc.
 */
const ProductCard = ({ product, showTimer = false, className = '' }) => {

  const productId = product?.id || product?.slug;
  const imageUrl =
    product?.featuredImageUrl ||
    product?.images?.[0]?.url ||
    product?.images?.[0]?.imageUrl ||
    product?.imageUrl ||
    product?.img ||
    "https://placehold.co/600x600?text=Product";

  const primarySku = product?.skus?.[0];
  const price =
    product?.minPrice ??
    primarySku?.sellingPrice ??
    primarySku?.selling_price ??
    primarySku?.mrp ??
    product?.price ??
    product?.sellingPrice ??
    0;
  const oldPrice =
    primarySku?.mrp ??
    primarySku?.MRP ??
    product?.oldPrice ??
    product?.originalPrice ??
    (product?.maxPrice && product?.minPrice && product.maxPrice > product.minPrice ? product.maxPrice : null);

  const percentOff =
    oldPrice && Number(oldPrice) > Number(price) && Number(price) > 0
      ? Math.round(((Number(oldPrice) - Number(price)) / Number(oldPrice)) * 100)
      : null;

  const ratingSource = product?.ratingAverage ?? product?.averageRating ?? product?.rating ?? 0;
  const ratingValue = Number(ratingSource);
  const rating = Number.isFinite(ratingValue) ? ratingValue.toFixed(1) : '0.0';

  const ratingCountSource = product?.ratingCount ?? product?.reviewsCount ?? product?.totalReviews ?? 0;
  const ratingCountValue = Number(ratingCountSource);
  const ratingCount = Number.isFinite(ratingCountValue) ? Math.max(0, Math.floor(ratingCountValue)) : 0;
  const subcategoryName = product?.subcategory?.name || product?.subcategoryName || product?.specs;

  return (
    <Link
      to={`/product/${productId}`}
      className={`group block bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-md transition-all ${className}`}
    >
      {/* Image + badges */}
      <div className="relative aspect-square bg-gray-50">
        <img
          src={imageUrl}
          alt={product?.name || 'Product'}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
          loading="lazy"
        />
        {/* Optional Mall badge */}

      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">
          {product?.name}
        </h3>

        {/* Price row */}
        <div className="mt-2 flex flex-wrap items-baseline gap-1.5">
          <span className="text-base font-bold text-gray-900">
            ₹{Number(price).toLocaleString()}
          </span>
          {oldPrice && (
            <>
              <span className="text-gray-400 line-through text-xs">
                ₹{Number(oldPrice).toLocaleString()}
              </span>
              {percentOff != null && (
                <span className="text-green-600 text-xs font-semibold">{percentOff}% off</span>
              )}
            </>
          )}
        </div>
        {/* Special offer line – optional, when backend sends it */}
        {product?.specialOfferText && (
          <p className="text-green-600 text-xs font-medium mt-0.5">{product.specialOfferText}</p>
        )}

        <p className="text-xs text-gray-500 mt-1">Free Delivery</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1.5 text-xs text-gray-600">
          <Star size={12} className="text-green-500 fill-green-500 shrink-0" />
          <span className="font-medium">{rating}</span>
          <span className="text-gray-400">({ratingCount})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
