import { useEffect, useState } from "react";
import { Space, Table, Tag } from "antd";
import ordericonimage from "../../assets/OrderIcon.png";
import billiconimage from "../../assets/BillIcon.png";
import AntTable from "../../components/AntTable/AntTable.jsx";
import { callAPI } from "../../utils/FetchData";
import { Link } from "react-router-dom";

const AlreadyOrderedData = () => {
  const Columns = [
    {
      title: "Table Number",
      dataIndex: "nameOfTable",
      key: "nameOfTable",
    },
    {
      title: "Seats",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Bill",
      dataIndex: "bookingId",
      key: "bookingId",
      render: (bookingId) => (
        <Link to={"/server/takeOrder/" + bookingId}>
          <img src={billiconimage} alt="Bill" />
        </Link>
      ),
    },
  ];
  const token = JSON.parse(localStorage.getItem("user")).token;

  const [data, setData] = useState([]);
  useEffect(() => {
    let fetchData = async () => {
      // TODO: Update with correct server id
      await callAPI(`http://localhost:5001/tables/alreadyorderedtables/1`, "GET", "", token).then((res) => {
        console.log("res", res);
        setData(res);
      });
    };
    fetchData();
  }, []);
  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: "-50px" }}>
      <AntTable dataSource={data} Columns={Columns} />
    </div>
  );
};

export default AlreadyOrderedData;
