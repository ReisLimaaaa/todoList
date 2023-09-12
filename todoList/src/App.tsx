import { useState, useEffect, useRef, useMemo, useCallback } from 'react'

//Função principal
export default function App(){

  const inputRef = useRef<HTMLInputElement>(null);
  const primeiraR = useRef(true);

  const [input, setInput] = useState("");
  const [tarefas, setTarefas] = useState<string[]>([])

  const [editarTarefa, setEditarTarefa] = useState({
    enabled: false,
    tarefa:''
})

//componente criado na tela
  useEffect(()=> {
    const tarefaSalva = localStorage.getItem("@cursorreact")
    if (tarefaSalva) {
      setTarefas (JSON.parse(tarefaSalva));
    }
  },[])

  useEffect ( () => {
    if(primeiraR.current) {
      primeiraR.current = false
      return;
    }
    localStorage.setItem("@cursoreact", JSON.stringify(tarefas))
    console.log("useEffect chamado!")
})

  //informar nome na lista
    const registrar = useCallback(() =>{
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
     
    },[input, tarefas])

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
      
    }

    function excluir(item: string){
      const excluirTarefa = tarefas.filter(tarefas => tarefas !== item)
      setTarefas(excluirTarefa)
      
    }

    function editar(item: string){
      inputRef.current?.focus();
      setInput(item)
      setEditarTarefa({
        enabled:true,
        tarefa: item
      })
    }

    const totalTarefas = useMemo(() => {
      return tarefas.length
    }, [tarefas])

   return (
      <div>

        <h1>TO-DO LIST 🔖</h1>

        <input
          placeholder="Enter the task..."
          value={input}
          onChange={ (e) => setInput(e.target.value)}
          ref = {inputRef}
        />
        <button onClick={registrar}>{editarTarefa.enabled? "Update task" : "Add task"}</button>
        <hr/>

        <strong>você tem:{totalTarefas}</strong>
        
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