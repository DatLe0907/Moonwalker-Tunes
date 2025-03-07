import React, { useState, useEffect, useRef } from "react";
import "./Event.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import icon marker
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Tạo icon marker tùy chỉnh
const customMarker = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const events = [
  { id: 1, title: "MJ New Year Celebration", date: "2025-01-01", location: "London, UK", image: "newyear.jpg", coords: [51.5074, -0.1278] },
  { id: 2, title: "Michael Jackson Tribute Concert", date: "2025-02-25", location: "Los Angeles, CA", image: "tribute-concert.jpg", coords: [34.0522, -118.2437] },
  { id: 3, title: "MJ Fan Meetup", date: "2025-03-15", location: "New York, NY", image: "fan-meetup.jpg", coords: [40.7128, -74.0060] },
  { id: 4, title: "Smooth Criminal Dance Contest", date: "2025-04-20", location: "Paris, France", image: "smooth-criminal.jpg", coords: [48.8566, 2.3522] },
  { id: 5, title: "Beat It Flash Mob", date: "2025-05-10", location: "Tokyo, Japan", image: "beat-it.jpg", coords: [35.682839, 139.759455] },
  { id: 6, title: "Michael Jackson Birthday Celebration", date: "2025-08-29", location: "Gary, IN", image: "birthday.jpg", coords: [41.5934, -87.3464] },
  { id: 7, title: "Thriller Night – Halloween Party", date: "2025-10-31", location: "Las Vegas, NV", image: "thriller-night.png", coords: [36.1699, -115.1398] },
  { id: 8, title: "Remember the King Anniversary", date: "2025-06-25", location: "Los Angeles, CA", image: "remember-the-king.jpg", coords: [34.0522, -118.2437] },
  { id: 9, title: "This Is It Movie Screening", date: "2025-11-15", location: "Berlin, Germany", image: "this-is-it.jpg", coords: [52.5200, 13.4050] },
  { id: 10, title: "Heal the World Charity Concert", date: "2025-12-20", location: "Sydney, Australia", image: "heal-the-world.png", coords: [-33.8688, 151.2093] },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;
};

// Cập nhật bản đồ khi chọn sự kiện mới
const MapUpdater = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(coords, 13, { animate: true });
  }, [coords, map]);
  return null;
};

const Event = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const today = new Date();
    const currentMonthYear = today.toISOString().slice(0, 7); // "YYYY-MM"
  
    const filteredEvents = events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4)
      .map(event => ({
        ...event,
        isThisMonth: new Date(event.date).toISOString().slice(0, 7) === currentMonthYear
      }));
  
    setUpcomingEvents(filteredEvents);
  }, []);
  

  const handleEventClick = (event) => {
    setSelectedEvent(prev => (prev?.id === event.id ? null : event));
  };

  // Đóng popup khi click ra ngoài
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSelectedEvent(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="event-section">
      <h2 className="section-title title">🎤 Events</h2>
      <div className="event-list">
        {upcomingEvents.map((event) => (
          <div 
            key={event.id} 
            className={`event-card ${selectedEvent?.id === event.id ? "active" : ""}`}
            onClick={() => handleEventClick(event)}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/photo/event/${event.image}`} alt={event.title} className="event-image" />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>📅 {formatDate(event.date)}</p>
              <p><FontAwesomeIcon icon={faLocationDot} /> {event.location}</p>
              <p className={event.isThisMonth ? "event-highlight" : ""}>
              {event.isThisMonth ? "🔥 Happening this month!" : "🕒 Coming soon..."}
  </p>
            </div>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div className="map-popup" ref={popupRef}>
          <MapContainer center={selectedEvent.coords} zoom={13} style={{ height: "250px", width: "100%", maxWidth: "350px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapUpdater coords={selectedEvent.coords} />
            <Marker position={selectedEvent.coords} icon={customMarker}>
              <Popup>{selectedEvent.title}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default Event;
