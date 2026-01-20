import SuppressionsList from '@/components/suppressions-list'

export const metadata = {
  title: 'Suppressions - WSDMailer Dashboard',
  description: 'Manage suppressed email addresses for your domain'
}

export default function SuppressionsPage() {
  return (
    <div className="flex flex-col gap-6 p-4 sm:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold">Suppressions</h1>
        <p className="text-muted-foreground">
          View and manage suppressed email addresses for your domain.
        </p>
      </div>

      <SuppressionsList />
    </div>
  )
}
