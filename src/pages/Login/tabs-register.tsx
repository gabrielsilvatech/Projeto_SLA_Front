import { Register } from '@/api/services/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

export const TabsRegister = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const handleRegister = async (data: any) => {
      setIsLoading(true);
      await Register(navigate, data);
      setIsLoading(false);
  };

  return (
    <TabsContent value="register">
    <form onSubmit={handleRegister} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="register-name">Nome Completo</Label>
        <Input id="register-name" placeholder="Seu Nome Completo" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-email">Email</Label>
        <Input id="register-email" type="email" placeholder="seu.email@empresa.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-department">Departamento</Label>
        <Input id="register-department" placeholder="Seu Departamento" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-password">Senha</Label>
        <Input id="register-password" type="password" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
        <Input id="register-confirm-password" type="password" required />
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  </TabsContent>
  )
}
