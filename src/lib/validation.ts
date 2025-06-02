import { z } from 'zod';
import { validateImageLink } from './actions';

export const formSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(500),
  category: z.string().min(3).max(20),
  link: z
    .string()
    .url()
    .refine(async (url) => {
      try {
        return await validateImageLink(url);
      } catch {
        return false;
      }
    }),
  pitch: z.string().min(10),
});
