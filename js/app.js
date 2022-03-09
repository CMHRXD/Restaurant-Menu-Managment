//Variables
const form = document.querySelector('#formulario');
const sbutton = document.querySelector('#guardar-cliente');
const contenido = document.querySelector('#resumen .contenido');
const headingMaster = document.querySelector('.heading-master');

//Initialize Json Server
//json-server --watch db.json -- port 4000

//Class
class UI{ // User Intergace
    static errorMessage(){
        if (document.querySelector('.pAlert')) {
            return;
        }
        const p = document.createElement('p');
        p.classList.add('invalid-feedback', 'd-block', 'text-center', 'pAlert');
        p.textContent = 'Todos Los Campos Son Obligatorios';
        document.querySelector('.modal-body form').appendChild(p);

        setTimeout(() => {
            p.remove();
        }, 3000);
    }
    
    static showSections(){//Show Hide Sections
        const hiddenSections = document.querySelectorAll('.d-none');
        hiddenSections.forEach( section => section.classList.remove('d-none'));
    }

    static _showMenu(menu){
        console.log(menu);
        const content = document.querySelector('#platillos .contenido');

        
        menu.forEach(  dish => {
            const {id, nombre, precio, categoria} = dish;

            const  row = document.createElement('div');
            row.classList.add('row','py-3', 'border-top');

            const p_name = document.createElement('p');
            p_name.classList.add('col-md-4');
            p_name.textContent = nombre;

            const p_precio = document.createElement('p');
            p_precio.classList.add('col-md-3', 'fw-bold');
            p_precio.textContent = `$${precio}`;

            const p_category = document.createElement('p');
            p_category.classList.add('col-md-3');
            p_category.textContent = category[categoria];

            const i_cant = document.createElement('input');
            i_cant.type = 'number';
            i_cant.min = 0;
            i_cant.value = 0;
            i_cant.id = `product-${id}`;
            i_cant.classList.add('form-control');

            const inputBox = document.createElement('div');
            inputBox.classList.add('col-md-2');
            inputBox.appendChild(i_cant);

            //Add event change to input
            i_cant.onchange = () => {
                const cant = parseInt(i_cant.value);
                rm.addDish({...dish,cant}) //Create a object with dish and cant
                
            };

            row.appendChild(p_name);
            row.appendChild(p_precio);
            row.appendChild(p_category);
            row.appendChild(inputBox);
            content.appendChild(row);
        })
    }

