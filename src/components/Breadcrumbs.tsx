import { ChevronRight, HomeIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  links: { label: string; href: string }[]
}

export default function Breadcrumbs({ links }: BreadcrumbsProps) {
  return (
    <div className='max-w-7xl py-2 flex text-xs text-indigo-900 mt-2 items-center justify-self-center xs:justify-self-start justify-center dark:text-indigo-100 gap-x-1'>
      {links.map((link, index) => (
        <Link key={`breadcrumb-${index}`} to={link.href} className='flex items-center space-x-1'>
          {index === 0 ?
            <HomeIcon className='h-3 w-3 dark:text-inherit hover:opacity-80' />
          : <ChevronRight className='h-3 w-3 dark:text-inherit' />}
          <p className='hover:opacity-80'>{link.label}</p>
        </Link>
      ))}
    </div>
  )
}
