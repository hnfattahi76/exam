import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

type AppErrorType = "NETWORK" | "TIMEOUT" | "ABORTED" | "HTTP" | "VALIDATION" | "UNKNOWN";

type AppError = {
  type: AppErrorType;
  message: string;
  status?: number;
  details?: unknown;
};

function toAppError(err: unknown): AppError {
  // Abort
  if (err instanceof Error && (err.name === "CanceledError" || err.name === "AbortError")) {
    return { type: "ABORTED", message: "Request aborted" };
  }

  if (axios.isAxiosError(err)) {
    const e = err as AxiosError<any>;

    // Timeout
    if (e.code === "ECONNABORTED") {
      return { type: "TIMEOUT", message: "Request timeout" };
    }

    // Network
    if (!e.response) {
      return { type: "NETWORK", message: "Network error", details: e.message };
    }

    const status = e.response.status;
    const data = e.response.data;

    return {
      type: status === 400 ? "VALIDATION" : "HTTP",
      status,
      message: data?.error || data?.message || `Request failed (${status})`,
      details: data,
    };
  }

  if (err instanceof Error) {
    return { type: "UNKNOWN", message: err.message || "Unknown error" };
  }

  return { type: "UNKNOWN", message: "Unknown error", details: err };
}

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
  timeout: 10000,
});
api.interceptors.response.use(
  (res) => res,
  (err) => {
    throw toAppError(err);
  }
);

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AppError | null>(null);

  function addProduct() {
    const payload = {
      id: 121221212,
      title: "asghar",
      price: 0.1,
      description: "string",
      category: "string",
      image: "http://example.com",
    };
    setError(null);
    setIsLoading(true);
    api
      .post<Product>("/products",payload)
      .then((res) => {
        setProducts([...products,res.data])
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function getProducts() {
    const controller = new AbortController();
    (async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await api.get<Product[]>("/products", {
          signal: controller.signal,
        });
        setProducts(res.data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setError(error as AppError);
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
  if (error) return <div>{error.message}</div>;
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
