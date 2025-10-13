"use client";

import Modal from '@/components/modal';
import { useActionState } from '@/lib/utils/hooks';
import { createVideo, deleteVideo, State, updateVideo } from '@/services/video';
import { useState } from 'react';
import ErrorMessages from '../posts/error-messages';
import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export const CreateVideo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createVideo, initialState);
  return (
    <>
      {isModalOpen && (
        <Modal
          onRequestClose={() => { setIsModalOpen(false) }}>
          <form action={formAction}>
            <div className="md:p-4">
              <h2 className="md:text-lg font-bold">Adicionar um vídeo</h2>
              <div className="mt-4">
                <label htmlFor="title" className="text-sm font-medium">Título do vídeo</label>
                <input type="text" name="title" id="title" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="title-error" errors={state?.errors?.title} />
              </div>
              <div className="mt-4">
                <label htmlFor="title_en" className="text-sm font-medium">Título do vídeo [inglês]</label>
                <input type="text" name="title_en" id="title_en" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="title_en-error" errors={state?.errors?.title_en} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-sm font-medium">Descrição do vídeo</label>
                <input type="text" name="description" id="description" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="description-error" errors={state?.errors?.description} />
              </div>
              <div className="mt-4">
                <label htmlFor="description_en" className="text-sm font-medium">Descrição do vídeo [inglês]</label>
                <input type="text" name="description_en" id="description_en" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="description_en-error" errors={state?.errors?.description_en} />
              </div>
              <div className="mt-4">
                <label htmlFor="url" className="text-sm font-medium">URL</label>
                <input type="text" name="url" id="url" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="url-error" errors={state?.errors?.url} />
              </div>
              <div className="mt-4">
                <label htmlFor="thumbnail" className="text-sm font-medium">Thumbnail</label>
                <input type="text" name="thumbnail" id="thumbnail" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="thumbnail-error" errors={state?.errors?.thumbnail} />
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
        className='cursor-pointer flex items-center justify-center text-white text-3xl rounded-md text-mono w-48 h-96 bg-adminBackground border-[2px] border-background hover:bg-adminForeground hover:border-white'>
        <PlusIcon className='w-10' />
      </button>
    </>
  )
}

interface UpdateVideoProps {
  id: string;
  title: string;
  title_en: string;
  description: string;
  description_en: string;
  url: string;
  thumbnail: string;
}

export const UpdateVideo = ({ id, title, title_en, description, description_en, url, thumbnail }: UpdateVideoProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const initialState: State = { message: null, errors: {} };
  const updateVideoWithId = (state: State, formData: FormData) => updateVideo(state, formData, id);
  const [state, formAction] = useActionState(updateVideoWithId, initialState);

  return (
    <>
      {isModalOpen && (
        <Modal
          onRequestClose={() => { setIsModalOpen(false) }}>
          <form action={formAction}>
            <div className="md:p-4 overflow-y-auto text-base">
              <h2 className="md:text-lg font-bold">Atualizar um patrocinador</h2>
              <div className="mt-4">
                <label htmlFor="title" className="text-sm font-medium">Nome do patrocinador</label>
                <input
                  defaultValue={title}
                  type="text" name="title" id="title" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="title-error" errors={state?.errors?.title} />
              </div>
              <div className="mt-4">
                <label htmlFor="title_en" className="text-sm font-medium">Nome do patrocinador [inglês]</label>
                <input
                  defaultValue={title_en}
                  type="text" name="title_en" id="title_en" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="title_en-error" errors={state?.errors?.title_en} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-sm font-medium">Descrição do patrocinador</label>
                <input
                  defaultValue={description}
                  type="text" name="description" id="description" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="description-error" errors={state?.errors?.description} />
              </div>
              <div className="mt-4">
                <label htmlFor="description_en" className="text-sm font-medium">Descrição do patrocinador [inglês]</label>
                <input
                  defaultValue={description_en}
                  type="text" name="description_en" id="description_en" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="description_en-error" errors={state?.errors?.description_en} />
              </div>
              <div className="mt-4">
                <label htmlFor="url" className="text-sm font-medium">URL</label>
                <input
                  defaultValue={url}
                  type="text" name="url" id="url" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="url-error" errors={state?.errors?.url} />
              </div>
              <div className="mt-4">
                <label htmlFor="thumbnail" className="text-sm font-medium">Thumbnail</label>
                <input
                  defaultValue={thumbnail}
                  type="text" name="thumbnail" id="thumbnail" className="w-full p-2 border border-gray-400 rounded-md" />
                <ErrorMessages id="thumbnail-error" errors={state?.errors?.thumbnail} />
              </div>

              <div className="flex justify-around mt-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground hover:text-white">
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

export const DeleteVideo = ({ id }: { id: string }) => {
  const deleteVideoWithId = deleteVideo.bind(null, id);
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      {isModalOpen && (
        <Modal onRequestClose={() => setIsModalOpen(false)}>
          <div className="p-4 text-base">
            <h2 className="text-lg font-bold text-black">Você tem certeza de que quer deletar o vídeo?</h2>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md border p-2 border-gray-400 hover:border-white hover:bg-adminForeground text-gray-400 hover:text-white">
                Cancelar
              </button>
              <form action={deleteVideoWithId}>
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