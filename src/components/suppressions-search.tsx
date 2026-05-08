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

// FIX 1 + 4: Correct Emailit v2 field names
interface Suppression {
  id: string
  object?: string
  email: string
  type?: string
  reason?: string
  timestamp?: string
  keep_until?: string | null
}

export default function SuppressionsSearch() {
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searchResult, setSearchResult] = useState<Suppression | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [notFound, setNotFound] = useState(false)
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
      setNotFound(false)

      const params = new URLSearchParams()
      params.append('search', searchInput.trim())

      const response = await fetch(`/api/suppressions?${params.toString()}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      const data = await response.json()
      setDomain(data.domain)

      if (data.suppressions && data.suppressions.length > 0) {
        setSearchResult(data.suppressions[0])
        setShowResult(true)
        setNotFound(false)
      } else {
        setSearchResult(null)
        setNotFound(true)
        setShowResult(false)
      }
    } catch (err) {
      console.error('Error searching suppressions:', err)
      const msg = err instanceof Error ? err.message : 'Failed to search suppressions'
      setError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') performSearch()
  }

  const handleDelete = async () => {
    if (!searchResult) return
    if (!confirm('Are you sure you want to remove this email from suppressions?')) return

    try {
      setDeleting(true)
      const response = await fetch(`/api/suppressions/${searchResult.id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      setSearchResult(null)
      setShowResult(false)
      setSearchInput('')
      toast.success('Email removed from suppressions successfully')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove from suppressions')
    } finally {
      setDeleting(false)
    }
  }

  const handleClearSearch = () => {
    setSearchInput('')
    setSearchResult(null)
    setShowResult(false)
    setNotFound(false)
    setError(null)
  }

  const formatTimestamp = (ts?: string | null) => {
    if (!ts) return 'N/A'
    try { return new Date(ts).toLocaleString() } catch { return 'N/A' }
  }

  // FIX 4: Type badge colours matching the list component
  const typeBadge = (type?: string) => {
    const colours: Record<string, string> = {
      bounce: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      complaint: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      unsubscribe: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      recipient: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    }
    const label = type || 'recipient'
    const cls = colours[label] || 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
    return (
      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
        {label}
      </span>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Suppressions Search</CardTitle>
        <CardDescription>
          Enter an exact email address to check if it is on the suppression list. You can remove it immediately if found.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Enter email address to search…"
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
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
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
            <span className="ml-2 text-muted-foreground">Searching…</span>
          </div>
        )}

        {/* Not found message shown inline (no dialog) */}
        {notFound && !loading && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Not on suppression list</strong> — &quot;{searchInput}&quot; was not found in the suppression list for {domain}.
            </p>
          </div>
        )}

        {/* Result dialog */}
        {showResult && searchResult && !loading && (
          <Dialog open={showResult} onOpenChange={setShowResult}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Suppression Found</DialogTitle>
                <DialogDescription>
                  This email is on the suppression list for <strong>{domain}</strong>.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {/* FIX 4: Show email (correct field) */}
                <div>
                  <label className="text-sm font-medium">Email Address</label>
                  <p className="mt-1 text-sm text-muted-foreground">{searchResult.email}</p>
                </div>
                {/* FIX 4: Show type (correct field) instead of status */}
                <div>
                  <label className="text-sm font-medium">Type</label>
                  <p className="mt-1">{typeBadge(searchResult.type)}</p>
                </div>
                {searchResult.reason && (
                  <div>
                    <label className="text-sm font-medium">Reason</label>
                    <p className="mt-1 text-sm text-muted-foreground">{searchResult.reason}</p>
                  </div>
                )}
                {/* FIX 4: Use timestamp (correct field) */}
                <div>
                  <label className="text-sm font-medium">Suppressed At</label>
                  <p className="mt-1 text-sm text-muted-foreground">{formatTimestamp(searchResult.timestamp)}</p>
                </div>
                {searchResult.keep_until && (
                  <div>
                    <label className="text-sm font-medium">Expires At</label>
                    <p className="mt-1 text-sm text-muted-foreground">{formatTimestamp(searchResult.keep_until)}</p>
                  </div>
                )}
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowResult(false)}>Close</Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="gap-2"
                >
                  {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                  Remove from Suppressions
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  )
}
