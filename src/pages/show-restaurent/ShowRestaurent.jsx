import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { FiCheckCircle, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./show-restaurent.css";
import HeadingText from "../../components/heading/HeadingText";
import BrandHeader from "../../components/header/BrandHeader";
import Btn from "../../components/btn/Btn";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShowRestaurent() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.get(
          "https://opca-system.faratcards.com/api/get-restaurants"
        );
        setRestaurants(response.data.data);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    const storedBranch = localStorage.getItem("selectedBranch");
    console.log("Stored Branch Data:", storedBranch); // Debugging
    if (storedBranch) {
      setSelectedBranch(JSON.parse(storedBranch));
    }
  }, []);

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
    setSelectedBranch(null);
  };
  
  const handleCloseModal = () => {
    setSelectedRestaurant(null);
    setSelectedBranch(null);
    localStorage.removeItem("selectedBranch");
  };

  const handleBranchClick = (branch) => {
    setSelectedBranch(branch);
    localStorage.setItem("selectedBranch", JSON.stringify(branch));
  };

  const handleNextButtonClick = () => {
    if (selectedBranch) {
      navigate("/choose-brand");
    } else {
      toast.error("Please select a branch.");
    }
  };


  return (
    <div className="choose-restaurant-container">
      <BrandHeader />
      <div className="choose-restaurant-content content">
        <HeadingText text="Please choose your favorite restaurant" />
        {loading ? (
          <div className="loading-spinner text-center">
            <FaSpinner className="spinner-icon" size={22} color="#144798" />
          </div>
        ) : (
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                className={`restaurant-item ${
                  selectedRestaurant?.id === restaurant.id ? "selected" : ""
                }`}
              >
                <div className="check-icon-container">
                  <FiCheckCircle
                    className={`check-icon ${
                      selectedRestaurant?.id === restaurant.id ? "active" : ""
                    }`}
                    size={24}
                    onClick={() => handleRestaurantClick(restaurant)}
                  />
                </div>
                <img
                  src={restaurant.logo}
                  alt={restaurant.name}
                  className="restaurant-logo"
                />
                <h3 className="restaurant-name">{restaurant.name}</h3>
              </div>
            ))}
          </div>
        )}
      </div>
      {selectedRestaurant && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-button" onClick={handleCloseModal}>
              <FiX size={24} />
            </button>
            <img
              src={selectedRestaurant.logo}
              alt={selectedRestaurant.name}
              className="modal-image"
            />
            <h2 className="modal-title">{selectedRestaurant.name}</h2>
            {selectedRestaurant.restaurants.length > 0 ? (
              <div className="branches">
                {selectedRestaurant.restaurants.map((branch) => (
                  <div
                    key={branch.id}
                    className={`branch-item ${
                      selectedBranch?.id === branch.id ? "selected" : ""
                    }`}
                    onClick={() => handleBranchClick(branch)}
                  >
                    <h4>{branch.name}</h4>
                    <FiCheckCircle size={24} />
                  </div>
                ))}
              </div>
            ) : (
              <p>No branches available for this restaurant.</p>
            )}
            <div className="flex">
              <Btn text="Next" className="next-btn" type="button" onClick={handleNextButtonClick} />
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default ShowRestaurent;
