import React from "react";
import  {nanoid}  from 'nanoid';  

function App() {

  const [tarea,setTarea] = React.useState('')//vamos a relacionarlo  con el input del formulario 
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion, setModoEdicion] = React.useState(false)  //inicia en false porque primero tenermo el form de agregar, para el formulario de edición 
  const [id, setId] = React.useState('')
  const [error, setError] = React.useState(null) //el null nos sirve para evaluar 

  const agregarEvento = e => {
    e.preventDefault()
    
    if (!tarea.trim()){
      console.log('evento vacio')
      setError('No hay eventos') 
      return
    }
    console.log(tarea)
    setTareas([//para visualizar en pantalla las tareas o eventos
      ...tareas,  
      {id: nanoid(), nombreTarea: tarea}

    ]); 
    setTarea('') 
    setError(null) 
  }

  const eliminarTarea = id => {
    //console.log(id)
    const arrayFiltrado = tareas.filter(item => item.id !== id) //vamos a recorrer tareas
    setTareas(arrayFiltrado)//va a modificar todo nuestro array con el array filtrado 
  }

  const editar = item => {
    console.log(item) 
    setModoEdicion(true) //lo cambiamos a verdadero, ver const usestate arriba del cod
    setTarea(item.nombreTarea)
    setId(item.id) 
  }

  const editarTarea = e => { //para validar la edición 
    e.preventDefault()
    if (!tarea.trim()){
      console.log('elemento vacio')
      setError('No hay eventos') //cuando tengamos algo en set error vamos a pintarlo en el formulario 
      return 
    }

    const arrayEditado = tareas.map(item => item.id === id ?  
      {id:id, nombreTarea:tarea} : item);   //cuando item.id vaya recorriendo sea igual al presionado vamos a devolver el objeto editado
    setTareas(arrayEditado)   //acá lo guardamos, el array edidato 
    setModoEdicion(false)
    setTarea('')
    setId('') 
    setError(null) 
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">CONSULTAS EVENTOS CIENCIAS HUMANAS</h1> 
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
          {
            
            tareas.length === 0 ? (
              <li className="list-group-item">No hay eventos por autorizar</li>

            ) : (
              tareas.map(item => (
              <li className="list-group-item" key={item.id} > 
              <span className="lead">{item.nombreTarea}</span> 

              <button className="btn btn-sm btn-danger float-right mx-2" 
              onClick={() => eliminarTarea(item.id)} 
              >
              Eliminar
              </button>

              <button className="btn btn-sm btn-warning float-right mx-2"
              onClick={() => editar(item)}
              >

              Editar
              </button>  
            </li>
            ))

            )


          }



          </ul> 

        </div>
        <div className="col-4">

          <h4 className="text-center">
            {
              modoEdicion ? 'Editar evento' : 'Agregar evento' //operador ternario 
            }
          </h4>  
          <form onSubmit={modoEdicion ? editarTarea : agregarEvento}>

            {
              error ? <spam className="text-danger">{error}</spam> : null //mostremos el error en caso que no, null. Operador ternario 
            }

            <input type="text" 
            className="form-control mb-2"
            placeholder="Ingrese tarea" 
            onChange={e=> setTarea(e.target.value)} 
            value={tarea} 
            /> 

            {
              modoEdicion ? ( //en caso de que este verdadero o falso muestre el botón correcto 
                <button className="btn btn-warning btn-block" type="submit" >Editar</button>
              ): (
                <button className="btn btn-dark btn-block" type="submit" >Agregar</button>

              )
            }
            
          </form>

        </div>


      </div>
    </div>
  );
}

export default App;
