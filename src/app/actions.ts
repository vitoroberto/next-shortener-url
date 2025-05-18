"use server";

import { ActionResponse, AddressFormData } from "@/components/form";
import prisma from "@/lib/db";
import { z } from "zod";

const urlSchema = z.object({
  url: z.string().url().trim().toLowerCase().min(1, "url é obrigatório!"),
  slug: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "slug é obrigatório!")
    .max(40, "slug é muito longo!")
    .regex(
      /^[a-z0-9\sáàâãéèêíïóôõöúçñ]+$/,
      "slug deve conter apenas letras, números e espaços!",
    )
    .transform((slug) => slug.replace(/\s+/g, "-")),
});

export async function createShortUrl(
  prevState: ActionResponse | null,
  formData: FormData,
): Promise<ActionResponse> {
  const rawData: AddressFormData = {
    url: formData.get("url") as string,
    slug: formData.get("slug") as string,
  };

  const validatedData = urlSchema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      errors: validatedData.error.flatten().fieldErrors,
      defaultValue: rawData,
    };
  }

  try {
    const slugAlreadyExists = await prisma.url.findUnique({
      where: {
        slug: validatedData.data.slug,
      },
    });

    if (slugAlreadyExists) {
      return {
        success: false,
        message: "Slug já existe!",
        defaultValue: rawData,
      };
    }

    const shortenedUrl = await prisma.url.create({
      data: {
        slug: validatedData.data.slug,
        originalUrl: validatedData.data.url,
      },
    });

    return {
      success: true,
      slug: shortenedUrl.slug,
      originalUrl: shortenedUrl.originalUrl,
    };
  } catch {
    return {
      success: false,
      message: "Ocorreu um erro inesperado ao criar o link encurtado!",
    };
  }
}
