import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Lista de Usuários
      </h2>

      {loading ? (
        <p className="text-center text-zinc-400">Carregando...</p>
      ) : users.length > 0 ? (
        <ul className="space-y-2">
          {users.map((u) => (
            <li
              key={u.id}
              className="bg-zinc-800 p-3 rounded-lg flex justify-between"
            >
              <span className="font-medium">{u.name}</span>
              <span className="text-zinc-400 text-sm">{u.email}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-zinc-400">Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
}
