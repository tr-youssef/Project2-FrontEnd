import { useEffect, useState } from "react";
import { Col, Row } from "antd";
import { callAPI } from "../../utils/FetchData.jsx";
import "./Chef.css";

function Chef() {
  const [orders, setOrders] = useState([]);
  const [refresh, setRefresh] = useState();
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  useEffect(() => {
    let fetchData = async () => {
      await callAPI("http://localhost:5001/orders", "GET", {}, token).then((res) => {
        setOrders(res);
      });
    };
    fetchData();
    setInterval(() => {
      setRefresh(Math.random());
    }, 5000);
  }, [refresh]);
  async function changeStatus(id) {
    const data = { status: "Ready" };
    await callAPI(`http://localhost:5001/orders/status/${id}`, "PATCH", data, token).then(() => {
      setRefresh(Date.now());
    });
  }

  return (
    <div>
      <Row className="ChefRow">
        {orders &&
          orders?.map((order) => {
            return (
              <Col className="ChefCol" onClick={() => changeStatus(order._id)} span={6} key={order._id}>
                <div className="ChefTable">{order.bookedId.tableId.nameOfTable}</div>
                {order?.items?.map((item) => {
                  return (
                    <div className="ChefItems" key={item.id}>
                      <div className="ChefLineItem">
                        <div className="ChefLineName">{item.name}</div>
                        <div className="ChefLineQuantity">{item.quantity}</div>
                      </div>
                    </div>
                  );
                })}
              </Col>
            );
          })}
      </Row>
    </div>
  );
}

export default Chef;