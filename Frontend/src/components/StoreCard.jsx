import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { submitRating, updateRating } from "../slices/StoreSlice";

const StoreCard = ({ store }) => {
    const dispatch = useDispatch();
    const [hover, setHover] = useState(null);
    const [rating, setRating] = useState(store.userRating || 0);

    useEffect(() => {
        setRating(store.userRating || 0);
    }, [store.userRating]);

    const handleSubmit = () => {
        if (!rating) {
            alert("Please select a rating before submitting!");
            return;
        }
        if (store.userRating) {
            dispatch(updateRating({ storeId: store.id, rating: rating }));
        } else {
            dispatch(submitRating({ storeId: store.id, rating: rating }));
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{store.address}</p>

                <div className="flex items-center mb-2">
                    <span className="text-gray-600 font-medium mr-2">Overall Rating:</span>
                    <span className="text-lg font-bold text-black">
                        {store.averageRating} / 5
                    </span>
                </div>

                <div className="flex items-center mb-4">
                    <span className="text-gray-600 font-medium mr-2">Your Rating:</span>
                    <span className="text-lg font-bold text-black">
                        {store.userRating ? `${store.userRating} / 5` : "N/A"}
                    </span>
                </div>
            </div>

            <div className="mt-4">
                <div className="flex items-center gap-1 justify-center mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            size={28}
                            className={`cursor-pointer transition-colors ${(hover || rating) >= star
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                                }`}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(null)}
                            onClick={() => setRating(star)}
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-800 transition-colors"
                >
                    {store.userRating ? "Modify Rating" : "Submit Rating"}
                </button>
            </div>
        </div>
    );
};

export default StoreCard;