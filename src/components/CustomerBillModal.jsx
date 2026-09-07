import React, { useState } from 'react';
import { exportElementToPdf } from '../utils/pdfExport';
import { 
  Printer, 
  Download,
  X, 
  Phone, 
  FileText, 
  MessageSquare
} from 'lucide-react';

export default function CustomerBillModal({ customer, paymentStages = [], onClose }) {
  if (!customer) return null;

  const totalBillAmount = Number(customer.totalAmount || customer.totalBillAmount || 250000);
  
  // Calculate total paid across all recorded stages
  const totalPaid = paymentStages.reduce((acc, s) => acc + (Number(s.amount) || 0), 0);
  const balanceDue = Math.max(0, totalBillAmount - totalPaid);
  const isFullyPaid = balanceDue === 0 && totalPaid > 0;

  const [isSavingPdf, setIsSavingPdf] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleSavePdf = async () => {
    setIsSavingPdf(true);
    try {
      const cleanName = (customer.customerName || customer.name || 'Customer').replace(/[^a-zA-Z0-9_-]/g, '_');
      const billRef = customer.consumerNo ? customer.consumerNo.slice(-4) : '1001';
      await exportElementToPdf('printable-bill-content', `SolarTech_Bill_${cleanName}_${billRef}.pdf`);
    } catch (err) {
      console.error('Failed to export PDF:', err);
    } finally {
      setIsSavingPdf(false);
    }
  };

  const handleWhatsAppBill = () => {
    const cleanPhone = customer.phone ? customer.phone.replace(/[^0-9]/g, '') : '';
    const phoneWithCountry = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

    let stagesSummary = '';
    paymentStages.forEach((s, idx) => {
      stagesSummary += `  ${idx + 1}. ${s.paymentDate}: ₹${Number(s.amount).toLocaleString()} (${s.stageName || 'Installment'} - ${s.paymentMode})\n`;
    });

    const message = encodeURIComponent(
      `*SOLAR TECH - STATEMENT OF ACCOUNT & BILL*\n` +
      `----------------------------------------\n` +
      `👤 *Customer:* ${customer.customerName || customer.name}\n` +
      (customer.consumerNo ? `⚡ *KSEB Consumer #:* ${customer.consumerNo}\n` : '') +
      `☀️ *Plant Capacity:* ${customer.capacityKW || 3} kW On-Grid\n` +
      `📍 *Section:* ${customer.section || 'Kerala'}\n` +
      `----------------------------------------\n` +
      `📋 *Bill Amount:* ₹${totalBillAmount.toLocaleString()} /-\n` +
      `\n*PAYMENT STAGES RECEIVED:*\n` +
      (stagesSummary || '  No payment stages recorded yet.\n') +
      `----------------------------------------\n` +
      `💰 *Total Paid to Date:* ₹${totalPaid.toLocaleString()} /-\n` +
      `⚖️ *Balance Due:* ₹${balanceDue.toLocaleString()} /-\n` +
      (isFullyPaid ? `✅ *STATUS: FULLY PAID & SETTLED*\n` : '') +
      `----------------------------------------\n` +
      `Solar Tech | Helpline: +91 9946236101`
    );

    window.open(`https://wa.me/${phoneWithCountry}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static print:inset-auto">
      <div className="invoice-sheet bill-paper bg-white text-[#0f172a] rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden border border-slate-300 my-auto animate-in fade-in zoom-in-95 duration-150 print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none print:my-0">
        
        {/* Action Header (Hidden in Print) */}
        <div className="bg-[#0f172a] px-6 py-3.5 text-white flex items-center justify-between print:hidden border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Customer Bill &amp; Stage Ledger Statement
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleWhatsAppBill}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm"
              title="Share Bill on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Send WhatsApp Bill</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-[#0f172a] rounded-xl text-xs font-black flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>

            <button
              onClick={handleSavePdf}
              disabled={isSavingPdf}
              className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-500 disabled:opacity-60 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm cursor-pointer"
              title="Save directly as PDF"
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

        {/* Printable Bill Content */}
        <div id="printable-bill-content" className="p-6 sm:p-10 space-y-6 print:p-6 text-[#0f172a] bg-white">
          
          {/* Header & Company Brand */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-[#0f172a] pb-5 gap-4">
            <div className="flex items-start gap-3">
              <img 
                src="/logo-512.png" 
                alt="Solar Tech" 
                className="w-12 h-12 rounded-xl object-contain shadow-xs shrink-0 print:border print:border-slate-300"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#0f172a]">
                  SOLAR TECH
                </h1>
                <p className="text-xs text-[#334155] font-semibold leading-tight">
                  Opp Malabar Gold and Diamonds, Keethipadi Nilambur
                </p>
                <div className="text-[11px] text-[#475569] mt-1 flex flex-wrap items-center gap-x-3 font-medium">
                  <span>Ph: +91 9946236101</span>
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <div className="inline-block bg-[#f1f5f9] border border-[#cbd5e1] px-3.5 py-1 rounded-lg">
                <span className="text-[10px] font-bold text-[#64748b] uppercase block">Invoice / Bill Ref</span>
                <span className="font-mono text-sm sm:text-base font-black text-[#0f172a]">
                  BILL-2026-{customer.consumerNo ? customer.consumerNo.slice(-4) : '1001'}
                </span>
              </div>
              <div className="text-xs text-[#334155] mt-1.5 font-medium">
                <strong>Date:</strong> {new Date().toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>

          {/* Customer & Technical Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#f8fafc] border border-[#cbd5e1] rounded-2xl p-4 text-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-[#64748b] uppercase tracking-wider block">Billed To:</span>
              <div className="text-base font-black text-[#0f172a]">
                {customer.customerName || customer.name}
              </div>
              {customer.phone && (
                <div className="text-[#334155] flex items-center gap-1 font-medium">
                  <Phone className="w-3.5 h-3.5 text-[#64748b]" />
                  <span>{customer.phone}</span>
                </div>
              )}
            </div>

            <div className="space-y-1 sm:border-l border-[#cbd5e1] sm:pl-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[#64748b] block text-[10px] font-semibold">Consumer Number:</span>
                  <span className="font-mono font-bold text-[#0f172a]">
                    {customer.consumerNo || 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[10px] font-semibold">System Capacity:</span>
                  <span className="font-black text-amber-700 text-xs">
                    {customer.capacityKW || 3} kW On-Grid
                  </span>
                </div>
                <div className="col-span-2">
                  <span className="text-[#64748b] block text-[10px] font-semibold">KSEB Section:</span>
                  <span className="font-bold text-[#0f172a]">{customer.section || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Stages Received Schedule */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-[#0f172a] uppercase tracking-wider">
                Schedule of Payments Received (Installment Stages)
              </h4>
              <span className="text-[10px] font-bold text-[#475569]">
                {paymentStages.length} Stages Recorded
              </span>
            </div>

            <div className="border border-[#cbd5e1] rounded-2xl overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#0f172a] text-white font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-4 text-white">Stage # &amp; Description</th>
                    <th className="py-2.5 px-3 text-white">Date</th>
                    <th className="py-2.5 px-3 text-white">Payment Mode</th>
                    <th className="py-2.5 px-3 text-white">Receipt / Ref #</th>
                    <th className="py-2.5 px-4 text-right text-white">Amount Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e2e8f0] text-[#0f172a]">
                  {paymentStages.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-[#64748b] font-medium italic">
                        No stage payments recorded for this customer yet.
                      </td>
                    </tr>
                  ) : (
                    paymentStages.map((stage, idx) => (
                      <tr key={stage.id || idx} className="hover:bg-slate-50 transition">
                        <td className="py-2.5 px-4 font-semibold text-[#0f172a]">
                          <span className="text-amber-700 font-black mr-1.5">#{idx + 1}</span>
                          <span className="font-bold">{stage.stageName || `Payment Stage ${idx + 1}`}</span>
                          {stage.remarks && stage.remarks !== 'Advance token for booking' && (
                            <span className="block text-[10px] text-[#64748b] font-normal">{stage.remarks}</span>
                          )}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-[#334155] font-medium">
                          {stage.paymentDate}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="px-2 py-0.5 rounded bg-[#f1f5f9] border border-[#cbd5e1] font-bold text-[10px] text-[#0f172a]">
                            {stage.paymentMode}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 font-mono text-[11px] text-[#334155]">
                          {stage.receiptNo || stage.referenceNo || 'N/A'}
                        </td>
                        <td className="py-2.5 px-4 text-right font-black text-emerald-700 text-sm">
                          ₹{Number(stage.amount).toLocaleString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr className="bg-[#f8fafc] border-t-2 border-[#cbd5e1] font-bold">
                    <td colSpan="4" className="py-2.5 px-4 text-right uppercase text-[10px] text-[#334155]">
                      Total Paid to Date:
                    </td>
                    <td className="py-2.5 px-4 text-right text-base font-black text-emerald-700">
                      ₹{totalPaid.toLocaleString()}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Balance & Settlement Card */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-[#f8fafc] border border-[#cbd5e1] p-3.5 rounded-2xl text-center shadow-xs">
              <span className="text-[10px] font-bold text-[#64748b] uppercase block">Bill Amount</span>
              <span className="text-lg font-black text-[#0f172a]">₹{totalBillAmount.toLocaleString()}</span>
            </div>

            <div className="bg-emerald-50 border-2 border-emerald-300 p-3.5 rounded-2xl text-center shadow-xs">
              <span className="text-[10px] font-bold text-emerald-900 uppercase block">Total Collected So Far</span>
              <span className="text-lg font-black text-emerald-700">₹{totalPaid.toLocaleString()}</span>
            </div>

            <div className={`p-3.5 rounded-2xl text-center border-2 shadow-xs ${
              isFullyPaid ? 'bg-emerald-50 border-emerald-400' : 'bg-rose-50 border-rose-300'
            }`}>
              <span className={`text-[10px] font-bold uppercase block ${
                isFullyPaid ? 'text-emerald-900' : 'text-rose-900'
              }`}>
                Balance Due
              </span>
              <span className={`text-lg font-black ${
                isFullyPaid ? 'text-emerald-700' : 'text-rose-700'
              }`}>
                {isFullyPaid ? 'PAID IN FULL (₹0)' : `₹${balanceDue.toLocaleString()}`}
              </span>
            </div>
          </div>



        </div>

      </div>

    </div>
  );
}
