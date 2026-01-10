import useUserContext from '@renderer/hook/useUsers';
import { useState } from 'react'

const FormClient = () => {
  const [product, setProduct] = useState<string>();
  const [reference, setReference] = useState<string>();

  const user = useUserContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    user.createUser(product, reference);
    setProduct("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Nome cliente" value={product} onChange={(e) => setProduct(e.target.value)} />
      <input type="text" placeholder="Referência" value={reference} onChange={(e) => setReference(e.target.value)} />

      <button>Enviar</button>
    </form>
  )
}

export default FormClient
