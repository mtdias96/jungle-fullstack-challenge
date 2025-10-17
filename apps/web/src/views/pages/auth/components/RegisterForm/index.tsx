import { FormGroup } from '@/views/components/FormGroup';
import { Button } from '@/views/components/ui/button';
import { Input } from '@/views/components/ui/input';
import { TabsContent } from '@radix-ui/react-tabs';
import { useRegisterForm } from './useRegisterFormController';

export function RegisterForm() {
  const { handleSubmit, register, isSubmitting, errors } = useRegisterForm();

  return (
    <TabsContent value="register" className="space-y-3 mt-4">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormGroup label="Nome" error={errors.name?.message}>
          <Input type="text" placeholder="Seu nome" {...register('name')} />
        </FormGroup>

        <FormGroup label="Email" error={errors.email?.message}>
          <Input
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
          />
        </FormGroup>

        <FormGroup label="Senha" error={errors.password?.message}>
          <Input
            type="password"
            placeholder="******"
            {...register('password')}
          />
        </FormGroup>

        <Button type="submit" className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </form>
    </TabsContent>
  );
}
