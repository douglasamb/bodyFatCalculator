const form = document.querySelector('#formulario');

form.addEventListener('submit', function (prvt) {
  prvt.preventDefault();
  const inputMalefemale = document.getElementById('maleFemale');
  const inputHeight = document.getElementById('height');
  const inputNeck = document.getElementById('neck');
  const inputWaist = document.getElementById('waist');
  const inputHip = document.getElementById('hip');

  const maleFemale = inputMalefemale.value;
  const height = Number(inputHeight.value);
  const neck = Number(inputNeck.value);
  const waist = Number(inputWaist.value);
  const hip = Number(inputHip.value);
// operadores lógicos para caso seja digitado um valor incorreto (logic operators in case that a incorrect value be input)
  if (!height) {
    setResultado('Altura Inválida!', false);
    return;
  }

  if (!neck) {
    setResultado('Medida Inválida!', false);
    return;
  }

  if (!waist) {
    setResultado('Medida Inválida!', false);
    return;
  }

  if (!hip) {
    setResultado('Medida Inválida!', false);
    return;
  }
// operador lógico para identificar se é homem ou mulher e realizar o cálculo (Logic operator to identify if is a man or a woman and do the calculation)
  if (maleFemale === 'homem') {
    const gch = getGch(height, neck, waist);
    const msg = `Seu percentual de gordura é: ${gch} %`;
    setResultado(msg, true);
  } else if (maleFemale === 'mulher') {
      const gcm = getGcm(height, neck, waist, hip);
      const msg = `Seu percentual de gordura é: ${gcm} %`;
      setResultado(msg, true);
  } else {
      const msg = `Gênero inválido!`;
      setResultado(msg, false);;
  }

  
});

// função que calcula o percentual para homem (function that calculate the body fat for men)
function getGch (height, neck, waist) {
  const gch = 495 / (1.033 - 0.191 * Math.log10(waist - neck) + 0.155 * Math.log10(height)) - 450;
  return gch.toFixed(2);
}
// função que calcula o percentual para mulheres (function that calculate the body fat for women)
function getGcm(height, neck, waist, hip) {
  const gcm = 495 / (1.296 - 0.350 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450;
  return gcm.toFixed(2);
}
// cria o paragrafo onde vai ser exibido o resultado (create the paragraph where will be displayed the result)
function criaP () {
  const p = document.createElement('p');
  return p;
}

// função para setar o resultado na página (function to set the result on page)
function setResultado (msg, isValid) {
    const resultado = document.querySelector('#resultado');
    resultado.innerHTML = '';
    const p = criaP();

    if (isValid) {
      p.classList.add('paragrafo-resultado');
    } else {
      p.classList.add('wrong');
    }

    p.innerHTML = msg;
    resultado.appendChild(p);
}
