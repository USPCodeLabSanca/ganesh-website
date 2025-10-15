"use client";
import { useState } from 'react';

type Action<State, FormData> = (state: State, formData: FormData) => Promise<State> | State;

export function useActionState<State, FormData>(action: Action<State, FormData>, initialState: State) {
  const [state, setState] = useState<State>(initialState);

  const formAction = async (formData: FormData) => {
    const newState = await action(state, formData);
    setState(newState);
  };

  return [state, formAction] as [State, (formData: FormData) => Promise<void>];
}