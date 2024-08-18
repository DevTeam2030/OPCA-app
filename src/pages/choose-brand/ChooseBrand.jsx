import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./choose-brand.css";
import HeadingText from "../../components/heading/HeadingText";
import BrandHeader from "../../components/header/BrandHeader";
import Btn from "../../components/btn/Btn";

function ChooseBrand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get(
          "https://opca-system.faratcards.com/api/get-companies"
        );
        console.log(response);
        setBrands(response.data.data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleClick = (brand) => {
    navigate("/verify-order", {
      state: {
        name: brand.name,
        color: brand.background_color,
        logo: brand.header_log,
      },
    });
  };

  return (
    <div className="choose-brand-container">
      <BrandHeader />
      <div className="choose-brand-content content">
      <Btn text="go to Restaurants" className="back-btn" type="button" onClick={() => navigate("/show-restaurent")} />
        <HeadingText text="Please choose your brand" />
        {loading ? (
          <div className="loading-spinner text-center">
            <FaSpinner className="spinner-icon" size={22} color="#144798" />
          </div>
        ) : (
          <div className="brands">
            {brands.map((brand) => (
              <div
                key={brand.id}
                onClick={() => handleClick(brand)}
                className="brand-item"
              >
                <img src={brand.logo} alt={brand.name} className="brand-logo" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChooseBrand;
