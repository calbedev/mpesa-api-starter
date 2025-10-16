import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Check required environment variables
    const requiredEnvVars = {
      MPESA_API_KEY: process.env.MPESA_API_KEY,
      MPESA_PUBLIC_KEY: process.env.MPESA_PUBLIC_KEY,
      MPESA_API_URL: process.env.MPESA_API_URL,
      API_SECRET_KEY: process.env.API_SECRET_KEY,
    }

    // Check optional but recommended environment variables
    const optionalEnvVars = {
      MPESA_SERVICE_PROVIDER_CODE: process.env.MPESA_SERVICE_PROVIDER_CODE,
      MPESA_INITIATOR_IDENTIFIER: process.env.MPESA_INITIATOR_IDENTIFIER,
      MPESA_SECURITY_CREDENTIAL: process.env.MPESA_SECURITY_CREDENTIAL,
    }

    const missingRequired = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    const missingOptional = Object.entries(optionalEnvVars)
      .filter(([_, value]) => !value)
      .map(([key]) => key)

    // If required variables are missing, return error
    if (missingRequired.length > 0) {
      return NextResponse.json(
        {
          status: "error",
          message: `Configuração incompleta. Variáveis obrigatórias faltando: ${missingRequired.join(", ")}`,
          missingRequired,
          missingOptional,
          timestamp: new Date().toISOString(),
          configured: false,
          details: {
            requiredConfigured: Object.keys(requiredEnvVars).length - missingRequired.length,
            requiredTotal: Object.keys(requiredEnvVars).length,
            optionalConfigured: Object.keys(optionalEnvVars).length - missingOptional.length,
            optionalTotal: Object.keys(optionalEnvVars).length,
          },
        },
        { status: 503 },
      )
    }

    // Check if API URL is reachable (basic validation)
    const apiUrl = process.env.MPESA_API_URL
    const isValidUrl = apiUrl && (apiUrl.includes("sandbox") || apiUrl.includes("vm.co.mz"))

    // All required variables are present
    const warnings = []
    if (missingOptional.length > 0) {
      warnings.push(
        `Variáveis opcionais não configuradas: ${missingOptional.join(", ")}. Algumas funcionalidades podem não funcionar.`,
      )
    }

    return NextResponse.json({
      status: "ok",
      message: "API configurada e pronta para uso",
      environment: process.env.MPESA_USE_SSL === "true" ? "Production (SSL)" : "Sandbox",
      serviceProviderCode: process.env.MPESA_SERVICE_PROVIDER_CODE || "Não configurado",
      configured: true,
      warnings: warnings.length > 0 ? warnings : undefined,
      timestamp: new Date().toISOString(),
      details: {
        apiUrl: apiUrl,
        sslEnabled: process.env.MPESA_USE_SSL === "true",
        hasServiceProvider: !!process.env.MPESA_SERVICE_PROVIDER_CODE,
        hasInitiatorId: !!process.env.MPESA_INITIATOR_IDENTIFIER,
        hasSecurityCredential: !!process.env.MPESA_SECURITY_CREDENTIAL,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: "Erro ao verificar status da API",
        timestamp: new Date().toISOString(),
        configured: false,
      },
      { status: 500 },
    )
  }
}
