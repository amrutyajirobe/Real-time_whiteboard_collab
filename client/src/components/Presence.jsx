function Presence({ users }) {
  if (users.length === 0) return null;

  return (
    <div className="presence">
      {users.map((user) => (
        <div
          key={user.id}
          className="presence-avatar"
          style={{ background: user.color }}
          title={user.name}
        >
          {user.name.split(" ").pop()}
        </div>
      ))}
      <span className="presence-count">
        {users.length} online
      </span>
    </div>
  );
}

export default Presence;

