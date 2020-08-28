import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const GuardedRouter = ({ token, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={(props) =>
				token ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/login", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

const mapStateToProps = ({ auth }) => ({
	token: auth.token,
});

export default connect(mapStateToProps, null)(GuardedRouter);
