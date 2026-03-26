"use server";

import { SponsorSchema } from "@/lib/zod";
import { verifyAndRedirect } from "@/lib/session";
import { prisma } from "./prisma";
import translate from "translate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

translate.engine = 'deepl';
translate.key = process.env.DEEPL_API_KEY;

export type State = {
  errors?: {
    name?: string[];
    logo?: string[];
    link?: string[];
    description?: string[];
    description_en?: string[];
  };
  message?: string | null;
};

const CreateSponsor = SponsorSchema.omit({ id: true })
const UpdateSponsor = SponsorSchema.omit({ id: true })

export const createSponsor = async (prevState: State, formData: FormData): Promise<State> => {
  verifyAndRedirect();

  const validatedFields = CreateSponsor.safeParse({
    name: formData.get('name'),
    logo: formData.get('logo'),
    link: formData.get('link'),
    description: formData.get('description'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Sponsor.',
    };
  }

  let description_en = '';
  if (validatedFields.data.description !== undefined && validatedFields.data.description !== '') {
    description_en = await translate(validatedFields.data.description, { from: 'pt', to: 'en' });
  }

  try {
    await prisma.sponsor.create({
      data: {
        name: validatedFields.data.name,
        logo: validatedFields.data.logo,
        link: validatedFields.data.link,
        description: validatedFields.data.description,
        description_en: description_en,
      },
    });

  } catch (e) {
    console.error(e);
    return { message: 'Failed to create Sponsor.' };
  }

  revalidatePath('/br/admin/dashboard/sponsors');
  redirect('/br/admin/dashboard/sponsors');
}

export const updateSponsor = async (prevState: State, formData: FormData, id: string): Promise<State> => {
  verifyAndRedirect();

  const validatedFields = UpdateSponsor.safeParse({
    name: formData.get('name'),
    logo: formData.get('logo'),
    link: formData.get('link'),
    description: formData.get('description'),
    description_en: formData.get('description_en'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Sponsor.',
    };
  }

  try {
    await prisma.sponsor.update({
      where: {
        id,
      },
      data: validatedFields.data,
    });

  } catch (e) {
    console.error(e);
    return { message: 'Failed to update Sponsor.' };
  }

  revalidatePath('/br/admin/dashboard/sponsors');
  redirect('/br/admin/dashboard/sponsors');
}

export const deleteSponsor = async (id: string): Promise<void> => {
  verifyAndRedirect();

  try {
    await prisma.sponsor.delete({
      where: {
        id,
      },
    });

  } catch (e) {
    console.error(e);
  }

  revalidatePath('/br/admin/dashboard/sponsors');
  redirect('/br/admin/dashboard/sponsors');
}