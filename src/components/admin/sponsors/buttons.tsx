"use client";

import Modal from '@/components/modal';
import { useActionState } from '@/lib/utils/hooks';
import { createSponsor, deleteSponsor, State, updateSponsor } from '@/services/sponsor';
import { useState } from 'react';
import ErrorMessages from '../posts/error-messages';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export const CreateSponsor = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createSponsor, initialState);
  return (
    <>
      {isModalOpen && (
        <Modal
          onRequestClose={() => { setIsModalOpen(false) }}>
          <form action={formAction}>
            <div className="md:p-4">
              <h2 className="md:text-lg font-bold">Adicionar um patrocinador</h2>
              <div className="mt-4">
                <label htmlFor="name" className="text-sm font-medium">Nome do patrocinador</label>
                <input type="text" name="name" id="name" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="name-error" errors={state?.errors?.name} />
              </div>
              <div className="mt-4">
                <label htmlFor="link" className="text-sm font-medium">Link</label>
                <input type="text" name="link" id="link" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="link-error" errors={state?.errors?.link} />
              </div>
              <div className="mt-4">
                <label htmlFor="logo" className="text-sm font-medium">Logo</label>
                <input type="text" name="logo" id="logo" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="logo-error" errors={state?.errors?.logo} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-sm font-medium">Descrição [opcional]</label>
                <textarea rows={2} name="description" id="description" className="w-full p-2 border border-gray-400 rounded-md" />
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white">
                  Cancel
                </button>
                <button className="cursor-pointer rounded-md border p-2 bg-green-600 text-white hover:bg-green-700">Create</button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className='cursor-pointer flex items-center justify-center text-white text-3xl rounded-md text-mono w-48 h-48 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white'>
        <PlusIcon className='w-10' />
      </button>
    </>
  )
}

interface UpdateSponsorProps {
  id: string;
  name: string;
  logo: string;
  link: string;
  description?: string;
  description_en?: string;
}

export const UpdateSponsor = ({ id, name, logo, link, description, description_en }: UpdateSponsorProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialState: State = { message: null, errors: {} };
  const updateSponsorWithId = (state: State, formData: FormData) => updateSponsor(state, formData, id);
  const [state, formAction] = useActionState(updateSponsorWithId, initialState);

  return (
    <>
      {isModalOpen && (
        <Modal
          onRequestClose={() => { setIsModalOpen(false) }}>
          <form action={formAction}>
            <div className="md:p-4 overflow-y-auto text-base">
              <h2 className="md:text-lg font-bold">Atualizar um patrocinador</h2>
              <div className="mt-4">
                <label htmlFor="name" className="text-sm font-medium">Nome do patrocinador</label>
                <input
                  defaultValue={name}
                  type="text" name="name" id="name" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="name-error" errors={state?.errors?.name} />
              </div>
              <div className="mt-4">
                <label htmlFor="link" className="text-sm font-medium">Link</label>
                <input
                  defaultValue={link}
                  type="text" name="link" id="link" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="link-error" errors={state?.errors?.link} />
              </div>
              <div className="mt-4">
                <label htmlFor="logo" className="text-sm font-medium">Logo</label>
                <input
                  defaultValue={logo}
                  type="text" name="logo" id="logo" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="logo-error" errors={state?.errors?.logo} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-sm font-medium">Descrição [opcional]</label>
                <textarea
                  defaultValue={description}
                  rows={2} name="description" id="description" className="w-full p-2 border border-gray-400 rounded-md" />
              </div>
              <div className="mt-4">
                <label htmlFor="description_en" className="text-sm font-medium">Descrição [opcional]</label>
                <textarea
                  defaultValue={description_en}
                  rows={2} name="description_en" id="description_en" className="w-full p-2 border border-gray-400 rounded-md" />
              </div>
              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white">
                  Cancel
                </button>
                <button className="cursor-pointer rounded-md border p-2 bg-green-600 text-white hover:bg-green-700">Update</button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      <button
        onClick={() => setIsModalOpen(true)}
        className='cursor-pointer absolute bottom-1 right-[3.25rem] flex justify-center items-center text-white text-3xl rounded-md text-mono w-11 h-11 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white'>
        <PencilIcon className='w-7' />
      </button>
    </>
  )
}

export const DeleteSponsor = ({ id }: { id: string }) => {
  const deleteSponsorWithId = deleteSponsor.bind(null, id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onRequestClose={() => setIsModalOpen(false)}>
          <div className="p-4 text-base">
            <h2 className="text-lg font-bold">Você tem certeza de que quer deletar o patrocinador?</h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground hover:text-white">
                Cancelar
              </button>
              <form action={deleteSponsorWithId}>
                <button className="rounded-md border p-2 bg-red-600 text-white hover:bg-red-700 ">Deletar</button>
              </form>
            </div>
          </div>
        </Modal>
      )}
      <button
        onClick={() => setIsModalOpen(true)}
        className='cursor-pointer absolute bottom-1 right-1 flex justify-center items-center text-white text-3xl rounded-md text-mono w-11 h-11 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white'>
        <TrashIcon className='w-7' />
      </button>
    </>
  )
}