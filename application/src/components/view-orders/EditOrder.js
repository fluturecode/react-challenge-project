import React, { useState } from "react";
import { SERVER_IP } from "../../private";
import "./viewOrders.css";
import axios from "axios";

const EditOrder = (props) => {
	const [order, setOrder] = usetState("");
	const [order_item, setOrder_item] = useState("");
	const [quantity, setQuantity] = useState("");
	const [ordered_by, setOrdered_by] = useState("");
	let history = useHistory();

	useEffect(() => {
		axios
			.get(`${SERVER_IP}/api/current-orders/` + props.match.params.id)
			.then((response) => {
				setOrder_item(response.data.order_item);
				setQuantity(response.data.cohort_quantity);
				setOrdered_by(response.data.ordered_by);
			})
			.catch((error) => {
				console.log(error);
			});

		const changeQuantity = (e) => {
			setQuantity(e.target.value);
		};

		const order = {
			ordered_by: ordered_by,
			quantity: quantity,
			order_item: order_item,
		};
		axios
			.post(`${SERVER_IP}/api/edit-order/` + props.match.params.id, order)
			.then((res) => console.log(res.data));
		history.push("/");
	});

	const deleteItem = (id) => {
		axios
			.delete(`${SERVER_IP}/api/delete-order/${id}`)
			.then((res) => setOrder(order.filter((el) => el._id !== id)));
	};

	return (
		<div className="row view-order-container" key={order._id}>
			<div className="col-md-4 view-order-left-col p-3">
				<h2>{order.order_item}</h2>
				<p>Ordered by: {order.ordered_by || ""}</p>
			</div>
			<div className="col-md-4 d-flex view-order-middle-col">
				<p>
					Order placed at{" "}
					{`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}
				</p>
				<p>
					<label className="qty-label">Quantity:</label>
					<select defaultValue={quantity} onChange={changeQuantity}>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
						<option value="6">6</option>
					</select>
				</p>
				<div className="col-md-4 view-order-right-col">
					<button onClick={editItem} type="submit" className="btn btn-success">
						Edit
					</button>
					<button onClick={deleteItem} className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditOrder;
