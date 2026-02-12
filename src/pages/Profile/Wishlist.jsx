import { useWishlist } from '../../context/WishlistContext';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0) {
    return <p className="text-gray-500">No items in wishlist</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Wishlist</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {wishlist.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg">
            <h4 className="font-bold">{item.name}</h4>
            <button
              onClick={() => removeFromWishlist(item.id)}
              className="text-red-600 mt-2"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
