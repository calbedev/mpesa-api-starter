import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, FileText, TestTube } from "lucide-react"
import { ApiStatus } from "@/components/api-status"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            M-Pesa API Gateway
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Integração completa com as APIs do M-Pesa para pagamentos C2B, B2C, B2B, reversões e consultas
          </p>
          
        </div>
        <ApiStatus />
        <div className="mt-4"/>
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>APIs Disponíveis</CardTitle>
              <CardDescription>6 endpoints completos para todas as operações M-Pesa</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• C2B Payment (Customer to Business)</li>
                <li>• B2C Payment (Business to Customer)</li>
                <li>• B2B Payment (Business to Business)</li>
                <li>• Transaction Reversal</li>
                <li>• Query Transaction Status</li>
                <li>• Query Customer Name</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                <TestTube className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>Páginas de Teste</CardTitle>
              <CardDescription>Interface interativa para testar cada endpoint</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Teste todas as funcionalidades com formulários intuitivos e visualização de respostas em tempo real.
              </p>
              <Link href="/test">
                <Button variant="outline" className="w-full bg-transparent">
                  Ir para Testes <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>Documentação</CardTitle>
              <CardDescription>Guia completo de integração e exemplos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Aprenda como integrar as APIs no seu frontend com exemplos práticos e detalhados.
              </p>
              <Link href="/docs">
                <Button variant="outline" className="w-full bg-transparent">
                  Ver Documentação <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Começar Agora</CardTitle>
            <CardDescription>Siga estes passos para começar a usar a API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Configure as variáveis de ambiente</h3>
                <p className="text-sm text-muted-foreground">
                  Copie o arquivo .env.example e preencha com suas credenciais do M-Pesa
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">Obtenha sua API Secret Key</h3>
                <p className="text-sm text-muted-foreground">
                  Defina uma chave secreta para autenticar suas requisições
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Faça sua primeira requisição</h3>
                <p className="text-sm text-muted-foreground">
                  Use as páginas de teste ou integre diretamente no seu frontend
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
