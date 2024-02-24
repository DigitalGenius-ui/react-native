import { useEffect, useState } from "react";
import axios from "axios";

const useFilterFetch = () => {
  const [categories, setCategories] = useState([]);
  const fetchFilters = async () => {
    try {
      const res = await axios.get(
        "https://fakestoreapi.com/products/categories"
      );
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, []);

  return { categories };
};

export default useFilterFetch;
