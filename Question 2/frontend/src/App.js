import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Card from "./Components/Card";

function App() {
  const [data, setData] = useState([]);
  const [pageNum, setPageNum] = useState(10);
  const pages = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  useEffect(() => {
    setData([]);
    async function fetchData() {
      const res = await axios.get(
        `http://localhost:8000/posts/limit=10/skip=${pageNum - 10}`
      );
      if (res) {
        setData(res.data.posts);
      }
    }
    fetchData();
  }, [pageNum]);

  console.log(data);
  if (data.length == 0) {
    return (
      <div className="loading">
        <h3>Loading ... </h3>
      </div>
    );
  } else {
    return (
      <div className="app">
        <h3>Cards Coming From Backend Server</h3>
        <div className="cards">
          {data.map((item) => (
            <Card
              key={item._id}
              id={item._id}
              title={item.title}
              body={item.body}
              tags={item.tags}
              reactions={item.reactions}
            />
          ))}
        </div>
        <div className="pages">
          {pages.map((pg) => (
            <div className="page-number" onClick={() => setPageNum(pg * 10)}>
              <p>{pg}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
