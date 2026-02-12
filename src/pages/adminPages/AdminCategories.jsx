import React, { useState, useEffect } from 'react';
import { listCategories, createCategory } from './adminApi';

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', imageUrl: '' });

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await listCategories();
      setCategories(Array.isArray(data) ? data : []);
      console.log("categories", data);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to load categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

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
    setSubmitLoading(true);
    try {
      await createCategory({
        name: formData.name.trim(),
        imageUrl: formData.imageUrl?.trim() || undefined,
      });
      setFormData({ name: '', imageUrl: '' });
      setShowForm(false);
      await fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create category');
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
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
          <h2 className="text-lg font-semibold mb-4">Add Category</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Category name"
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

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No categories yet. Create one above.</div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((cat) => (
              <li key={cat.id} className="px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {cat.imageUrl && (
                    <img src={cat.imageUrl} alt="" className="w-12 h-12 object-cover rounded-lg" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{cat.name}</p>
                    {cat.slug && <p className="text-sm text-gray-500">{cat.slug}</p>}
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${cat.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}
                >
                  {cat.isActive ? 'Active' : 'Inactive'}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminCategories;
