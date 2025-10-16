import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Shield, Zap, AlertCircle } from "lucide-react"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            ← Voltar
          </Button>
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Documentação da API</h1>
          <p className="text-lg text-muted-foreground">Guia completo para integrar as APIs do M-Pesa no seu frontend</p>
        </div>

        <div className="space-y-8">
          {/* Autenticação */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-primary" />
                <CardTitle>Autenticação</CardTitle>
              </div>
              <CardDescription>Todas as requisições devem incluir uma chave de API no header</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Configure a variável <code className="bg-muted px-2 py-1 rounded">API_SECRET_KEY</code> no arquivo
                  .env
                </AlertDescription>
              </Alert>

              <div>
                <h4 className="font-semibold mb-2">Header Obrigatório:</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {`x-api-key: sua_chave_secreta_aqui`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Exemplo de Requisição:</h4>
                <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                  {`fetch('/api/mpesa/c2b', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-api-key': 'sua_chave_secreta'
                    },
                    body: JSON.stringify({...})
                  })`}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Endpoints */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Code className="w-6 h-6 text-primary" />
                <CardTitle>Endpoints Disponíveis</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="c2b" className="w-full">
                <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
                  <TabsTrigger value="c2b">C2B</TabsTrigger>
                  <TabsTrigger value="b2c">B2C</TabsTrigger>
                  <TabsTrigger value="b2b">B2B</TabsTrigger>
                  <TabsTrigger value="reversal">Reversal</TabsTrigger>
                  <TabsTrigger value="query-status">Status</TabsTrigger>
                  <TabsTrigger value="query-customer">Customer</TabsTrigger>
                </TabsList>

                <TabsContent value="c2b" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">C2B Payment</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pagamento de cliente para negócio (Customer to Business)
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-blue-500/10 text-blue-600 px-2 py-1 rounded">POST</span>
                        <code className="ml-2 text-sm">/api/mpesa/c2b</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Parâmetros:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`{
                            "transactionReference": "T12344C",
                            "customerMSISDN": "258843330333",
                            "amount": "10",
                            "thirdPartyReference": "11114",
                            "serviceProviderCode": "171717"
                          }`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Exemplo JavaScript:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`const response = await fetch('/api/mpesa/c2b', {
                              method: 'POST',
                              headers: {
                                'Content-Type': 'application/json',
                                'x-api-key': 'sua_chave_secreta'
                              },
                              body: JSON.stringify({
                                transactionReference: 'T12344C',
                                customerMSISDN: '258843330333',
                                amount: '10',
                                thirdPartyReference: '11114',
                                serviceProviderCode: '171717'
                              })
                            });

                            const data = await response.json();
                            console.log(data);
                          `}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="b2c" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">B2C Payment</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pagamento de negócio para cliente (Business to Customer)
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-blue-500/10 text-blue-600 px-2 py-1 rounded">POST</span>
                        <code className="ml-2 text-sm">/api/mpesa/b2c</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Parâmetros:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`{
                            "transactionReference": "T12344C",
                            "customerMSISDN": "258843330333",
                            "amount": "10",
                            "thirdPartyReference": "11114",
                            "serviceProviderCode": "171717"
                          }`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Exemplo React:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`const handleB2CPayment = async () => {
                            try {
                              const response = await fetch('/api/mpesa/b2c', {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                  'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                                },
                                body: JSON.stringify({
                                  transactionReference: 'T12344C',
                                  customerMSISDN: '258843330333',
                                  amount: '10',
                                  thirdPartyReference: '11114',
                                  serviceProviderCode: '171717'
                                })
                              });
                              
                              const result = await response.json();
                              
                              if (result.success) {
                                console.log('Pagamento realizado:', result.data);
                              } else {
                                console.error('Erro:', result.error);
                              }
                            } catch (error) {
                              console.error('Erro na requisição:', error);
                            }
                          };`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="b2b" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">B2B Payment</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Pagamento entre negócios (Business to Business)
                    </p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-blue-500/10 text-blue-600 px-2 py-1 rounded">POST</span>
                        <code className="ml-2 text-sm">/api/mpesa/b2b</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Parâmetros:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`{
                            "transactionReference": "T12344C",
                            "amount": "10",
                            "thirdPartyReference": "11114",
                            "primaryPartyCode": "171717",
                            "receiverPartyCode": "979797"
                          }`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reversal" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transaction Reversal</h3>
                    <p className="text-sm text-muted-foreground mb-4">Reversão de transações</p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-orange-500/10 text-orange-600 px-2 py-1 rounded">
                          PUT
                        </span>
                        <code className="ml-2 text-sm">/api/mpesa/reversal</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Parâmetros:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`{
                            "transactionID": "49XCDF6",
                            "securityCredential": "Mpesa2019",
                            "initiatorIdentifier": "MPesa2018",
                            "thirdPartyReference": "11114",
                            "serviceProviderCode": "171717",
                            "reversalAmount": "10" // opcional
                          }`}
                        </pre>
                      </div>

                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Se <code className="bg-muted px-1 rounded">reversalAmount</code> não for especificado, será
                          feita uma reversão total
                        </AlertDescription>
                      </Alert>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="query-status" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Query Transaction Status</h3>
                    <p className="text-sm text-muted-foreground mb-4">Consultar status de transação</p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-green-500/10 text-green-600 px-2 py-1 rounded">GET</span>
                        <code className="ml-2 text-sm">/api/mpesa/query-status</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Query Parameters:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`?thirdPartyReference=11114
                            &queryReference=5C1400CVRO
                            &serviceProviderCode=171717`}
                        </pre>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Exemplo:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`const params = new URLSearchParams({
                            thirdPartyReference: '11114',
                            queryReference: '5C1400CVRO',
                            serviceProviderCode: '171717'
                          });

                          const response = await fetch(
                            \`/api/mpesa/query-status?\${params}\`,
                            {
                              headers: {
                                'x-api-key': 'sua_chave_secreta'
                              }
                            }
                          );

                          const status = await response.json();`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="query-customer" className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Query Customer Name</h3>
                    <p className="text-sm text-muted-foreground mb-4">Consultar nome mascarado do cliente</p>

                    <div className="space-y-3">
                      <div>
                        <span className="font-mono text-sm bg-green-500/10 text-green-600 px-2 py-1 rounded">GET</span>
                        <code className="ml-2 text-sm">/api/mpesa/query-customer</code>
                      </div>

                      <div>
                        <h4 className="font-semibold text-sm mb-2">Query Parameters:</h4>
                        <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                          {`?customerMSISDN=258843330333
                            &thirdPartyReference=11114
                            &serviceProviderCode=171717`}
                        </pre>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Códigos de Resposta */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Zap className="w-6 h-6 text-primary" />
                <CardTitle>Códigos de Resposta</CardTitle>
              </div>
              <CardDescription>Principais códigos de status retornados pela API</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3 p-3 bg-green-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-green-600">INS-0</code>
                  <span>Request processed successfully</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-red-600">INS-1</code>
                  <span>Internal Error</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-red-600">INS-2</code>
                  <span>Invalid API Key</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-orange-600">INS-6</code>
                  <span>Transaction Failed</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-orange-600">INS-10</code>
                  <span>Duplicate Transaction</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-orange-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-orange-600">INS-20</code>
                  <span>Not All Parameters Provided</span>
                </div>
                <div className="flex items-start gap-3 p-3 bg-red-500/10 rounded-lg">
                  <code className="font-mono font-semibold text-red-600">INS-2006</code>
                  <span>Insufficient balance</span>
                </div>
              </div>

              <div className="mt-4">
                <Link href="https://developer.mpesa.vm.co.mz" target="_blank">
                  <Button variant="outline" size="sm">
                    Ver todos os códigos →
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Exemplo Completo */}
          <Card>
            <CardHeader>
              <CardTitle>Exemplo Completo - React Component</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
                {`'use client';

                import { useState } from 'react';
                import { Button } from '@/components/ui/button';

                export function PaymentForm() {
                  const [loading, setLoading] = useState(false);
                  const [result, setResult] = useState(null);

                  const handlePayment = async (e) => {
                    e.preventDefault();
                    setLoading(true);

                    try {
                      const response = await fetch('/api/mpesa/c2b', {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                          'x-api-key': process.env.NEXT_PUBLIC_API_KEY
                        },
                        body: JSON.stringify({
                          transactionReference: 'T' + Date.now(),
                          customerMSISDN: '258843330333',
                          amount: '100',
                          thirdPartyReference: 'REF' + Date.now(),
                          serviceProviderCode: '171717'
                        })
                      });

                      const data = await response.json();
                      setResult(data);

                      if (data.success) {
                        alert('Pagamento iniciado com sucesso!');
                      } else {
                        alert('Erro: ' + data.error.description);
                      }
                    } catch (error) {
                      console.error('Erro:', error);
                      alert('Erro ao processar pagamento');
                    } finally {
                      setLoading(false);
                    }
                  };

                  return (
                    <form onSubmit={handlePayment}>
                      <Button type="submit" disabled={loading}>
                        {loading ? 'Processando...' : 'Pagar com M-Pesa'}
                      </Button>
                      
                      {result && (
                        <pre className="mt-4">
                          {JSON.stringify(result, null, 2)}
                        </pre>
                      )}
                    </form>
                  );
                }`}
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
