import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/views/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger } from '@/views/components/ui/tabs';
import { LoginForm } from './components/LoginForm';
import { RegisterForm } from './components/RegisterForm';

interface AuthModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSuccess?: () => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] space-y-4">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Bem-vindo
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Entre ou crie uma conta para gerenciar suas tarefas
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Registrar</TabsTrigger>
          </TabsList>
          <LoginForm />
          <RegisterForm />
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
