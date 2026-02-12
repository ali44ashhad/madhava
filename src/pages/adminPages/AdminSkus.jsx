import React, { useMemo, useState } from 'react';
import { createSku } from './adminApi';

const AdminSkus = () => {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [skuSearch, setSkuSearch] = useState('');
  const [createdSkus, setCreatedSkus] = useState([]);

  const [formData, setFormData] = useState({
    skuCode: '',
    productId: '',
    size: '',
    weight: '',
    material: '',
    color: '',
    mrp: '',
    sellingPrice: '',
    festivePrice: '',
    gstPercent: '',
    stockQuantity: '',
    isCodAllowed: false,
    countryOfOrigin: '',
    manufacturerName: '',
    manufacturerAddress: '',
    sellerName: '',
    sellerAddress: '',
    sellerPincode: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const num = (v) => (v === '' ? undefined : Number(v));
    if (
      !formData.skuCode?.trim() ||
      !formData.productId ||
      !formData.mrp ||
      !formData.sellingPrice ||
      formData.gstPercent === '' ||
      formData.stockQuantity === '' ||
      !formData.countryOfOrigin?.trim() ||
      !formData.manufacturerName?.trim() ||
      !formData.manufacturerAddress?.trim() ||
      !formData.sellerName?.trim() ||
      !formData.sellerAddress?.trim() ||
      !formData.sellerPincode?.trim()
    ) {
      setError(
        'Please fill all required fields (SKU code, product ID, MRP, selling price, GST %, stock, origin, manufacturer, seller).'
      );
      return;
    }
    setCreateLoading(true);
    try {
      const payload = {
        skuCode: formData.skuCode.trim(),
        productId: formData.productId.trim(),
        size: formData.size?.trim() || undefined,
        weight: formData.weight?.trim() || undefined,
        material: formData.material?.trim() || undefined,
        color: formData.color?.trim() || undefined,
        mrp: num(formData.mrp),
        sellingPrice: num(formData.sellingPrice),
        festivePrice: formData.festivePrice ? num(formData.festivePrice) : undefined,
        gstPercent: num(formData.gstPercent),
        stockQuantity: Number(formData.stockQuantity),
        isCodAllowed: formData.isCodAllowed,
        countryOfOrigin: formData.countryOfOrigin.trim(),
        manufacturerName: formData.manufacturerName.trim(),
        manufacturerAddress: formData.manufacturerAddress.trim(),
        sellerName: formData.sellerName.trim(),
        sellerAddress: formData.sellerAddress.trim(),
        sellerPincode: formData.sellerPincode.trim(),
      };
      const created = await createSku(payload);
      setSuccess('SKU created successfully.');
      setCreatedSkus((prev) => {
        const next = [
          {
            id: created?.id || created?._id || `${payload.skuCode}-${Date.now()}`,
            ...(typeof created === 'object' && created ? created : {}),
            ...payload,
            createdAt: new Date().toISOString(),
          },
          ...prev,
        ];
        return next;
      });
      setFormData({
        skuCode: '',
        productId: '',
        size: '',
        weight: '',
        material: '',
        color: '',
        mrp: '',
        sellingPrice: '',
        festivePrice: '',
        gstPercent: '',
        stockQuantity: '',
        isCodAllowed: false,
        countryOfOrigin: '',
        manufacturerName: '',
        manufacturerAddress: '',
        sellerName: '',
        sellerAddress: '',
        sellerPincode: '',
      });
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to create SKU');
    } finally {
      setCreateLoading(false);
    }
  };

  const filteredSkus = useMemo(() => {
    const q = skuSearch.trim().toLowerCase();
    if (!q) return createdSkus;
    return createdSkus.filter((sku) => {
      const haystack = [
        sku?.skuCode,
        sku?.productId,
        sku?.size,
        sku?.weight,
        sku?.material,
        sku?.color,
        sku?.countryOfOrigin,
        sku?.manufacturerName,
        sku?.sellerName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [createdSkus, skuSearch]);

  return (
    <div className="max-w-6xl space-y-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">SKU Management</h1>
        <div className="w-full sm:w-72">
          <input
            type="text"
            value={skuSearch}
            onChange={(e) => setSkuSearch(e.target.value)}
            placeholder="Search SKUs (code, color, product id...)"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
          />
        </div>
      </div>

      {error && (
        <div className="p-3 text-sm bg-red-50 text-red-700 border border-red-200 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="p-3 text-sm bg-green-50 text-green-700 border border-green-200 rounded-lg">
          {success}
        </div>
      )}

      {/* Create SKU FORM (on top) */}
      <div className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Create SKU</h2>
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SKU Code *</label>
              <input
                type="text"
                name="skuCode"
                value={formData.skuCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product ID (UUID) *
              </label>
              <input
                type="text"
                name="productId"
                value={formData.productId}
                onChange={handleChange}
                placeholder="UUID"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
              <input
                type="text"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRP *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="mrp"
                value={formData.mrp}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Selling Price *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Festive Price
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                name="festivePrice"
                value={formData.festivePrice}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST % *</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                name="gstPercent"
                value={formData.gstPercent}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Stock Quantity *
              </label>
              <input
                type="number"
                min="0"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                id="isCodAllowed"
                name="isCodAllowed"
                checked={formData.isCodAllowed}
                onChange={handleChange}
                className="rounded border-gray-300 focus:ring-gray-900"
              />
              <label htmlFor="isCodAllowed" className="text-sm font-medium text-gray-700">
                COD Allowed
              </label>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country of Origin *
              </label>
              <input
                type="text"
                name="countryOfOrigin"
                value={formData.countryOfOrigin}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer Name *
              </label>
              <input
                type="text"
                name="manufacturerName"
                value={formData.manufacturerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Manufacturer Address *
              </label>
              <input
                type="text"
                name="manufacturerAddress"
                value={formData.manufacturerAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Name *
              </label>
              <input
                type="text"
                name="sellerName"
                value={formData.sellerName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Address *
              </label>
              <input
                type="text"
                name="sellerAddress"
                value={formData.sellerAddress}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Seller Pincode *
              </label>
              <input
                type="text"
                name="sellerPincode"
                value={formData.sellerPincode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={createLoading}
            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
          >
            {createLoading ? 'Creating...' : 'Create SKU'}
          </button>
        </form>
      </div>

      {/* SKU cards – shown only after at least one SKU is added, below form */}
      {createdSkus.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold">SKUs</h2>
            <div className="text-sm text-gray-500">
              {filteredSkus.length} result{filteredSkus.length === 1 ? '' : 's'}
            </div>
          </div>
          <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkus.map((sku) => (
              <div
                key={sku.id}
                className="rounded-xl border border-gray-200 p-4 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-500">SKU Code</div>
                    <div className="font-semibold text-gray-900 break-all">
                      {sku.skuCode || '-'}
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">
                    {sku.isCodAllowed ? 'COD' : 'No COD'}
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div className="text-gray-500">Product</div>
                  <div className="text-gray-900 break-all">{sku.productId || '-'}</div>
                  <div className="text-gray-500">Color</div>
                  <div className="text-gray-900">{sku.color || '-'}</div>
                  <div className="text-gray-500">Material</div>
                  <div className="text-gray-900">{sku.material || '-'}</div>
                  <div className="text-gray-500">Price</div>
                  <div className="text-gray-900">
                    {sku.sellingPrice ?? '-'} <span className="text-gray-500">/</span>{' '}
                    {sku.mrp ?? '-'}
                  </div>
                </div>
                <div className="mt-3 text-xs text-gray-500">
                  {sku.createdAt ? `Created: ${new Date(sku.createdAt).toLocaleString()}` : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSkus;