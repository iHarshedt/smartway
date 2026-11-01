import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ReferenceLine } from 'recharts';

const G = '#16a34a';
const G2 = '#dcfce7';
const G3 = '#bcf1cc';
const BK = '#0f172a';
const GY = '#64748b';
const LN = '#e2e8f0';

// KSEB TARIFF LOGIC (Mirrored from Dashboard)
function calculateKSEBBill(totalUnits, phase, months = 1) {
  let energy = 0;
  let fixed = 0;
  const units = totalUnits / months;

  if (units <= 250) {
    if (units > 0) energy += Math.min(units, 50) * 3.35;
    if (units > 50) energy += Math.min(units - 50, 50) * 4.25;
    if (units > 100) energy += Math.min(units - 100, 50) * 5.35;
    if (units > 150) energy += Math.min(units - 150, 50) * 7.20;
    if (units > 200) energy += Math.min(units - 200, 50) * 8.50;

    if (units <= 50) fixed = phase === 1 ? 50 : 130;
    else if (units <= 100) fixed = phase === 1 ? 85 : 175;
    else if (units <= 150) fixed = phase === 1 ? 105 : 205;
    else if (units <= 200) fixed = phase === 1 ? 140 : 215;
    else fixed = phase === 1 ? 160 : 235;
  } else {
    let rate = 0;
    if (units <= 300) { rate = 6.75; fixed = phase === 1 ? 220 : 240; }
    else if (units <= 350) { rate = 7.60; fixed = phase === 1 ? 240 : 250; }
    else if (units <= 400) { rate = 7.95; fixed = phase === 1 ? 260 : 260; }
    else if (units <= 500) { rate = 8.25; fixed = phase === 1 ? 286 : 285; }
    else { rate = 9.20; fixed = phase === 1 ? 310 : 310; }
    energy = units * rate;
  }

  const totalEnergy = energy * months;
  const totalFixed = fixed * months;
  const duty = totalEnergy * 0.10;
  const rent = (phase === 1 ? 6 : 15) * months;
  const surcharge = (units <= 40) ? 0 : (totalUnits * 0.01);

  return (totalEnergy + totalFixed + duty + rent + surcharge);
}

const fmt = (n) => '₹ ' + Number(n).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const COMPANY = {
  name: 'SolarTech Renewable Energy', short: 'SOLARTECH',
  tagline: 'Authorised Channel Partner — Tata Power Solaroof',
  address: '25-335Q, Opp. Malabar Gold & Diamonds, Nilambur, Malappuram, Kerala — 679329',
  phone: '9946236101', email: 'newsolartech@gmail.com',
  gstin: '32ATMPA0110G1ZM', bank: 'State Bank of India',
  branch: 'Malappuram SME Branch', ifsc: 'SBIN0070196',
  acc: '44786181483', epc: 'Anvar Sadath', epcId: 'ATMPA0110G',
};

const getAmcFee = (dcKw) => {
  const kw = Number(dcKw) || 0;
  if (kw <= 3) return 2498;
  if (kw <= 5) return 2998;
  if (kw <= 8) return 4499;
  if (kw <= 10) return 4999;
  if (kw <= 15) return 5999;
  if (kw <= 20) return 6999;
  return Math.round(7000 + (kw - 20) * 200);
};

const Page = ({ children }) => (
  <div className="quotation-page" style={{ width: 794, minHeight: 1122, height: 1122, display: 'flex', flexDirection: 'column', background: '#fff', margin: '0 auto', overflow: 'hidden', fontFamily: "'Inter','Segoe UI',sans-serif", color: BK }}>
    {children}
  </div>
);

