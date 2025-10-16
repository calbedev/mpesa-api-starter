"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TestFormWrapper } from "@/components/test-form-wrapper"

export default function QueryCustomerTestPage() {
  const handleSubmit = async (data: any) => {
    const apiKey = data.apiKey

    const params = new URLSearchParams({
      customerMSISDN: data.customerMSISDN,
      thirdPartyReference: data.thirdPartyReference,
      serviceProviderCode: data.serviceProviderCode,
    })

    const response = await fetch(`/api/mpesa/query-customer?${params}`, {
      method: "GET",
      headers: {
        "x-api-key": apiKey,
      },
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
          title="Query Customer Name Test"
          description="Consulte o nome mascarado de um cliente M-Pesa"
          onSubmit={handleSubmit}
        >
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey">API Secret Key *</Label>
              <Input id="apiKey" name="apiKey" type="password" placeholder="Sua chave secreta da API" required />
            </div>

            <div>
              <Label htmlFor="customerMSISDN">Customer MSISDN *</Label>
              <Input id="customerMSISDN" name="customerMSISDN" placeholder="258843330333" required />
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

            <Button type="submit" className="w-full">
              Consultar Cliente
            </Button>
          </div>
        </TestFormWrapper>
      </div>
    </div>
  )
}
