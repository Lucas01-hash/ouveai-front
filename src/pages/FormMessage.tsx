import { FormControl } from "@chakra-ui/form-control";
import {
  Box,
  Button,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import React, { FormEvent, useEffect, useState } from "react";
import { useForm } from "../hooks/useForm";
import { api } from "../services/api";


interface topic{
  id:number;
  name:string;
}

export function FormMessage() {
  const [topic, setTopic] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setmessage] = useState("")
  const [inputTopics, setTopicsInput] = useState<topic[]>([])


  const { createFormFinished} = useForm()

  function handleSubmit(event:FormEvent){
    event.preventDefault()
      createFormFinished({topic,
        subject,
        message})
  }
  async function getTopics(){
    let newTopics:topic[]= []
    await api.get("/entry_topic/").then((response)=>{newTopics = response.data})
    setTopicsInput(newTopics)
  }

  useEffect(()=>{
    getTopics()
    },[])

  return (
    <Box p="6" h="100%">
      <form action="" onSubmit={handleSubmit}>
        <FormControl id="tema">
          <FormLabel m="0">Tema:</FormLabel>
          <Select placeholder="selecione" onChange={(event)=>setTopic(event.target.value)}>
            {
              inputTopics.map((topicX)=>(
                <option value={topicX.id}>{topicX.name}</option>
              ))
            }
          </Select>
        </FormControl>
        <FormControl mt="3" id="assunto">
          <FormLabel m="0">Assunto:</FormLabel>
          <Input type="text" placeholder="ex: Infraestrutura"  onChange={(event)=>setSubject(event.target.value)}/>
        </FormControl>
        <FormControl mt="3" id="message">
          <FormLabel m="0">messagem:</FormLabel>
          <Textarea onChange={(event)=>setmessage(event.target.value)}></Textarea>
        </FormControl>
        <FormControl mt="3" id="image">
          <FormLabel m="0">imagem:</FormLabel>
          <Input type="file" />
        </FormControl>
        <Button w="100%" mt="auto" type="submit">
          Enviar
        </Button>
      </form>
    </Box>
  );
}
