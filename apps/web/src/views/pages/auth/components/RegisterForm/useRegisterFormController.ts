import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/app/hooks/useAuth';

const schema = z.object({
  name: z.string().nonempty('Insira seu nome para cadastrar'),
  email: z
    .string()
    .nonempty('Insira seu e-mail para cadastrar')
    .email('Insira um e-mail valido'),
  password: z
    .string()
    .nonempty('Insira sua senha para cadastrar')
    .min(4, 'Password deve ter no mínimo 8 caracteres'),
});

type Schema = z.infer<typeof schema>;

export function useRegisterForm() {
  const { signup } = useAuth()

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log({ Form: data });
      await signup(data)
      toast.success('Seja bem-vindo!')
    } catch {
      toast.error('Credenciais inválidas')
    }

  });

  return { handleSubmit, register, errors, isSubmitting };
}
