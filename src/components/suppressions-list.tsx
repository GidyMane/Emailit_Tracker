"use client"

import { useState, useEffect } from 'react'
import { Trash2, AlertCircle, Loader2, Plus, X, Edit2 } from 'lucide-react'
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

interface Suppression {
  id: string
  name?: string
  email?: string
  status?: string
  created_at?: string
  description?: string
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
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ name: '', description: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchSuppressions()
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
      const errorMessage = err instanceof Error ? err.message : 'Failed to load suppressions'
      setError(errorMessage)
      toast.error(errorMessage)
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
      const response = await fetch(`/api/suppressions/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      // Remove the deleted suppression from the list
      setSuppressions(suppressions.filter(s => s.id !== id))
      toast.success('Suppression deleted successfully')
    } catch (err) {
      console.error('Error deleting suppression:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to delete suppression')
    } finally {
      setDeleting(null)
    }
  }

  const handleCreateOrUpdate = async () => {
    if (!formData.name.trim()) {
      toast.error('Name is required')
      return
    }

    try {
      setIsSubmitting(true)
      const method = editingId ? 'PATCH' : 'POST'
      const url = editingId ? `/api/suppressions/${editingId}` : '/api/suppressions'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          ...(formData.description && { description: formData.description }),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Error: ${response.status}`)
      }

      const newSuppression = await response.json()

      if (editingId) {
        // Update existing suppression in list
        setSuppressions(suppressions.map(s => s.id === editingId ? newSuppression : s))
        setIsEditOpen(false)
        toast.success('Suppression updated successfully')
      } else {
        // Add new suppression to list
        setSuppressions([...suppressions, newSuppression])
        setIsCreateOpen(false)
        toast.success('Suppression added successfully')
      }

      setFormData({ name: '', description: '' })
      setEditingId(null)
    } catch (err) {
      console.error('Error saving suppression:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to save suppression')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleOpenEdit = (suppression: Suppression) => {
    setEditingId(suppression.id)
    setFormData({
      name: suppression.name || '',
      description: suppression.description || '',
    })
    setIsEditOpen(true)
  }

  const resetForm = () => {
    setFormData({ name: '', description: '' })
    setEditingId(null)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Suppressed Emails</CardTitle>
          <CardDescription>
            Manage suppressed email addresses for domain: <span className="font-semibold">{domain}</span>
          </CardDescription>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2" onClick={() => resetForm()}>
              <Plus className="h-4 w-4" />
              Add Suppression
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Suppression</DialogTitle>
              <DialogDescription>
                Add a new email address to the suppression list
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="create-name">Name *</Label>
                <Input
                  id="create-name"
                  placeholder="Enter email or name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="create-description">Description</Label>
                <Input
                  id="create-description"
                  placeholder="Optional description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateOrUpdate} disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  Add Suppression
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                  <TableHead className="w-24 text-right">Actions</TableHead>
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
                        ? new Date(parseFloat(suppression.created_at) * 1000).toLocaleString()
                        : 'N/A'
                      }
                    </TableCell>
                    <TableCell className="text-right flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenEdit(suppression)}
                        className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
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

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Suppression</DialogTitle>
            <DialogDescription>
              Update the suppression entry details
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Name *</Label>
              <Input
                id="edit-name"
                placeholder="Enter email or name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Input
                id="edit-description"
                placeholder="Optional description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateOrUpdate} disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                Update Suppression
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
