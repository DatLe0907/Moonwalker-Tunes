import React, { useState, useEffect } from "react";
import { useGame } from "../../context/PointsContext"; // Import hệ thống điểm
import emailjs from "emailjs-com";
import { useToast } from "../../context/ToastContext"; // Import useToast
import "./Ticket.css";

const TICKET_COST = 10; // Giá mỗi vé theo điểm
const places = [
  {
    name: "Bad World Tour",
    date: "1987–1989",
    description: "Michael Jackson’s first solo world tour, promoting 'Bad'. He set a record by performing 7 consecutive sold-out shows at Wembley Stadium, London, with a total audience of over 504,000.",
    image: `${process.env.PUBLIC_URL}/assets/photo/tour/BadWT.jpg`,
  },
  {
    name: "Dangerous World Tour",
    date: "1992–1993",
    description: "One of MJ’s most iconic tours, featuring the legendary Smooth Criminal lean. The entire tour's profits were donated to the 'Heal the World Foundation'.",
    image: `${process.env.PUBLIC_URL}/assets/photo/tour/DangerousWT.png`,
  },
  {
    name: "HIStory World Tour",
    date: "1996–1997",
    description: "Michael Jackson’s biggest tour in terms of audience, with over 4.5 million attendees worldwide. Included first-time performances in India, Tunisia, and South Africa.",
    image: `${process.env.PUBLIC_URL}/assets/photo/tour/HistoryWT.jpg`,
  },
];

const sendEmail = (userEmail, userName, ticketDetails, addToast) => {
  const templateParams = {
    to_email: userEmail,
    user_name: userName,
    ticket_details: ticketDetails,
  };

  emailjs
    .send("service_53k4vm8", "template_6case9c", templateParams, "jqG_abfd3LpwlEKqT")
    .then((response) => {
      console.log("Email sent successfully!", response.status, response.text);
      addToast("Email sent successfully!", "success");	
    })
    .catch((err) => {
      console.error("Failed to send email:", err);
      addToast("Failed to send email.", "error");
    });
};

const TourSection = () => {
  const { points, addPoints } = useGame(); // Lấy điểm từ context
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", tickets: 1 });
  const [confirmation, setConfirmation] = useState(null);
  const [savedBookings, setSavedBookings] = useState([]);

  const { addToast } = useToast(); // Lấy hàm addToast từ context
  useEffect(() => {
    const bookings = JSON.parse(localStorage.getItem("userBookings")) || [];
    setSavedBookings(bookings);
  }, []);

  const openModal = (tour) => {
    setSelectedTour(tour);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", email: "", tickets: 1 });
    setConfirmation(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalCost = formData.tickets * TICKET_COST;
  
    if (points < totalCost) {
      addToast("Not enough points to buy these tickets!", "error");
      return;
    }
  
    // Kiểm tra xem đã đặt vé cho tour này chưa
    const existingBookingIndex = savedBookings.findIndex((b) => b.tour === selectedTour.name);
  
    let updatedBookings = [...savedBookings];
  
    if (existingBookingIndex !== -1) {
      // Nếu đã đặt vé trước đó, cộng dồn số vé mới
      updatedBookings[existingBookingIndex].tickets += parseInt(formData.tickets, 10);
    } else {
      // Nếu chưa có, thêm mới
      updatedBookings.push({ tickets: formData.tickets, tour: selectedTour.name });
    }
  
    setSavedBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));
  
    // Trừ điểm sau khi mua vé
    addPoints(-totalCost);
  
    // Gửi email xác nhận vé
    const ticketDetails = `Concert: ${selectedTour.name}\nTickets: ${formData.tickets}\nTotal tickets: ${
      updatedBookings.find((b) => b.tour === selectedTour.name)?.tickets
    }\nThank you for booking!`;
  
    sendEmail(formData.email, formData.name, ticketDetails, addToast);
  
    setConfirmation(`Thank you, ${formData.name}! You now have ${updatedBookings.find((b) => b.tour === selectedTour.name)?.tickets} ticket(s) for ${selectedTour.name}.`);
  };

  return (
    <div id="ticket" className="tour tour-section row">
      
      <div className="content-section">
        <h2 className="section-heading white-text title">TOUR DATES</h2>
        <p className="section-sub-heading white-text">
          Remember to book your tickets! (Your Points: {points})
        </p>

        <ul className="places-list">
          {places.map((place, index) => (
            <li key={index} className="place">
              <div className="place-body">
                <h3 className="place-heading">{place.name}</h3>
                <p className="place-time">{place.date}</p>
                <p className="place-dcr">{place.description}</p>
                <button className="btn js-buy-ticket pd14" onClick={() => openModal(place)}>
                  Buy Tickets
                </button>
              </div>
              <img src={place.image} alt={place.name} className="place-img" />
            </li>
          ))}
        </ul>

        {modalOpen && (
          <div className="tour-modal">
            <div className="modal-content">
              <button className="btn close-button" onClick={closeModal}>
                &times;
              </button>
              <h2 className="modal-heading">Buy Tickets for {selectedTour.name}</h2>
              {confirmation ? (
                <p className="confirmation-message">{confirmation}</p>
              ) : (
                <form onSubmit={handleSubmit} className="modal-form">
                  <div className="form-group">
                    <label className="form-label" htmlFor="name">
                      Name
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="email">
                      Email
                    </label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="tickets">
                      Tickets
                    </label>
                    <input type="number" id="tickets" name="tickets" value={formData.tickets} onChange={handleChange} required min="1" />
                  </div>
                  <p>Each ticket costs {TICKET_COST} tokens. Your current tokens: {points}</p>
                  <button type="submit" className="btn buy-btn">
                    Buy
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TourSection;
