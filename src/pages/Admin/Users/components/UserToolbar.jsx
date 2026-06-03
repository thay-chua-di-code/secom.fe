export default function UserToolbar({ search, setSearch }) {
  return (
    <div className="toolbar">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search user..."
      />

      <button>+ Add User</button>
    </div>
  );
}
