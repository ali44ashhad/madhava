import React, { useState, useEffect } from 'react';
import { listCategories, listSubcategories, createSubcategory } from './adminApi';

const AdminSubcategories = () => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [formData, setFormData] = useState({ name: '', categoryId: '', imageUrl: '' });

  const fetchCategories = async () => {
    try {
      const data = await listCategories();
      setCategories(Array.isArray(data) ? data : []);
    } catch {
      setCategories([]);
    }
  };

  const fetchSubcategories = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listSubcategories(categoryFilter || undefined);
      console.log("subcategories", data);
      setSubcategories(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load subcategories');
      setSubcategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchSubcategories();
  }, [categoryFilter]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!formData.name?.trim()) {
      setError('Name is required');
      return;
    }
    if (!formData.categoryId) {
      setError('Please select a category');
      return;
    }
    setSubmitLoading(true);
    try {
      await createSubcategory({
        name: formData.name.trim(),
        categoryId: formData.categoryId,
        imageUrl: formData.imageUrl?.trim() || undefined,
      });
      setFormData({ name: '', categoryId: formData.categoryId, imageUrl: '' });
      setShowForm(false);
      await fetchSubcategories();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create subcategory');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Sub Categories</h1>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition"
        >
          {showForm ? 'Cancel' : 'Create New'}
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}

      {showForm && (
        <div className="mb-6 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Add Subcategory</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Subcategory name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (optional)</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
            </div>
            <button
              type="submit"
              disabled={submitLoading}
              className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
            >
              {submitLoading ? 'Adding...' : 'Add'}
            </button>
          </form>
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Filter by category</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
        >
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading subcategories...</div>
        ) : subcategories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No subcategories yet. Create one above.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {subcategories.map((sub) => (
              <li key={sub.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {sub.imageUrl && (
                    <img src={sub.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{sub.name}</p>
                    {sub.slug && <p className="text-sm text-gray-500">{sub.slug}</p>}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminSubcategories;
