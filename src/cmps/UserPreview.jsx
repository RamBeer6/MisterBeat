import userImgDefault from '../assets/imgs/avatar.jpg'

export function UserPreview({ user, onAddFollow }) {
  return (
    <section className="user-preview">
      <div className="user-info">
        <div className="user-img">
          <img src={!user.imgUrl.length ? userImgDefault : user.imgUrl} />
        </div>
        <div className="user-name-follow">
          <h3>{user.userName}</h3>
          <input type={'checkbox'} className="follow-btn" onClick={() => onAddFollow(user._id)} />
        </div>
      </div>
    </section>
  )
}
