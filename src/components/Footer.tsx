
export default function Footer() {
  return (
    <footer className="bg-gray-800 py-4 mt-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} austinthieu. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
