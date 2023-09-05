import { useState, useEffect } from 'react'

//Função principal
export default function App(){

  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([])

  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
})

//componente criado na tela
  useEffect(()=> {
    const tarefaSalva = localStorage.getItem("@cursorreact")
    console.log(tarefaSalva);
  },[])

  //informar nome na lista
    function registrar(){
      if(!input){
        alert("fill in the list")
        return;
      }
      
      if(editarTarefa.enabled){
        editarTarefaSalva();
        return;
      }

      setTarefas(tarefas => [...tarefas, input])
      setInput("")
      localStorage.setItem("@cursoreact", JSON.stringify([...tarefas, input]))
    }

    function editarTarefaSalva(){
      const findIndexTarefa = tarefas.findIndex(tarefas => tarefas === editarTarefa.tarefa)
      const todasTarefas = [...tarefas];

      todasTarefas[findIndexTarefa]=input;
      setTarefas(todasTarefas);
      setEditarTarefa({
        enabled: false,
        tarefa: ''
      })
      setInput("")
      localStorage.setItem("@cursoreact", JSON.stringify(todasTarefas))
    }

    function excluir(item: string){
      const excluirTarefa = tarefas.filter(tarefas => tarefas !== item)
      setTarefas(excluirTarefa)
      localStorage.setItem("@cursoreact", JSON.stringify(excluirTarefa))
    }
    function editar(item: string){
      setInput(item)
      setEditarTarefa({
        enabled:true,
        tarefa: item
      })
    }

   return (
      <div>

        <h1>TO-DO LIST</h1>

        <input
          placeholder="Enter the task..."
          value={input}
          onChange={ (e) => setInput(e.target.value)}
        />
        <button onClick={registrar}>{editarTarefa.enabled? "Update task" : "Add task"}</button>
        <hr/>
        
        {tarefas.map( (item, index) =>(
          <section key={item}>
            <span>{item}</span>
            <button onClick={ () => excluir(item) }>Delete</button>
            <button onClick={ () => editar(item)}>To edit</button>
          </section>

        ))}
      </div>
  )
}