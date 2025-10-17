import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { useAuth } from '@/app/hooks/useAuth';

const schema = z.object({
  email: z
    .string()
    .nonempty('Insira seu e-mail para entrar')
    .email('Informe um e-mail válido'),
  password: z
    .string()
    .nonempty('Insira sua senha para entrar')
    .min(4, 'A senha deve conter pelo menos 8 digitos'),
});

type Schema = z.infer<typeof schema>;

export function useLoginFormController() {
  const { signIn } = useAuth()

  const {
    handleSubmit: hookFormHandleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Schema>({
    resolver: zodResolver(schema),
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      console.log(data);
      await signIn(data.email, data.password)
      toast.success('Seja bem-vindo!')
    } catch {
      toast.error('Credenciais inválidas')
    }
  });

  return { handleSubmit, register, errors, isSubmitting };
}
