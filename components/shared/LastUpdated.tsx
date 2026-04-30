export function LastUpdated({ date }: { date: string }) {
  return (
    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
      <span>🔄</span>
      Last updated:{' '}
      <time dateTime={date}>
        {new Date(date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </time>
    </p>
  )
}
