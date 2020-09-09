import React, { useState } from "react";
import { SERVER_IP } from "../../private";
import "./viewOrders.css";
import axios from "axios";

const EditOrder = (props) => {
	const { setUpdateViewOrders, order } = props;
	const { _id, order_item, createdAt, quantity, ordered_by } = order;
	const [toggleEdit, setToggleEdit] = useState(false);
	const [editQuantity, setEditQuantity] = useState(quantity);

	console.log("DEBUG 2 >>>", props);

	const editOrder = () => {
		const order = {
			id: _id,
			ordered_by: ordered_by,
			quantity: editQuantity,
			menu_item: order_item,
		};
		axios
			.post(`${SERVER_IP}/api/edit-order`, order)
			.then((res) => {
				setUpdateViewOrders(true);
			})
			.catch((err) => {
				console.log(`Update unsuccessful`);
			});
	};

	const deleteOrder = () => {
		console.log("YOU ARE TRYING TO DELETE", _id);
		console.log("SERVER: ", SERVER_IP);
		axios
			.post(`${SERVER_IP}/api/delete-order`, {
				id: _id,
			})
			.then((res) => {
				console.log("DEBUG 3 >>>>>>>", res);
				setUpdateViewOrders(true);
			})
			.catch((err) => {
				console.log(`Delete order unsuccessful`);
			});
	};

	const onClickToggleEdit = () => {
		if (toggleEdit) {
			// if editing...
			editOrder();
		}
		setToggleEdit(!toggleEdit);
	};

	return (
		<div className="row view-order-container" key={_id}>
			<div className="col-md-4 view-order-left-col p-3">
				<h2>{order_item}</h2>
				<p>Ordered by: {ordered_by || ""}</p>
			</div>
			<div className="col-md-4 d-flex view-order-middle-col">
				<p>Order placed at {`${createdAt}`}</p>
				<p>
					<label className="qty-label">Quantity:</label>
					{toggleEdit ? (
						<select
							value={editQuantity}
							defaultValue={quantity}
							onChange={(e) => setEditQuantity(e.target.value)}
						>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					) : (
						quantity
					)}
				</p>
				<div className="col-md-4 view-order-right-col">
					<button
						onClick={onClickToggleEdit}
						type="submit"
						className="btn btn-success"
					>
						{toggleEdit ? "Complete Edit" : "Edit"}
					</button>
					<button onClick={deleteOrder} className="btn btn-danger">
						Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default EditOrder;
