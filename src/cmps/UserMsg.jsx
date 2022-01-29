import { connect } from 'react-redux'

function _UserMsg({ msg }) {
  const classname = msg ? `user-msg show ${msg?.type}` : 'user-msg'
  //   console.log('msg?' , msg);
  return (
    <section className='msg-container' style={{ position: 'relative' }}>
      <div className={classname}>
        <h3>{msg?.txt}</h3>
      </div>
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    msg: state.userModule.msg,
  }
}

export const UserMsg = connect(mapStateToProps, {})(_UserMsg)
