"use client"

import { useState } from 'react'
import { Trash2, AlertCircle, Loader2, Search, X } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

interface Suppression {
  id: string
  name?: string
  email?: string
  status?: string
  created_at?: string
  timestamp?: string
  description?: string
  reason?: string
  [key: string]: any
}

export default function SuppressionsSearch() {
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<Suppression | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [domain, setDomain] = useState<string>('')

  const performSearch = async () => {
    if (!searchInput.trim()) {
      toast.error('Please enter an email address to search')
      return
    }

    try {
      setLoading(true)
      setError(null)
      setSearchResult(null)

      const params = new URLSearchParams()
      params.append('search', searchInput.trim())

      const response = await fetch(`/api/suppressions?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      const data = await response.json()
      setDomain(data.domain)

      // If we have results, show the first matching suppression
      if (data.suppressions && data.suppressions.length > 0) {
        setSearchResult(data.suppressions[0])
        setShowResult(true)
      } else {
        // No results found
        setSearchResult(null)
        setShowResult(true)
      }
    } catch (err) {
      console.error('Error searching suppressions:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to search suppressions'
      setError(errorMessage)
      toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      performSearch()
    }
  }

  const handleDelete = async () => {
    if (!searchResult) return

    if (!confirm('Are you sure you want to remove this email from suppressions?')) {
      return
    }

    try {
      setDeleting(true)
      const response = await fetch(`/api/suppressions/${searchResult.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      setSearchResult(null)
      setShowResult(false)
      setSearchInput('')
      toast.success('Email removed from suppressions')
    } catch (err) {
      console.error('Error deleting suppression:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to remove from suppressions')
    } finally {
      setDeleting(false)
    }
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchResult(null)
    setShowResult(false)
    setError(null)
  }

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Suppressions Search</CardTitle>
          <CardDescription>
            Search for an email address to check if it's on the suppressions list. You can remove it if found.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter email address to search..."
              className="pl-10 pr-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            {searchInput && (
              <button
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <Button
            onClick={performSearch}
            disabled={loading || !searchInput.trim()}
            className="gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
            Search
          </Button>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 dark:text-red-200">Error</h3>
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Searching...</span>
          </div>
        )}

        {showResult && !loading && (
          <>
            {searchResult ? (
              <Dialog open={showResult} onOpenChange={setShowResult}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Suppression Found</DialogTitle>
                    <DialogDescription>
                      This email is on the suppressions list for {domain}. Found using direct email lookup across all pages.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div>
                      <label className="text-sm font-medium">Email / Name</label>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {searchResult.name || searchResult.email || 'N/A'}
                      </p>
                    </div>
                    {searchResult.email && searchResult.name && (
                      <div>
                        <label className="text-sm font-medium">Email Address</label>
                        <p className="mt-1 text-sm text-muted-foreground">{searchResult.email}</p>
                      </div>
                    )}
                    {searchResult.reason && (
                      <div>
                        <label className="text-sm font-medium">Reason</label>
                        <p className="mt-1 text-sm text-muted-foreground">{searchResult.reason}</p>
                      </div>
                    )}
                    {searchResult.status && (
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <p className="mt-1 text-sm">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {searchResult.status}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button variant="outline" onClick={() => setShowResult(false)}>
                      Close
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDelete}
                      disabled={deleting}
                      className="gap-2"
                    >
                      {deleting ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Remove from Suppressions
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            ) : (
              <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  <strong>Email not on suppression list</strong> — "{searchInput}" is not found in the suppressions list for {domain}.
                </p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
