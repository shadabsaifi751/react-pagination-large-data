import logo from "./logo.svg";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Pagination from "./components/pagination";
import Card from "./components/card";

function App() {
  const [isData, setIsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [pageCount, setPageCount] = useState(0);

  async function fetchData() {
    try {
      setIsLoading(true);
      const data = await fetch("https://dummyjson.com/products?limit=1000");
      const response = await data.json();
      console.log(response.products);
      setCategoryData(response.products);
      setIsData(response.products);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const PAGE_SIZE = 12;
  const product_length = isData?.length;
  const NoOFProduct = Math.ceil(product_length / PAGE_SIZE);
  const start = pageCount * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  const paginationHandle = (n) => {
    setPageCount(n);
  };

  const paginationNextHandle = () => {
    setPageCount((prev) => prev + 1);
  };

  const paginationPrevHandle = () => {
    setPageCount((prev) => prev - 1);
  };

  const categorySelectHandle = (e) => {
    let value = e.target.value;
    const filterData = categoryData.filter((item) =>
      value !== "" ? item.category === value : item
    );
    setPageCount(0);
    setIsData(filterData);
  };

  const uniqueCategoryNames = useMemo(() => {
    return [...new Set(categoryData.map((item) => item.category))];
  }, [categoryData]);

  return loading ? (
    <h2 className="loader">Loading...</h2>
  ) : (
    <div className="App">
      <header className="App-header">
        <div className="category_wrap">
          <div className="header">
            <img src={logo} alt="" />
            <h1>Products</h1>
          </div>
          <select
            className="category"
            name=""
            id=""
            onChange={(e) => categorySelectHandle(e)}
          >
            <option value="">all products</option>
            {uniqueCategoryNames &&
              uniqueCategoryNames?.map((item, key) => (
                <option key={key} value={item}>
                  {item}
                </option>
              ))}
          </select>
        </div>
        <div className="card-list">
          {isData.length > 0 ? (
            isData
              .slice(start, end)
              .map((item, key) => (
                <Card
                  url_image={item.thumbnail}
                  title={item.title}
                  description={item.description}
                  key={key}
                />
              ))
          ) : (
            <h1>loading...</h1>
          )}
        </div>

        <Pagination
          NoOFProduct={NoOFProduct}
          pageCount={pageCount}
          paginationPrevHandle={paginationPrevHandle}
          paginationHandle={paginationHandle}
          paginationNextHandle={paginationNextHandle}
        />
      </header>
    </div>
  );
}

export default App;
