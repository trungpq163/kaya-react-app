/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Logo from "../../assets/logo.png";
import "react-toastify/dist/ReactToastify.css";

import { signOut } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import { OptionLink } from "./navbar.styles";

import PropTypes from "prop-types";

import "./navbar.styles.css";

const Navbar = ({ currentUser, hidden }) => {
    // const notify = () => toast('Sign out successful!');
    return (
        <div className="navigation-wrap bg-light start-header start-style">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <OptionLink to="/" className="navbar-brand">
                                <img src={Logo} alt="logo" />
                            </OptionLink>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>

                            <div
                                className="collapse navbar-collapse"
                                id="navbarSupportedContent"
                            >
                                <ul
                                    className="navbar-nav ml-auto py-4 py-md-0"
                                    style={{ marginLeft: "auto" }}
                                >
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <OptionLink to="/" className="nav-link">
                                            Trang ch???
                                        </OptionLink>
                                    </li>
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <OptionLink
                                            to="/shop"
                                            className="nav-link"
                                        >
                                            Shop
                                        </OptionLink>
                                    </li>
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <OptionLink
                                            to="/search"
                                            className="nav-link"
                                        >
                                            T??m ki???m
                                        </OptionLink>
                                    </li>
                                    <li className="nav-item pl-4 pl-md-0 ml-0 ml-md-4">
                                        <a
                                            className="nav-link dropdown-toggle"
                                            data-toggle="dropdown"
                                            href="#"
                                            role="button"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Th??? lo???i
                                        </a>
                                        <div className="dropdown-menu">
                                            <OptionLink
                                                to="/shop/hats"
                                                className="dropdown-item"
                                            >
                                                M?? nam n???
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/sneakers"
                                                className="dropdown-item"
                                            >
                                                Gi??y th??? thao
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/jackets"
                                                className="dropdown-item"
                                            >
                                                ??o kho??c
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/dress"
                                                className="dropdown-item"
                                            >
                                                V??y n???
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/mensshirt"
                                                className="dropdown-item"
                                            >
                                                ??o nam
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/jean"
                                                className="dropdown-item"
                                            >
                                                Qu???n jean
                                            </OptionLink>
                                            <OptionLink
                                                to="/shop/balo"
                                                className="dropdown-item"
                                            >
                                                Balo nam n???
                                            </OptionLink>
                                        </div>
                                    </li>
                                    <li className="nav-item">
                                        {currentUser ? (
                                            <OptionLink
                                                className="nav-link"
                                                onClick={signOut}
                                                to="#"
                                            >
                                                ????ng xu???t
                                            </OptionLink>
                                        ) : (
                                            <OptionLink
                                                className="nav-link"
                                                to="/signin"
                                            >
                                                ????ng nh???p
                                            </OptionLink>
                                        )}
                                    </li>

                                    <CartIcon />
                                </ul>
                                {hidden ? null : <CartDropdown />}
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};

Navbar.propTypes = {
    currentUser: PropTypes.object,
    hidden: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden,
});

export default connect(mapStateToProps)(Navbar);
