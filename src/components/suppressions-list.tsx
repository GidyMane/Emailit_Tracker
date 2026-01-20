"use client"

import { useState, useEffect } from 'react'
import { Trash2, AlertCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Suppression {
  id: string
  name?: string
  email?: string
  status?: string
  created_at?: string
  [key: string]: any
}

interface SuppressionResponse {
  suppressions: Suppression[]
  domain: string
  isAdmin: boolean
  count: number
}

export default function SuppressionsList() {
  const [suppressions, setSuppressions] = useState<Suppression[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [domain, setDomain] = useState<string>('')

  useEffect(() => {
    fetchSuppressions()

    // Listen for domain changes in localStorage
    const handleStorageChange = () => {
      fetchSuppressions()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const fetchSuppressions = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch('/api/suppressions')

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      const data: SuppressionResponse = await response.json()
      setSuppressions(data.suppressions)
      setDomain(data.domain)
    } catch (err) {
      console.error('Error fetching suppressions:', err)
      setError(err instanceof Error ? err.message : 'Failed to load suppressions')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this suppression?')) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch('/api/suppressions/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, domain }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      // Remove the deleted suppression from the list
      setSuppressions(suppressions.filter(s => s.id !== id))
    } catch (err) {
      console.error('Error deleting suppression:', err)
      alert(err instanceof Error ? err.message : 'Failed to delete suppression')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suppressed Emails</CardTitle>
        <CardDescription>
          Manage suppressed email addresses for domain: <span className="font-semibold">{domain}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">Error</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading suppressions...</span>
          </div>
        ) : suppressions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">No suppressed emails found for your domain.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name / Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="w-12 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suppressions.map((suppression) => (
                  <TableRow key={suppression.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{suppression.name || suppression.email || 'N/A'}</p>
                        {suppression.email && suppression.name && (
                          <p className="text-sm text-muted-foreground">{suppression.email}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        {suppression.status || 'Active'}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {suppression.created_at 
                        ? new Date(suppression.created_at).toLocaleDateString()
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(suppression.id)}
                        disabled={deleting === suppression.id}
                        className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                      >
                        {deleting === suppression.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
