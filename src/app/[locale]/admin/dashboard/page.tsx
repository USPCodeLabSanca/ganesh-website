import { auth } from "@/auth";

export default function Page() {
  const session = auth();
  if (!session) {
    return <div>Not authenticated</div>
  }
  return (
    <div className="w-full md:mb-16">
      <div className="flex flex-col w-full justify-between">
        <h1 className={`mx-5 mb-10 text-xl md:text-2xl text-neutral-100`}>Dashboard</h1>
        <div className="bg-adminForeground rounded-md">
          <div className="m-5 text-neutral-100 text-xl">Como criar um Post?</div>
          <ol className="m-5 text-neutral-100">
            <li>Clique em Posts no menu lateral</li>
            <li>Clique em Novo Post</li>
            <li>Preencha os campos</li>
            <ul>
              <li>Escreva as informações do Post em português</li>
              <li>Salve uma imagem em qualquer repositório público do Github (necessariamente) e coloque o link</li>
              <li>Escolha o tipo do post</li>
              <li>Escolha se o post está publicado ou quer deixar como rascunho</li>
              <li>Coloque o seu username do Github (preferencialmente não erre)</li>
              <li>Ao salvar, o conteúdo criado será automaticamente traduzido para o inglês</li>
            </ul>
            <li>Clique em Salvar</li>
          </ol>
        </div>
      </div>
    </div>
  )
}