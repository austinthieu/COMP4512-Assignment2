import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const GalleryMap = ({ latitude, longitude, name }: { latitude: number; longitude: number, name: string }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-4 h-84 shadow-lg">
      <h2 className="font-bold text-xl mb-3">Location</h2>
      <div className="h-64 bg-gray-700 rounded flex items-center justify-center">
        <MapContainer
          center={[latitude, longitude]} // Set map center using latitude and longitude
          zoom={13}
          style={{ width: '100%', height: '100%' }}
        >
          {/* TileLayer for the base map */}
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* Marker for the gallery location with the default icon */}
          <Marker position={[latitude, longitude]}>
            <Popup>
              <strong>{name}</strong><br />
              Latitude: {latitude}<br />
              Longitude: {longitude}
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default GalleryMap;
