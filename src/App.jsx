import React, { useEffect, useState } from 'react';
import { firebase } from './firebase'


function App() {

  const [tareas, setTareas] = useState([]);
  const [tarea, setTarea] = useState('');
  const [modoEdicion, setModoEdicion] = useState(false)



  useEffect(() => {

    const obtenerDatos = async() => {
        try {

          const db = firebase.firestore();
          const data = await db.collection('tareas').get();
          const arr = await data.docs.map(res => ({id: res.id,...res.data()}));
          setTareas(arr);
          console.log(arr);

          
        } catch (error) {
          console.log(error);
        }
    }
    obtenerDatos();

  },[]);



  // formCrearTareas
  const formCrearTarea = async(e) => {
    e.preventDefault();
    // console.log(tarea);

    if(!tarea.trim()){
      console.log('El campo está vacio.');
      return;
    }

    try {
      const db = firebase.firestore();//Se instancia firebase
      const nuevaTarea = {name: tarea,fecha: Date.now()}//Se crea la tarea con los parámetros requeridos.
      const addTareaDB = await db.collection('tareas').add(nuevaTarea);//se guaqrda la nueva tarea en una constante.
      setTareas([...tareas,{...nuevaTarea,id:addTareaDB.id}])//Con esta linea , refrescamos la data y nos muestra los valores de una ves.
      setTarea('');
      
    } catch (error) {
      console.log(error);
    }
  }
  // formCrearTareas



  // formEditarTarea
  const formEditarTarea = (e) => {
    e.preventDefault();
    console.log(tarea);

    if(!tarea.trim()){
      console.log('El campo está vacio.');
      return;
    }

    setTarea('');
  }
  // formEditarTarea



  // EditarTarea
  const EditarTarea =(tarea) => {
    setModoEdicion(true);
    setTarea(tarea.name)
  }
  // EditarTarea



  // Función Eliminar Tareas
  const eliminarTarea = async(id) => {
    try {
      const db = firebase.firestore();//Instanciamos la base de datos
      await db.collection('tareas').doc(id).delete();
      const arrFiltrado = tareas.filter(tareas => tareas.id !==id);
      setTareas(arrFiltrado);
    } catch (error) {
      console.log(error);
    }
  }
  // Función Eliminar Tareas

  return (
    <div className='container mt-4'>
    <h1 className='text-center'>CRUD FireStore</h1>
    <hr />

    <div className="row">

      {/*Listar tareas */}
      <div className="col-8">
        <h4 className="text-center">Lista de Tareas</h4>
        <ul className="list-group">
          {
            tareas.map(tarea => (
              <li className="list-group-item" key={tarea.id}>
              <span className="lead">{tarea.name}</span>
                <button className="btn btn-warning btn-sm float-end mx-1" onClick={()=>EditarTarea(tarea)}>Editar</button>
                <button className="btn btn-danger btn-sm float-end" onClick={()=> eliminarTarea(tarea.id)}>Eliminar</button>
            </li>
            ))
          }
        </ul>
      </div>
      {/*Listar tareas */}

      {/*Crear tareas */}
      <div className="col-4">
        <h4 className="text-center">{modoEdicion ? 'Editar Tarea' : 'Crear Tarea'}</h4>
        <form onSubmit={modoEdicion ? formEditarTarea : formCrearTarea}>
          <input 
            type="text" 
            className="form-control mb-2" 
            placeholder='Ingrese Tarea'
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
            />
          <button className={modoEdicion ? "btn btn-warning w-100" : "btn btn-dark w-100"} type='submit'>{modoEdicion ? 'Editar': 'Agregar'}</button>
        </form>
      </div>
      {/*Crear tareas */}

    </div>
  </div>
  );
}

export default App;
