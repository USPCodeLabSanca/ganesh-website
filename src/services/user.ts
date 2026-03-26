'use server'

import { z } from "zod";
import { prisma } from "@/services/prisma";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { verifyAndRedirect } from "@/lib/session";

const FormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3).max(50),
  password: z.string().min(8),
  role: z.enum(['USER', 'ADMIN'])
})

const CreateUser = FormSchema;

export const createUser = async (formData: FormData) => {
  verifyAndRedirect();

  const validatedFields = CreateUser.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    role: formData.get('role') as 'USER' | 'ADMIN',
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error }
  }

  try {
    await prisma.user.create({
      data: {
        ...validatedFields.data,
      }
    })
  } catch (e) {
    return {
      error: e,
      message: 'Database Error: Could not create user',
    }
  }

  revalidatePath('/users');
  redirect('/users');
}

export const updateUser = async (id: string, formData: FormData) => {
  verifyAndRedirect();

  const validatedFields = CreateUser.safeParse({
    email: formData.get('email'),
    name: formData.get('name'),
    password: formData.get('password'),
    role: formData.get('role') as 'USER' | 'ADMIN',
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error }
  }

  try {
    await prisma.user.update({
      where: { id },
      data: {
        ...validatedFields.data,
      }
    })
  } catch (e) {
    return {
      error: e,
      message: 'Database Error: Could not update user',
    }
  }

  revalidatePath('/users');
  redirect('/users');
}

export const deleteUser = async (id: string) => {
  verifyAndRedirect();

  try {
    await prisma.user.delete({
      where: { id }
    })
  } catch (e) {
    return {
      error: e,
      message: 'Database Error: Could not delete user',
    }
  }

  revalidatePath('/users');
  redirect('/users');
}
