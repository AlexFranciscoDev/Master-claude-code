import { Link } from 'react-router-dom'

const NotFoundPage = () => (
  <section className="w-full px-gutter-mobile md:px-margin py-space-xl flex flex-col items-center gap-space-md text-center">
    <h1 className="font-headline-xl text-headline-xl text-on-surface uppercase">Page Not Found</h1>
    <p className="font-body-md text-body-md text-on-surface-variant">The page you are looking for does not exist.</p>
    <Link to="/" className="font-label-md text-label-md text-primary uppercase tracking-wider hover:underline">
      Back to the Menu
    </Link>
  </section>
)

export default NotFoundPage
