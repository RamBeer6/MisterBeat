import LogoImg from '../assets/imgs/logo/Mister.Beat.png';

export function Logo() {
    const logo = LogoImg;
    const bgc = 'white'
    return (
        <section className="logo-container flex">
            <div className='logo-img'>
                {/* <img src={logo} alt="image" /> */}
                <h1>Mister.Beat <span></span></h1>
            </div>
        </section>
    )
}