const PageHeader = ({ page, total }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 40px', borderBottom: `3px solid ${G}`, flexShrink: 0 }}>
    <img src="/solartech transp.png" alt="SolarTech" style={{ height: 50, objectFit: 'contain' }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span style={{ fontSize: 10, fontWeight: 700, color: GY, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{COMPANY.tagline}</span>
      <span style={{ fontSize: 10, fontWeight: 800, color: G, background: G2, border: `1px solid ${G3}`, borderRadius: 20, padding: '3px 12px' }}>{page} / {total}</span>
    </div>
  </div>
);

const PageFooter = ({ customer }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 40px', borderTop: `1px solid ${LN}`, background: '#f8fafc', flexShrink: 0 }}>
    <span style={{ fontSize: 10, color: GY, fontWeight: 600 }}>{COMPANY.name} · {COMPANY.phone}</span>
    <span style={{ fontSize: 10, color: GY, fontWeight: 600 }}>Prepared for: <strong style={{ color: BK }}>{customer.name || 'Valued Customer'}</strong></span>
  </div>
);

const SectionTitle = ({ label, title }) => (
  <div style={{ marginBottom: 24, flexShrink: 0 }}>
    <p style={{ fontSize: 12, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 6px' }}>{label}</p>
    <h2 style={{ fontSize: 32, fontWeight: 900, color: BK, margin: 0, letterSpacing: '-0.02em' }}>{title}</h2>
  </div>
);

// // PAGE 1
const CoverPage = ({ customer, today, paymentType, selected }) => (
  <Page>
    {/* Header / Logo Area */}
    <div style={{ padding: '30px 40px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', flexShrink: 0 }}>
      <img src="/solartech transp.png" alt="SolarTech" style={{ height: 45, objectFit: 'contain' }} />
      <img src="/tatapower transp.png" alt="Tata Power Solaroof" style={{ height: 45, objectFit: 'contain' }} />
    </div>

    <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>

      {/* Full Width Image */}
      <div style={{ height: 480, position: 'relative', overflow: 'hidden' }}>
        <img src="/real_installation.webp" alt="Installation" style={{ width: '100%', height: '100%', objectFit: 'full', display: 'block' }} />

        {/* Subtle Overlays */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0) 70%, rgba(255,255,255,1) 100%)' }} />


      </div>

      {/* Content Area with Margins */}
      <div style={{ padding: '0 40px', flex: 1 }}>
        <div style={{ marginTop: 40, marginBottom: 40 }}>
          <p style={{ fontSize: 25, fontWeight: 900, color: G, textTransform: 'uppercase', letterSpacing: '0.3em', margin: '0 0 12px' }}>Solar Proposal</p>
          <h1 style={{ fontSize: 52, color: BK, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            <span style={{ fontWeight: 333 }}>Turn</span>{' '}
            <span style={{ fontWeight: 555 }}>Light</span>{' '}
            <span style={{ fontWeight: 666 }}>Into</span>{' '}
            <span style={{ fontWeight: 888 }}>Wealth.</span>
          </h1>
        </div>

        {/* Customer / Prepared By Info Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.5px 1fr', gap: 30, borderTop: `1px solid ${LN}`, paddingTop: 30 }}>
          <div>
            <p style={{ fontSize: 10, fontWeight: 800, color: GY, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 10px' }}>Prepared For</p>
            <p style={{ fontSize: 22, fontWeight: 900, color: BK, margin: '0 0 4px' }}>{customer.name || 'Valued Customer'}</p>
            <p style={{ fontSize: 12, color: GY, fontWeight: 500, margin: '0 0 2px' }}>{customer.place || 'Kerala, India'}</p>
            {customer.phone && (
              <p style={{ fontSize: 12, color: GY, fontWeight: 500, margin: '0 0 2px' }}>Phone: {customer.phone}</p>
            )}
            {customer.ksebSection && (
              <p style={{ fontSize: 12, color: GY, fontWeight: 500, margin: '0 0 2px' }}>KSEB Section: <strong style={{ color: BK }}>{customer.ksebSection}</strong></p>
            )}
          </div>

          <div style={{ background: G, height: '80%', alignSelf: 'center' }} />

          <div style={{ padding: '0 10px' }}>
            <p style={{ fontSize: 9, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>
              {customer.salesEngineer ? 'Sales Engineer' : 'Prepared By'}
            </p>
            <p style={{ fontSize: 18, fontWeight: 900, color: BK, margin: '0 0 16px', textTransform: 'uppercase' }}>
              {customer.salesEngineer || 'SolarTech Renewable Energy'}
            </p>
            {customer.salesEngineer && customer.salesEngineerPhone && (
              <p style={{ fontSize: 12, color: GY, fontWeight: 700, margin: '-10px 0 16px 0' }}>
                📞 {customer.salesEngineerPhone}
              </p>
            )}

            <p style={{ fontSize: 9, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.15em', margin: '0 0 8px' }}>For</p>
            <p style={{ fontSize: 16, fontWeight: 900, color: BK, margin: '0 0 4px' }}>SolarTech Renewable Energy</p>
            <p style={{ fontSize: 10, color: GY, fontWeight: 600, margin: '0 0 8px' }}>Authorised Channel Partner — Tata Power Solaroof</p>
            <p style={{ fontSize: 10, color: GY, fontWeight: 700 }}>
              📞 {COMPANY.phone} · Nilambur, Kerala
            </p>
          </div>
        </div>
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', background: G, color: '#fff', flexShrink: 0 }}>
      {[
        ['Plant Type', selected.isNonDcr ? 'NON DCR' : selected.isMicro ? 'MICRO INVERTER' : selected.isCi ? 'C&I (3-PHASE)' : (selected.isHybrid ? 'HYBRID' : 'ONGRID')],
        ['DC Capacity', `${selected.dcKw} kWp`],
        [
          selected.isHybrid ? 'Inv / Battery' : 'Inverter',
          selected.isMicro
            ? 'Enphase Micro'
            : selected.isNonDcr
              ? `${selected.invKw} kW String`
              : selected.isCi
                ? (selected.inv2 ? `${selected.inv1}kW + ${selected.inv2}kW` : `${selected.inv1} kW`)
                : (selected.isHybrid ? `${selected.invKw}kW / ${selected.battery}kWh` : `${selected.invKw} kW`)
        ],
        ['Modules', `${selected.modules} Nos`]
      ].map(([k, v], i) => (
        <div key={k} style={{ padding: '18px 20px', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.15)' : 'none', textAlign: 'center' }}>
          <p style={{ fontSize: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px', opacity: 0.8 }}>{k}</p>
          <p style={{ fontSize: 15, fontWeight: 900, margin: 0 }}>{v}</p>
        </div>
      ))}
    </div>
  </Page>
);

// PAGE 2 (Company Profile)
const CompanyProfilePage = ({ selected, customer }) => (
  <Page>
    <div style={{ padding: '30px 40px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', flexShrink: 0 }}>
      <img src="/solartech transp.png" alt="SolarTech" style={{ height: 50, objectFit: 'contain' }} />
      <img src="/tatapower transp.png" alt="Tata Power Solaroof" style={{ height: 50, objectFit: 'contain' }} />
    </div>

    <div style={{ padding: '40px 50px', flex: 1, display: 'flex', flexDirection: 'column', gap: 40 }}>

      {/* Editorial Header */}
      <div>
        <p style={{ fontSize: 72, color: G, fontWeight: 555, textTransform: 'uppercase', letterSpacing: '0.07em', margin: '0 0 2px' }}>Solar Tech</p>
        <h1 style={{ fontSize: 48, fontWeight: 300, color: BK, margin: 0, letterSpacing: '-0.03em', lineHeight: 1.1 }}>
          YOUR SOLAR YOUR ASSET
        </h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, flex: 1 }}>

        {/* Left Side: Mission & Heritage */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          <div style={{ background: '#f8fafc', padding: '35px', borderRadius: 32, border: `1px solid ${LN}`, position: 'relative' }}>
            <p style={{ fontSize: 10, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 15 }}>OUR GUIDING PRINCIPLE</p>
            <p style={{ fontSize: 20, color: BK, lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
              "To empower communities and businesses with sustainable energy by combining <span style={{ color: G, fontWeight: 800 }}>Tata Power Solar’s</span> legacy of trust with our commitment to engineering excellence."
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {[
              { stat: '#1', label: 'MNRE Rated Vendor' },
              { stat: '27+', label: 'Years Experience' },
              { stat: '7000+', label: 'Happy Customers' },
              { stat: '15MW+', label: 'Total Installed' }
            ].map(b => (
              <div key={b.label} style={{ padding: '20px', borderRadius: 24, border: `1.5px solid ${G3}`, background: G2 }}>
                <p style={{ fontSize: 28, fontWeight: 900, color: BK, margin: 0 }}>{b.stat}</p>
                <p style={{ fontSize: 9, fontWeight: 800, color: G, textTransform: 'uppercase', margin: 0 }}>{b.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Environmental Impact Dashboard */}
        <div style={{ background: '#fff', borderRadius: 32, padding: '35px', display: 'flex', flexDirection: 'column', color: BK, border: `1px solid ${LN}` }}>
          <p style={{ fontSize: 10, fontWeight: 800, color: G, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: 8 }}>ANNUAL IMPACT REPORT</p>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: BK, margin: '0 0 20px' }}>Driving Global Change.</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 15, flex: 1 }}>
            {[
              { label: 'CO2 Offset', val: '10,800 Tons', icon: '/icon_co2.png' },
              { label: 'Trees Planted', val: '5,40,000+', icon: '/icon_trees.png' },
              { label: 'Coal Saved', val: '5,400 Tons', icon: '/icon_coal.png' },
              { label: 'Green Energy', val: '13.5M Units', icon: '/icon_sun.png' }
            ].map(m => (
              <div key={m.label} style={{ background: '#f8fafc', borderRadius: 20, padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 15, border: `1px solid ${LN}` }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: `1px solid ${LN}` }}>
                  <img src={m.icon} alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
                </div>
                <div>
                  <p style={{ fontSize: 16, fontWeight: 900, margin: 0, color: BK }}>{m.val}</p>
                  <p style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: 'uppercase', margin: 0 }}>{m.label}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 9, color: GY, marginTop: 20, fontStyle: 'italic' }}>
            *Calculated based on our annual installation capacity of 15 Megawatts across Malappuram.
          </p>
        </div>
      </div>
    </div>
    <PageFooter customer={customer} />
  </Page>
);

// PAGE 3 (ROI & Capacity)
const ROIPage = ({ selected, customer, endCustomerPrice, includeAmc }) => {
  const dcKw = Number(selected?.dcKw) || 0;
  const price = Number(endCustomerPrice) || 0;

  const isCi = selected?.isCi || false;

  // Advanced ROI Logic from Dashboard
  const sunValue = 5.0;
  const pr = 0.8;
  const monthlyEnergyGen = Math.round(dcKw * sunValue * pr * 30);

  let monthlySavings, annualSavings;
  if (isCi) {
    monthlySavings = Math.round(monthlyEnergyGen * 8.50);
    annualSavings = monthlySavings * 12;
  } else {
    // Estimate current consumption (since we don't have original bill, we reverse it from monthly savings target or use a standard profile)
    // For the proposal, we assume the system is sized to cover ~90% of a bill that would make this system viable.
    // Or better, we use the values passed from the dashboard state if available.
    // Assuming a typical 5kW user consumes ~600-700 units.
    const assumedMonthlyConsumption = Math.round(monthlyEnergyGen / 0.9);
    const oldBill = calculateKSEBBill(assumedMonthlyConsumption, selected.phase || 1, 1);
    const newBill = calculateKSEBBill(Math.max(0, assumedMonthlyConsumption - monthlyEnergyGen), selected.phase || 1, 1);

    monthlySavings = Math.round(oldBill - newBill);
    annualSavings = monthlySavings * 12;
  }

  const amcRate = getAmcFee(selected?.invKw);
  const roiData = Array.from({ length: 31 }, (_, i) => {
    // We want to show the "Balance" between Go Solar vs Do Nothing
    // Actually, simpler: Net Cash Position (Cumulative Savings - Cost)
    let cumulativeSavings = 0;
    for (let j = 1; j <= i; j++) {
      const inflation = Math.pow(1.03, j - 1); // 3% energy inflation
      const eff = (100 - 1.0 - (0.4 * (j - 1))) / 100;
      let yearSavings = (monthlySavings * 12 * eff * inflation);
      if (includeAmc && j > 5) {
        yearSavings -= amcRate;
      }
      cumulativeSavings += yearSavings;
    }
    return { year: i, balance: Math.round(cumulativeSavings - price) };
  });

  const lifetimeBenefit = roiData[30].balance + price;
  const paybackYears = annualSavings > 0 ? (price / annualSavings) : 0;

  const biMonthlyBillVal = Number(customer?.ksebBiMonthlyBill) || 10000;
  const estMonthlyBill = Math.round(biMonthlyBillVal / 2);
  const totalCost25Y = estMonthlyBill * 12 * 25;
  const breakEvenYears = Math.round(paybackYears) || 5;
  const remainingYears = 25 - breakEvenYears;
  const totalSavingsRemaining = estMonthlyBill * 12 * remainingYears;
  const interestOnSavings = Math.round((totalSavingsRemaining * 0.05) / 12);
  const interestOnTotalCost = Math.round((totalCost25Y * 0.05) / 12);

  return (
    <Page>
      <PageHeader page={3} total={6} />
      <div style={{ padding: '30px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <SectionTitle label="Return on Investment" title="ROI ANALYSIS" />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { label: 'Proposed Capacity', val: selected?.isCi ? `${dcKw} kWp` : `${dcKw} kW` },
            { label: 'Total Modules', val: `${selected?.modules || 0} Nos` },
            { label: 'Monthly Gen.', val: `${monthlyEnergyGen} Units` },
            { label: 'Monthly Savings', val: fmt(monthlySavings) }
          ].map(({ label, val }) => (
            <div key={label} style={{ border: `1.5px solid ${G3}`, borderRadius: 16, padding: '18px 14px', textAlign: 'center', background: G2 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 4px' }}>{label}</p>
              <p style={{ fontSize: 18, fontWeight: 900, color: BK, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#f8fafc', borderRadius: 24, border: `1px solid ${LN}`, padding: '20px 20px 15px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ marginBottom: 10, padding: '0 10px' }}>
            <p style={{ fontSize: 14, fontWeight: 900, color: BK, margin: '0 0 4px' }}>Net Cash Flow (ROI Profile)</p>
          </div>

          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {dcKw > 0 ? (
              <div style={{ height: 460, width: '100%', marginTop: 10 }}>
                <ResponsiveContainer>
                  <BarChart data={roiData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="year" fontSize={10} tickLine={false} axisLine={false} tick={{ fill: GY }} dy={10} />
                    <YAxis fontSize={10} tickLine={false} axisLine={false} tick={{ fill: GY }} tickFormatter={(v) => `₹${(v / 100000).toFixed(1)}L`} domain={[-500000, 'auto']} />
                    <Tooltip
                      contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}
                      formatter={(v) => [`₹${v.toLocaleString()}`, 'Cumulative Cash Flow']}
                    />
                    <ReferenceLine y={0} stroke={BK} strokeWidth={1} strokeDasharray="3 3" />
                    <Bar dataKey="balance" radius={[4, 4, 0, 0]} isAnimationActive={false}>
                      {roiData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.balance >= 0 ? G : '#ef4444'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p style={{ color: GY }}>Waiting for system configuration...</p>
            )}
          </div>

          <div style={{ marginTop: 15, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, padding: '0 10px' }}>
            <div style={{ padding: '10px 15px', background: '#fff', borderRadius: 12, border: `1px solid ${LN}` }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: 'uppercase', margin: '0 0 2px' }}>Payback Period</p>
              <p style={{ fontSize: 16, fontWeight: 900, color: BK, margin: 0 }}>{paybackYears.toFixed(1)} Years</p>
            </div>
            <div style={{ padding: '10px 15px', background: G, borderRadius: 12, color: '#fff' }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', margin: '0 0 2px' }}>Total Lifetime Savings</p>
              <p style={{ fontSize: 16, fontWeight: 900, margin: 0 }}>₹{(lifetimeBenefit / 100000).toFixed(2)} Lakhs</p>
            </div>
          </div>
        </div>


      </div>
      <PageFooter customer={customer} />
    </Page>
  );
};

// PAGE 4 (Timeline & System Spec)
const TimelinePage = ({ customer, selected }) => (
  <Page>
    <PageHeader page={4} total={7} />
    <div style={{ padding: '30px 40px', flex: 1, display: 'flex', flexDirection: 'column' }}>
      <SectionTitle label="Project Lifecycle" title="TIMELINE & MILESTONES" />

      <div style={{ position: 'relative', height: 220, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 10 }}>
        {/* Main Horizontal Progress Line */}
        <div style={{ position: 'absolute', width: '92%', height: 2, background: LN, zIndex: 0 }} />

        <div style={{ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', zIndex: 1 }}>
          {[
            {
              step: '01', title: 'Permitting', desc: 'Under 4 weeks', pos: 'top',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /></svg>
            },
            {
              step: '02', title: 'Procurement', desc: 'Under 4 weeks', pos: 'bottom',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.29 7 12 12 20.71 7" /><line x1="12" y1="22" x2="12" y2="12" /></svg>
            },
            {
              step: '03', title: 'Installation', desc: 'Under 4 weeks', pos: 'top',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /><path d="M7 7h10" /></svg>
            },
            {
              step: '04', title: 'Electrical', desc: 'Under 4 weeks', pos: 'bottom',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 Z" /></svg>
            },
            {
              step: '05', title: 'Site Assessment', desc: 'Under 4 weeks', pos: 'top',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
            },
            {
              step: '06', title: 'Commissioning', desc: 'Under 4 weeks', pos: 'bottom',
              icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BK} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
            }
          ].map((s, i) => (
            <div key={s.step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>

              {/* Vertical Connector to main line */}
              <div style={{ width: 1.5, height: 100, background: LN, position: 'absolute', [s.pos === 'top' ? 'bottom' : 'top']: '50%', zIndex: -1 }} />

              {/* Content Above or Below */}
              <div style={{
                position: 'absolute',
                [s.pos === 'top' ? 'bottom' : 'top']: 'calc(50% + 55px)',
                left: '50%',
                transform: 'translateX(-50%)',
                textAlign: 'center',
                width: 130,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <div style={{ marginBottom: 6 }}>{s.icon}</div>
                <p style={{ fontSize: 12, fontWeight: 900, color: BK, margin: '0 0 2px' }}>{s.title}</p>
                <p style={{ fontSize: 8.5, color: GY, margin: 0, lineHeight: 1.2 }}>{s.desc}</p>
              </div>

              {/* Step Badge */}
              <div style={{
                width: 70,
                height: 28,
                background: i % 2 === 0 ? G : BK,
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                fontSize: 9,
                fontWeight: 900,
                letterSpacing: '0.05em',
                boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
              }}>
                STEP {s.step}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 40, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <SectionTitle label="System Overview" title="TECHNICAL ARCHITECTURE" />

        <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

          {/* Central Hub */}
          <div style={{ background: BK, color: '#fff', padding: '24px 20px', borderRadius: 16, textAlign: 'center', zIndex: 2, width: 190, boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <p style={{ fontSize: 12, fontWeight: 800, opacity: 0.7, letterSpacing: '0.2em', margin: '0 0 6px' }}>CORE HUB</p>
            <p style={{ fontSize: 16, fontWeight: 900, margin: 0, lineHeight: 1.2 }}>SYSTEM<br />SPECIFICATION</p>
          </div>

          {/* Component Blocks */}
          {[
            { label: 'SOLAR PANELS', icon: '☀️', x: -240, y: -80 },
            { label: 'GRID TIED INVERTER', icon: '🔌', x: 240, y: -80 },
            { label: 'HDGI STRUCTURE', icon: '🧊', x: -240, y: 80 },
            { label: selected?.isHybrid ? 'HYBRID SYSTEM' : 'ONGRID SYSTEM', icon: '⚙️', x: 240, y: 80 }
          ].map(c => (
            <div key={c.label} style={{
              position: 'absolute',
              transform: `translate(${c.x}px, ${c.y}px)`,
              width: 170,
              border: `1px solid ${LN}`,
              borderRadius: 16,
              padding: '16px 12px',
              background: '#fff',
              textAlign: 'center',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)'
            }}>
              <span style={{ fontSize: 22, display: 'block', marginBottom: 8 }}>{c.icon}</span>
              <p style={{ fontSize: 11, fontWeight: 900, color: BK, margin: 0, letterSpacing: '0.05em' }}>{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ background: '#f8fafc', padding: '20px', borderRadius: 20, border: `1px solid ${LN}`, marginTop: 20 }}>
        <p style={{ fontSize: 10, color: GY, lineHeight: 1.5, margin: 0, textAlign: 'center' }}>
          *Net metering is entirely dependent on DISCOM; we don't control that process.
        </p>
      </div>
    </div>
    <PageFooter customer={customer} />
  </Page>
);

// PAGE 5 (Technical Configuration)
const SystemPage = ({ selected, customer }) => {
  const monthlyGen = Math.round(selected.dcKw * 4.0 * 30);
  const annualGen = monthlyGen * 12;
  return (
    <Page>
      <PageHeader page={5} total={6} />
      <div style={{ padding: '24px 40px', flex: 1, display: 'flex', flexDirection: 'column', gap: 18 }}>
        <SectionTitle label="System Overview" title="TECHNICAL CONFIGURATION" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, flexShrink: 0 }}>
          {[{ label: 'DC Capacity', val: `${selected.dcKw} kW` }, { label: 'Modules', val: `${selected.modules} Nos` }, { label: selected.isHybrid ? 'Inv & Battery' : 'Inverter', val: selected.isHybrid ? `${selected.invKw}kW / ${selected.battery}kWh` : `${selected.invKw} kW` }, { label: 'Annual Gen.', val: `${annualGen} kWh` }].map(({ label, val }) => (
            <div key={label} style={{ border: `1.5px solid ${G3}`, borderRadius: 14, padding: '20px 16px', textAlign: 'center', background: G2 }}>
              <p style={{ fontSize: 9, fontWeight: 700, color: G, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 6px' }}>{label}</p>
              <p style={{ fontSize: 22, fontWeight: 900, color: BK, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, flex: 1 }}>
          <div style={{ height: 360, borderRadius: 16, overflow: 'hidden', border: `1px solid ${LN}`, flexShrink: 0 }}>
            <img src="/real_2.jpg" alt="Installation" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: '☀️', title: 'PV Modules', desc: `${selected.modules} × ${selected.panelCapacity || (selected.isNonDcr ? 600 : selected.isMicro ? 560 : 590)} Wp ${selected.isNonDcr ? 'nDCR G12R TOPCon (590-610 Wp)' : selected.isMicro ? 'DCR Mono PERC' : 'DCR Mono PERC'} Bifacial`, brand: 'Tata Power Solar / Approved' },
              { icon: '⚡', title: 'Inverter', desc: selected.isMicro ? `${selected.dcKw} kW DC — Enphase Micro Inverter (${selected.phase === 3 ? 'Three' : 'Single'} Phase)` : selected.isNonDcr ? `${selected.invKw} kW — Three Phase String Inverter` : `${selected.invKw} kW — ${selected.phase === 3 ? 'Three' : 'Single'} Phase String`, brand: selected.isMicro ? 'Enphase Energy (15Yr)' : selected.isNonDcr ? 'GoodWe / Solis / Growatt / Sofar / Solax (8Yr)' : selected.isHybrid ? 'Feston / Solax / Approved (8Yr)' : 'GoodWe / Solis / Growatt / Sofar / Solax (8Yr)' },
              ...(selected.isMicro ? [{ icon: '🔌', title: 'Current Transformers', desc: '2 Nos. Enphase CTs included as standard', brand: 'Enphase' }] : []),
              ...(selected.isHybrid ? [{ icon: '🔋', title: 'Battery Storage', desc: `${selected.battery} kWh Lithium-ion Battery System`, brand: 'Included' }] : []),
              { icon: '🏗️', title: 'Mounting Structure', desc: (selected.isMicro || selected.isNonDcr) ? `Galvanised Structure (${selected.structure || 'Without Structure'})` : 'Hot-dip Galvanised Steel / L-Angle Without Ballast', brand: 'TPS Approved' },
              { icon: '🔌', title: 'BOS Kit', desc: 'AC & DC DBs, Earthing Kit, Lightning Arrester, DC & AC Cables', brand: 'Siechem / KEI' },
              { icon: '🌐', title: 'Remote Monitoring', desc: selected.isMicro ? 'Enphase Envoy / Gateway App Monitoring' : 'Wi-Fi / GPRS remote monitoring portal with mobile app', brand: 'Included' },
            ].map(({ icon, title, desc, brand }) => (
              <div key={title} style={{ border: `1px solid ${LN}`, borderRadius: 12, padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center', flex: 1 }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 800, color: BK, margin: '0 0 2px' }}>{title}</p>
                  <p style={{ fontSize: 10, color: GY, margin: 0, lineHeight: 1.3 }}>{desc}</p>
                </div>
                <span style={{ fontSize: 8, fontWeight: 700, color: G, background: G2, padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap' }}>{brand}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter customer={customer} />
    </Page>
  );
};

// PAGE 5 (Financials & Terms Combined)
const FinancialsPage = ({ selected, customer, ksebFees, structureCost, endCustomerPrice, totalProjectCost, paymentType, applyDiscount, includeSubsidy, includeAmc }) => {
  const agreementFee = ksebFees?.agreement ?? ((paymentType || '').toLowerCase() === 'loan' ? 400 : 200);
  const feasibilityFee = ksebFees?.feasibility ?? 1000;
  const plantRegistrationFee = ksebFees?.registration ?? (() => {
    const kw = Number(selected.invKw || selected.dcKw) || 0;
    return Math.round(0.8 * kw * 1000 + 0.2 * kw * 1000 * 1.18);
  })();
  
  const estimatedPrice = selected.maxPrice;
  const specialOffer = applyDiscount ? selected.offer : 0;
  const totalSystemCost = estimatedPrice - specialOffer;
  const subsidyAmount = includeSubsidy && selected?.subsidy > 0 ? selected.subsidy : 0;
  const finalPayable = endCustomerPrice;

  return (
    <Page>
      <PageHeader page={4} total={6} />
      <div style={{ padding: '30px 40px 50px 40px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <SectionTitle label="Investment Details" title="FINANCIAL SUMMARY" />
        <div style={{ border: `1px solid ${LN}`, borderRadius: 14, overflow: 'hidden', flexShrink: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {(() => {
                const hasSubsidy = subsidyAmount > 0;
                const tableRows = [
                  { label: `Estimated Price (${selected?.structure || 'Without Structure'})`, val: fmt(estimatedPrice), muted: true },
                  ...(applyDiscount ? [{ label: 'Special Offer (Discount)', val: `– ${fmt(specialOffer)}`, green: true }] : []),
                  { label: 'Total System Cost', val: fmt(totalSystemCost), bold: true },
                  { label: 'Feasibility (KSEB)', val: fmt(feasibilityFee) },
                  { label: 'Plant Registration (Incl. GST)', val: fmt(plantRegistrationFee) },
                  { label: 'Agreement (KSEB)', val: fmt(agreementFee) },
                  ...(structureCost > 0
                    ? [{ label: 'Structure Cost (Approximate-Customer Scope )', val: fmt(structureCost) }]
                    : [{ label: 'Structure Cost', val: 'Depends on type of roof & site conditions', italic: true, muted: true }]
                  ),
                  { label: 'Total Project Cost', val: fmt(totalProjectCost), highlight: !hasSubsidy, bold: hasSubsidy },
                  ...(hasSubsidy ? [
                    { label: 'PM Surya Ghar Subsidy (Deduction)', val: `– ${fmt(subsidyAmount)}`, green: true },
                    { label: 'Effective Price', val: fmt(totalProjectCost - subsidyAmount), highlight: true }
                  ] : []),
                  ...(((paymentType || '').toLowerCase() === 'loan') ? [
                    { label: `* Eligible for a loan up to ${Number(selected?.dcKw) <= 3 ? '90%' : '80%'} of the Total System Cost`, isNote: true, muted: true }
                  ] : []),
                  ...(includeAmc ? [{ label: 'AMC Charges', val: fmt(getAmcFee(selected?.invKw)) }] : []),
                ];
                return tableRows.map(({ label, val, bold, green, muted, highlight, isNote, italic }, i) => (
                  <tr
                    key={i}
                    style={{
                      borderBottom: i === tableRows.length - 1 ? 'none' : `1px solid ${LN}`,
                      background: highlight ? G : bold ? G2 : i % 2 === 0 ? '#fff' : '#fafafa',
                    }}
                  >
                    <td
                      colSpan={isNote ? 2 : 1}
                      style={{
                        padding: highlight ? '20px 24px' : isNote ? '8px 24px' : '16px 24px',
                        fontSize: highlight ? 15 : isNote ? 11 : 13,
                        fontWeight: highlight ? 900 : bold ? 800 : 500,
                        color: highlight ? '#fff' : muted ? GY : BK,
                        fontStyle: isNote ? 'italic' : 'normal',
                        textAlign: isNote ? 'center' : 'left'
                      }}
                    >
                      {label}
                    </td>
                    {!isNote && (
                      <td
                        style={{
                          padding: highlight ? '20px 24px' : '16px 24px',
                          fontSize: italic ? 11 : highlight ? 18 : 13,
                          fontWeight: italic ? 600 : highlight ? 900 : bold ? 800 : 600,
                          color: highlight ? '#fff' : green ? G : italic ? GY : BK,
                          fontStyle: italic ? 'italic' : 'normal',
                          textAlign: 'right',
                        }}
                      >
                        {val}
                      </td>
                    )}
                  </tr>
                ));
              })()}
            </tbody>
          </table>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { years: '30', label: 'Modules', desc: 'Performance Warranty' },
            { years: selected?.isMicro ? '15' : selected?.isCi ? '5' : '8', label: selected?.isMicro ? 'Micro Inverter' : 'Inverter', desc: 'Product Warranty' },
            { years: '5', label: 'Service', desc: 'Maintenance Support' },
          ].map(({ years, label }) => (
            <div key={label} style={{ border: `1px solid ${G3}`, borderRadius: 14, padding: '24px 10px', textAlign: 'center', background: G2 }}>
              <p style={{ fontSize: 24, fontWeight: 900, color: G, margin: 0 }}>{years} yrs</p>
              <p style={{ fontSize: 11, color: BK, margin: 0, fontWeight: 800 }}>{label}</p>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${LN}`, borderRadius: 14, padding: '24px', background: '#f8fafc' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: BK, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 10px' }}>Terms & Conditions</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {(selected?.isMicro ? [
              '15 years standard Enphase Micro Inverter warranty',
              '2 Nos. CTs provided as standard in all varieties',
              'Twice yearly O&M visit for first 5 years',
              'Net meter & KSEB charges are extra',
              'Chemical anchoring if required is at additional cost',
              'Structure price is approximate and may vary depending upon site conditions',
              'Prices are subject to change from time to time',
              ...(includeAmc ? [`AMC maintenance charges applicable from Year 6 onwards (₹${getAmcFee(selected?.invKw)}/year)`] : []),
            ] : selected?.isCi ? [
              'Inverter Make available: Goodwe & Sofar only (Supply based on availability)',
              'Twice yearly O&M visit for first 5 years',
              'CEIG approval charges and KSEB fee extra',
              'Sheet roof walkway & safety line are mandatory (at additional cost)',
              'Above 38kWp transportation & unloading under dealer scope',
              'Structure price is approximate and may vary depending upon site conditions',
              'Prices are subject to change from time to time, depending entirely on Tata Power',
              ...(includeAmc ? [`AMC maintenance charges applicable from Year 6 onwards (₹${getAmcFee(selected?.invKw)}/year)`] : []),
            ] : [
              '10 years Product Warranty & 30 years linear Power Output Warranty on solar modules (580-595 Wp)',
              '8 years standard Inverter warranty (GoodWe / Solis / Growatt / Sofar / Solax / Approved)',
              'Period O&M visit — twice a year for the first 5 years',
              'Sheet Roof Structure Considered is Short Rail; BOS 5 year warranty',
              'Net meter charges extra; KSEB / CEIG charges extra',
              'System price based on Standard BOM and includes 8.9% GST',
              'Additional structure work under customer scope in L-Angle Without Ballast structure',
              'Subsidy applicable only for Domestic Customers (LT 1A)',
              ...(includeAmc ? [`AMC maintenance charges applicable from Year 6 onwards (₹${getAmcFee(selected?.invKw)}/year)`] : []),
            ]).map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, fontSize: 10, color: GY, alignItems: 'center' }}>
                <span style={{ color: G, fontWeight: 900, flexShrink: 0 }}>•</span><span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <PageFooter customer={customer} />
    </Page>
  );
};

// PAGE 6
const BackCoverPage = ({ customer, totalProjectCost, selected, includeSubsidy, endCustomerPrice, includeAmc }) => {
  const dcKw = Number(selected?.dcKw) || 0;
  const price = Number(endCustomerPrice) || 0;
  const isCi = selected?.isCi || false;

  const sunValue = 5.0;
  const pr = 0.8;
  const monthlyEnergyGen = Math.round(dcKw * sunValue * pr * 30);

  let monthlySavings;
  if (isCi) {
    monthlySavings = Math.round(monthlyEnergyGen * 8.50);
  } else {
    const assumedMonthlyConsumption = Math.round(monthlyEnergyGen / 0.9);
    const oldBill = calculateKSEBBill(assumedMonthlyConsumption, selected?.phase || 1, 1);
    const newBill = calculateKSEBBill(Math.max(0, assumedMonthlyConsumption - monthlyEnergyGen), selected?.phase || 1, 1);
    monthlySavings = Math.round(oldBill - newBill);
  }

  const amcRate = getAmcFee(selected?.invKw);
  const roiData = Array.from({ length: 31 }, (_, i) => {
    let cumulativeSavings = 0;
    for (let j = 1; j <= i; j++) {
      const inflation = Math.pow(1.03, j - 1);
      const eff = (100 - 1.0 - (0.4 * (j - 1))) / 100;
      let yearSavings = (monthlySavings * 12 * eff * inflation);
      if (includeAmc && j > 5) {
        yearSavings -= amcRate;
      }
      cumulativeSavings += yearSavings;
    }
    return { year: i, balance: Math.round(cumulativeSavings - price) };
  });

  const lifetimeBenefit = roiData[30].balance + price;

  const biMonthlyBillVal = Number(customer?.ksebBiMonthlyBill) || 10000;
  const estMonthlyBill = Math.round(biMonthlyBillVal / 2);
  const totalCost30Y = estMonthlyBill * 12 * 30;

  const bankGrowth = Math.round(price * Math.pow(1.05, 30));
  const bankInterestEarned = bankGrowth - price;
  const bankNetOutcome = bankGrowth - totalCost30Y;

  const solarSavingsCumulative = lifetimeBenefit;
  const solarNetOutcome = roiData[30].balance;
  const netAdvantage = solarNetOutcome - bankNetOutcome;

  const fmtInt = (n) => '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN');
  const fmtIntSigned = (n) => (n < 0 ? '-' : '+') + '₹' + Math.round(Math.abs(n)).toLocaleString('en-IN');

  return (
    <Page>
      <div style={{ background: G, padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
        <img src="/transp.png" alt="SolarTech" style={{ height: 30, filter: 'brightness(0) invert(1)' }} />
        <span style={{ fontSize: 10, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{COMPANY.tagline}</span>
      </div>

      <div style={{ height: 130, position: 'relative', overflow: 'hidden', flexShrink: 0 }}>
        <img src="/real_installation.webp" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(255,255,255,0) 40%, #fff 100%)' }} />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: '15px 40px 10px', textAlign: 'center', gap: 14 }}>
        <div>
          <h2 style={{ fontSize: 26, fontWeight: 900, color: G, margin: '0 0 4px', lineHeight: 1.1 }}>
            THANK YOU
          </h2>
          <p style={{ fontSize: 14, fontWeight: 700, color: GY, maxWidth: 800, margin: '0 auto', lineHeight: 1.3 }}>
            YOU ARE NOW PART OF A SUSTAINABLE FUTURE
          </p>
        </div>

        <div style={{ border: `1.5px solid ${G3}`, borderRadius: 14, padding: '12px 30px', background: G2, width: '100%', maxWidth: 440 }}>
          <p style={{ fontSize: 9, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, margin: '0 0 4px' }}>
            Your Investment
          </p>
          <p style={{ fontSize: 24, fontWeight: 900, color: BK, margin: '0 0 2px' }}>{fmt(totalProjectCost)}</p>
          <p style={{ fontSize: 10, color: GY, margin: 0 }}>
            {selected?.dcKw} {selected?.isCi ? 'kWp' : 'kW'} · {selected?.modules} Modules · {selected?.isCi ? 'C&I' : (selected?.isHybrid ? `HYBRID (${selected?.battery}kWh)` : 'ONGRID')}
          </p>
        </div>

        <div style={{ border: `1.5px solid ${G3}`, borderRadius: 14, padding: '12px 30px', background: G2, width: '100%', maxWidth: 440 }}>
          <p style={{ fontSize: 9, color: G, textTransform: 'uppercase', letterSpacing: '0.12em', fontWeight: 800, margin: '0 0 4px' }}>
            Your Profit
          </p>
          <p style={{ fontSize: 24, fontWeight: 900, color: BK, margin: '0 0 2px' }}>+{fmtInt(netAdvantage)}</p>
          <p style={{ fontSize: 10, color: GY, margin: 0 }}>
            30-Year Solar Net Advantage over Bank FD
          </p>
        </div>

        <div style={{ background: '#f8fafc', borderRadius: 16, border: `1.5px solid ${LN}`, padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 8, width: '100%', maxWidth: 640 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ fontSize: 10, fontWeight: 900, color: BK, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📊 30-Year Financial Comparison: Solar vs Bank FD
            </p>
            <span style={{ fontSize: 8, color: GY, fontWeight: 700 }}>Initial Capital: {fmtInt(price)}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #f1f5f9', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>🏦</span>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 800, color: BK, margin: 0 }}>Option A: Bank Fixed Deposit</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: `1px solid ${LN}`, paddingTop: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: GY, fontWeight: 600 }}>Interest Income (FD):</span>
                  <span style={{ color: G, fontWeight: 700 }}>+{fmtInt(bankInterestEarned)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: '#ef4444', fontWeight: 600 }}>KSEB Electricity Bills Paid:</span>
                  <span style={{ color: '#ef4444', fontWeight: 700 }}>-{fmtInt(totalCost30Y)}</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', background: '#fef2f2', borderRadius: 8, padding: '6px 8px', borderLeft: '3px solid #ef4444', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: '#991b1b' }}>Your Net Profit:</span>
                <span style={{ fontSize: 9, fontWeight: 900, color: '#b91c1c' }}>
                  No Profit (Loss of {fmtInt(Math.abs(bankNetOutcome))})
                </span>
              </div>
            </div>

            <div style={{ background: '#fff', borderRadius: 12, border: '1.5px solid #f1f5f9', padding: '8px 12px', display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 14 }}>☀️</span>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 800, color: BK, margin: 0 }}>Option B: Solar Panel Asset</p>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 2, borderTop: `1px solid ${LN}`, paddingTop: 6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: GY, fontWeight: 600 }}>Total Electricity Savings:</span>
                  <span style={{ color: BK, fontWeight: 700 }}>+{fmtInt(solarSavingsCumulative)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9 }}>
                  <span style={{ color: G, fontWeight: 700 }}>Future KSEB Bills:</span>
                  <span style={{ color: G, fontWeight: 700 }}>₹0 (Fully Covered)</span>
                </div>
              </div>

              <div style={{ marginTop: 'auto', background: '#f0fdf4', borderRadius: 8, padding: '6px 8px', borderLeft: '3px solid #10b981', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: '#166534' }}>Your Net Profit:</span>
                <span style={{ fontSize: 9, fontWeight: 900, color: '#15803d' }}>
                  +{fmtInt(netAdvantage)} (Clear Profit)
                </span>
              </div>
            </div>
          </div>

          <div style={{ background: G, color: '#fff', borderRadius: 10, padding: '8px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', textAlign: 'left' }}>
            <div>
              <p style={{ fontSize: 9, fontWeight: 900, margin: 0, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                🏆 Your Extra Profit with Solar: +{fmtInt(netAdvantage)}
              </p>
              <p style={{ fontSize: 7.5, opacity: 0.9, margin: 0, fontWeight: 500 }}>
                Choose Solar to generate <strong>{fmtInt(netAdvantage)}</strong> more wealth for your family than leaving your money in the bank.
              </p>
            </div>
            <span style={{ fontSize: 12, fontWeight: 900, marginLeft: 8 }}>+{fmtInt(netAdvantage)}</span>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 4 }}>
          {[['📞 Call Us', COMPANY.phone], ['✉ Email', COMPANY.email]].map(([label, val]) => (
            <div key={label}>
              <p style={{ fontSize: 9, color: G, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>{label}</p>
              <p style={{ fontSize: 12, fontWeight: 700, color: BK, margin: 0 }}>{val}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 2 }}>
          <p style={{ fontSize: 9, color: G, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 2px' }}>📍 Office</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: BK, margin: 0, maxWidth: 300, mx: 'auto', lineHeight: 1.3 }}>
            Oppo. Malabar Gold, Nilambur, Malappuram, Kerala — 679329
          </p>
        </div>
      </div>

      <div style={{ padding: '10px 40px', borderTop: `3px solid ${G}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: G2, flexShrink: 0 }}>
        <span style={{ fontSize: 9, color: GY, fontWeight: 600 }}>{COMPANY.name} · Nilambur, Malappuram, Kerala — 679329</span>
        <span style={{ fontSize: 9, fontWeight: 800, color: G }}>6 / 6</span>
      </div>
    </Page>
  );
};

export default function LatestQuotation({ selected, customer, ksebFees, structureCost, endCustomerPrice, totalProjectCost, paymentType, today, applyDiscount, includeSubsidy = true, includeAmc = false }) {
  return (
    <>
      <CoverPage customer={customer} selected={selected} today={today} paymentType={paymentType} />
      <CompanyProfilePage selected={selected} customer={customer} />
      <ROIPage selected={selected} customer={customer} endCustomerPrice={endCustomerPrice} includeAmc={includeAmc} />
      <FinancialsPage selected={selected} customer={customer} ksebFees={ksebFees} structureCost={structureCost} endCustomerPrice={endCustomerPrice} totalProjectCost={totalProjectCost} paymentType={paymentType} applyDiscount={applyDiscount} includeSubsidy={includeSubsidy} includeAmc={includeAmc} />
      <SystemPage selected={selected} customer={customer} />
      <BackCoverPage customer={customer} totalProjectCost={totalProjectCost} selected={selected} includeSubsidy={includeSubsidy} endCustomerPrice={endCustomerPrice} includeAmc={includeAmc} />
    </>
  );
}
