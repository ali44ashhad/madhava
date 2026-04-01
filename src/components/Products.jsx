import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CircleLoader from "react-spinners/CircleLoader"
import { getStoreProducts } from '../utils/storeApi';
import ProductCard from './ProductCard';

const DEFAULT_LIMIT = 10;
const SORT_OPTIONS = [
  { value: '', label: 'Newest' }, // default behavior when omitted
  { value: 'newest', label: 'Newest' },
  { value: 'priceLow', label: 'Price: low to high' },
  { value: 'priceHigh', label: 'Price: high to low' },
  { value: 'popularity', label: 'Popularity' },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const categorySlug = searchParams.get('categorySlug') || '';
  const subcategorySlug = searchParams.get('subcategorySlug') || '';
  const pageParam = searchParams.get('page');
  const limitParam = searchParams.get('limit');
  const searchQuery = (searchParams.get('q') || '').trim();
  const sortParamRaw = (searchParams.get('sort') || '').trim();
  const allowedSorts = new Set(['newest', 'priceLow', 'priceHigh', 'popularity', 'oldest']);
  const sort = allowedSorts.has(sortParamRaw) ? sortParamRaw : '';

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
  const [searchInput, setSearchInput] = useState(searchQuery);

  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          page,
          limit,
          ...(searchQuery && { q: searchQuery }),
          ...(sort && { sort }),
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
      } catch {
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
  }, [page, limit, categorySlug, subcategorySlug, searchQuery, sort]);
  const showSearchBlock = Boolean(searchQuery);
  const displayList = products;

  const totalPages = pagination.totalPages || 1;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;

  const updateParams = (updater) => {
    const next = new URLSearchParams(searchParams);
    updater(next);
    setSearchParams(next, { replace: true });
  };

  const goToPage = (newPage) => {
    updateParams((next) => {
      next.set('page', String(newPage));
    });
  };

  const onSubmitSearch = (e) => {
    e.preventDefault();
    const nextQ = (searchInput || '').trim();
    updateParams((next) => {
      if (nextQ) next.set('q', nextQ);
      else next.delete('q');
      next.set('page', '1');
    });
  };

  const onClearSearch = () => {
    setSearchInput('');
    updateParams((next) => {
      next.delete('q');
      next.set('page', '1');
    });
  };

  const onChangeSort = (e) => {
    const nextSort = (e.target.value || '').trim();
    updateParams((next) => {
      if (nextSort) next.set('sort', nextSort);
      else next.delete('sort');
      next.set('page', '1');
    });
  };

  return (
    <section className="max-w-[1500px] mx-auto px-4 sm:px-6 py-8">
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

      {/* FILTERS */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <form onSubmit={onSubmitSearch} className="w-full sm:max-w-xl">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="flex gap-2">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#88013c]/20 focus:border-[#88013c]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#88013c] text-white text-sm font-medium hover:opacity-95"
            >
              Search
            </button>
            <button
              type="button"
              onClick={onClearSearch}
              disabled={!searchQuery}
              className="px-3 py-2 rounded-lg border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Clear
            </button>
          </div>
        </form>

        <div className="w-full sm:w-auto">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <select
            value={sort}
            onChange={onChangeSort}
            className="w-full sm:w-64 rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white hover:bg-gray-50"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value || 'default'} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* SEARCH RESULTS */}
      {showSearchBlock && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Search results for &quot;{searchParams.get('q')}&quot;
          </h2>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <CircleLoader color="#88013c" size={50} />
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {displayList.map((product) => (
            <ProductCard key={product.id} product={product} className="h-full" />
          ))}
        </div>
      )}

      {/* PAGINATION (applies to both normal and search) */}
      {(error || loading) ? null : (
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
      )}
    </section>
  );
};

export default Products;
