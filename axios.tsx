import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};
const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});

function getErrorMessage(err: unknown): string {
  if (axios.isCancel(err)) return "درخواست لغو شد";

  if (axios.isAxiosError(err)) {
    return err.response?.data?.message || "خطای سرور";
  }

  return "خطای ناشناخته";
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  function addProduct() {
    const payload = {
      id: 121221212,
      title: "asghar",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    };
    setError("");
    setIsLoading(true);
    api
      .post<Product>("/products",payload)
      .then((res) => {
        setProducts([...products,res.data])
      })
      .catch((err) => {
        setError(getErrorMessage(err));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getProducts() {
    const controller = new AbortController();
    (async () => {
      setIsLoading(true);
      setError("");
      try {
        const res = await api.get<Product[]>("/products", {
          signal: controller.signal,
        });
        setProducts(res.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(getErrorMessage(error));
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    })();

    return controller;
  }

  useEffect(() => {
    const controller = getProducts();
    return () => controller.abort();
  }, []);

  if (isLoading) return <div>Loading ...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <button style={{ marginBottom: "30px" }} onClick={addProduct}>
        Add Product
      </button>
      <ul>
        {products.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </>
  );
}
