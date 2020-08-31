import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Template } from "../../components";
import { SERVER_IP } from "../../private";
import EditOrder from "./CurrentOrder";
import axios from "axios";
import "./viewOrders.css";

const ViewOrders = () => {
	const [orders, setOrders] = useState([""]);
	let history = useHistory();

	useEffect(() => {
		axios
			.get(`${SERVER_IP}/api/current-orders`)
			.then((response) => {
				setOrders(response.data);
			})
			.catch((error) => {
				console.log("Error getting orders");
			});
	});

	const onSubmit = (e) => {
		e.preventDefault();

		axios
			.post(`${SERVER_IP}/api/current-orders/${id}`)
			.then((res) => console.log(res.data));
		history.push("/");

		return (
			<Template>
				<form onSubmit={onSubmit}>
					<div className="container-fluid">
						{orders.map((order) => {
							<EditOrder order={order} />;
						})}
					</div>
				</form>
			</Template>
		);
	};
};

export default ViewOrders;
