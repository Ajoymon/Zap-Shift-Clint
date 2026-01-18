import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { useState } from 'react';

function MapController({ targetCoords }) {
  const map = useMap();

  if (targetCoords) {
    map.flyTo(targetCoords, 14);
  }

  return null;
}

const Coverage = () => {
  const position = [22.8456, 89.5403];
  const serviceCenters = useLoaderData();
  const [targetCoords, setTargetCoords] = useState(null);

  const handleSearch = e => {
    e.preventDefault();
    const location = e.target.location.value.trim();

    if (!location) return;

    const district = serviceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );

    if (district) {
      const coords = [district.latitude, district.longitude];
      setTargetCoords(coords);
    } else {
      alert('District not found!');
    }
  };

  return (
    <div>
      <h2 className="text-5xl">We are available in 64 districts</h2>
      <div className="my-4">
        <form onSubmit={handleSearch}>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="search"
              className="grow"
              placeholder="Search district..."
              name="location" // Fix typo
            />
            <button type="submit" className="btn btn-primary">
              Search
            </button>
          </label>
        </form>
      </div>

      <div className="border w-full h-[800px] my-10">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={false}
          className="h-[800px]"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Add this to fly to searched location */}
          <MapController targetCoords={targetCoords} />

          {serviceCenters.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong>
                <br />
                Service Area: {center.covered_area?.join(', ') || 'N/A'}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
