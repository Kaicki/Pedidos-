const supabaseUrl = "SUA_URL";
const supabaseKey = "SUA_ANON_KEY";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function carregarPedidos() {
  const { data } = await supabase
    .from("pedidos")
    .select("*")
    .order("id", { ascending: false });

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.style.marginBottom = "10px";
    div.innerHTML = `
      🎬 <b>${p.titulo}</b><br>
      ${p.tipo} | <b>${p.status}</b><br>
      <button onclick="mudarStatus(${p.id}, 'Disponível')">✔️</button>
      <button onclick="mudarStatus(${p.id}, 'Em produção')">⏳</button>
      <button onclick="mudarStatus(${p.id}, 'Pendente')">🔄</button>
    `;
    lista.appendChild(div);
  });
}

async function mudarStatus(id, status) {
  await supabase
    .from("pedidos")
    .update({ status })
    .eq("id", id);

  carregarPedidos();
}

carregarPedidos();
