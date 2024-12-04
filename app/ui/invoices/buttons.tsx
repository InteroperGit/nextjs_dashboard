"use client";

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteInvoice } from "@/app/lib/actions";
import { useState } from "react";

function ConfirmationDialog({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <p>Are you sure you want to delete this invoice?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-500 text-white rounded-md">Delete</button>
        </div>
      </div>
    </div>
  );
}

export function CreateInvoice() {
  return (
    <Link
      href="/dashboard/invoices/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Invoice</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/invoices/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteInvoice({ id }: { id: string }) {
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);

  const [showDialog, setShowDialog] = useState(false);

  const handleConfirm = async () => {
    setShowDialog(false);
    await deleteInvoiceWithId();
  };


  return (
    <>
      <button 
          onClick={ () => setShowDialog(true) }
          className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>

      {
        showDialog && (
          <ConfirmationDialog
            onConfirm={ handleConfirm }
            onCancel={ () => setShowDialog(false) }
          />
        )
      }
    </>
  );
}
