import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import "./App.css";

import MyLoader from "./components/content-loader/content-loader.component";

import Navbar from "./components/navbar/navbar.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import { setCurrentUser } from "./redux/user/user.action";
import { selectCurrentUser } from "./redux/user/user.selectors";

// import HomePage from './pages/homepage/homepage.component';
const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
// import ShopPage from './pages/shop/shop.component';
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
const SignInAndSignUpPage = lazy(() =>
    import("./pages/sign-in-and-sign-up/sign-in-and-sign-up.component")
);
// import CheckoutPage from './pages/checkout/checkout.component';
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));

// import SearchPage from './pages/search/search.component';
const SearchPage = lazy(() => import("./pages/search/search.component"));

class App extends React.Component {
    unsubscribeFromAuth = null;

    componentDidMount() {
        const { setCurrentUser } = this.props;

        this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth);
                console.log(auth);

                userRef.onSnapshot((snapShot) => {
                    setCurrentUser({
                        id: snapShot.id,
                        ...snapShot.data(),
                    });
                });
            }

            setCurrentUser(userAuth);
        });
    }

    componentWillUnmount() {
        this.unsubscribeFromAuth();
    }

    render() {
        return (
            <div>
                <Navbar />
                <Switch>
                    <Suspense
                        fallback={
                            <div className="mt-5 pt-5 container">
                                <MyLoader />
                            </div>
                        }
                    >
                        <Route exact path="/" component={HomePage} />
                        <Route path="/shop" component={ShopPage} />
                        <Route
                            exact
                            path="/checkout"
                            component={CheckoutPage}
                        />
                        <Route exact path="/search" component={SearchPage} />
                        <Route
                            exact
                            path="/signin"
                            render={() =>
                                this.props.currentUser ? (
                                    <Redirect to="/" />
                                ) : (
                                    <SignInAndSignUpPage />
                                )
                            }
                        />
                    </Suspense>
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