    static _showOrderDetail(){
        
        UI.clearHTML(contenido);
        UI.clearHTML(headingMaster)

        const resumen = document.createElement('div');
        resumen.classList.add('col-md-6', 'card', 'py-2', 'px-3', 'shadow');

        const headingTable = document.createElement('H5');
        headingTable.classList.add('my-2','text-center');
        headingTable.innerHTML = `Mesa: ${clienteObj.mesa} -- Hora: ${clienteObj.hora}`;
        headingMaster.appendChild(headingTable);


         // Mostrar los platillos Consumidos!
        const heading = document.createElement('H3');
        heading.textContent = 'Platillos Pedidos';
        heading.classList.add('my-4','text-center');

        const group = document.createElement('ul');
        group.classList.add('list-group');

        // Producto pedido
        const { pedidos } = clienteObj;
        pedidos.forEach( dish => {

            const { nombre, cant, precio, id } = dish;

            const lista = document.createElement('li');
            lista.classList.add('list-group-item');

            const name = document.createElement('h4');
            name.classList.add('my-4');
            name.textContent = nombre;

            //P - Span to cant
            const cantText = document.createElement('P');        
            cantText.classList.add('fw-bold');
            cantText.textContent = 'Cantidad: ';

            const cantvalue = document.createElement('span');
            cantvalue.classList.add('fw-normal');
            cantvalue.textContent = cant;

            //P - Span To Price
            const priceText = document.createElement('P');
            priceText.classList.add('fw-bold');
            priceText.textContent = 'Precio: ';

            const priceValue = document.createElement('span');
            priceValue.classList.add('fw-normal');
            priceValue.textContent = `$${precio}`;

            //P - Span To Subtotal
            const SubtotalText = document.createElement('P');
            SubtotalText.classList.add('fw-bold');
            SubtotalText.textContent = 'Subtotal: ';

            const SubtotalValue = document.createElement('span');
            SubtotalValue.classList.add('fw-normal');
            SubtotalValue.textContent = `$${precio*cant}`; //Subtotal = price * cant

            const deleteBtn = document.createElement('button');
            deleteBtn.classList.add('btn', 'btn-danger');
            deleteBtn.textContent = 'Eliminar del Pedido';

            deleteBtn.onclick = () => {rm.deleteDish(id)}; //Event onlcick to delete 

            //Add spans to texts
            cantText.appendChild(cantvalue);
            priceText.appendChild(priceValue);
            SubtotalText.appendChild(SubtotalValue);

            //Add to LI
            lista.appendChild(name);
            lista.appendChild(cantText);
            lista.appendChild(priceText);
            lista.appendChild(SubtotalText);
            lista.appendChild(deleteBtn);

            //Add LI to UL
            group.appendChild(lista);

        });
        
        //Add UL to resumen
        resumen.appendChild(heading);
        resumen.appendChild(group);
        //Add elements to Content
        contenido.appendChild(resumen);

        //Show TipForm
        UI._showTipFrom();

    }
    static _showTipFrom(){

        const form = document.createElement('div');
        form.classList.add('col-md-6');

        const divForm = document.createElement('div');
        divForm.classList.add('card', 'py-2', 'px-3', 'shadow', 'tipForm');

        const heading = document.createElement('H3');
        heading.textContent = 'Propinas';
        heading.classList.add('my-4','text-center');

        //             CHECK BOX DOOM SCRIPTING              //
        // Propina 10%
        const checkBox10 = document.createElement('input');
        checkBox10.type = "radio";
        checkBox10.name = 'propina';
        checkBox10.value = "10";
        checkBox10.classList.add('form-check-input');
        checkBox10.onclick = ()=>{ rm.calculateTip(0.10) };

        const checkLabel10 = document.createElement('label');
        checkLabel10.textContent = '10%';
        checkLabel10.classList.add('form-check-label');

        //Div to join check and label
        const checkDiv10 = document.createElement('div');
        checkDiv10.classList.add('form-check');
        checkDiv10.appendChild(checkBox10);
        checkDiv10.appendChild(checkLabel10);

        // Propina 25%
        const checkBox25 = document.createElement('input');
        checkBox25.type = "radio";
        checkBox25.name = 'propina';
        checkBox25.value = "25";
        checkBox25.classList.add('form-check-input');
        checkBox25.onclick = ()=>{ rm.calculateTip(0.25) };

        const checkLabel25 = document.createElement('label');
        checkLabel25.textContent = '25%';
        checkLabel25.classList.add('form-check-label');

        //Div to join check and label
        const checkDiv25 = document.createElement('div');
        checkDiv25.classList.add('form-check');
        checkDiv25.appendChild(checkBox25);
        checkDiv25.appendChild(checkLabel25);

        // Propina 50%
        const checkBox50 = document.createElement('input');
        checkBox50.type = "radio";
        checkBox50.name = 'propina';
        checkBox50.value = "50";
        checkBox50.classList.add('form-check-input');
        checkBox50.onclick = ()=>{ rm.calculateTip(0.50) };

        const checkLabel50 = document.createElement('LABEL');
        checkLabel50.textContent = '50%';
        checkLabel50.classList.add('form-check-label');

        //Div to join check and label
        const checkDiv50 = document.createElement('div');
        checkDiv50.classList.add('form-check');
        checkDiv50.appendChild(checkBox50);
        checkDiv50.appendChild(checkLabel50);

        //----------------------------------------------//
        //Add elements to divForm
        divForm.appendChild(heading);
        divForm.appendChild(checkDiv10);
        divForm.appendChild(checkDiv25);
        divForm.appendChild(checkDiv50);

        //Add elements to form
        form.appendChild(divForm);
    
        //Add elements to Content
        contenido.appendChild(form);
    }

