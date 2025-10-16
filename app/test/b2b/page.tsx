"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TestFormWrapper } from "@/components/test-form-wrapper"

export default function B2BTestPage() {
  const handleSubmit = async (data: any) => {
    const apiKey = data.apiKey
    delete data.apiKey

    const response = await fetch("/api/mpesa/b2b", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
      },
      body: JSON.stringify({
        transactionReference: data.transactionReference,
        amount: data.amount,
        thirdPartyReference: data.thirdPartyReference,
        primaryPartyCode: data.primaryPartyCode,
        receiverPartyCode: data.receiverPartyCode,
      }),
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
          title="B2B Payment Test"
          description="Teste pagamentos entre negócios (Business to Business)"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Secret Key *</Label>
              <Input id="apiKey" name="apiKey" type="password" placeholder="Sua chave secreta da API" required />
            </div>

            <div>
              <Label htmlFor="transactionReference">Transaction Reference *</Label>
              <Input id="transactionReference" name="transactionReference" placeholder="T12344C" required />
            </div>

            <div>
              <Label htmlFor="amount">Amount *</Label>
              <Input id="amount" name="amount" type="number" placeholder="10" required />
            </div>

            <div>
              <Label htmlFor="thirdPartyReference">Third Party Reference *</Label>
              <Input id="thirdPartyReference" name="thirdPartyReference" placeholder="11114" required />
            </div>

            <div>
              <Label htmlFor="primaryPartyCode">Primary Party Code (Debit) *</Label>
              <Input
                id="primaryPartyCode"
                name="primaryPartyCode"
                placeholder="171717"
                defaultValue="171717"
                required
              />
            </div>

            <div>
              <Label htmlFor="receiverPartyCode">Receiver Party Code (Credit) *</Label>
              <Input id="receiverPartyCode" name="receiverPartyCode" placeholder="979797" required />
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
