document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('step1-form');
  const cpfInput = document.getElementById('cpf');
  const celularInput = document.getElementById('celular');
  const emailInput = document.getElementById('email');
  const confirmEmailInput = document.getElementById('confirm-email');
  const senhaInput = document.getElementById('senha');
  const confirmSenhaInput = document.getElementById('confirm-senha');

  // Máscara Automática de CPF (000.000.000-00)
  cpfInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    e.target.value = value;
  });

  // Máscara Automática de Celular ((00) 90000-0000)
  celularInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    value = value.replace(/^(\d{2})(\d)/, '($1) $2');
    value = value.replace(/(\d{5})(\d{4})$/, '$1-$2');
    e.target.value = value;
  });

  // Exibir mensagens de erro
  const setError = (input, message) => {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) errorSpan.textContent = message;
    input.classList.add('invalid');
  };

  // Limpar mensagens de erro
  const clearError = (input) => {
    const errorSpan = document.getElementById(`${input.id}-error`);
    if (errorSpan) errorSpan.textContent = '';
    input.classList.remove('invalid');
  };

  // Validação do Formulário
  const validateForm = () => {
    let isValid = true;

    if (!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
      setError(emailInput, 'Insira um e-mail válido.');
      isValid = false;
    }

    if (emailInput.value !== confirmEmailInput.value) {
      setError(confirmEmailInput, 'Os e-mails não coincidem.');
      isValid = false;
    }

    if (senhaInput.value.length < 8) {
      setError(senhaInput, 'A senha deve ter no mínimo 8 caracteres.');
      isValid = false;
    }

    if (senhaInput.value !== confirmSenhaInput.value) {
      setError(confirmSenhaInput, 'As senhas não coincidem.');
      isValid = false;
    }

    if (cpfInput.value.length < 14) {
      setError(cpfInput, 'Digite um CPF completo.');
      isValid = false;
    }

    if (celularInput.value.length < 14) {
      setError(celularInput, 'Digite um celular válido.');
      isValid = false;
    }

    return isValid;
  };

  // Limpar mensagens de erro dinamicamente ao digitar
  [emailInput, confirmEmailInput, senhaInput, confirmSenhaInput, cpfInput, celularInput].forEach(input => {
    input.addEventListener('input', () => clearError(input));
  });

  // Evento ao Submeter o Formulário
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
      const formData = new FormData(form);
      const step1Data = {
        email: formData.get('email'),
        nomeCompleto: formData.get('nomeCompleto'),
        cpf: formData.get('cpf'),
        dataNascimento: formData.get('dataNascimento'),
        celular: formData.get('celular')
      };

      // Salva temporariamente os dados no navegador
      sessionStorage.setItem('cadastro_etapa_1', JSON.stringify(step1Data));

      // Redireciona para a Etapa 2
      window.location.href = 'etapa2.html';
    }
  });
});