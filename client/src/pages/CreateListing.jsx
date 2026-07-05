export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create a Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            id="name"
            placeholder="Name"
            maxLength={62}
            minLength={10}
            required
            className="border p-3 rounded-lg focus:outline-none"
          />

          {/* Description */}
          <textarea
            id="description"
            placeholder="Description"
            required
            rows={4}
            className="border p-3 rounded-lg focus:outline-none resize-none"
          />

          {/* Address */}
          <input
            type="text"
            id="address"
            placeholder="Address"
            required
            className="border p-3 rounded-lg focus:outline-none"
          />

          {/* ── Type toggle ── */}
          <div className="flex gap-6 flex-wrap">
            <span className="font-semibold">Type:</span>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="sell"
                  className="w-5 h-5 accent-slate-700"
                />
                <span>Sell</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  id="rent"
                  className="w-5 h-5 accent-slate-700"
                />
                <span>Rent</span>
              </label>
            </div>
          </div>

          {/* ── Amenities ── */}
          <div className="flex gap-6 flex-wrap">
            <span className="font-semibold">Amenities:</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="parking"
                className="w-5 h-5 accent-slate-700"
              />
              <span>Parking Spot</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 h-5 accent-slate-700"
              />
              <span>Furnished</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                id="offer"
                className="w-5 h-5 accent-slate-700"
              />
              <span>Offer</span>
            </label>
          </div>

          {/* ── Numbers ── */}
          <div className="flex flex-wrap gap-6">
            {/* Bedrooms */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                defaultValue={1}
                className="border p-3 rounded-lg focus:outline-none w-20 text-center"
              />
              <span className="font-semibold text-sm">Beds</span>
            </div>

            {/* Bathrooms */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                defaultValue={1}
                className="border p-3 rounded-lg focus:outline-none w-20 text-center"
              />
              <span className="font-semibold text-sm">Baths</span>
            </div>

            {/* Regular Price */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={50}
                required
                className="border p-3 rounded-lg focus:outline-none w-32 text-center"
              />
              <div className="flex flex-col text-center">
                <span className="font-semibold text-sm">Regular price</span>
                <span className="text-xs text-slate-500">($ / month)</span>
              </div>
            </div>

            {/* Discounted Price */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min={0}
                className="border p-3 rounded-lg focus:outline-none w-32 text-center"
              />
              <div className="flex flex-col text-center">
                <span className="font-semibold text-sm">Discounted price</span>
                <span className="text-xs text-slate-500">($ / month)</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN ─── */}
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal text-slate-600 ml-2">
              The first image will be the cover (max 6)
            </span>
          </p>

          {/* File input row */}
          <div className="flex gap-4">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="border border-slate-300 rounded p-3 w-full cursor-pointer"
            />
            <button
              type="button"
              className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80 transition-shadow"
            >
              Upload
            </button>
          </div>

          {/* Image preview placeholder */}
          <p className="text-slate-400 text-sm">No images uploaded yet.</p>

          {/* Submit */}
          <button
            type="submit"
            className="p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 transition-opacity mt-4"
          >
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
}
