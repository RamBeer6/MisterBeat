import MainContainer from "../cmps/MainContainer";
import NavBar from "../cmps/NavBar";
// import AppHeader from "../cmps/AppHeader";
// import AppFooter from "../cmps/AppFooter";

export function HomePage() {
    return (
        <div className="home-page">
            <section className="main">
                {/* <AppHeader /> */}
                <MainContainer />
                <NavBar />
            </section>
            {/* <AppFooter /> */}
        </div>
    );
}
