const supabaseUrl = "SUA_URL";
const supabaseKey = "SUA_ANON_KEY";

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById("pedidoForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const tipo = document.getElementById("tipo").value;

  const { error } = await supabase
    .from("pedidos")
    .insert([{ titulo, tipo }]);

  if (error) {
    alert("Erro ao enviar pedido");
  } else {
    alert("Pedido enviado com sucesso!");
    e.target.reset();
  }
});
