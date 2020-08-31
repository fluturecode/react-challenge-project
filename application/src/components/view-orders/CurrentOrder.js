import React, { useState } from "react";
import { SERVER_IP } from "../../private";
import "./viewOrders.css";
import axios from "axios";

function CurrentOrder(props) {
	const createdDate = new Date(order.createdAt);

	const { order } = props;
	const [editState, setEditState] = useState(false);

	const deleteOrder = (id) => {
		axios
			.delete(`${SERVER_IP}/api/delete-order/${id}`)
			.then((res) => console.log(res.data));
		setOrders(orders.filter((el) => el._id !== id));
	};

	const _order = {
		ordered_by: ordered_by,
		quantity: quantity,
		order_item: order_item,
	};

	const editOrder = () => {
		axios
			.post(`${SERVER_IP}/apiedit-order/${id}`)
			.then((res) => console.log(res.data));
		setOrders(orders.filter((el) => el._id !== id));
	};

	return (
		<div className="row view-order-container" key={order._id}>
			<div className="col-md-4 view-order-left-col p-3">
				<h2>{order.order_item}</h2>
				<p>Ordered by: {_order.ordered_by || ""}</p>
			</div>
			<div className="col-md-4 d-flex view-order-middle-col">
				<p>
					Order placed at{" "}
					{`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}
				</p>
				<p>
					<label className="qty-label">Quantity:</label>
					{editState} ? (
					<select
						value={this.state.quantity}
						onChange={(event) => this.menuQuantityChosen(event)}
					>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>
					) : ({_order.quantity})
				</p>
				<div className="col-md-4 view-order-right-col">
					<button
						onClick={setEditState(true)}
						type="submit"
						className="btn btn-success"
					>
						Edit
					</button>
					<button onClick={deleteOrder} />
					<button type="submit" className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
}

export default CurrentOrder;
