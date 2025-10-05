import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
        setName("");
        setEmail("");
      } else {
        setMessage("❌ Erro: " + data.error);
      }
    } catch {
      setMessage("❌ Falha na conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-zinc-800 p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Criar Novo Usuário
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={name}
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded-md bg-zinc-700 text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 rounded-md bg-zinc-700 text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-md font-semibold transition disabled:opacity-50"
        >
          {loading ? "Enviando..." : "Cadastrar"}
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
