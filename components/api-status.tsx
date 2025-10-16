"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function ApiStatus() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const checkStatus = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/mpesa/health")
      const data = await response.json()
      setStatus(data)
    } catch (error) {
      setStatus({ status: "error", message: "Failed to check API status" })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkStatus()
  }, [])

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>API Status</CardTitle>
            <CardDescription>M-Pesa API connection status</CardDescription>
          </div>
          <Button variant="outline" size="icon" onClick={checkStatus} disabled={loading}>
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {status && (
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Badge variant={status.status === "ok" ? "default" : "destructive"}>{status.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{status.message}</p>
            {status.environment && (
              <div className="text-sm">
                <strong>Environment:</strong> {status.environment}
              </div>
            )}
            {status.serviceProviderCode && (
              <div className="text-sm">
                <strong>Service Provider:</strong> {status.serviceProviderCode}
              </div>
            )}
            {status.timestamp && (
              <div className="text-xs text-muted-foreground">
                Last checked: {new Date(status.timestamp).toLocaleString()}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
