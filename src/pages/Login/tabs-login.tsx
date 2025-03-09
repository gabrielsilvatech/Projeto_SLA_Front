import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TabsContent } from '@/components/ui/tabs';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Login } from '@/api/services/auth';
import { useState } from 'react';

export const TabsLogin = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const handleLogin = async (data: any) => {
        setIsLoading(true);
        await Login(navigate, data);
        setIsLoading(false);
    };

    return (
        <TabsContent value="login">
            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 pt-4">
                <div className="space-y-2">
                    <Label htmlFor="login">Login</Label>
                    <Input
                        id="login"
                        type="text"  // Corrigido para tipo de texto
                        placeholder="nome.sobrenome"
                        required
                        {...register('login', { required: 'Login é obrigatório' })}
                    />
                    {errors.login && <p className="text-red-500 text-sm">{errors.login.message?.toString()}</p>}
                </div>

                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <Link to="#" className="text-xs text-primary hover:underline">
                            Esqueceu a senha?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        required
                        {...register('password', { required: 'Senha é obrigatória' })}
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message?.toString()}</p>}
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting || isLoading}>
                    {isLoading || isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
            </form>
        </TabsContent>
    );
};
