'use strict'

const btnSendMessage = document.getElementById('btn-send');
btnSendMessage.addEventListener('click', (e) => {
  e.preventDefault();
  if(validateForm()) alertContact();
});
let name, email, phone, message;
const validateForm = () => {
  showLoader();
  hiddenErrors();
  name = document.getElementById('name').value.trim();
  email = document.getElementById('email').value.trim();
  phone = document.getElementById('phone').value.trim();
  // subject = document.getElementById('subject').value.trim();
  message = document.getElementById('message').value.trim();
  // investment = document.getElementById('investment').value.trim();

  let rpta = true;
  // Validamos que el name tenga mínimo 10
  if(name.length < 10) {
    rpta = false;
    showError(0);
  }
  // Validamos que el email sea un email válido
  if(email.length){
    let contArrobas = 0;
    let contPoints = 0;
    Array.from(email).forEach(e => {
      if (e =='@') contArrobas++;
      if (e == '.') contPoints++;
    });
    if (contArrobas != 1){
      rpta = false;
      showError(1);
    }
    if(contPoints < 1) {
      rpta = false;
      showError(1);
    }
  }
  // Validamos el phone
  if (isNaN(phone) || phone.length < 9) {
    rpta = false;
    showError(2);
  }
  // Validamos el subject (tema) tenga como mínimo 25 caracteres
  // if (subject.length < 25) {
  //   rpta = false;
  //   showError(3);
  // }
  // Validamos el message que mínimo tenga 25 caracteres
  if (message.length < 25) {
    rpta = false;
    showError(3);
  }
  //Validar que el investment tenga como min 3 cifras
  // if (investment.length > 0 && investment.length <3) {
  //   rpta = false;
  //   showError(5)
  // }
  return rpta;
};
const alertContact = () => {
  console.log('alertContact run')
  let token = document.getElementById('my-token').getAttribute('content');
  // console.log(name, email, phone, subject, message, token)
  $.ajax({
    url: '/solicitud',
    method:"POST",
    data:{ name:name,email:email,message:message,phone:phone,_token:token},
    success: function(data){
     if (data.status == 'success')
     {
        Swal.fire(
          name.toUpperCase()+'!',
          'Gracias por contactarnos, en breve tendrás noticias nuestras, #TeamCodecix',
          'success'
        );
        document.getElementById('form-send').reset();
     }else{
        Swal.fire(
          name.toUpperCase()+', lo sentimos :(!',
          'No logramos procesar tu solicitud, vuelve a intentarlo! Recuerda que nuestras redes sociales siempre están disponibles para ti, #TeamCodecix',
          'error'
        );
     }
     hiddenLoader();
    },
    error: function() {
      console.log('Error al intentar enviar el msj')
      hiddenLoader();
    }
  });
};

const showError = (param) => {
  let arrayInputs = document.getElementsByClassName('validate');
  arrayInputs[param].classList.add('show-error');
  hiddenLoader();
}
const hiddenErrors = (param) => {
  let arrayInputs = document.getElementsByClassName('validate');
  Array.from(arrayInputs).forEach(e => {
    e.classList.remove('show-error');
  });
}
const showLoader = () => {
  let loader = document.getElementById('form-loader');
  loader.classList.add('spinner-border', 'spinner-border-sm', 'mr-3');
}
const hiddenLoader = () => {
  let loader = document.getElementById('form-loader');
  loader.classList.remove('spinner-border', 'spinner-border-sm', 'mr-3');
}

// let inputPhone = document.getElementById('phone');
document.getElementById('phone').addEventListener('keydown', (e) => {
  // console.log(e.keyCode);
  if(e.keyCode < 8 || (e.keyCode >9 && e.keyCode< 48) || (e.keyCode >57 && e.keyCode< 96) || e.keyCode> 105) e.preventDefault();
})
// document.getElementById('investment').addEventListener('keydown', (e) => {
//   console.log(e.keyCode);
//   if(e.keyCode < 8 || (e.keyCode >8 && e.keyCode< 48) || (e.keyCode >57 && e.keyCode< 96) || e.keyCode> 105) {
//     e.preventDefault();
//   }else {
//     if(e.target.value.length == 0 && (e.keyCode == 48 || e.keyCode == 96)) e.preventDefault();
//   }
// })