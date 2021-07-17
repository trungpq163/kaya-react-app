import React, { useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";

import { selectCurrentUser } from "../../redux/user/user.selectors";

import { createStructuredSelector } from "reselect";

import { ToastContainer, toast } from "react-toastify";

import MyLoader from "../../components/content-loader/content-loader.component";

import "react-toastify/dist/ReactToastify.css";

import PropTypes from "prop-types";

import { HomePageContainer } from "./homepage.styles";

// import Carousel from '../../components/carousel/carousel.component';
const Carousel = lazy(() =>
    import("../../components/carousel/carousel.component")
);
// import CollectionsOverview from '../../components/collection-overview/collection-overview.component';
const CollectionsOverview = lazy(() =>
    import("../../components/collection-overview/collection-overview.component")
);

const HomePage = ({ currentUser }) => {
    if (currentUser !== null) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            toast("Chào mừng bạn đã trở lại! <3");
        }, []);
    }

    return (
        <HomePageContainer>
            <Suspense
                fallback={
                    <div className="mt-5 pt-5 container">
                        <MyLoader />
                    </div>
                }
            >
                <Carousel />
                <CollectionsOverview />
            </Suspense>
            <ToastContainer />
        </HomePageContainer>
    );
};

HomePage.propTypes = {
    currentUser: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, null)(HomePage);
