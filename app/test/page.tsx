import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function TestPage() {
  const testPages = [
    {
      title: "C2B Payment",
      description: "Teste pagamentos de cliente para negócio",
      href: "/test/c2b",
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: "B2C Payment",
      description: "Teste pagamentos de negócio para cliente",
      href: "/test/b2c",
      color: "bg-green-500/10 text-green-600",
    },
    {
      title: "B2B Payment",
      description: "Teste pagamentos entre negócios",
      href: "/test/b2b",
      color: "bg-purple-500/10 text-purple-600",
    },
    {
      title: "Reversal",
      description: "Teste reversão de transações",
      href: "/test/reversal",
      color: "bg-red-500/10 text-red-600",
    },
    {
      title: "Query Status",
      description: "Consulte o status de transações",
      href: "/test/query-status",
      color: "bg-orange-500/10 text-orange-600",
    },
    {
      title: "Query Customer",
      description: "Consulte nome mascarado do cliente",
      href: "/test/query-customer",
      color: "bg-cyan-500/10 text-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              ← Voltar
            </Button>
          </Link>
          <h1 className="text-4xl font-bold mb-4">Páginas de Teste</h1>
          <p className="text-lg text-muted-foreground">Selecione uma API para testar suas funcionalidades</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testPages.map((page) => (
            <Card key={page.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center mb-4`}>
                  <ArrowRight className="w-6 h-6" />
                </div>
                <CardTitle>{page.title}</CardTitle>
                <CardDescription>{page.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href={page.href}>
                  <Button className="w-full">
                    Testar API <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
