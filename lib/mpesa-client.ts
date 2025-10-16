import crypto from "crypto"
// M-Pesa API Client utility
export interface MpesaConfig {
  apiKey: string
  publicKey: string
  apiUrl: string
  useSsl: boolean
}

export interface MpesaResponse {
  statusCode: number
  success: boolean
  data?: any
  error?: {
    code: string
    description: string
  }
}

export class MpesaClient {
  private config: MpesaConfig
  private bearerToken: string | null = null

  constructor(config: MpesaConfig) {
    this.config = config
  }

  private getBaseUrl(port: number): string {
    const protocol = this.config.useSsl ? "https" : "http"
    return `${protocol}://${this.config.apiUrl}:${port}`
  }

  async generateBearerToken(): Promise<string> {
    try {
        const publicKeyBase64 = this.config.publicKey
        const apiKey = this.config.apiKey

        // 1️⃣ Decodifica a public key (Base64 → PEM)
        const publicKeyDer = Buffer.from(publicKeyBase64, "base64")
    
        // 2️⃣ Constrói uma PublicKey PEM a partir do buffer DER
        const publicKeyPem =
          "-----BEGIN PUBLIC KEY-----\n" +
          publicKeyBase64.match(/.{1,64}/g)?.join("\n") +
          "\n-----END PUBLIC KEY-----"
    
        // 3️⃣ Criptografa a API Key com RSA e padding PKCS1
        const encrypted = crypto.publicEncrypt(
          {
            key: publicKeyPem,
            padding: crypto.constants.RSA_PKCS1_PADDING,
          },
          new Uint8Array(Buffer.from(apiKey, "utf-8"))
        )
    
        // 4️⃣ Codifica em Base64 para gerar o token final
        const token = encrypted.toString("base64")
        return token
      } catch (err) {
        console.error("Erro ao gerar Bearer Token:", err)
        throw err
      }
  }

  async makeRequest(method: "GET" | "POST" | "PUT", port: number, path: string, data?: any): Promise<MpesaResponse> {
    try {
      const token = await this.generateBearerToken()
      console.log("Token Gerado:", token)
      const url = `${this.getBaseUrl(port)}${path}`
      console.log("URL para requisicao", url)

      const options: RequestInit = {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Origin: "developer.mpesa.vm.co.mz",
        },
      }

      if (method !== "GET" && data) {
        options.body = JSON.stringify(data)
      }
      
      console.log(url, options)
      
      const response = await fetch(url, options)
      
      const responseData = await response.json()

      return {
        statusCode: response.status,
        success: response.ok,
        data: responseData,
      }
    } catch (error) {
      return {
        statusCode: 500,
        success: false,
        error: {
          code: "INS-1",
          description: error instanceof Error ? error.message : String(error),
        },
      }
    }
  }
}

export function createMpesaClient(): MpesaClient {
  const config: MpesaConfig = {
    apiKey: process.env.MPESA_API_KEY || "",
    publicKey: process.env.MPESA_PUBLIC_KEY || "",
    apiUrl: process.env.MPESA_API_URL || "api.sandbox.vm.co.mz",
    useSsl: process.env.MPESA_USE_SSL === "false",
  }

  return new MpesaClient(config)
}
