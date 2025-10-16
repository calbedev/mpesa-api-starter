"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Spinner } from "@/components/ui/spinner"
import { CheckCircle2, XCircle } from "lucide-react"

interface TestFormWrapperProps {
  title: string
  description: string
  children: React.ReactNode
  onSubmit: (data: any) => Promise<any>
}

export function TestFormWrapper({ title, description, children, onSubmit }: TestFormWrapperProps) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const formData = new FormData(e.currentTarget)
      const data = Object.fromEntries(formData.entries())
      const result = await onSubmit(data)
      setResponse(result)
    } catch (err: any) {
      setError(err.message || "Erro ao processar requisição")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {children}
          </form>
        </CardContent>
      </Card>

      {loading && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center gap-3">
              <Spinner className="w-5 h-5" />
              <span className="text-muted-foreground">Processando requisição...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <XCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {response.success ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Resposta Recebida
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-600" />
                  Erro na Requisição
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">{JSON.stringify(response, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
