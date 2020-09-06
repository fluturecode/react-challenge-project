import React, { useState, useEffect } from "react";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import EditOrder from "./editOrder";
import axios from "axios";
import "./viewOrders.css";

const ViewOrders = () => {
	const [orders, setOrders] = useState([""]);

	const [updateViewOrders, setUpdateViewOrders] = useState(false);

	useEffect(() => {
		axios
			.get(`${SERVER_IP}/api/current-orders`)
			.then((response) => {
				setOrders(response.data);
				console.log(response);
			})
			.catch((error) => {
				console.log("Error getting orders");
			});
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
