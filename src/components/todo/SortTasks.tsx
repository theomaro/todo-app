function SortTasks({ sortBy, setSortBy }: FilterProps) {
  return (
    <select
      value={sortBy}
      onChange={(ev) => setSortBy(ev.target.value)}
      name="tasks-sorting"
      id="tasks-sorting"
      className="border capitalize rounded outline-none text-xs font-medium p-0.5"
    >
      <option value={"text"}>Title</option>
      <option value={"completed"}>Status</option>
      <option value={"priority"}>Priority</option>
    </select>
  );
}

interface FilterProps {
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
}

export default SortTasks;
