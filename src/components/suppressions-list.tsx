"use client"

import { useState, useEffect, useRef, useCallback } from 'react'
import { Trash2, AlertCircle, Loader2, Plus, X, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// FIX 1 + 4: Use the correct Emailit v2 field names (no more "name", "status", "description")
interface Suppression {
  id: string
  object?: string
  email: string
  type?: string
  reason?: string
  timestamp?: string
  keep_until?: string | null
}

interface SuppressionResponse {
  suppressions: Suppression[]
  domain: string
  isAdmin: boolean
  count: number
  // FIX 2: Pagination fields returned by the updated API route
  page: number
  totalPages: number | null
  hasNextPage: boolean
  hasPreviousPage: boolean
  totalCount: number | null
}

interface SuppressionsListProps {
  selectedDomainId?: string | null
}

const PAGE_SIZE = 25

export default function SuppressionsList({ selectedDomainId = null }: SuppressionsListProps) {
  const [suppressions, setSuppressions] = useState<Suppression[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [domain, setDomain] = useState<string>('')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  // FIX 2: Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(false)
  const [hasPreviousPage, setHasPreviousPage] = useState(false)
  const [totalCount, setTotalCount] = useState<number | null>(null)

  // FIX 3: Form now uses email + reason (correct Emailit fields), not name + description
  const [formData, setFormData] = useState({ email: '', reason: '', type: 'recipient' })

  // Debounce search — reset to page 1 on new search
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setCurrentPage(1)
      setSearchTerm(searchInput)
      setIsSearching(true)
    }, 300)
    return () => { if (debounceTimer.current) clearTimeout(debounceTimer.current) }
  }, [searchInput])

  const fetchSuppressions = useCallback(async () => {
    try {
      setError(null)

      const params = new URLSearchParams()
      if (searchTerm) params.append('search', searchTerm)
      if (selectedDomainId && selectedDomainId !== 'all') params.append('domainId', selectedDomainId)

      // FIX 2: Pass page and limit to the API route
      if (!searchTerm) {
        params.append('page', String(currentPage))
        params.append('limit', String(PAGE_SIZE))
      }

      const url = `/api/suppressions${params.toString() ? `?${params.toString()}` : ''}`
      const response = await fetch(url)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      const data: SuppressionResponse = await response.json()
      setSuppressions(data.suppressions)
      setDomain(data.domain)

      // FIX 2: Capture pagination metadata from the response
      setHasNextPage(data.hasNextPage ?? false)
      setHasPreviousPage(data.hasPreviousPage ?? false)
      setTotalCount(data.totalCount ?? null)
    } catch (err) {
      console.error('Error fetching suppressions:', err)
      const msg = err instanceof Error ? err.message : 'Failed to load suppressions'
      setError(msg)
      if (searchTerm) toast.error(msg)
    } finally {
      setLoading(false)
      setIsSearching(false)
    }
  }, [searchTerm, selectedDomainId, currentPage])

  useEffect(() => {
    fetchSuppressions()
  }, [fetchSuppressions])

  // Use email as the identifier — it's always present and Emailit accepts it URL-encoded.
  // Falls back to sup_xxx id if email somehow missing.
  const handleDelete = async (id: string, email: string) => {
    if (!confirm(`Remove ${email} from the suppression list?`)) return
    // Use email as the lookup key (always valid); encode @ as %40 for the URL
    const identifier = email || id
    console.log('[handleDelete] identifier:', identifier)
    try {
      setDeleting(id)
      const encodedIdentifier = encodeURIComponent(identifier)
      const response = await fetch(`/api/suppressions/${encodedIdentifier}`, { method: 'DELETE' })
      if (!response.ok) {
        const errorData = await response.json()
        // Show Emailit's full error detail so we can diagnose API rejections
        const msg = errorData.details
          ? `${errorData.error} — ${errorData.details}`
          : errorData.error || `Error: ${response.status}`
        throw new Error(msg)
      }
      setSuppressions(suppressions.filter(s => s.id !== id))
      toast.success('Suppression deleted successfully')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to delete suppression')
    } finally {
      setDeleting(null)
    }
  }

  // FIX 3: Send correct field names to the API (email, reason, type)
  const handleCreate = async () => {
    if (!formData.email.trim()) {
      toast.error('Email address is required')
      return
    }
    try {
      setIsSubmitting(true)
      const response = await fetch('/api/suppressions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email.trim(),
          reason: formData.reason.trim() || 'manual',
          type: formData.type || 'recipient',
        }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }
      const newSuppression: Suppression = await response.json()
      setSuppressions([newSuppression, ...suppressions])
      setIsCreateOpen(false)
      setFormData({ email: '', reason: '', type: 'recipient' })
      toast.success('Suppression added successfully')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add suppression')
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => setFormData({ email: '', reason: '', type: 'recipient' })

  const formatTimestamp = (ts?: string | null) => {
    if (!ts) return 'N/A'
    try { return new Date(ts).toLocaleString() } catch { return 'N/A' }
  }

  // FIX 4: Map suppression type to a badge colour
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
        <div className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Suppressed Emails</CardTitle>
            <CardDescription>
              Manage suppressed email addresses for domain:{' '}
              <span className="font-semibold">{domain}</span>
              {totalCount !== null && !searchTerm && (
                <span className="ml-2 text-muted-foreground">({totalCount.toLocaleString()} total)</span>
              )}
            </CardDescription>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={(open) => { setIsCreateOpen(open); if (!open) resetForm() }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Suppression
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Suppression</DialogTitle>
                <DialogDescription>Add an email address to the suppression list</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {/* FIX 3: Label and field now say "Email Address" not "Name" */}
                <div>
                  <Label htmlFor="create-email">Email Address *</Label>
                  <Input
                    id="create-email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="create-type">Type</Label>
                  <select
                    id="create-type"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option value="recipient">Recipient</option>
                    <option value="bounce">Bounce</option>
                    <option value="complaint">Complaint</option>
                    <option value="unsubscribe">Unsubscribe</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="create-reason">Reason</Label>
                  <Input
                    id="create-reason"
                    placeholder="Optional reason"
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreate} disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                    Add Suppression
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>

      <CardContent>
        {/* Search bar */}
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            {isSearching
              ? <Loader2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
              : <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            }
            <Input
              placeholder="Search by email, type or reason…"
              className="pl-10 pr-10"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {searchTerm && !loading && suppressions.length > 0 && (
          <p className="mb-4 text-sm text-muted-foreground">
            Found <span className="font-semibold">{suppressions.length}</span> result{suppressions.length !== 1 ? 's' : ''}
          </p>
        )}

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
            <span className="ml-2 text-muted-foreground">Loading suppressions…</span>
          </div>
        ) : suppressions.length === 0 ? (
          <div className="py-8 text-center">
            <p className="text-muted-foreground">
              {searchTerm ? 'No suppressed emails match your search.' : 'No suppressed emails found.'}
            </p>
            {searchTerm && (
              <Button variant="outline" size="sm" className="mt-4" onClick={() => setSearchInput('')}>
                Clear Search
              </Button>
            )}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {/* FIX 4: "Email Address" and "Type" instead of "Name/Email" and "Status" */}
                    <TableHead>Email Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Suppressed At</TableHead>
                    <TableHead className="w-16 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {suppressions.map((suppression) => (
                    <TableRow key={suppression.id}>
                      <TableCell>
                        {/* FIX 4: Use suppression.email (correct field) not suppression.name */}
                        <p className="font-medium">{suppression.email || 'N/A'}</p>
                      </TableCell>
                      <TableCell>
                        {/* FIX 4: Show type badge with colour instead of always "Active" */}
                        {typeBadge(suppression.type)}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {suppression.reason || 'N/A'}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {/* FIX 4: Use suppression.timestamp (correct field) not created_at */}
                        {formatTimestamp(suppression.timestamp)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(suppression.id, suppression.email)}
                          disabled={deleting === suppression.id}
                          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
                        >
                          {deleting === suppression.id
                            ? <Loader2 className="h-4 w-4 animate-spin" />
                            : <Trash2 className="h-4 w-4" />
                          }
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* FIX 2: Pagination controls — only shown when not searching */}
            {!searchTerm && (hasPreviousPage || hasNextPage) && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                <p className="text-sm text-muted-foreground">Page {currentPage}</p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={!hasPreviousPage || loading}
                    className="gap-1"
                  >
                    <ChevronLeft className="h-4 w-4" /> Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={!hasNextPage || loading}
                    className="gap-1"
                  >
                    Next <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
