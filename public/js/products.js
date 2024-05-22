const btns = document.getElementsByTagName('button');

const addProductToCart = async (pId) => {
    try {
        const result = await fetch(`http://localhost:8080/api/cart/664e391cfcd9bbd2d8a060bb/product/${pId}`, {
            body: JSON.stringify({
                quantity: 1
            }),
            method: 'post',
            headers: {
               'Content-Type': 'application/json' 
            }
        });
        if(result.status === 200 || result.status === 201){
            alert('Se agregó correctamente');
        }
        else{
            alert('Error, no se pudo agregar');
        }
    } catch (error) {
        alert('Error, no se pudo agregar');
    }
}

for(let btn of btns){
    btn.addEventListener('click', (event) => {
        addProductToCart(btn.id);
       
    });
}
const deleteProduct = async (uId) =>{
    try{
        const responseProductDelete = await fetch(`http://localhost:8080/api/carts/${cId}/product/${pId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
        })
    
        if (responseProductDelete.ok)
        {
          Swal.fire({
            icon: "success",
            text: "Producto Eliminado con Exito",
            timer: 1500
          })
        }
        else
        {
          Swal.fire({
            icon: "error",
            text: "Error al eliminar el producto",
            timer: 1500
          })
        }
    
      } catch (error) {
        console.error('Hubo un error al realizar la solicitud DELETE:', error)
      }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    let btnsProduct = document.querySelectorAll('.btnEliminar')
   
  
    
    
      btnsProduct.forEach(btn => {
        btn.addEventListener('click', async (event) => {
              event.preventDefault()
              deleteProduct(event.target.id)
          })
        })})