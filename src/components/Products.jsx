import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CircleLoader from "react-spinners/CircleLoader"
import { getStoreProducts } from '../utils/storeApi';
import ProductCard from './ProductCard';

const DEFAULT_LIMIT = 10;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const categorySlug = searchParams.get('categorySlug') || '';
  const subcategorySlug = searchParams.get('subcategorySlug') || '';
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  const searchQuery = (searchParams.get('q') || '').trim().toLowerCase();

  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(limitParam, 10) || DEFAULT_LIMIT));

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          page,
          limit,
          ...(categorySlug && { categorySlug }),
          ...(subcategorySlug && { subcategorySlug }),
        };

        const payload = await getStoreProducts(params);
        if (!alive) return;

        const list = Array.isArray(payload?.products)
          ? payload.products
          : Array.isArray(payload)
            ? payload
            : [];

        const pag = payload?.pagination || {
          page,
          limit,
          total: list.length,
          totalPages: 1,
        };

        setProducts(list);
        setPagination(pag);
      } catch (err) {
        if (!alive) return;
        setError('Failed to load products.');
        setProducts([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [page, limit, categorySlug, subcategorySlug]);

  const searchMatches = useMemo(() => {
    if (!searchQuery) return [];
    return products.filter((p) => {
      const name = (p?.name || '').toLowerCase();
      const cat = (p?.category?.name || '').toLowerCase();
      const sub = (p?.subcategory?.name || '').toLowerCase();
      return (
        name.includes(searchQuery) ||
        cat.includes(searchQuery) ||
        sub.includes(searchQuery)
      );
    });
  }, [products, searchQuery]);

  const showSearchBlock = searchQuery && searchMatches.length > 0;
  const displayList = showSearchBlock ? searchMatches : products;

  const totalPages = pagination.totalPages || 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const goToPage = (newPage) => {
    const next = new URLSearchParams(searchParams);
    next.set('page', String(newPage));
    setSearchParams(next, { replace: true });
  };

  return (
    <section className="pt-44 max-w-[1500px] mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
        {categorySlug ? (
          <span className="capitalize">
            {categorySlug.replace(/-/g, ' ')}
          </span>
        ) : (
          'All Products'
        )}
      </h1>

      {subcategorySlug && (
        <p className="text-sm text-gray-500 mb-4 capitalize">
          Subcategory: {subcategorySlug.replace(/-/g, ' ')}
        </p>
      )}

      {/* SEARCH RESULTS */}
      {showSearchBlock && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Search results for &quot;{searchParams.get('q')}&quot;
          </h2>

          <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {searchMatches.map((product) => (
              <ProductCard key={product.id} product={product} className="h-full" />
            ))}
          </div>
        </div>
      )}

      {/* MAIN PRODUCT LIST */}
      {!showSearchBlock && (
        <>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <CircleLoader color="#88013c" size={50} />
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {displayList.map((product) => (
                  <ProductCard key={product.id} product={product} className="h-full" />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={!hasPrev}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasNext}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </>
      )}

      {/* ALL PRODUCTS AFTER SEARCH */}
      {showSearchBlock && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            All products
          </h2>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <CircleLoader color="#88013c" size={50} />
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} className="h-full" />
                ))}
              </div>

              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={!hasPrev}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasNext}
                  className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Products;