    static _showTotals(subtotal, tip, total){
        if(document.querySelector('.total-pagar')){
            document.querySelector('.total-pagar').remove();
        };

        const tipForm =  document.querySelector('.tipForm');
        const divTotales = document.createElement('div');
        divTotales.classList.add('total-pagar');

        // Subtotal
        const subtotalParrafo = document.createElement('P');
        subtotalParrafo.classList.add('fs-3', 'fw-bold', 'mt-2');
        subtotalParrafo.textContent = 'Subtotal Consumo: ';

        const subtotalSpan = document.createElement('span');
        subtotalSpan.classList.add('fw-normal');
        subtotalSpan.textContent = `$${subtotal}`;
        subtotalParrafo.appendChild(subtotalSpan);

        // Tips
        const tipsParrafo = document.createElement('P');
        tipsParrafo.classList.add('fs-3', 'fw-bold', 'mt-2');
        tipsParrafo.textContent = 'Propina: ';

        const tipsSpan = document.createElement('span');
        tipsSpan.classList.add('fw-normal');
        tipsSpan.textContent = `$${tip}`;
        tipsParrafo.appendChild(tipsSpan);


        // Total
        const totalParrafo = document.createElement('P');
        totalParrafo.classList.add('fs-3', 'fw-bold', 'mt-2');
        totalParrafo.textContent = 'Total Consumo: ';

        const totalSpan = document.createElement('span');
        totalSpan.classList.add('fw-normal');
        totalSpan.textContent = `$${total}`;
        totalParrafo.appendChild(totalSpan);

        //Add values to Divs
        divTotales.appendChild(subtotalParrafo);
        divTotales.appendChild(tipsParrafo);
        divTotales.appendChild(totalParrafo);


        //Add to divTotales to DivForm
        tipForm.appendChild(divTotales);

    }

    static clearHTML(content){
        
        if (content) {  
            while(content.firstChild){
                content.removeChild(content.firstChild);
            }
        }
    }
}

class RM{//Restaurant Management

    validateForm(){
        const mesa = document.querySelector('#mesa').value;
        const hora = document.querySelector('#hora').value;

        const validate = [mesa,hora].some(field => field === ''); //Return true if at least on field is empty
        
        if (validate) {
            UI.errorMessage();
            return;
        }

        clienteObj = {...clienteObj, mesa, hora}; //Create the client

        //Hide Modal
        const modal = bootstrap.Modal.getInstance(form); 
        modal.hide();

        rm.getMenu();
    }

    getMenu(){
        UI.showSections();
        //Online 'https://restaurant-managment.netlify.app/db.json'
        const url = 'http://localhost:3000/platillos'
        fetch(url)
            .then(data => data.json())
            .then(result => UI._showMenu(result)) //Online result.platillos
            .catch(error => console.log(error))
    }

    addDish(product){
        if (product.cant === 0) {
            clienteObj.pedidos = clienteObj.pedidos.filter( dish => dish.id !== product.id);
            return;
        }

        const {pedidos} = clienteObj;
        if (pedidos.some( dish => dish.id === product.id)) { //Check if order exist

            clienteObj.pedidos.forEach( pedido =>{ // Change order cant
                if (pedido.id === product.id) {
                    pedido.cant = product.cant;
                }
            })
        }else{
            clienteObj.pedidos = [...pedidos, product];
        }
        UI._showOrderDetail();
    }

    deleteDish(id){
        clienteObj.pedidos =  clienteObj.pedidos.filter( (pedido)=> pedido.id !== id);
        document.getElementById(`product-${id}`).value = 0; //Restart cant 
        

        if (clienteObj.pedidos.length === 0) { //Delete tip form when the order doesn´t exist
            UI.clearHTML(contenido)
        }else{
            UI._showOrderDetail();
        }
    }
    calculateTip(percentage){
        let tip,subtotal = 0,total;
        clienteObj.pedidos.forEach((dish)=>{
            const {nombre, cant, precio, id } = dish;
            subtotal += cant * precio;
        })
        tip = parseInt(subtotal * percentage);
        total = parseInt(subtotal + tip); // Adding tip to Total

        UI._showTotals(subtotal,tip,total);
    }
}

//Class Declaration
const rm  = new RM();

//Object Literals
let clienteObj = {
    mesa: '',
    hora: '',
    pedidos: []
}

const category = {
    1:'comida',
    2:'bebida',
    3:'postres',
}

//Event Listeners
evetListener();
function evetListener(){
    sbutton.addEventListener('click', rm.validateForm);
}