"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TestFormWrapper } from "@/components/test-form-wrapper"

export default function ReversalTestPage() {
  const handleSubmit = async (data: any) => {
    const apiKey = data.apiKey
    delete data.apiKey

    const body: any = {
      transactionID: data.transactionID,
      securityCredential: data.securityCredential,
      initiatorIdentifier: data.initiatorIdentifier,
      thirdPartyReference: data.thirdPartyReference,
      serviceProviderCode: data.serviceProviderCode,
    }

    if (data.reversalAmount) {
      body.reversalAmount = data.reversalAmount
    }

    const response = await fetch("/api/mpesa/reversal", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify(body),
    })

    return await response.json()
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/test">
          <Button variant="ghost" className="mb-4">
            ← Voltar
          </Button>
        </Link>

        <TestFormWrapper
          title="Transaction Reversal Test"
          description="Teste reversão de transações M-Pesa"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Secret Key *</Label>
              <Input id="apiKey" name="apiKey" type="password" placeholder="Sua chave secreta da API" required />
            </div>

            <div>
              <Label htmlFor="transactionID">Transaction ID *</Label>
              <Input id="transactionID" name="transactionID" placeholder="49XCDF6" required />
            </div>

            <div>
              <Label htmlFor="securityCredential">Security Credential *</Label>
              <Input
                id="securityCredential"
                name="securityCredential"
                placeholder="Mpesa2019"
                defaultValue="Mpesa2019"
                required
              />
            </div>

            <div>
              <Label htmlFor="initiatorIdentifier">Initiator Identifier *</Label>
              <Input
                id="initiatorIdentifier"
                name="initiatorIdentifier"
                placeholder="MPesa2018"
                defaultValue="MPesa2018"
                required
              />
            </div>

            <div>
              <Label htmlFor="thirdPartyReference">Third Party Reference *</Label>
              <Input id="thirdPartyReference" name="thirdPartyReference" placeholder="11114" required />
            </div>

            <div>
              <Label htmlFor="serviceProviderCode">Service Provider Code *</Label>
              <Input
                id="serviceProviderCode"
                name="serviceProviderCode"
                placeholder="171717"
                defaultValue="171717"
                required
              />
            </div>

            <div>
              <Label htmlFor="reversalAmount">Reversal Amount (opcional)</Label>
              <Input
                id="reversalAmount"
                name="reversalAmount"
                type="number"
                placeholder="10 (deixe vazio para reversão total)"
              />
              <p className="text-xs text-muted-foreground mt-1">Se não especificado, será feita uma reversão total</p>
            </div>

            <Button type="submit" className="w-full">
              Enviar Requisição
            </Button>
          </div>
        </TestFormWrapper>
      </div>
    </div>
  )
}
