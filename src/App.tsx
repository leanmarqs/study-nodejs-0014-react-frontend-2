import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // 🔹 Carrega usuários ao iniciar
  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Erro ao buscar usuários:", err));
  }, []);

  // 🔹 Função para enviar novo usuário
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Usuário criado com sucesso!");
        setUsers((prev) => [...prev, data.user]); // adiciona o novo usuário à lista
        setName("");
        setEmail("");
      } else {
        setMessage("❌ Erro ao criar usuário: " + data.error);
      }
    } catch (err) {
      setMessage("❌ Falha na conexão com o servidor." + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-50 flex flex-col items-center py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Cadastro de Usuários</h1>

      {/* Formulário */}
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <label className="block mb-3">
          <span className="text-sm text-zinc-400">Nome</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 rounded-md bg-zinc-700 text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Digite o nome"
            required
          />
        </label>

        <label className="block mb-4">
          <span className="text-sm text-zinc-400">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 w-full p-2 rounded-md bg-zinc-700 text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            placeholder="Digite o email"
            required
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>

        {message && (
          <p className="mt-4 text-center text-sm text-zinc-300">{message}</p>
        )}
      </form>

      {/* Lista de usuários */}
      <div className="mt-10 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-3">Usuários cadastrados</h2>
        <ul className="space-y-2">
          {users.length > 0 ? (
            users.map((u) => (
              <li
                key={u.id}
                className="bg-zinc-800 p-3 rounded-lg flex justify-between"
              >
                <span>{u.name}</span>
                <span className="text-zinc-400 text-sm">{u.email}</span>
              </li>
            ))
          ) : (
            <p className="text-zinc-400 text-sm">Nenhum usuário cadastrado.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

