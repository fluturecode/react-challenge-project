import React from "react";
import { SERVER_IP } from "../../private";
import "./viewOrders.css";
import axios from "axios";
import EditOrder from "./editOrder";

const EditOrder = (props) => {
	const { setUpdateViewOrders, order } = props;
	const { id, order_item, quantity, ordered_by } = order;
	const [toggleEdit, setToggleEdit] = useState(false);

	const editOrder = (e) => {
		const order = {
			ordered_by: ordered_by,
			quantity: e.targe.value,
			order_item: order_item,
		};
		axios
			.post(`${SERVER_IP}/api/edit-order/${id}`, order)
			.then((res) => {
				setToggleEdit(false);
				setUpdateViewOrders(true);
			})
			.catch((err) => {
				console.log(`Update unsuccessful`);
			});
	};

	const deleteOrder = () => {
		axios
			.delete(`${SERVER_IP}/api/delete-order/${id}`)
			.then((res) => {
				setUpdateViewOrders(true);
			})
			.catch((err) => {
				console.log(`Delete order unsuccessful`);
			});
	};

	const onClickToggleEdit = () => {
		setToggleEdit(!toggleEdit);
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
					{toggleEdit ? (
						<select defaultValue={quantity} onChange={editOrder}>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
							<option value="6">6</option>
						</select>
					) : (
						{ quantity }
					)}
				</p>
				<div className="col-md-4 view-order-right-col">
					<button
						onClick={onClickToggleEdit}
						type="submit"
						className="btn btn-success"
					>
						Edit
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
