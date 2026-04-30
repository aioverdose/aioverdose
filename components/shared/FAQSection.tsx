'use client'

interface FAQItem {
  question: string
  answer: string
}

export function FAQSection({ items, title = "Frequently Asked Questions" }: { items: FAQItem[], title?: string }) {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">{title}</h2>
        <div className="space-y-6">
          {items.map((item, index) => (
            <details key={index} className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow-sm group">
              <summary className="font-semibold cursor-pointer list-none flex justify-between items-center text-gray-900 dark:text-white">
                {item.question}
                <span className="text-gray-600 dark:text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
