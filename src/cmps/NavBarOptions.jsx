export default function NavBarOptions({ title, Icon }) {
    return (
        <section className="nav-bar-options">
            {Icon && <Icon className="nav-bar-options__icon" />}
            {Icon ? <h4>{title}</h4> : <p>{title}</p>}
        </section>
    );
}
