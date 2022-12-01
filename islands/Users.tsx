import { useEffect, useState } from "preact/hooks";
import { Button } from "@/components/Button.tsx";

interface UsersProps {
  start: number;
}

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/api/users");
      const json = await response.json();
      setUsers(json);
    })();
  }, []);
  return (
    <div class="flex gap-2 w-full">
      <p class="flex-grow-1 font-bold text-xl">
        Client renderd: {users.length}
      </p>
    </div>
  );
}
