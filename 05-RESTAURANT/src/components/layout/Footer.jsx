const Footer = () => (
  <footer className="w-full bg-surface-container-lowest text-on-surface-variant mt-space-xl">
    <div className="w-full px-gutter-mobile md:px-margin py-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm">
      <span className="font-body-sm text-body-sm">© {new Date().getFullYear()} The Kinetic Table. All rights reserved.</span>
      <span className="font-body-sm text-body-sm">Open daily 12:00 – 23:00</span>
    </div>
  </footer>
)

export default Footer
