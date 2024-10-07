import { useTodos } from "../../context/TodoContext";

function FilterTasks({ filter, setFilter }: FilterProps) {
  const { totalTasks, totalPending, totalCompleted } = useTodos();

  return (
    <select
      value={filter}
      onChange={(event) => setFilter(event.target.value)}
      name="tasks-selected"
      id="tasks-selected"
      className="border rounded outline-none text-xs font-medium p-0.5"
    >
      <option value={"all"}>All ({totalTasks})</option>
      <option value={"pending"}>Pending ({totalPending})</option>
      <option value={"completed"}>Completed ({totalCompleted})</option>
    </select>
  );
}

interface FilterProps {
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<string>>;
}

export default FilterTasks;
