function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-8 text-center">
        <h2 className="font-semibold text-lg">
          AI Readiness Assessment System
        </h2>

        <p className="mt-2 text-gray-300 text-sm">
          Developed as a prototype for assessing Artificial Intelligence
          readiness in Nigerian Universities.
        </p>

        <p className="mt-6 text-xs text-gray-400">
          © {new Date().getFullYear()} All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;