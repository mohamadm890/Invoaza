'use client';

import { useState } from "react";
import LineItemSection from "./LineItemSection";
import ClientBasicsSection from '../ClientBasicsSection/ClientBasicsSection';
import InvoiceHeader from './InvoiceHeader';
import PaymentInstructions from './PaymentInstructions';
import SenderBasicsSection from '../sender/SenderBasicsSection';
import { useInvoiceEditor } from '@/hooks/useInvoiceEditor';
import { FormProvider } from "react-hook-form";
import WaveDots from "@/components/WaveSpinner";
import {useInvoiceDownload} from '@/hooks/useInvoiceDownload';
import dynamic from "next/dynamic";


const InvoicePreview = dynamic(() => import('@/components/invoicePreview'), {
  ssr: false, 
  loading: () => <p>Loading preview...</p>,
});

type InvoicesPageProps = {
  invoice: unknown; 
};
export default function InvoicesPage({ invoice  }: InvoicesPageProps) {
  if (typeof window === "undefined") return null;


  const invoiceEditor = useInvoiceEditor(invoice);
  if (!invoiceEditor) return null;
  const {  watch,  previewData } = invoiceEditor;
  const { handleDownload, loading } = useInvoiceDownload(watch);



  const [activeTab, setActiveTab] = useState("edit");

  

  return (
    <FormProvider {...invoiceEditor}>

    <div className="w-full p-1 md:p-4 bg-gray-100">

{loading && (
  <div className="absolute inset-0 flex justify-center items-center z-50
  bg-white/12 backdrop-blur-md rounded-lg shadow-lg">
          <WaveDots label="Generating invoice..." />
        </div>
      )}

        <InvoiceHeader onDownload={handleDownload}  />

        <div className="hidden lg:flex flex-row items-start gap-4">
          <div className="flex-1 rounded-[12px] mt-4 flex flex-col gap-2 overflow-y-auto max-h-screen">

            <SenderBasicsSection  />
            <ClientBasicsSection  />
            <LineItemSection  />
            <PaymentInstructions  />
           

            </div>

          <div className="w-[600px] flex justify-center items-center overflow-hidden">
            <div className="inline-block p-8 transform scale-56 sm:scale-60 origin-top">
              <InvoicePreview data={previewData} />
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="hidden max-[1100px]:flex flex-col w-full">
          <div className="flex rounded-xl p-4 mb-2 lg:mb-0">
            <button
              onClick={() => setActiveTab("edit")}
              className={`flex-1 py-2 text-center rounded-lg transition-all text-sm ${activeTab === "edit" ? "bg-white shadow-sm text-[#5C5C5C]" : "text-gray-600 hover:text-black"}`}
            >
              Edit
            </button>
            <button
              onClick={() => setActiveTab("preview")}
              className={`flex-1 py-2 text-center rounded-lg transition-all text-sm ${activeTab === "preview" ? "bg-white shadow-sm text-[#5C5C5C]" : "text-gray-600 hover:text-black"}`}
            >
              Preview
            </button>
          </div>

          {activeTab === "edit" ? (
            <div className="rounded-[12px] flex flex-col gap-2 overflow-y-auto">
              <SenderBasicsSection  />
                <ClientBasicsSection   />
                <LineItemSection   />
                <PaymentInstructions />
            </div>
          ) : (
            <div className="flex justify-center rounded-lg overflow-hidden">
              <div className="transform scale-60 min-[400px]:scale-50 min-[300px]:scale-40 sm:scale-90 md:scale-100 origin-top">
                <InvoicePreview data={previewData} />
              </div>
            </div>
          )}
        </div>
    </div>
      </FormProvider>


  );
}
