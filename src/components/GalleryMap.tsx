import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // ✅ Import Leaflet styles

const GalleryMap = ({ latitude, longitude, name }: { latitude: number; longitude: number; name: string }) => {

  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
      <h2 className="font-bold text-xl mb-3">Location</h2>
      <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
        <MapContainer
          center={[latitude, longitude]}
          zoom={13}
          style={{ width: '100%', height: '100%' }} // ✅ Explicit height and width
          scrollWheelZoom={false}
        >

          {/* TileLayer for the base map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Marker for the gallery location */}
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{name}</strong>
              <br />
              Latitude: {latitude}
              <br />
              Longitude: {longitude}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GalleryMap;
