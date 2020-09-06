import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Main, Login, OrderForm, ViewOrders } from "../components";
import GuardedRouter from "./GuardedRouter";

const AppRouter = ({ token }) => {
	return (
		<Router>
			<Route path="/" exact component={Main} />
			<Route path="/login" exact component={Login} />
			<Route path="/order" exact component={OrderForm} />
			<Route path="/view-orders" exact component={ViewOrders} />
			{/* Change back to Guarded once view-orders funcationality is updated */}
			{/* <GuardedRouter token={token} path="/order" exact component={OrderForm} />
			<GuardedRouter
				token={token}
				path="/view-orders"
				exact
				component={ViewOrders} */}
			{/* /> */}
		</Router>
	);
};

const mapStateToProps = ({ auth }) => ({
	token: auth.token,
});

export default connect(mapStateToProps, null)(AppRouter);
