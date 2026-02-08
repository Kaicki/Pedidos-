const supabaseUrl = "https://psqdwlvzypgmjzxuurms.supabase.co";
const supabaseKey = "sb_publishable__okNpjTgof7BIlDQB0YFVA_Yn8KV9ZW";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function carregarPedidos() {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  data.forEach(p => {
    const div = document.createElement("div");
    div.style.marginBottom = "12px";
    div.innerHTML = `
      🎬 <b>${p.titulo}</b><br>
      ${p.tipo} | <b>${p.status}</b><br>
      <button onclick="mudarStatus(${p.id}, 'Disponível')">✔️</button>
      <button onclick="mudarStatus(${p.id}, 'Em produção')">⏳</button>
      <button onclick="mudarStatus(${p.id}, 'Pendente')">🔄</button>
      <hr>
    `;
    lista.appendChild(div);
  });
}

async function mudarStatus(id, status) {
  const { error } = await supabase
    .from("pedidos")
    .update({ status })
    .eq("id", id);

  if (error) console.error(error);

  carregarPedidos();
}

carregarPedidos();
