"use client";
import InputCustom from "@/components/InputCustom";
import { useFormContext } from "react-hook-form";

export default function PaymentInstructions() {

  const {  setValue, watch } = useFormContext();
  const paymentValue = watch("payment");

  return (
    <div className="payment-section mt-2 bg-white p-4 md:p-8 rounded-[16px] ">
 <h2 className="text-[#494949] mb-2 text-lg md:text-xl lg:text-2xl font-[400]">  Payment Instructions
</h2>
<p className="text-gray-400 text-[16px] mb-8 md:text-base lg:text-base mt-1">
  Add payment options to your invoice
</p>
        <div className="mt-4">


        <InputCustom
          multiline={true}
          placeholder="Enter payment details here..."
          rows={4} // if InputCustom supports it
          value={paymentValue} 
          onChange={(e) => setValue("payment", e.target.value)} id={""}      

        />
       
 
       </div>
    </div>
  );
}
