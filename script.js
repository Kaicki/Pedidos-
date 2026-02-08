const supabaseUrl = "https://psqdwlvzypgmjzxuurms.supabase.co";
const supabaseKey = "sb_publishable__okNpjTgof7BIlDQB0YFVA_Yn8KV9ZW";

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
    console.error(error);
  } else {
    alert("Pedido enviado com sucesso!");
    e.target.reset();
  }
});
