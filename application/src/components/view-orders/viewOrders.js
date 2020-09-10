import React, { useState, useEffect } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import EditOrder from "./EditOrder";
import axios from "axios";
import "./viewOrders.css";

const ViewOrders = () => {
	const [orders, setOrders] = useState([]);

	const [updateViewOrders, setUpdateViewOrders] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			await axios
				.get(`${SERVER_IP}/api/current-orders`)
				.then((response) => {
					console.log("FETCHING ORDERS", response);
					setOrders(response.data.orders);
					setUpdateViewOrders(false);
				})
				.catch((error) => {
					console.log("Error getting orders");
				});
		};
		fetchData();
	}, [updateViewOrders]);

	return (
		<Template>
			<div className="container-fluid">
				{orders.map((order) => (
					<EditOrder order={order} setUpdateViewOrders={setUpdateViewOrders} />
				))}
			</div>
		</Template>
	);
};

export default ViewOrders;
