import { FormGroup } from '@/views/components/FormGroup';
import { Button } from '@/views/components/ui/button';
import { Input } from '@/views/components/ui/input';
import { TabsContent } from '@radix-ui/react-tabs';
import { useLoginFormController } from './useLoginFormController';

export function LoginForm() {
  const { handleSubmit, register, isSubmitting, errors } =
    useLoginFormController();

  return (
    <TabsContent value="login" className="space-y-3 mt-4">
      <form className="space-y-3" onSubmit={handleSubmit}>
        <FormGroup label="Email" error={errors?.email?.message}>
          <Input
            type="email"
            placeholder="seu@email.com"
            {...register('email')}
          />
        </FormGroup>

        <FormGroup label="Senha" error={errors?.password?.message}>
          <Input
            type="password"
            placeholder="******"
            {...register('password')}
          />
        </FormGroup>

        <Button className="w-full mt-4" disabled={isSubmitting}>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </TabsContent>
  );
}
