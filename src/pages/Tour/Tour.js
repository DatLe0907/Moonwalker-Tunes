import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Tour.css";

const tourId = [
  { 
    name: "Bad World Tour", 
    id: "9shByOh8fVE",
    timestamps: [
      { time: 190, label: "Wanna Be Startin' Somethin'" },
      { time: 502, label: "This Place Hotel (aka Heartbreak Hotel)" },
      { time: 799, label: "Another Part of Me" },
      { time: 1047, label: "I Just Can't Stop Loving You" },
      { time: 1345, label: "She's Out of My Life" },
      { time: 1577, label: "The Jackson 5 Medley: I Want You Back / The Love You Save / I'll Be There" },
      { time: 2020, label: "Rock With You" },
      { time: 2278, label: "Human Nature" },
      { time: 2590, label: "Smooth Criminal" },
      { time: 3006, label: "Dirty Diana" },
      { time: 3410, label: "Thriller" },
      { time: 4530, label: "Workin' Day and Night" },
      { time: 5005, label: "Beat It" },
      { time: 5411, label: "Billie Jean" },
      { time: 5950, label: "Bad" },
      { time: 6545, label: "Man in the Mirror" },
      { time: 7100, label: "The Way You Make Me Feel" },
      { time: 7480, label: "I Just Can't Stop Loving You" },
      { time: 7710, label: "Bad" },
    ],
  },
  { 
    name: "Dangerous World Tour", 
    id: "Hxgo-Qu-ZZE",
    timestamps: [
      { time: 140, label: "Jam" },
      { time: 535, label: "Wanna Be Startin' Somethin'" },
      { time: 915, label: "Human Nature" },
      { time: 1285, label: "Smooth Criminal" },
      { time: 1600, label: "I Just Can't Stop Loving You" },
      { time: 2015, label: "She's Out Of My Life" },
      { time: 2320, label: "I Want You Back" },
      { time: 2451, label: "The Love You Save - I'll Be There" },
      { time: 2760, label: "Thriller" },
      { time: 3095, label: "Billie Jean" },
      { time: 3790, label: "Workin' Day and Night" },
      { time: 4390, label: "Beat It" },
      { time: 5030, label: "Will You Be There" },
      { time: 5420, label: "Black Or White" },
      { time: 5820, label: "Heal The World" },
      { time: 6380, label: "Man In The Mirror" }
    ],
    
  },
  { 
    name: "HIStory World Tour", 
    id: "SDDC-QdOR14",
    timestamps: [
      { time: 266, label: "Scream" },
      { time: 504, label: "They Don't Care About Us" },
      { time: 736, label: "In The Closet" },
      { time: 837, label: "Wanna Be Startin' Somethin'" },
      { time: 1222, label: "Stranger In Moscow" },
      { time: 1568, label: "Smooth Criminal" },
      { time: 1962, label: "You Are Not Alone" },
      { time: 2322, label: "Jacksons 5 medley" },
      { time: 3087, label: "Billie Jean" },
      { time: 3606, label: "Thriller" },
      { time: 4004, label: "Beat It" },
      { time: 4521, label: "Blood On The Dance Floor" },
      { time: 4788, label: "Dangerous" },
      { time: 5140, label: "Black Or White" },
      { time: 5207, label: "Earth Song" },
      { time: 6200, label: "Heal The World" },
      { time: 6924, label: "History" },
    ]
  }
];

const Tour = () => {
  const [tickets, setTickets] = useState({});
  const [selectedConcert, setSelectedConcert] = useState(null);
  const [videoId, setVideoId] = useState("");
  const [timestamps, setTimestamps] = useState([]);
  const navigate = useNavigate();
  const iframeRef = useRef(null); // Ref cho iframe

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
      if (foundTour) {
        setVideoId(foundTour.id);
        setTimestamps(foundTour.timestamps || []);
      }
    }
  };

  // 🛠 Chuyển video đến timestamp mà không reload iframe
  const goToTimestamp = (time) => {
    if (iframeRef.current) {
      iframeRef.current.src = `https://www.youtube.com/embed/${videoId}?start=${time}&autoplay=1&enablejsapi=1`;
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
          <h2 className="title dashboard-title">Tickets</h2>
          {Object.keys(tickets).length === 0 ? (
            <p className="no-tickets">
              You haven't booked any tickets yet.<br />
              Remember to book your tickets{" "}
              <span className="link" style={{ textDecorationLine: "underline", cursor: "pointer", color: "#ff9800" }} onClick={goToBookTickets}>
                here
              </span>.
            </p>
          ) : (
            <ul className="ticket-list">
              {Object.entries(tickets).map(([concert, count]) => (
                <li key={concert} className="ticket-item">
                  <h3>{concert}</h3>
                  <p>Tickets: {count}</p>
                  <button className="btn enter-btn" onClick={() => enterConcert(concert)} disabled={count === 0}>
                    {count > 0 ? "Watch Concert" : "No Tickets"}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <div className="concert-view">
          <div className="concert-heading">
            <button className="btn back-btn" onClick={() => setSelectedConcert(null)}>⬅ Back</button>
            <h2 className="concert-title">Now Playing: {selectedConcert} 🎤</h2>
          </div>
          <div className="concert-controller">
            <div className="concert-video">
              {videoId ? (
                <div className="video-container">
                  <iframe
                    ref={iframeRef} // Gán ref cho iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&enablejsapi=1`}
                    title="Concert Video"
                    frameBorder="0"
                    width="800"
                    height="450"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <p className="error-text">🎵 No video available for this concert.</p>
              )}
            </div>

            {/* Hiển thị timestamp mặc định */}
            <div className="timestamps-section">
              <h3>Timestamp</h3>
              {timestamps.length > 0 ? (
                <ul className="timestamp-list">
                  {timestamps.map(({ time, label }, index) => (
                    <li key={index} className="timestamp-item">
                      <button className="timestamp-btn" onClick={() => goToTimestamp(time)}>
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Không có timestamp nào cho concert này.</p>
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
};

export default Tour;
