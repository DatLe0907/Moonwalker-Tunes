import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Tour.css";

const tourId = [
  { name: "Bad World Tour", id: "9shByOh8fVE" },
  { name: "Dangerous World Tour", id: "Hxgo-Qu-ZZE" },
  { name: "HIStory World Tour", id: "SDDC-QdOR14" },
];

const Tour = () => {
  const [tickets, setTickets] = useState({});
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [videoId, setVideoId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    const ticketMap = savedBookings.reduce((acc, item) => {
      acc[item.tour] = item.tickets;
      return acc;
    }, {});
    setTickets(ticketMap);
  }, []);

  const enterConcert = (concert) => {
    if (tickets[concert] > 0) {
      const updatedTickets = { ...tickets, [concert]: tickets[concert] - 1 };
      if (updatedTickets[concert] === 0) {
        delete updatedTickets[concert];
      }
      setTickets(updatedTickets);
      localStorage.setItem("userBookings", JSON.stringify(Object.entries(updatedTickets).map(([tour, tickets]) => ({ tour, tickets }))));
      setSelectedConcert(concert);
      const foundTour = tourId.find((t) => t.name === concert);
      setVideoId(foundTour ? foundTour.id : "");
    }
  };

  const goToBookTickets = () => {
    navigate("/shop#ticket");
    setTimeout(() => {
      const ticketSection = document.getElementById("ticket");
      if (ticketSection) {
        ticketSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="ticket-dashboard">
      {!selectedConcert ? (
        <>
          <h2 className="dashboard-title">🎟️ Your Concert Tickets 🎶</h2>
          {Object.keys(tickets).length === 0 ? (
            <p className="no-tickets">
              You haven't booked any tickets yet.<br />
              Remember to book your tickets {" "}
                <span className="link" 
                    style={{ textDecorationLine: "underline", cursor: "pointer", color: "blue" }} 
                    onClick={goToBookTickets}>
                 here
                </span>.
            </p>
          ) : (
            <ul className="ticket-list">
              {Object.entries(tickets).map(([concert, count]) => (
                <li key={concert} className="ticket-item">
                  <h3>{concert}</h3>
                  <p>Tickets: {count}</p>
                  <button
                    className="btn enter-btn"
                    onClick={() => enterConcert(concert)}
                    disabled={count === 0}
                  >
                    {count > 0 ? "Watch Concert" : "No Tickets ❌"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="concert-view">
          <button className="btn back-btn" onClick={() => setSelectedConcert(null)}>⬅ Back</button>
          <h2 className="concert-title">Now Playing: {selectedConcert} 🎤</h2>
          <div className="concert-video">
            {videoId ? (
              <div className="video-container">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                  title="Concert Video"
                  frameBorder="0"
                  width="800" height="450"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <p className="error-text">🎵 No video available for this concert.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tour;