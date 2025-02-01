import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess, handleError } from "../utils.ts";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState(``);
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess(`User logged out successfully`);
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  async function fetchProducts() {
    try {
      const url = "https://auth-frontend-project.vercel.app/products/get";
      const token = localStorage.getItem("token");
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (result) {
        setProducts(result.data);
        console.log(products);
      }
    } catch {
      handleError(`Error fetching product`);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>{loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <ToastContainer />
      <div>
        <ul>
          {products && products.length > 0
            ? products.map((singleProduct:any, index) => {
                return (
                  <div>
                    <li key={index}>
                      {singleProduct.name} : ${singleProduct.price}
                    </li>
                  </div>
                );
              })
            : null}
        </ul>
      </div>
    </div>
  );
}

export default Home;
