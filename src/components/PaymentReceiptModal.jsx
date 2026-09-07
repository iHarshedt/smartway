import React, { useState } from 'react';
import { exportElementToPdf } from '../utils/pdfExport';
import { 
  Printer, 
  Download,
  X, 
  Phone, 
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

// Number to Words in Indian Rupees
function numberToWordsINR(num) {
  const a = ['', 'One ', 'Two ', 'Three ', 'Four ', 'Five ', 'Six ', 'Seven ', 'Eight ', 'Nine ', 'Ten ', 'Eleven ', 'Twelve ', 'Thirteen ', 'Fourteen ', 'Fifteen ', 'Sixteen ', 'Seventeen ', 'Eighteen ', 'Nineteen '];
  const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

  if ((num = num.toString()).length > 9) return 'Overflow';
  const n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees Only' : 'Rupees Only';
  return str.trim();
}

export default function PaymentReceiptModal({ receipt: propReceipt, stage, onClose }) {
  const receipt = propReceipt || stage;
  if (!receipt) return null;

  const [isSavingPdf, setIsSavingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSavePdf = async () => {
    setIsSavingPdf(true);
    try {
      const cleanName = (receipt.customerName || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_');
      const recNo = (receipt.receiptNo || 'Receipt').replace(/[^a-zA-Z0-9_-]/g, '_');
      await exportElementToPdf('printable-receipt-content', `SolarTech_Receipt_${cleanName}_${recNo}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsSavingPdf(false);
    }
  };

  const amountInWords = numberToWordsINR(receipt.amount || 0);

  const handleWhatsAppReceipt = () => {
    const cleanPhone = receipt.customerPhone ? receipt.customerPhone.replace(/[^0-9]/g, '') : '';
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    
    const message = encodeURIComponent(
      `*SOLAR TECH - OFFICIAL PAYMENT RECEIPT*\n` +
      `----------------------------------------\n` +
      `🧾 *Receipt No:* ${receipt.receiptNo}\n` +
      `📅 *Date:* ${receipt.paymentDate}\n` +
      `👤 *Customer:* ${receipt.customerName}\n` +
      (receipt.consumerNo ? `⚡ *KSEB Consumer #:* ${receipt.consumerNo}\n` : '') +
      `☀️ *System Capacity:* ${receipt.capacityKW || 3} kW On-Grid\n` +
      `----------------------------------------\n` +
      `💰 *Amount Received:* ₹${Number(receipt.amount).toLocaleString()} /-\n` +
      `📝 *Payment Mode:* ${receipt.paymentMode}${receipt.referenceNo ? ` (Ref: ${receipt.referenceNo})` : ''}\n` +
      `🔖 *Purpose:* ${receipt.remarks || 'Solar Plant Installation Milestone'}\n` +
      (receipt.balanceRemaining !== undefined ? `⚖️ *Remaining Balance:* ₹${Number(receipt.balanceRemaining).toLocaleString()} /-\n` : '') +
      `----------------------------------------\n` +
      `Thank you for choosing clean solar energy with Solar Tech!\n` +
      `Helpline: +91 9946236101`
    );

    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      
      <div className="receipt-paper invoice-sheet bg-white text-[#0f172a] rounded-3xl w-full max-w-3xl shadow-2xl overflow-hidden border border-[#cbd5e1] my-auto animate-in fade-in zoom-in-95 duration-150 print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none print:my-0">
        
        {/* Action Header (Hidden during print) */}
        <div className="bg-[#0f172a] px-6 py-3.5 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Customer Payment Receipt Preview
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppReceipt}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Share Receipt directly on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0f172a] rounded-xl text-xs font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="Print Receipt"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handleSavePdf}
              disabled={isSavingPdf}
              className="px-3 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="Save Receipt directly as PDF"
            >
              <Download className={`w-4 h-4 ${isSavingPdf ? 'animate-bounce' : ''}`} />
              <span>{isSavingPdf ? 'Saving...' : 'Save'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl transition ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Paper Container */}
        <div id="printable-receipt-content" className="p-8 sm:p-10 space-y-6 print:p-8 text-[#0f172a] bg-white">
          
          {/* Top Company Letterhead & Document Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b-2 border-slate-900 gap-4">
            <div className="flex items-center gap-3.5">
              <img 
                src="/logo-512.png" 
                alt="Solar Tech" 
                className="w-14 h-14 rounded-2xl object-contain shadow-xs shrink-0 print:border print:border-slate-300" 
              />
              <div>
                <h1 className="text-2xl font-black tracking-tight text-[#0f172a]">
                  SOLAR TECH
                </h1>
                <p className="text-xs text-slate-600 font-medium">
                  Opp Malabar Gold and Diamonds, Keethipadi Nilambur
                </p>
                <div className="text-[11px] text-slate-500 mt-0.5 flex flex-wrap items-center gap-x-3 font-semibold">
                  <span>Ph: +91 9946236101</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start sm:items-end justify-center">
              <div className="text-left sm:text-right">
                <div className="text-xs font-semibold text-slate-500">
                  Receipt #: <span className="font-mono font-black text-slate-900 text-sm">{receipt.receiptNo || 'REC-2026-001'}</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Date: <span className="font-semibold text-slate-800">{receipt.paymentDate || new Date().toLocaleDateString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Customer & Installation Details (Two Balanced Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Customer Information Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Received With Thanks From
              </span>
              <div>
                <div className="text-base font-black text-slate-900">
                  {receipt.customerName}
                </div>
                {receipt.customerPhone && (
                  <div className="text-xs text-slate-600 font-semibold flex items-center gap-1.5 mt-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{receipt.customerPhone}</span>
                  </div>
                )}
                {receipt.customerAddress && (
                  <div className="text-xs text-slate-500 font-medium mt-0.5">
                    {receipt.customerAddress}
                  </div>
                )}
              </div>
            </div>

            {/* Plant & Connection Details Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                Plant &amp; Grid Connection
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Consumer Number:</span>
                  <span className="font-mono font-bold text-slate-900">{receipt.consumerNo || 'Pending'}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block font-medium">Section:</span>
                  <span className="font-bold text-slate-900">{receipt.section || 'Kerala Division'}</span>
                </div>
                <div className="col-span-2 pt-1.5 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-medium">System Capacity:</span>
                  <span className="font-black text-amber-600 text-xs">{receipt.capacityKW || 3} kW On-Grid Solar</span>
                </div>
              </div>
            </div>

          </div>

          {/* REDESIGNED PAYMENT VOUCHER CARD */}
          <div className="border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
            
            {/* Payment Details Body */}
            <div className="p-5 space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Payment Mode</span>
                  <span className="font-black text-slate-900 uppercase mt-0.5 inline-block">
                    {receipt.paymentMode || 'CASH'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Reference / Txn #</span>
                  <span className="font-mono font-bold text-slate-800 text-[11px] mt-0.5 inline-block truncate max-w-full">
                    {receipt.referenceNo || 'N/A (Cash)'}
                  </span>
                </div>

                <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-semibold block uppercase">Received By</span>
                  <span className="font-bold text-slate-900 mt-0.5 inline-block">
                    Solar Tech
                  </span>
                </div>
              </div>


              {/* Hero Amount Banner */}
              <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 block">
                    Total Amount Received
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-700 tracking-tight mt-0.5">
                    ₹{Number(receipt.amount || 0).toLocaleString()}
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-[10px] font-bold text-slate-500 uppercase block">Status</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-black shadow-xs mt-1">
                    ✓ PAID IN FULL
                  </span>
                </div>
              </div>

              {/* Amount In Words */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Amount in Words:</span>
                <span className="font-bold text-slate-900 capitalize text-xs">
                  {amountInWords}
                </span>
              </div>

            </div>

          </div>

          {/* Project Cost & Ledger Summary (If available) */}
          {receipt.totalProjectCost && (
            <div className="grid grid-cols-3 gap-3 text-center bg-slate-50 border border-slate-200 rounded-2xl p-3.5 text-xs">
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block uppercase">Quoted Cost</span>
                <span className="font-black text-slate-900 text-sm">₹{Number(receipt.totalProjectCost).toLocaleString()}</span>
              </div>
              <div className="border-x border-slate-200">
                <span className="text-[10px] font-semibold text-slate-500 block uppercase">Paid to Date</span>
                <span className="font-black text-emerald-700 text-sm">₹{Number(receipt.cumulativePaid || receipt.amount).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold text-slate-500 block uppercase">Balance Remaining</span>
                <span className="font-black text-rose-600 text-sm">₹{Number(receipt.balanceRemaining || 0).toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Footer & Verification Seal */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6 text-xs text-slate-500">
            <div className="space-y-1 text-[10px] leading-relaxed max-w-sm">
              <p className="font-bold text-slate-800">Terms &amp; Acknowledgement:</p>
              <p>• This is an electronically generated official receipt issued by Solar Tech.</p>
            </div>

            <div className="text-center sm:text-right space-y-1 flex flex-col items-center sm:items-end">
              <img 
                src="/solartech_stamp.png" 
                alt="Solar Tech Official Stamp" 
                className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
              />
              <div className="pt-1">
                <div className="font-bold text-slate-900 text-xs">Authorized Signatory</div>
                <div className="text-[10px] text-slate-500">For Solar Tech</div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
