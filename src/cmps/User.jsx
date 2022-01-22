import user_Img from '../assets/imgs/user-img.jpg';
export function User() {
    return (
        <section className="user">
            <img src={user_Img} alt="image" />
            <h4>Ram Be'er</h4>
        </section>
    );
}