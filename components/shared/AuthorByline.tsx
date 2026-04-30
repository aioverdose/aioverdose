interface AuthorBylineProps {
  name: string
  role: string
  credentials?: string
  datePublished: string
  dateModified?: string
}

export function AuthorByline({ name, role, credentials, datePublished, dateModified }: AuthorBylineProps) {
  return (
    <div className="flex items-start gap-4 py-6 border-t mt-8" itemScope itemType="https://schema.org/Person">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
        {name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold" itemProp="name">{name}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400" itemProp="jobTitle">{role}</p>
        {credentials && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{credentials}</p>
        )}
        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={datePublished}>
            Published: {new Date(datePublished).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </time>
          {dateModified && dateModified !== datePublished && (
            <time dateTime={dateModified}>
              Updated: {new Date(dateModified).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </time>
          )}
        </div>
      </div>
    </div>
  )
}
