"use client";

import Link from "next/link";

export default function LinkButton() {
  return (
    <Link
      href="/invoice-generator/UX-UI-Designer-Invoice"
      className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg shadow-md transition-all duration-200"
    >
      Create Your Invoice
    </Link>
  );
}
