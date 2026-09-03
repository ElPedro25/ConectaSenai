document.addEventListener('DOMContentLoaded', () => {
  const radioSim = document.getElementById('linkedin-sim');
  const radioNao = document.getElementById('linkedin-nao');
  const radioIgnorar = document.getElementById('linkedin-ignorar');
  const campoUrl = document.getElementById('campo-linkedin-url');
  const guiaCriar = document.getElementById('guia-criar-linkedin');

  // Alterna a exibição com base no Radio Button selecionado
  const toggleLinkedinFields = () => {
    if (radioSim.checked) {
      campoUrl.classList.remove('hidden');
      guiaCriar.classList.add('hidden');
    } else if (radioNao.checked) {
      campoUrl.classList.add('hidden');
      guiaCriar.classList.remove('hidden');
    } else {
      campoUrl.classList.add('hidden');
      guiaCriar.classList.add('hidden');
    }
  };

  // Escutadores de eventos para as opções
  radioSim.addEventListener('change', toggleLinkedinFields);
  radioNao.addEventListener('change', toggleLinkedinFields);
  radioIgnorar.addEventListener('change', toggleLinkedinFields);
});