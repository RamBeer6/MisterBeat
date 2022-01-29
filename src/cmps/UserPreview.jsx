export function UserPreview({ user, onAddFollow }) {
  return (
    <section className="user-preview">
      <div className="user-info">
        <div className="user-img">
          <img src={user.imgUrl} />
        </div>
        <h3>{user.userName}</h3>
        <button onClick={() => onAddFollow(user)}>Follow</button>
      </div>
    </section>
  )
}
