import { useEffect, useState } from "react";
import axios from "axios";

const useProductFetch = ({ cat, id }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFilters = async () => {
    const url = cat
      ? `https://fakestoreapi.com/products/category/${cat}`
      : id
      ? `https://fakestoreapi.com/products/${id}`
      : `https://fakestoreapi.com/products`;
    try {
      const res = await axios.get(url);
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilters();
  }, [cat]);

  return { products, loading };
};

export default useProductFetch;
