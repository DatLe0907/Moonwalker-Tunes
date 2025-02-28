import React, { useState, useEffect } from "react";
import "./Event.css"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

const events = [
    { id: 1, title: "MJ New Year Celebration", date: "2025-01-01", location: "London, UK", image: "newyear.jpg" },
    { id: 2, title: "Michael Jackson Tribute Concert", date: "2025-02-25", location: "Los Angeles, CA", image: "tribute-concert.jpg" },
    { id: 3, title: "MJ Fan Meetup", date: "2025-03-15", location: "New York, NY", image: "fan-meetup.jpg" },
    { id: 4, title: "Smooth Criminal Dance Contest", date: "2025-04-20", location: "Paris, France", image: "smooth-criminal.jpg" },
    { id: 5, title: "Beat It Flash Mob", date: "2025-05-10", location: "Tokyo, Japan", image: "beat-it.jpg" },
    { id: 6, title: "Michael Jackson Birthday Celebration", date: "2025-08-29", location: "Gary, IN", image: "birthday.jpg" },
    { id: 7, title: "Thriller Night – Halloween Party", date: "2025-10-31", location: "Las Vegas, NV", image: "thriller-night.png" },
    { id: 8, title: "Remember the King Anniversary", date: "2025-06-25", location: "Los Angeles, CA", image: "remember-the-king.jpg" },
    { id: 9, title: "This Is It Movie Screening", date: "2025-11-15", location: "Berlin, Germany", image: "this-is-it.jpg" },
    { id: 10, title: "Heal the World Charity Concert", date: "2025-12-20", location: "Sydney, Australia", image: "heal-the-world.png" },
];

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0"); 
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Event = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    const filteredEvents = events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 4);

    setUpcomingEvents(filteredEvents.map(event => ({
      ...event,
      isThisMonth: new Date(event.date).getMonth() + 1 === currentMonth &&
                   new Date(event.date).getFullYear() === currentYear
    })));
  }, []);

  return (
    <div className="event-section row">
      <h2 className="section-title title">🎤Events</h2>
      <div className="event-list">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="event-card">
            <img src={`${process.env.PUBLIC_URL}/assets/photo/event/${event.image}`} alt={event.title} className="event-image" />
            <div className="event-info">
              <h3>{event.title}</h3>
              <p>📅 {formatDate(event.date)}</p>
              <p><FontAwesomeIcon icon={faLocationDot} /> {event.location}</p>
              <p className={event.isThisMonth ? "event-highlight" : ""}>
                {event.isThisMonth ? "🔥 Happening this month!" : "Coming soon..."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
