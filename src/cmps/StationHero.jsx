import { User } from "./User";
// import add_img from "../assets/imgs/add-img.png";

export function StationHero() {
    const { name } = User;
    console.log('Name:', name);

    return (
        <section className="station-hero">
            <div></div>
            <div className="station-hero__info">
                <div className="station-hero__img" />
                {/* <img src={add_img} alt="image" /> */}
                <div className="station-hero__text">
                    <strong className="label" >Playlist</strong>
                    <h2>My Playlist #1</h2>
                    <div className="total-durtion-user">
                        <p className="duration__nums">35 min 24 sec</p>
                        <p>{name}</p>
                    </div>
                </div>
            </div>
            {/* 
            <div className=" station-hero__right">
            </div> */}

        </section>
    );
}
