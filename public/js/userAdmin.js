const changeRol = async (uId) =>{
    try{
      const responseUserRol = await fetch(`https://back-end-production-4d62.up.railway.app/api/session/${uId}/changeRol`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        }
      })
  
      console.log(responseUserRol)
      if (responseUserRol.ok)
      {
        Swal.fire({
          icon: "success",
          text: "Se modifico el Rol del usuario con Exito",
          timer: 1500
        })
      }
      else 
      {
        Swal.fire({
          icon: "error",
          text: "Error al cambiar el rol del usuario",
          timer: 1500
        })
      }
  
    } catch (error) {
      console.error('Hubo un error al realizar la solicitud POST:', error)
    }
  }
  
  const deleteUser = async (uId) =>{
    try{
        const responseUserDelete = await fetch(`https://back-end-production-4d62.up.railway.app/api/session/${uId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          }
        })
    
        if (responseUserDelete.ok)
        {
          Swal.fire({
            icon: "success",
            text: "Usuario Eliminado con Exito",
            timer: 1500
          })
        }
        else
        {
          Swal.fire({
            icon: "error",
            text: "Error al eliminar el usuario",
            timer: 1500
          })
        }
    
      } catch (error) {
        console.error('Hubo un error al realizar la solicitud DELETE:', error)
      }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    let btnsUsers = document.querySelectorAll('.btnEliminar')
    let btnsRol = document.querySelectorAll('.btnRol')
  
    
    
      btnsUsers.forEach(btn => {
        btn.addEventListener('click', async (event) => {
              event.preventDefault()
              deleteUser(event.target.id)
          })
        })
      
   
      btnsRol.forEach(btn => {
        btn.addEventListener('click', async (event) => {
              event.preventDefault()
              changeRol(event.target.id)
          })
        })
  
  })