/*escuchamos por el evento DOM Content Loaded,
lo que va a hacer es ejecutarse una vez que todo el código HTML haya sido descargado*/

document.addEventListener('DOMContentLoaded', function(){ 

    const email = {
        email: '',
        asunto: '',
        mensaje: ''
    }

    // seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario  = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    // Asignar eventos
    /* 
    inputEmail.addEventListener('blur', function(e) {
        console.log(e.target.value) Este código es repetitivo
    });                                  
    */

    inputEmail.addEventListener('input', validar); // con input el feedback es tiempo real
    inputAsunto.addEventListener('input', validar); // con blur se ejecuta cuando abandonas un campo
    inputMensaje.addEventListener('input', validar);

    formulario.addEventListener('submit', enviarEmail); 

    btnReset.addEventListener('click', function(e){
        e.preventDefault();

        resetFormulario();

    })

    function enviarEmail(e) {
        e.preventDefault();
        
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            resetFormulario();

            // Dar feedback envío mensaje
            const alertaFeedback = document.createElement('P');
            alertaFeedback.classList.add('bg-green-500', 'text-white', 'p2', 'text-center', 'rounded-lg', 'mt10',
            'font-bold', 'text-sm', 'uppercase');
            alertaFeedback.textContent = 'Mensaje enviado';
            formulario.appendChild(alertaFeedback);

            setTimeout(() => {
                alertaFeedback.remove();
            }, 2000);


        }, 2000 );
    }

    function validar(e){
        if(e.target.value.trim() === '') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = ''; // reiniciamos el objeto
            comprobarEmail();
            return; // oculta la alerta si pasa la validación
        };

        if(e.target.id === 'email' && !validarEmail(e.target.value)){
            mostrarAlerta('El email no es válido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        limpiarAlerta(e.target.parentElement);

        // Asignar valores
        email[e.target.name] = e.target.value.trim().toLowerCase();  

        // Comprobar el objeto email
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia) {
        // Comprobar si ya existe una alerta
        limpiarAlerta(referencia);

        // Generar alerta en HTML
        const error = document.createElement('P')
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');

        // Inyectar el error al formulario
        referencia.appendChild(error); //en este caso appendChild agrega un hijo al formulario
    }

    function limpiarAlerta(referencia) {
        // Comprueba si ya existe una alerta
        const alerta = referencia.querySelector('.bg-red-600');
        if(alerta) {
            alerta.remove();
        }
    }

    // Validamos con regex que la dirección de email sea correcta
    function validarEmail(email) {
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if(Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return
        }
            btnSubmit.classList.remove('opacity-50');
            btnSubmit.disabled = false;
    }

    function resetFormulario(){
           // reiniciar el objeto con el botón de reset
        email.email = '';
        email.asunto = '';
        email.mensaje = '';

        formulario.reset();
        comprobarEmail();
    }
});  

