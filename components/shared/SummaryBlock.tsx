export function SummaryBlock({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
      {children}
    </p>
  )
}
