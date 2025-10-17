import { cn } from '@/app/lib/utils';
import { Label } from '@radix-ui/react-label';
import { cloneElement } from 'react';

interface FormGroupProps {
  label?: string;
  children: React.ReactElement<{ error?: boolean }>;
  error?: string;
}

export function FormGroup({ label, children, error }: FormGroupProps) {
  return (
    <div className="space-y-1 flex flex-col gap-1">
      {label && (
        <Label className="text-sm font-medium text-primary">{label}</Label>
      )}

      {cloneElement(children, { error: !!error })}

      {error && <p className={cn('text-xs', 'text-red-500')}>{error}</p>}
    </div>
  );
}
