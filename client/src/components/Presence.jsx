function Presence({ users, isConnected }) {
  if (!isConnected) {
    return (
      <div className="presence offline" title="Backend server (http://localhost:3001) is disconnected">
        <span className="presence-dot offline-dot" />
        <span className="presence-count">Server Offline</span>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="presence">
        <span className="presence-dot online-dot" />
        <span className="presence-count">Connecting...</span>
      </div>
    );
  }

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
