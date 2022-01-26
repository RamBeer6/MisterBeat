import { connect } from 'react-redux'
import { onLogout } from '../store/actions/user.action'

import user_Img from "../assets/imgs/user-img.jpg"

function _User({onLogout}) {
    return (
        <section className="user flex" onClick={onLogout}>
            <img src={user_Img} alt="image" />
            <h4>Rona Fain..</h4>
            <div className="svg-down-container">
                <svg //arrow down
                    role="img"
                    height="16"
                    width="16"
                    className="svg-down"
                    viewBox="0 0 16 16"
                >
                    <path d="M3 6l5 5.794L13 6z"></path>
                </svg>
            </div>
        </section>
    );
}

function mapStateToProps(state) {
    return {
    }
}

const mapDispatchToProps = {
    onLogout,
}

export const User = connect(mapStateToProps, mapDispatchToProps)(_User)