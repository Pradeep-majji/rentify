import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthBuyer } from "../context/AuthProviderBuyer";

const HomePageHeaderBuyer = () => {

	const { logOut} = useAuthBuyer();
	const navigate = useNavigate();


	const handleLogOut = () => {
		logOut();
		navigate("/login");
	};

	return (
		<nav className="container navbar navbar-expand-lg navbar-light">
			<Link
				className="navbar-brand"
				style={{
					display: "flex",
					justifyContent: "center",
					gap: "8px",
					fontWeight: 700,
				}}
				to="/buyerhome">
			 Home
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarText"
				aria-controls="navbarText"
				aria-expanded="false"
				aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {/* You can add other navigation links here if needed */}
                </ul>
            </div>
            <div className="navbar-nav ml-auto">
			<Link to="/buyerfilter" className="btn btn-success mx-2 my-2 my-sm-0">
                Filters
            </Link>
            </div>
			<Link to="/buyerfavourite" className="btn btn-success mx-2 my-2 my-sm-0">
                Liked
            </Link>
			<button onClick={handleLogOut} className="btn btn-danger my-2 my-sm-0">
				Log Out
			</button>
		</nav>
	);
};

export default HomePageHeaderBuyer;
